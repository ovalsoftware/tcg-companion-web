---
layout: content
title: All Pokémon Card Sets
nav_label: Sets
permalink: /sets/
include_in_header: true
description: Browse every English Pokémon TCG set with full card lists, release dates and set symbols. From Base Set (1999) through the latest Scarlet & Violet releases.
---

<section class="setsIndexHero">
    <h1>Every Pok&eacute;mon TCG set</h1>
    <p>
        Complete card lists for all {{ site.data.sets.size }} English Pok&eacute;mon sets &mdash; from Base Set (1999) through the newest Scarlet &amp; Violet releases.
        Click any set to see every card, rarity and artist, or check values live in the <a href="{{ site.appstore_link }}">TCG Companion app</a>.
    </p>
</section>

{% assign sets_by_series = site.data.sets | group_by: 'series' %}
{% assign series_order = "Mega Evolution,Scarlet & Violet,Sword & Shield,Sun & Moon,XY,Black & White,HeartGold & SoulSilver,Platinum,Diamond & Pearl,EX,E-Card,Neo,Gym,Base,POP,NP,Other" | split: "," %}

{% include vaultxAd.html %}

<section class="setsIndexContent">
{% for series_name in series_order %}
  {% for group in sets_by_series %}
    {% if group.name == series_name %}
    <div class="seriesBlock">
        <h2 class="seriesHeader">{{ group.name }}</h2>
        <div class="setList">
            {% assign sorted = group.items | sort: 'releaseDate' | reverse %}
            {% for s in sorted %}
            <a class="setCard" href="{{ '/sets/' | append: s.slug | append: '/' | relative_url }}">
                <div class="setCardLogoWrap">
                    {% if s.logoUrl %}
                    <img class="setCardLogo" src="{{ s.logoUrl }}" alt="{{ s.name }}" loading="lazy"
                         {% if s.symbolUrl %}onerror="this.onerror=null;this.src='{{ s.symbolUrl }}';this.classList.add('setCardLogoSymbol');"{% endif %}>
                    {% elsif s.symbolUrl %}
                    <img class="setCardLogo setCardLogoSymbol" src="{{ s.symbolUrl }}" alt="{{ s.name }}" loading="lazy">
                    {% endif %}
                </div>
                <div class="setCardBody">
                    <h3 class="setCardName">{{ s.name }}</h3>
                    <p class="setCardMeta">
                        {{ s.totalCards }} cards
                        {% if s.releaseDateFormatted %} &middot; {{ s.releaseDateFormatted }}{% endif %}
                    </p>
                </div>
            </a>
            {% endfor %}
        </div>
    </div>
    {% endif %}
  {% endfor %}
{% endfor %}
</section>
