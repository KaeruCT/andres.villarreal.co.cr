import { MouseEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ContentLink } from "../lib/content";

interface Props {
    links: ContentLink[];
    currentSlug: string;
}

function Navigation({ currentSlug, links }: Props) {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        function listener(this: MediaQueryList) {
            setMobile(this.matches);
        }
        const media = window.matchMedia && window.matchMedia("all and (max-width: 680px)");
        if (media) {
            media.addEventListener("change", listener);
        }
        return () => {
            if (media) {
                media.removeEventListener("change", listener);
            }
        }
    }, []);
    return (
        <section className="navigation">
            <h1>Andr&eacute;s Villarreal</h1>
            <img src="./img/face.jpg" className="face" alt="face" />

            <ul className="nav-links">
                {links.map((link) => (
                    <li key={link.slug}>
                        <Link href={`/${link.slug}`} scroll={!mobile}>
                            <a className={link.slug === currentSlug ? "current" : ""}>
                                {link.title}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Navigation;