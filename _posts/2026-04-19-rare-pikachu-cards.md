---
title: "Rare Pikachu Cards Worth Looking For"
date: 2026-04-19
author: TCG Companion Team
category: Pricing Guides
lede: "Pikachu has appeared on hundreds of Pokémon cards since 1999, but only a handful pull real collector prices. Here are the standouts — with the exact set, rarity and live eBay listings for each."
description: "A curated guide to the rarest Pokémon Pikachu cards worth chasing, from 1999 Base Set through the latest Scarlet & Violet releases, with live eBay listings and set links."
seo_title: "Rare Pikachu Cards: The 13 Most Collectible Pikachus | TCG Companion"
reading_time: 6
hero_image: /assets/app/app-3.jpg
hero_image_alt: TCG Companion showing live prices for a Pikachu card

featured_pikachus:
  - card_id: base1-58
    slug: base
    name: Pikachu
    number: "58"
    set_name: Base
    rarity: Common (1999)
    blurb: "The original 1999 Base Set Pikachu. Not rare on paper, but first-edition and shadowless copies in high grades are a foundational collector grail."
  - card_id: base2-60
    slug: jungle
    name: Pikachu
    number: "60"
    set_name: Jungle
    rarity: Common (1999)
    blurb: "Jungle's Pikachu. First-edition copies carry a premium, and PSA 10s from the 1999 English run are increasingly hard to find."
  - card_id: mew-173
    slug: scarlet-and-violet-151
    name: Pikachu
    number: "173"
    set_name: Scarlet & Violet 151
    rarity: Special Illustration Rare
    blurb: "The 151 set's big Pikachu chase — a full special illustration rare print with a classic Kanto scene that pulls a premium on release hype."
  - card_id: swsh4-188
    slug: vivid-voltage
    name: Pikachu VMAX
    number: "188"
    set_name: Vivid Voltage
    rarity: Secret Rare
    blurb: "The famous 'Fat Chu' Pikachu VMAX — one of the most recognisable Pokémon cards from the Sword & Shield era. Consistently one of the chase cards of its set."
  - card_id: swsh75-33
    slug: celebrations
    name: Birthday Pikachu
    number: "33"
    set_name: Celebrations
    rarity: Classic Collection
    blurb: "Classic Collection reprint of the fan-favourite Birthday Pikachu with the iconic cake illustration. A nostalgia-driven pull from the 25th-anniversary set."
  - card_id: xy12-110
    slug: evolutions
    name: Flying Pikachu
    number: "110"
    set_name: Evolutions
    rarity: Secret Rare
    blurb: "Evolutions' Flying Pikachu — a nod to the 1999 Ivy Limited promo, reprinted as a secret rare with better availability."
  - card_id: xy12-111
    slug: evolutions
    name: Surfing Pikachu
    number: "111"
    set_name: Evolutions
    rarity: Secret Rare
    blurb: "Evolutions' Surfing Pikachu. Pairs with the Flying Pikachu as one half of the most-collected Pikachu duo in modern sets."
  - card_id: swsh12-233
    slug: lost-origin
    name: Pikachu V
    number: "TG16"
    set_name: Lost Origin
    rarity: Trainer Gallery Ultra Rare
    blurb: "A clean, modern Pikachu V from the Lost Origin Trainer Gallery. Popular in slab collections thanks to its crisp art."
  - card_id: swsh12-234
    slug: lost-origin
    name: Pikachu VMAX
    number: "TG17"
    set_name: Lost Origin
    rarity: Trainer Gallery Ultra Rare
    blurb: "The Lost Origin Pikachu VMAX trainer-gallery print — a standout alt-art that collectors chase in PSA 10."
  - card_id: sm12-241
    slug: cosmic-eclipse
    name: Pikachu
    number: "241"
    set_name: Cosmic Eclipse
    rarity: Rare Secret
    blurb: "Cosmic Eclipse's secret rare Pikachu — a 'tag team' era chase that's aged into a quiet collector favourite."
  - card_id: sm9-184
    slug: team-up
    name: Pikachu & Zekrom-GX
    number: "184"
    set_name: Team Up
    rarity: Rare Secret
    blurb: "The Pikachu & Zekrom-GX rainbow rare from Team Up — one of the hyped pulls of the Sun & Moon era and still strong in graded slabs."
  - card_id: paf-131
    slug: paldean-fates
    name: Pikachu
    number: "131"
    set_name: Paldean Fates
    rarity: Shiny Rare
    blurb: "A shiny Pikachu from Paldean Fates — a set built almost entirely around shiny variants, which made every Pikachu slot a hot pull."
  - card_id: swsh9-157
    slug: brilliant-stars
    name: Pikachu V
    number: "157"
    set_name: Brilliant Stars
    rarity: Rare Ultra
    blurb: "Brilliant Stars' alt-art Pikachu V — consistently one of the chase prices of the Sword & Shield era and still climbing in PSA 10."
---

Pikachu has been printed on hundreds of Pok&eacute;mon cards since the [Base Set released in 1999](/sets/base/). Most are commons worth pocket change. A handful, though, have aged into serious collector cards &mdash; either because they were short-printed, came from a beloved set, or feature art that just won't die.

Here are the **rare Pikachu cards worth knowing about** if you're building a collection, chasing pulls, or trying to work out what that Pikachu you found in a binder is actually worth.

> **Tip:** got a Pikachu card already? [Scan it with TCG Companion](/pokemon-card-value-checker/) and see the current market price (raw + every tracked graded tier) in under a second.

<div class="pikachuList">
  {% for item in page.featured_pikachus %}
    {% assign cards = site.data.cards[item.slug] %}
    {% assign match = nil %}
    {% if cards %}
      {% for c in cards %}{% if c.cardId == item.card_id %}{% assign match = c %}{% break %}{% endif %}{% endfor %}
    {% endif %}
    {% assign kw = item.name | append: ' ' | append: item.number | append: ' ' | append: item.set_name | append: ' pokemon' | url_encode %}
    {% capture ebay_href %}https://www.ebay.com/sch/i.html?_nkw={{ kw }}&_dcat=183454&rt=nc&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339150559&mkevt=1&customid=blograrepikachucards{% endcapture %}

    <article class="pikachuCard">
      <div class="pikachuCardImage">
        {% if match.imageUrl %}
        <img src="{{ match.imageUrl }}" alt="{{ item.name }} #{{ item.number }} from {{ item.set_name }}" loading="lazy">
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

## So what's actually driving Pikachu prices?

Three things move Pikachu cards more than anything else:

1. **Nostalgia peaks.** Older Pikachus (Base, Jungle, first promos) ride long-term waves as collectors return to the hobby. They dip, they rip, but the long curve is up.
2. **Set hype cycles.** Modern Pikachus spike hard on set release (151, Paldean Fates, Vivid Voltage all did this) and settle over 6&ndash;12 months. If you opened on release, selling into the spike beats waiting.
3. **Graded premiums.** Pikachu is one of the most-graded Pokémon in the hobby, so PSA 10 populations are high and gem premiums are tighter than on niche Pokémon. Condition matters, but the PSA 10 delta is smaller than you'd expect.

## How to value the Pikachu in your binder

The card number at the bottom (e.g. `58/102` for Base Set, `173/165` for 151) tells you which print it is. From there:

- **Check the rarity symbol** &mdash; circle = common, diamond = uncommon, star = rare, and anything with extra holo / alt-art treatment is where the money is.
- **Look for first-edition markings** on older sets (Base through Neo). First editions are often 3&ndash;5&times; the unlimited print in comparable condition.
- **Check the back** &mdash; Japanese, European and promo variants sit at different price tiers than the English standard print.
- **Grade matters, but don't over-invest.** Sending a raw near-mint Pikachu to PSA only makes sense when the PSA 10 price clearly clears grading + shipping + risk.

The fastest way to check all of this is to [scan the card with TCG Companion](/pokemon-card-scanner/) and let the app tell you the exact print, variant and current market value.

## Related sets worth browsing

- [Base Set (1999)](/sets/base/) &mdash; the original Pikachu
- [Jungle (1999)](/sets/jungle/) &mdash; the second classic Pikachu
- [Evolutions](/sets/evolutions/) &mdash; modern reprints of iconic Pikachus
- [Vivid Voltage](/sets/vivid-voltage/) &mdash; home of Pikachu VMAX "Fat Chu"
- [Scarlet &amp; Violet 151](/sets/scarlet-and-violet-151/) &mdash; the Pikachu illustration rare
- [Celebrations](/sets/celebrations/) &mdash; Birthday Pikachu reprint
- [Paldean Fates](/sets/paldean-fates/) &mdash; shiny Pikachu
- [All Pok&eacute;mon TCG sets](/sets/)
