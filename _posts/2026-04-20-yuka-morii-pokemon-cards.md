---
title: "Yuka Morii Pokémon Cards: The Clay-Art Illustrator Guide"
date: 2026-04-20 11:00:00 +0000
author: TCG Companion Team
category: Artist Spotlights
lede: "Yuka Morii has illustrated Pokémon cards since 2001 using sculpted clay models instead of digital art — and collectors have quietly built entire sub-collections around her work."
description: "A deep dive on Yuka Morii, the Pokémon card illustrator who sculpts her subjects from clay. Her signature style, notable cards across 20+ years, and where her prints sit in the modern collector market."
seo_title: "Yuka Morii Pokémon Cards: Clay-Art Illustrator Guide | TCG Companion"
reading_time: 6
hero_image: /assets/app/app-3.jpg
hero_image_alt: TCG Companion app showing detailed illustrator information for a Pokémon card

notable_cards:
  - card_id: BLK-141
    slug: black-bolt
    name: Klinklang
    number: "141"
    set_name: Black Bolt
    rarity: Secret Rare
    blurb: "A 2025 secret rare from the Black Bolt set — one of Morii's most recent high-rarity prints, showcasing the clay-art style in a modern illustration rare treatment."
  - card_id: par-211
    slug: paradox-rift
    name: Aipom
    number: "211"
    set_name: Paradox Rift
    rarity: Secret Rare
    blurb: "Aipom in Morii's signature soft-focus clay composition. A 2023 secret rare that often appears in lists of the best-illustrated modern commons-turned-chase."
  - card_id: swsh14-209
    slug: crown-zenith
    name: Drapion V
    number: "GG49"
    set_name: Crown Zenith
    rarity: Secret Rare (Trainer Gallery)
    blurb: "Part of the Trainer Gallery subset — Drapion V posed in a natural scene rather than a battle frame. Morii's clay-and-light signature is especially clear here."
  - card_id: hgss1-13
    slug: heartgold-and-soulsilver
    name: Wobbuffet
    number: "13"
    set_name: HeartGold & SoulSilver
    rarity: Rare Holo
    blurb: "Arguably her most meme-loved card — a clay Wobbuffet somehow both dignified and absurd. Frequently cited as the card that introduced Morii's style to Western collectors."
  - card_id: neo3-2
    slug: neo-revelation
    name: Blissey
    number: "2"
    set_name: Neo Revelation
    rarity: Rare Holo
    blurb: "One of Morii's earliest Pokémon TCG illustrations from 2001. The clay Blissey composition is softer than her modern work but unmistakably the same artist."
  - card_id: ex6-14
    slug: firered-and-leafgreen
    name: Slowbro
    number: "14"
    set_name: FireRed & LeafGreen
    rarity: Rare Holo
    blurb: "A warm, low-saturation 2004 holo featuring Slowbro. The physical clay model translates into a texture that digital art simply can't replicate."
---

If you've collected Pokémon cards for any length of time, you've seen her work: a Pokémon rendered in soft, tactile clay, photographed in natural light, placed into the card frame without any digital painting. That's **Yuka Morii**, and she's one of the most beloved (and quietly most prolific) illustrators in the Pokémon TCG.

Since her first cards in the early 2000s, Morii has contributed **over 200 illustrations** across nearly every major Pokémon set in English print &mdash; and her style has stayed remarkably consistent across 20+ years.

> **Want to value a Yuka Morii card you own?** [Scan it with TCG Companion](/pokemon-card-value-checker/) and see the current raw market price plus every tracked graded tier in under a second.

## What makes a Yuka Morii card a Yuka Morii card

Morii's signature is clay. Every Pokémon in her illustrations is a sculpted miniature &mdash; modeled, painted, posed, and then photographed in a miniature set. The card art you see is a photograph of a physical object.

The tells:

- **Soft, diffuse natural lighting** rather than dramatic digital highlights.
- **Tactile, visible texture** &mdash; you can see clay fingerprints on close inspection.
- **Warm, low-saturation palettes**. Morii's cards often feel cozy or nostalgic.
- **Grounded compositions** &mdash; Pokémon sitting in grass, on wood, in small dioramas rather than dynamic battle poses.
- **Small and mid-tier Pokémon** feature more often than legendaries &mdash; Swinub, Wobbuffet, Aipom, Piplup, Bidoof, Meltan, Applin, Sinistea.

If you've seen a Pokémon card where the Pokémon looks like a physical toy sitting in a real scene, it's almost certainly Yuka Morii's work (or possibly her frequent collaborator Naoki Saito, though his style leans more painterly).

## Notable Yuka Morii cards

A small selection &mdash; Morii has illustrated far more than this, but these give you a sense of her range from 2001 through 2025.

<div class="pikachuList">
  {% for item in page.notable_cards %}
    {% assign cards = site.data.cards[item.slug] %}
    {% assign match = nil %}
    {% if cards %}
      {% for c in cards %}{% if c.cardId == item.card_id %}{% assign match = c %}{% break %}{% endif %}{% endfor %}
    {% endif %}
    {% assign kw = item.name | append: ' ' | append: item.number | append: ' ' | append: item.set_name | append: ' pokemon' | url_encode %}
    {% capture ebay_href %}https://www.ebay.com/sch/i.html?_nkw={{ kw }}&_dcat=183454&rt=nc&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339039133&mkevt=1&customid=web{% endcapture %}

    <article class="pikachuCard">
      <div class="pikachuCardImage">
        {% if match.imageUrl %}
        <img src="{{ match.imageUrl }}" alt="{{ item.name }} #{{ item.number }} by Yuka Morii from {{ item.set_name }}" loading="lazy">
        {% else %}
        <div class="pikachuCardPlaceholder">Image unavailable</div>
        {% endif %}
      </div>
      <div class="pikachuCardBody">
        <h3>{{ item.name }} &mdash; {{ item.set_name }}</h3>
        <p class="pikachuCardMeta">
          <span>#{{ item.number }}</span>
          {% if item.rarity %}&middot; <span class="pikachuRarity">{{ item.rarity }}</span>{% endif %}
        </p>
        <p class="pikachuCardBlurb">{{ item.blurb }}</p>
        <div class="pikachuCardActions">
          <a class="pikachuEbay" href="{{ ebay_href }}" rel="sponsored nofollow noopener" target="_blank">Check eBay listings &rarr;</a>
          <a class="pikachuSet" href="{{ '/sets/' | append: item.slug | append: '/' | relative_url }}">See the full {{ item.set_name }} set</a>
        </div>
      </div>
    </article>
  {% endfor %}
</div>

## Sets where Morii has the most cards

Based on the English card database, the sets where Yuka Morii has the most illustrations include:

- **Delta Species** (2005) &mdash; 10 cards, one of her heaviest contribution sets
- **Aquapolis** (2003) &mdash; 8 cards, part of the classic E-Card era
- **Skyridge** (2003) &mdash; 7 cards
- **Neo Destiny** (2002) &mdash; 7 cards
- **Expedition Base Set** (2002) &mdash; 7 cards
- **FireRed &amp; LeafGreen** (2004) &mdash; 5 cards
- **HeartGold &amp; SoulSilver** (2010) &mdash; 5 cards
- **Mysterious Treasures** (2007) &mdash; 5 cards
- **Lost Origin** (2022) &mdash; 5 cards
- **Hidden Legends** (2004) &mdash; 5 cards

Modern sets like **Paradox Rift**, **Crown Zenith**, **Obsidian Flames**, **Temporal Forces**, **Twilight Masquerade**, **Stellar Crown**, **Surging Sparks**, **Journey Together**, **Destined Rivals** and **Mega Evolution** all feature at least one Morii illustration &mdash; often a common that becomes a personal favourite because of the art.

## Why Morii cards are quietly collected

Morii doesn't often get the headline "chase card" slot &mdash; that tends to go to digital alt-art specialists whose work pops harder on holo foil. But her cards have a devoted following for three reasons:

1. **Consistency.** 25 years of work with a recognisable style, in a medium (clay miniatures) that basically no other TCG illustrator uses.
2. **Set completion.** Artist-specific collections are a real sub-hobby, and Morii has enough cards across enough sets to make "collect every Yuka Morii" a satisfying long-term goal.
3. **Modern rediscovery.** Her illustration-rare and secret-rare appearances in 2023&ndash;2025 sets (Aipom SR in Paradox Rift, Klinklang SR in Black Bolt, Drapion V in Crown Zenith Trainer Gallery) have brought her back into casual collector awareness.

Her cards are usually affordable &mdash; even her secret rare modern work typically lands in the $20&ndash;$100 PSA 10 range &mdash; which makes building a Morii collection approachable.

## How to find Yuka Morii cards in your collection

The artist credit appears in small text at the bottom of every Pokémon card, typically reading "Illustrator Yuka Morii" or just "Yuka Morii." Scanning with [TCG Companion](/pokemon-card-scanner/) pulls the artist name automatically along with set, number, rarity and variant &mdash; so you can quickly find every Morii card across your collection.

## Related reading

- [Most valuable Pokémon cards ever sold](/blog/most-valuable-pokemon-cards/)
- [Funny Pokémon cards: the silliest art, flavor text and designs](/blog/funny-pokemon-cards/)
- [VMAX Pokémon cards: full guide](/blog/vmax-pokemon-cards/)
- [Rare Pikachu cards worth looking for](/blog/rare-pikachu-cards/)
- [Browse Paradox Rift](/sets/paradox-rift/) &mdash; home of Aipom SR
- [Browse Crown Zenith](/sets/crown-zenith/) &mdash; Trainer Gallery with Drapion V
- [Browse HeartGold &amp; SoulSilver](/sets/heartgold-and-soulsilver/) &mdash; iconic clay Wobbuffet
- [All Pokémon TCG sets](/sets/)
