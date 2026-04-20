---
layout: content
title: TCG Companion Blog
nav_label: Blog
permalink: /blog/
include_in_header: true
description: Pricing guides, rare card lists and Pokémon TCG deep-dives from the team behind TCG Companion — the iOS app that scans and prices any Pokémon card.
---

<section class="blogIndexHero">
  <span class="heroKicker">TCG Companion Blog</span>
  <h1>Guides, rare card lists and pricing deep-dives</h1>
  <p>
    Straight-talking guides for Pok&eacute;mon collectors &mdash; the cards worth chasing, the pricing quirks worth knowing, and the sets worth your binder space.
  </p>
</section>

<section class="blogIndexList">
  {% for post in site.posts %}
  <a class="blogIndexCard" href="{{ post.url | relative_url }}">
    {% if post.hero_image %}
    <div class="blogIndexImage">
      <img src="{{ post.hero_image | relative_url }}" alt="{{ post.title }}" loading="lazy">
    </div>
    {% endif %}
    <div class="blogIndexBody">
      {% if post.category %}<span class="blogIndexCategory">{{ post.category }}</span>{% endif %}
      <h2>{{ post.title }}</h2>
      {% if post.lede %}<p class="blogIndexLede">{{ post.lede | strip_html | truncate: 180 }}</p>{% endif %}
      <p class="blogIndexMeta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%B %-d, %Y' }}</time>
        {% if post.reading_time %} &middot; {{ post.reading_time }} min read{% endif %}
      </p>
    </div>
  </a>
  {% endfor %}
</section>
