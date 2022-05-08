const { lib: mdit, renderMD } = require("./config/mditSetup.js");
const pairedShortcodes = require("./config/pairedShortcodes.js");
const localize = require("./config/localize.js");

const htmlmin = require("html-minifier");
const Nunjucks = require("nunjucks");
const YAML = require("yaml");

const languages = {
  en: 'english',
  cs: 'česky',
  tok: 'toki pona'
};

module.exports = function (eleventyConfig) {
  const njkEnv = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes"),
    { autoescape: false }
  );

  eleventyConfig.setLibrary("njk", njkEnv);
  eleventyConfig.setLibrary("md", mdit);

  eleventyConfig.addPassthroughCopy({ "res/img/favicon/*": "." });
  eleventyConfig.addPassthroughCopy("res");

  eleventyConfig.addNunjucksFilter("renderMD", renderMD);
  eleventyConfig.addNunjucksFilter("stripHTML", (value) => (value || "").replace(/<\/?\w+?(\s+?\w+?=".+?")?>/g, ""));
  eleventyConfig.addNunjucksFilter("toDate", (value) => new Date(value));
  eleventyConfig.addNunjucksFilter("jsSlice", (str, start, end) => str.slice(start, end));

  eleventyConfig.addCollection("post", (collection) => collection.getAll()
    .filter(e => e.data.isPost)
    .sort((a, b) => a.data.date - b.data.date)
  );

  eleventyConfig.addFilter("getLang", (code) => languages[code]);
  eleventyConfig.addFilter("allLangs", () => Object.keys(languages));

  for (const key in localize)
    eleventyConfig.addFilter(key, localize[key]);

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath)
      if (outputPath.endsWith(".html"))
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });

    return content;
  });

  eleventyConfig.addDataExtension("yaml", contents => YAML.parse(contents));

  for (const tag in pairedShortcodes)
    eleventyConfig.addPairedShortcode(tag, pairedShortcodes[tag]);

  return {
    dir: { input: 'src', output: 'built', data: '_data', _includes: '_includes', layouts: '_layouts' },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
