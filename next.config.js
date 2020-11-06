module.exports = {
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en"
    },
    async redirects() {
        return [
            { source: "/", destination: "/cv", permanent: true }
        ];
    }
};
