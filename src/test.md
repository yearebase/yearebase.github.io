---
layout: base
section: all
title: cum
stylesheets: [poetry]
---

{% poem %}
  {% stanza %}
    {% l %}
      {% for i in range(0, 50) -%} A {%- endfor %}
    {% endl %}
  {% endstanza %}
{% endpoem %}
