import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentLink } from "../lib/content";
import face from "../public/img/face.jpg";

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
        if (media && media.addEventListener) {
            media.addEventListener("change", listener);
            setMobile(media.matches);
        }
        return () => {
            if (media && media.removeEventListener) {
                media.removeEventListener("change", listener);
            }
        }
    }, []);
    return (
        <section className="navigation">
            <div className="face">
                <h1>Andr&eacute;s Villarreal</h1>
                <Image
                    width={640}
                    height={640}
                    priority
                    sizes="(max-width: 1040px) 250px, (max-width: 680px) 250px, (max-width: 400px) 400px, 140px"
                    src={face}
                    placeholder="blur"
                    className="face"
                    alt="face" />
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