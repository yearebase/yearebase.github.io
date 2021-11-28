const mdit = require("markdown-it")({ html: true });

mdit.use(require("markdown-it-highlightjs"), {
  auto: false,
  inline: true
});

mdit.use(require("markdown-it-container"), "note", {
  render: (tokens, index) => tokens[index].nesting === 1 ? '<aside class="note">' : "</aside>",
});

module.exports = {
  lib: mdit,
  renderMD: (value) => mdit.renderInline(value || '')
};
