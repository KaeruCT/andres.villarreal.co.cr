import { join } from "path";
import { readFileSync, readdirSync } from "fs";

export const DEFAULT_CONTENT = "info";

export interface ContentPage {
    order: number;
    slug: string;
    title: string;
    content: string;
}

export interface ContentPages {
    [slug: string]: ContentPage;
}

export interface ContentLink {
    slug: string;
    title: string;
}

const CONTENT_PATH = join(process.cwd(), "_content");

let cachedResult: Record<string, ContentPages>;
export function getContentPagesByLocale(): Record<string, ContentPages> {
    if (cachedResult) {
        return cachedResult;
    }
    const result: Record<string, ContentPages> = {};

    const directories = readdirSync(CONTENT_PATH, { withFileTypes: true })
        .filter((f) => f.isDirectory());

    directories.forEach((directory) => {
        const directoryPath = join(CONTENT_PATH, directory.name);
        const markdownFiles = readdirSync(directoryPath, { withFileTypes: true })
            .filter((f) => f.isFile()) // Only return files
            .filter((f) => f.name.endsWith(".md"));

        result[directory.name] = {};
        markdownFiles.forEach((file) => {
            const name = file.name.split(".md")[0];
            const fileContents = readFileSync(join(directoryPath, file.name), "utf-8");

            const index = fileContents.indexOf("\n");
            const [title, content] = [fileContents.slice(0, index), fileContents.slice(index + 1)];
            const [order, slug] = name.split(".");

            result[directory.name][slug] = {
                order: parseInt(order),
                slug,
                title,
                content,
            };
        });
    });
    
    cachedResult = result;
    return result;
}

export function getContentLinks(locale: string): ContentLink[] {
    const pages = getContentPagesByLocale()[locale];
    return Object
        .keys(pages)
        .filter((slug) => slug !== DEFAULT_CONTENT)
        .sort((a, b) => pages[a].order - pages[b].order)
        .map((slug) => {
            const page = pages[slug];
            return {
                slug: slug,
                title: page.title
            };
        });
}