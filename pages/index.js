import Head from "next/head"
import { existsSync, readFileSync } from "fs"
import { useRouter } from "next/router"
import useSWR from "swr"
import ReactMarkdown from "react-markdown"
import React from "react"

const apiPath = "/api/blog/article"

const { error, debug } = console

/**
* Async handler for AJAX requests
* @param {sting} url to fetch
*/
const fetcher = async (url) => {
    debug(`Loading blog article at ${url}`)
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const Article = () => {
    const { query } = useRouter()
    const { data, error } = useSWR(
        () => query.slug && `${apiPath}/${query.slug}`,
        fetcher
    )

    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>

    return (
        <article>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ReactMarkdown source={data.content} />
        </article>
    )
}

const contentPath = "content/";
function formatPath() {

}

/**
* Loads the data to be used as props at build time
* @param {object} context NextJS Context object
*/
const getStaticProps = async ({ params }) => {
    const articlePath = formatPath(params.slug)
    debug(`loading ${articlePath}`)
    const content = readFileSync(articlePath, "utf-8")

    return {
        props: {
            content
        }
    }
}

/**
* Generates the list of article slugs and creates router paths for
* each article at build time
* https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
*/
const getStaticPaths = async () => {
    return {
        paths: getArticlesList().map((article) => {
            return {
                params: {
                    slug: article
                }
            }
        }),
        fallback: false // Unmatched slugs should 404
    }
}

/**
* Read the articles directory and return a list of slugs that exist
* @returns {array} list of slugs matching article markdown files
*/
const getArticlesList = () => {
    const articles = readdirSync(contentPath, { withFileTypes: true })
        .filter((f) => f.isFile()) // Only return files
        .filter((f) => f.name.indexOf(".md") === f.name.length - 3) // Only return files ending in ".md"

    if (articles.length <= 0) {
        return error(`No articles in content directory ${contentPath}`)
    }

    // trim the .md off the end of the filename to get the slug
    return articles.map((article) => article.name.split(".md")[0])
}

export { Article as default, getStaticProps, getStaticPaths };
