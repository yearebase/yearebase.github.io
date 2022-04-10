const translations = {
  "home": { tok: "lipu lawa" },
  "all": { cs: "vše", tok: "lipu ale" },
  "blog": { tok: "lipu tenpo" },
  "poem": { cs: "báseň", tok: "lipu lili musi" },
  "poems": { cs: "básně", tok: "lipu lili musi" },
  "updates": { cs: "updaty", tok: "lipu ante" },
  "dream": { cs: "sen", tok: "sitelen lawa pi tenpo pimeja" },
  "programming": { cs: "programování", tok: "sitelen pi ilo nanpa" },
  "all posts": { cs: "všechny posty", tok: "lipu ale" },
  "all updates": { cs: "všechny updaty", tok: "lipu ante ale" },
};

module.exports = {
  lcapitalize: (phrase, locale) => locale == "tok" ? phrase : phrase[0].toUpperCase() + phrase.slice(1).toLowerCase(),
  t: (phrase, locale) => (translations[phrase.toLowerCase()] ?? {})[locale] ?? phrase
};
