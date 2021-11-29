const Nunjucks = require("nunjucks");

const { lib: mdit, renderMD } = require("./config/mditSetup.js");

const pairedShortcodes = require("./config/pairedShortcodes.js");

module.exports = function (eleventyConfig) {
  const njkEnv = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes"),
    { autoescape: false }
  );

  eleventyConfig.setLibrary("njk", njkEnv);
  eleventyConfig.setLibrary("md", mdit);

  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("css/*.css");

  eleventyConfig.addNunjucksFilter("renderMD", renderMD);

  eleventyConfig.addCollection("post", (collection) => collection.getAll()
    .filter(e => ["article", "poem"].includes(e.data.layout))
    .sort((a, b) => b.data.date - a.data.date)
  );

  for (const tag in pairedShortcodes)
    eleventyConfig.addPairedShortcode(tag, pairedShortcodes[tag]);

  return {
    dir: { input: 'src', output: 'built', _includes: '_includes', layouts: '_layouts' },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
