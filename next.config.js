module.exports = {
  poweredByHeader: false,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      { source: "/", destination: "/en/cv", locale: false },
      { source: "/es", destination: "/es/cv", locale: false },
    ];
  },
};
