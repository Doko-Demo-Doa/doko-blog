import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Doko's lair",
  tagline: "Wall of text",

  // Set the production url of your site here
  url: "https://doko.aniviet.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Clip-sub", // Usually your GitHub org/user name.
  projectName: "doko-blog", // Usually your repo name.

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "ja", "vi"],
        indexBlog: true,
        indexDocs: false,
        indexPages: true,
        blogRouteBasePath: "/",
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 0,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
    "docusaurus-plugin-sass",
  ],
  themeConfig: {
    metadata: [{ name: "twitter:card", content: "Doko's lair" }],

    navbar: {
      title: "Doko's lair",
      logo: {
        alt: "Chime logo",
        src: "img/pc_header_lower_doraemon.png",
      },
      items: [
        {
          href: "https://akari.aniviet.com/reader/",
          label: "Reader",
          position: "right",
        },
        {
          to: "/portfolio",
          label: "Portfolio",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Bài đăng theo ngôn ngữ",
          items: [
            {
              label: "Tiếng Việt",
              to: "/tags/vietnamese",
            },
            {
              label: "English",
              to: "/tags/english",
            },
            {
              label: "日本語",
              to: "/tags/japanese",
            },
          ],
        },
        {
          title: "Liên hệ",
          items: [
            {
              label: "Email",
              href: "mailto:doraemonfanclub@gmail.com",
            },
            {
              label: "Steam",
              href: "https://steamcommunity.com/id/doko/",
            },
            {
              label: "Github",
              href: "https://github.com/Doko-Demo-Doa",
            },
          ],
        },
        {
          title: "Chủ đề",
          items: [
            {
              label: "Lập trình",
              href: "/tags/programming",
            },
            {
              label: "Fansubs",
              href: "/tags/fansubs",
            },
            {
              label: "Doraemon",
              href: "/tags/doraemon",
            },
          ],
        },
      ],
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} Quan Pham. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          path: "./blog",
          routeBasePath: "/",
          blogTitle: "Doko's hub",
          blogDescription: "My new blog with better access and readability.",
          showReadingTime: true,
          editUrl: undefined,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

export default config;
