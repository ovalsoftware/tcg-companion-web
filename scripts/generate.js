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

  console.log(`\nDone. Generated ${sets.length} set pages.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
