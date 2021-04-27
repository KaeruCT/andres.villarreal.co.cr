module.exports = {
  poweredByHeader: false,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [{ source: "/", destination: "/cv" }];
  },
};
