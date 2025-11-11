// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "آموزش C# و Unity",
    tagline: "مرجع فارسی یادگیری برنامه‌نویسی سی‌شارپ و توسعه بازی با یونیتی",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://javad-sh.github.io",
    baseUrl: "/csharp_unity/", // حتماً با نام ریپو همخوان باشد
    organizationName: "javad-sh",
    projectName: "csharp_unity",
    deploymentBranch: "gh-pages",
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "fa",
        locales: ["fa"],
        localeConfigs: {
            fa: {
                label: "فارسی",
                direction: "rtl", // این مهم است برای زبان‌های راست به چپ
            },
        },
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: "./sidebars.js",
                    editUrl: "https://github.com/javad-sh/csharp_unity/tree/main/",
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    editUrl: "https://github.com/javad-sh/csharp_unity/tree/main/",
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    themes: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                language: ["en"],
                highlightSearchTermsOnTargetPage: true,
                explicitSearchResultPath: true,
                indexBlog: true,
                indexDocs: true,
                searchResultLimits: 8,
                searchResultContextMaxLength: 50,
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/docusaurus-social-card.jpg",
            // فعال‌سازی دکمه hide/show برای sidebar
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true,
                },
            },
            // تنظیمات Table of Contents
            tableOfContents: {
                minHeadingLevel: 2,
                maxHeadingLevel: 5,
            },
            navbar: {
                title: "آموزش C# و Unity",
                logo: {
                    alt: "لوگوی سایت آموزش C# و Unity",
                    src: "img/logo.svg",
                },
                items: [
                    {
                        type: "docSidebar",
                        sidebarId: "tutorialSidebar",
                        position: "left",
                        label: "مستندات",
                    },
                    { to: "/blog", label: "بلاگ", position: "left" },
                    {
                        href: "https://github.com/javad-sh/csharp_unity",
                        label: "گیت‌هاب",
                        position: "right",
                    },
                ],
            },
            // footer: {
            //     style: "dark",
            //     links: [
            //         {
            //             title: "Docs",
            //             items: [
            //                 {
            //                     label: "Tutorial",
            //                     to: "/docs/intro",
            //                 },
            //             ],
            //         },
            //         {
            //             title: "Community",
            //             items: [
            //                 {
            //                     label: "Stack Overflow",
            //                     href: "https://stackoverflow.com/questions/tagged/docusaurus",
            //                 },
            //                 {
            //                     label: "Discord",
            //                     href: "https://discordapp.com/invite/docusaurus",
            //                 },
            //                 {
            //                     label: "X",
            //                     href: "https://x.com/docusaurus",
            //                 },
            //             ],
            //         },
            //         {
            //             title: "More",
            //             items: [
            //                 {
            //                     label: "Blog",
            //                     to: "/blog",
            //                 },
            //                 {
            //                     label: "GitHub",
            //                     href: "https://github.com/facebook/docusaurus",
            //                 },
            //             ],
            //         },
            //     ],
            //     copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
            // },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.vsDark,
                additionalLanguages: ["csharp", "java", "bash"], // زبان‌های اضافی مورد نیاز
                defaultLanguage: "csharp", // تنظیم زبان پیش‌فرض
            },
        }),
};

export default config;
