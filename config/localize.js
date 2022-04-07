const translations = {
  "all": { cs: "vše" },
  "poems": { cs: "básně" },
  "updates": { cs: "změny" },
};

module.exports = (phrase, locale) => (translations[phrase] ?? {})[locale] ?? phrase;
