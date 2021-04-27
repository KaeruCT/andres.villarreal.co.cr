module.exports = {
  poweredByHeader: false,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      /**
       * this is so ugly because vercel decided to randomly break
       * after I deployed new code (without changing this or the dependencies)
       */
      { source: "/", destination: "/en/cv", locale: false },
      { source: "/en", destination: "/en/cv", locale: false },
      { source: "/es", destination: "/es/cv", locale: false },
    ];
  },
};
