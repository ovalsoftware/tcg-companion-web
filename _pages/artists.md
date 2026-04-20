---
layout: content
title: Pokémon TCG Artists
nav_label: Artists
permalink: /artists/
include_in_header: true
description: Every illustrator with 10+ Pokémon TCG cards gets their own page. Browse 253 artist pages, 500+ total artists, and see every card grouped by set.
---

<section class="artistsIndexHero">
  <h1>Pok&eacute;mon TCG artists</h1>
  <p>
    The Pok&eacute;mon TCG has been illustrated by over <strong>{{ site.data.artists.size }} artists</strong> across nearly 30 years. Artists with <strong>10+ cards</strong> have their own page with every illustration grouped by set, images, rarities and live eBay listings.
  </p>
  <p class="artistsIndexSub">
    Looking for a specific card's illustrator? <a href="{{ '/pokemon-card-scanner/' | relative_url }}">Scan it with TCG Companion</a> &mdash; the app pulls the artist name along with set, rarity and variant.
  </p>
</section>

{% assign with_pages = site.data.artists | where: 'hasPage', true %}
{% assign without_pages = site.data.artists | where_exp: 'a', 'a.hasPage != true' %}

<section class="artistsFeatured">
  <h2>Artists with their own page</h2>
  <p class="artistsFeaturedSub">{{ with_pages.size }} artists with 10 or more cards across English sets.</p>
  <div class="artistsGrid">
    {% for a in with_pages %}
      <a class="artistCard" href="{{ '/artists/' | append: a.slug | append: '/' | relative_url }}">
        <span class="artistCardName">{{ a.name }}</span>
        <span class="artistCardMeta">{{ a.totalCards }} cards &middot; {{ a.setCount }} set{% if a.setCount != 1 %}s{% endif %}</span>
      </a>
    {% endfor %}
  </div>
</section>

{% if without_pages.size > 0 %}
<section class="artistsOthers">
  <h2>Other contributing artists</h2>
  <p class="artistsOthersSub">{{ without_pages.size }} illustrators with fewer than 10 English cards in the database. Their work lives inside the set pages.</p>
  <div class="artistsOtherList">
    {% for a in without_pages %}
      <span class="artistOtherItem">{{ a.name }} <small>({{ a.totalCards }})</small></span>
    {% endfor %}
  </div>
</section>
{% endif %}
