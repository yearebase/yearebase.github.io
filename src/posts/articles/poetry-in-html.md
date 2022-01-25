---
locale: en
layout: article

title: Marking Poems in HTML
tags: [programming, html]
date: 2021-05-07

stylesheets: [code, poetry]

permalink: /p/poetry-in-html/index.html
---

In an ideal world, writing a poem in HTML would look something like this:

```html
<poem>
  <stanza>
    <line>There was an old party of Lyme</line>
    <line>Who married three wives at one time.</line>
    <line>When asked:</line>
    <line indent>“Why the third?”</line>
    <line indent>He replied: “One’s absurd,</line>
    <line>And bigamy, sir, is a crime.”</line>
  </stanza>
</poem>
```

Unfortunately, we do not live in an ideal world, and so none of the above elements are part of any HTML standards. That is not to say you can’t use them, of course: if you really wanted to, you could simply use a stylesheet like this:

```css
poem, stanza, line { display: block }
poem { counter-reset: lineno }
stanza { margin-bottom: .9em }
line { counter-increment: lineno }

line::after {
  position: absolute;
  left: 25em;
  content: counter(lineno);
}

line[indent] { margin-left: 2.5em }
```

Really, [you could](https://jsfiddle.net/tadeassoucek/dwkvh9uo/)! The HTML5 mafia would not run you over. However as with many things, the fact that you can doesn’t necessarily mean that you should. The point of HTML is to describe the semantics of a web page, and that is rendered void by the use of non-standard elements. To communicate the semantics of the poem effectively, we ought to use already existing elements that are as close to the ones we need as possible.

My recommendations for marking up a poem in HTML go like this:

1. Use an `<article class="poem">`{.html} element to wrap the poem.

2. Use a `<p class="stanza">`{.html} element to wrap each stanza.

3. Wrap each line in `<span class="line">`{.html} followed by a `<br>`{.html} element. You can decide for yourself whether you want to add a `<br>`{.html} element even after the last line in a stanza.

4. If you need to use indented lines:
   1. Put an empty `<span class="line-indent"></span>`{.html} inside the `<span class="line">`{.html} for each level of indentation. Remember to put it before the content of the line.

   2. Please note that you need to set the indent up using CSS:
      ```css
      .line-indent { margin-right: 2.5em }
      ```

5. If you need to add [broken/dropped lines](https://en.wikipedia.org/wiki/Dropped_line):
   1. Use a `<br>`{.html} element to break the line in two. Now, you may notice that this doesn’t indent the rest of the line so it looks like a continuation. To achieve that, add the content of the first part of the line wrapped in a `<span class="phantom">`{.html} after the `<br>`{.html}.

   2. You have to hide the content of `<span class="phantom">`{.html} yourself:
      ```css
      .phantom { visibility: hidden }
      ```
      This way, the second part of the line will appear on the next as a continuation of the first part.

6. Information about the poem (title, author, publication date etc.) should go into the `<header>`{.html}/`<footer>`{.html} elements, as appropriate. Here, general rules apply: the title should be marked with a `<h1>`{.html}, the author with an `<address class="author">`{.html} or maybe a `<a rel="author">`{.html} — really, it’s up to you.

And that is about all! Here is the example from the beginning:

```html
<article class="poem">
  <p class="stanza">
    <span class="line">There was an old party of Lyme</span><br>
    <span class="line">Who married three wives at one time.</span><br>
    <span class="line">When asked:</span><br>
    <span class="line"><span class="line-indent"></span>“Why the third?”</span><br>
    <span class="line"><span class="line-indent"></span>He replied: “One’s absurd,</span><br>
    <span class="line">And bigamy, sir, is a crime.”</span>
  </p>
</article>
```

…and here’s one with information and broken lines:

```html
<article class="poem">
  <header>
    <h1 class="poem-title">The Other Side of the River</h1>
    <address class="author">By Charles Wright</address>
  </header>
  <p class="stanza">
    <span class="line">
      It’s linkage I’m talking about,<br>
      <span class="phantom">It’s linkage I’m talking about,</span> and harmonies and structures,
    </span><br>
    <span class="line">And all the various things that lock our wrists to the past.</span><br>
    <span class="line">
      Something infinite behind everything appears,<br>
      <span class="phantom">Something infinite behind everything appears,</span> and then disappears.
    </span><br>
  </p>
  <footer>
    <time class="poem-date" pubdate datetime="1984-01-12">January 12, 1984</time>
  </footer>
</article>
```

And here is how you may render such a poem in text ([JSFiddle](https://jsfiddle.net/tadeassoucek/qwzv62cs/)):

<article class="poem embedded">
  <header>
    <h1 class="poem-title">The Other Side of the River</h1>
    <address class="author">By Charles Wright</address>
  </header>
  <div class="content">
    <p class="stanza">
      <span class="line">
        It’s linkage I’m talking about,<br>
        <span class="phantom">It’s linkage I’m talking about,</span> and harmonies and structures,
      </span><br>
      <span class="line">And all the various things that lock our wrists to the past.</span><br>
      <span class="line">
        Something infinite behind everything appears,<br>
        <span class="phantom">Something infinite behind everything appears,</span> and then disappears.
      </span><br>
    </p>
  </div>
  <footer>
    <time class="poem-date" pubdate datetime="1984-01-12">January 12, 1984</time>
  </footer>
</article>

I can’t stress this enough: these are just suggestions. Semantics are one of those things where there are no right or wrong answers, just a bunch of “that makes sense” and “I mean, at least it works, I guess” answers. I hope my suggestions tend more toward the former side.
