import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLink } from "../lib/content";

interface Props {
    links: ContentLink[];
    currentSlug: string;
    children: JSX.Element;
}

function Navigation({ currentSlug, links, children }: Props) {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        function listener(this: MediaQueryList) {
            setMobile(this.matches);
        }
        const media = window.matchMedia && window.matchMedia("all and (max-width: 680px)");
        if (media) {
            media.addEventListener("change", listener);
            setMobile(media.matches);
        }
        return () => {
            if (media) {
                media.removeEventListener("change", listener);
            }
        }
    }, []);
    return (
        <section className="navigation">
            <div className="face">
                <h1>Andr&eacute;s Villarreal</h1>
                <img src="./img/face.jpg" className="face" alt="face" />
            </div>

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
            {children}
        </section>
    );
}

export default Navigation;