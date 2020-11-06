import "../styles/globals.scss"
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const LOCALES = [
  { name: "English", key: "en" },
  { name: "Español", key: "es" },
]

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Andrés Villarreal</title>
        <meta name="viewport" content="width=device-width, user-scalable=yes" />
        <meta property="description" content="Andrés Villarreal, Software Engineer" />
        <meta property="keywords" content="Software Engineer, Frontend Developer, Software Development, Open Source, Web Developer" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
        <link rel="manifest" href="site.webmanifest" />
      </Head>
      <div id="page-container">
        <div id="language-switcher">
          {LOCALES.map((locale) => (
            <Link key={locale.key} href={`/${router.query.slug}`} locale={locale.key}>
              <a className={locale.key === router.locale ? "current" : ""}>{locale.name}</a>
            </Link>
          ))}
        </div>
        <div id="content">
            <Component {...pageProps} />
            <div className="clear"></div>
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
