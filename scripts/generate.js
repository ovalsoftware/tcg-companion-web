#!/usr/bin/env node
/*
 * Fetches sets + cards from app.tcgcompanion.com and writes
 *   _data/sets.json
 *   _data/cards/<setCode>.json
 *   _pages/sets/<setCode>.md   (per-set detail stubs)
 *
 * Run before `jekyll build`.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE = process.env.TCG_API_BASE || 'https://app.tcgcompanion.com/api/v1';
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, '_data');
const CARDS_DIR = path.join(DATA_DIR, 'cards');
const PAGES_DIR = path.join(ROOT, '_pages', 'sets');
const ARTISTS_PAGES_DIR = path.join(ROOT, '_pages', 'artists');
const ARTIST_PAGE_MIN_CARDS = 10;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'tcg-companion-web-generator' } }, (res) => {
        if (res.statusCode >= 400) {
          res.resume();
          return reject(new Error(`${res.statusCode} for ${url}`));
        }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error(`Bad JSON from ${url}: ${e.message}`));
          }
        });
      })
      .on('error', reject);
  });
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugifyName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Some upstream image URLs have literal `&` in their PATH (e.g. "scarlet&violet/…")
// which HTML attribute parsers treat as an ambiguous entity. Encode `&` → `%26`
// but ONLY in the path portion — query strings (e.g. Firebase `?alt=media&token=…`)
// must keep `&` as the parameter separator.
function sanitizeImageUrl(url) {
  if (!url) return url;
  const qIdx = url.indexOf('?');
  if (qIdx < 0) return url.replace(/&/g, '%26');
  const path = url.slice(0, qIdx).replace(/&/g, '%26');
  // Repair any query params that may have already been over-encoded upstream.
  const query = url.slice(qIdx + 1).replace(/%26/gi, '&');
  return `${path}?${query}`;
}

function writeArtistOutputs(sets, cardsBySetSlug) {
  mkdirp(ARTISTS_PAGES_DIR);
  // Also clean the folder so retired artists (no longer over the threshold) aren't left orphaned.
  for (const f of fs.readdirSync(ARTISTS_PAGES_DIR)) {
    if (f.endsWith('.md')) fs.unlinkSync(path.join(ARTISTS_PAGES_DIR, f));
  }

  // Bucket by slug (case-insensitive) so "GIDORA" and "Gidora" merge.
  // Pick the most-used display-name variant as canonical.
  const artists = new Map(); // slug -> { slug, totalCards, sets, cards, nameCounts }

  for (const set of sets) {
    const cards = cardsBySetSlug[set.slug] || [];
    for (const card of cards) {
      const rawName = (card.artist || '').trim();
      if (!rawName) continue;
      const slug = slugifyName(rawName);
      if (!slug) continue;
      if (!artists.has(slug)) {
        artists.set(slug, {
          slug,
          totalCards: 0,
          sets: new Set(),
          cards: [],
          nameCounts: new Map(),
        });
      }
      const entry = artists.get(slug);
      entry.totalCards += 1;
      entry.sets.add(set.slug);
      entry.cards.push({ ...card, setSlug: set.slug, setName: set.name, setReleaseDate: set.releaseDate });
      entry.nameCounts.set(rawName, (entry.nameCounts.get(rawName) || 0) + 1);
    }
  }

  // Resolve canonical display name for each merged artist.
  for (const a of artists.values()) {
    const sorted = [...a.nameCounts.entries()]
      .sort((x, y) => y[1] - x[1] || (x[0].toLowerCase() === x[0] ? 1 : -1));
    a.name = sorted[0][0];
  }

  // Serialise summary for the index
  const artistsSummary = [...artists.values()]
    .map((a) => ({
      name: a.name,
      slug: a.slug,
      totalCards: a.totalCards,
      setCount: a.sets.size,
      hasPage: a.totalCards >= ARTIST_PAGE_MIN_CARDS,
    }))
    .sort((a, b) => b.totalCards - a.totalCards || a.name.localeCompare(b.name));

  fs.writeFileSync(
    path.join(DATA_DIR, 'artists.json'),
    JSON.stringify(artistsSummary, null, 2)
  );
  console.log(`Wrote _data/artists.json with ${artistsSummary.length} artists`);

  // Per-artist card data + stub page (only for artists meeting the threshold)
  const ARTIST_CARDS_DIR = path.join(DATA_DIR, 'artist_cards');
  mkdirp(ARTIST_CARDS_DIR);
  for (const f of fs.readdirSync(ARTIST_CARDS_DIR)) {
    if (f.endsWith('.json')) fs.unlinkSync(path.join(ARTIST_CARDS_DIR, f));
  }

  let pageCount = 0;
  for (const a of artists.values()) {
    if (a.totalCards < ARTIST_PAGE_MIN_CARDS) continue;
    // Sort cards newest-set-first, then by number
    a.cards.sort((c1, c2) => {
      const r1 = new Date(c1.setReleaseDate || 0);
      const r2 = new Date(c2.setReleaseDate || 0);
      if (r1.getTime() !== r2.getTime()) return r2 - r1;
      const n1 = parseInt(c1.number, 10);
      const n2 = parseInt(c2.number, 10);
      if (!isNaN(n1) && !isNaN(n2) && n1 !== n2) return n1 - n2;
      return (c1.number || '').localeCompare(c2.number || '');
    });

    fs.writeFileSync(
      path.join(ARTIST_CARDS_DIR, `${a.slug}.json`),
      JSON.stringify(a.cards)
    );

    const escapedName = a.name.replace(/"/g, '\\"');
    const md = [
      '---',
      'layout: artist',
      `title: "${escapedName} Pokémon Cards"`,
      `artist_name: "${escapedName}"`,
      `artist_slug: "${a.slug}"`,
      `permalink: /artists/${a.slug}/`,
      `description: "Every Pokémon TCG card illustrated by ${escapedName} — ${a.totalCards} cards across ${a.sets.size} sets, with live eBay listings for each."`,
      '---',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(ARTISTS_PAGES_DIR, `${a.slug}.md`), md);
    pageCount += 1;
  }

  console.log(`Generated ${pageCount} artist pages (artists with >= ${ARTIST_PAGE_MIN_CARDS} cards).`);
}

function formatReleaseDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function main() {
  mkdirp(DATA_DIR);
  mkdirp(CARDS_DIR);
  mkdirp(PAGES_DIR);

  console.log(`Fetching sets from ${API_BASE}/sets`);
  const setsResp = await fetchJson(`${API_BASE}/sets`);
  const sets = setsResp.sets
    .map((s) => ({
      setCode: s.setCode,
      name: s.name,
      series: s.series,
      totalCards: s.totalCards,
      totalSecretCards: s.totalSecretCards || 0,
      releaseDate: s.releaseDate || null,
      releaseDateFormatted: formatReleaseDate(s.releaseDate),
      symbolUrl: sanitizeImageUrl(s.symbolUrl || ''),
      logoUrl: sanitizeImageUrl(s.logoUrl || ''),
      hasReverseHolos: !!s.hasReverseHolos,
      slug: slugifyName(s.name),
    }))
    .sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));

  fs.writeFileSync(path.join(DATA_DIR, 'sets.json'), JSON.stringify(sets, null, 2));
  console.log(`Wrote _data/sets.json with ${sets.length} sets`);

  const cardsBySetSlug = {};

  // Fetch cards per set (sequential to be kind to the API)
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    const url = `${API_BASE}/sets/${encodeURIComponent(set.setCode)}/cards?limit=1000&sort=number`;
    process.stdout.write(`[${i + 1}/${sets.length}] ${set.setCode} ${set.name}... `);
    let cards = [];
    try {
      const resp = await fetchJson(url);
      cards = (resp.cards || []).map((c) => ({
        cardId: c.cardId,
        name: c.name,
        number: c.number,
        rarity: c.rarity || '',
        artist: c.artist || '',
        imageUrl: sanitizeImageUrl(c.imageUrl || ''),
        imageUrlHiRes: sanitizeImageUrl(c.imageUrlHiRes || ''),
      }));
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
      continue;
    }
    // Sort by numeric portion of `number` when possible
    cards.sort((a, b) => {
      const na = parseInt(a.number, 10);
      const nb = parseInt(b.number, 10);
      if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
      return (a.number || '').localeCompare(b.number || '');
    });

    fs.writeFileSync(path.join(CARDS_DIR, `${set.slug}.json`), JSON.stringify(cards));
    cardsBySetSlug[set.slug] = cards;

    const md = [
      '---',
      `layout: set`,
      `title: "${set.name} Card List"`,
      `set_code: "${set.setCode}"`,
      `set_slug: "${set.slug}"`,
      `permalink: /sets/${set.slug}/`,
      `description: "Complete ${set.name} card list with images, rarities and numbers. ${cards.length} cards from the ${set.series} series."`,
      '---',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(PAGES_DIR, `${set.slug}.md`), md);
    console.log(`${cards.length} cards`);
  }

  console.log(`\nGenerated ${sets.length} set pages.`);

  writeArtistOutputs(sets, cardsBySetSlug);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
