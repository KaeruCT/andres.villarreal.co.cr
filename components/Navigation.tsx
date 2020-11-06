import { MouseEvent } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ContentLink } from "../lib/content";

interface Props {
    links: ContentLink[];
    currentSlug: string;
    title: string;
    content: string;
}

function Navigation({ currentSlug, title, content, links }: Props) {
    function handleNav() {
        const section = document?.querySelector(".featured-content");
        try {
            if (section) {
                section.classList.add("fade", "fade-in");
                section.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    section.classList.remove("fade");
                }, 500);
            }
        } catch {
            // ignore error
        }
    }
    return (
        <section className="main">
            <h1>Andr&eacute;s Villarreal</h1>

            <img src="./img/face.jpg" className="face" alt="face" />

            <div className="info">
                <h2>{title}</h2>
                <ReactMarkdown source={content} allowDangerousHtml />
                <ul className="nav-links">
                    {links.map((link) => (
                        <li key={link.slug} onClick={handleNav}>
                            <Link href={`/${link.slug}`} scroll={false}>
                                <a className={link.slug === currentSlug ? "current" : ""}>
                                    {link.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Navigation;