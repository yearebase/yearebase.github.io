const htmlmin = require("html-minifier");

const Nunjucks = require("nunjucks");

const { lib: mdit, renderMD } = require("./config/mditSetup.js");

const pairedShortcodes = require("./config/pairedShortcodes.js");

const languages = {
  en: 'english',
  cs: 'česky'
};

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
  eleventyConfig.addNunjucksFilter("stripHTML", (value) => (value || "").replace(/<\/?\w+?(\s+?\w+?=".+?")?>/g, ""));

  eleventyConfig.addCollection("post", (collection) => collection.getAll()
    .filter(e => e.data.isPost)
    .sort((a, b) => b.data.date - a.data.date)
  );

  eleventyConfig.addFilter("getLang", (code) => languages[code]);
  eleventyConfig.addFilter("allLangs", () => Object.keys(languages));

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath)
      if (outputPath.endsWith(".html"))
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
      else if (outputPath.endsWith(".css"))
        return cssmin.minify(content).css;

    return content;
  });

  for (const tag in pairedShortcodes)
    eleventyConfig.addPairedShortcode(tag, pairedShortcodes[tag]);

  return {
    dir: { input: 'src', output: 'docs', _includes: '_includes', layouts: '_layouts' },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
