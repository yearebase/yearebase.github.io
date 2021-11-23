const Nunjucks = require("nunjucks");

const { lib: mdit, renderMD } = require("./config/mditSetup.js");

module.exports = function (eleventyConfig) {
  const njkEnv = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes"),
    { autoescape: false }
  );

  eleventyConfig.setLibrary("njk", njkEnv);
  eleventyConfig.setLibrary("md", mdit);

  eleventyConfig.addPassthroughCopy("css/*.css");

  eleventyConfig.addNunjucksFilter("renderMD", renderMD);

  eleventyConfig.addCollection("post", (collection) => collection.getAll()
    .filter(e => e.data.layout == "post")
  );

  return {
    dir: { input: 'src', _includes: '_includes', layouts: '_layouts' },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
