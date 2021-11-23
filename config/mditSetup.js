const mdit = require("markdown-it")({ html: true });

mdit.use(require("markdown-it-highlightjs"), {
  auto: false,
  inline: true
});

module.exports = {
  lib: mdit,
  renderMD: (value) => mdit.renderInline(value || '')
};
