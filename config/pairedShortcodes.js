module.exports = {
  "poem": (content) => `<article class="poem"><div class="content">${content}</div></article>`,
  "stanza": (content) => `<p class="stanza">${content}</p>`,
  "l": (content) => `<span class="line">${content}</span><br>`,
};
