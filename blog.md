---
layout: default
title: Blog
description: Operational security, cybersecurity, and privacy articles.
permalink: /blog/
tree_view: true
---

<main>
  <section class="hero">
    <p class="eyebrow">Blog Index</p>
    <h1>Operational Security Journal</h1>
    <p class="hero-copy">
      Analysis, implementation notes, and practical walkthroughs focused on
      high-risk digital safety contexts.
    </p>
  </section>

  <section class="card-section">
    <h2>All Posts</h2>
    <p class="post-meta">
      Keyboard: Up/Down move, Right/+ expand, Left/- collapse, Enter opens, Esc closes modal.
    </p>
    <ul id="blog-tree" class="tree-post-list" role="tree" aria-label="Blog posts">
      {% for post in site.posts %}
      <li
        class="tree-post-item"
        role="treeitem"
        aria-level="1"
        aria-expanded="false"
        tabindex="{% if forloop.first %}0{% else %}-1{% endif %}"
        data-post-url="{{ post.url | relative_url }}"
        data-post-title="{{ post.title | escape }}"
      >
        <div class="tree-row">
          <button
            class="tree-toggle"
            type="button"
            aria-label="Toggle description for {{ post.title | escape }}"
            aria-expanded="false"
          >
            +
          </button>
          <button class="tree-open" type="button">
            {{ post.date | date: "%Y-%m-%d" }} {{ post.title }}
          </button>
        </div>
        <p class="post-meta">{{ post.categories | join: ", " }}</p>
        <p class="tree-description" hidden>
          {{ post.excerpt | strip_html | truncate: 210 }}
        </p>
      </li>
      {% endfor %}
    </ul>
  </section>
</main>

<div id="post-modal" class="post-modal" aria-hidden="true" hidden>
  <div class="post-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="post-modal-title">
    <div class="post-modal-header">
      <h2 id="post-modal-title">Loading...</h2>
      <button id="post-modal-close" class="button" type="button">Close</button>
    </div>
    <div id="post-modal-body" class="post-modal-body"></div>
  </div>
</div>
