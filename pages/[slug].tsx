import Head from "next/head";
import ReactMarkdown from "react-markdown";
import React, { Fragment } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DEFAULT_CONTENT, getContentLinks, getContentPagesByLocale } from "../lib/content";
import Navigation from "../components/Navigation";

type ContentPageProps = InferGetStaticPropsType<typeof getStaticProps>;

function ContentPage({ page, info, links }: ContentPageProps): JSX.Element {
    return (
        <Fragment>
            <Head>
                <title>Andrés Villarreal | {page.title}</title>
            </Head>

            <Navigation
                links={links}
                currentSlug={page.slug} />

            <section className="info">
                <h1>{info.title}</h1>
                <ReactMarkdown source={info.content} allowDangerousHtml />
            </section>

            <section className={`featured-content ${page.slug}`}>
                <h2>{page.title}</h2>
                <ReactMarkdown source={page.content} allowDangerousHtml />
            </section>
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const pages = getContentPagesByLocale()[locale];
    const page = pages[slug];
    const info = pages[DEFAULT_CONTENT];
    const links = getContentLinks(locale);

    return { props: { page, info, links } };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const contentPages = getContentPagesByLocale();
    const locales = Object.keys(contentPages);
    const paths = [];
    locales.forEach((locale) => {
        const pages = contentPages[locale];
        Object.keys(pages).forEach((slug) => {
            paths.push({
                params: { slug },
                locale
            });
        });
    });
    return { paths, fallback: false };
}

export default ContentPage;