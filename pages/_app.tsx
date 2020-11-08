import "../styles/globals.scss"
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const LOCALES = [
    { name: "English", key: "en" },
    { name: "Español", key: "es" },
];

// TODO: move this to _content, should not be in code
const DESC = {
    "en": "Software Engineer, passionate about the web, frontend technologies, and the open source ecosystem.",
    "es": "Ingeniero de Software, interesado en la web, las tecnologías frontend, y el ecosistema open source.",
};

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const description = DESC[router.locale];
    const title = "Andrés Villarreal";
    const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;
    const url = "https://andres.villarreal.co.cr" + localePath + router.asPath;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="og:title" content={title} />
                <meta name="viewport" content="width=device-width, user-scalable=yes" />
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta name="twitter:card" content="summary" />
                <meta property="og:image" content="/img/face.jpg" />
                <meta property="og:image:width" content="640" />
                <meta property="og:image:height" content="640" />
                <meta property="og:url" content={url} />
                <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
                <link rel="manifest" href="site.webmanifest" />
            </Head>
            <div id="page-container">
                {router.query.slug && (
                    <div id="language-switcher">
                        {LOCALES.map((locale) => (
                            <Link key={locale.key} href={`/${router.query.slug}`} locale={locale.key}>
                                <a className={locale.key === router.locale ? "current" : ""}>{locale.name}</a>
                            </Link>
                        ))}
                    </div>
                )}
                <div id="content">
                    <Component {...pageProps} />
                </div>
            </div>

            <footer>
                <div className="inner-footer">
                    <div>
                        <p>
                            &copy; andres.villarreal.co.cr {new Date().getFullYear()}
                        </p>
                        <ul className="footer-links">
                            <li><a href="http://twitter.com/KaeruCT">Twitter</a></li>
                            <li><a href="https://soundcloud.com/try_andy/tracks">SoundCloud</a></li>
                            <li><a href="https://tryandy.bandcamp.com/">Bandcamp</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
