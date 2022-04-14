const math = require('remark-math');
const katex = require('rehype-katex');
const mermaid = require('remark-mermaid-dataurl');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "Doko's lair",
  tagline: 'Wall of text',
  url: 'https://doko.aniviet.com',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Clip-sub', // Usually your GitHub org/user name.
  projectName: 'doko-blog', // Usually your repo name.
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'ja', 'vi'],
        indexBlog: true,
        indexDocs: false,
        indexPages: true,
        blogRouteBasePath: '/',
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        sizes: [200],
      },
    ],
    'docusaurus-plugin-sass',
  ],
  themeConfig: {
    metadata: [{name: 'twitter:card', content: "Doko's lair"}],
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['dart', 'java', 'python', 'rust', 'objc', 'toml'],
    },
    navbar: {
      title: "Doko's lair",
      logo: {
        alt: 'Chime logo',
        src: 'img/pc_header_lower_doraemon.png',
      },
      items: [
        {
          href: 'https://akari.aniviet.com/reader/',
          label: 'Reader',
          position: 'right',
        },
        {
          to: '/portfolio',
          label: 'Portfolio',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Bài đăng theo ngôn ngữ',
          items: [
            {
              label: 'Tiếng Việt',
              to: '/tags/vietnamese',
            },
            {
              label: 'English',
              to: '/tags/english',
            },
            {
              label: '日本語',
              to: '/tags/japanese',
            },
          ],
        },
        {
          title: 'Liên hệ',
          items: [
            {
              label: 'Email',
              href: 'mailto:doraemonfanclub@gmail.com',
            },
            {
              label: 'Steam',
              href: 'https://steamcommunity.com/id/doko/',
            },
            {
              label: 'Github',
              href: 'https://github.com/Doko-Demo-Doa',
            },
          ],
        },
        {
          title: 'Chủ đề',
          items: [
            {
              label: 'Lập trình',
              href: '/tags/programming',
            },
            {
              label: 'Fansubs',
              href: '/tags/fansubs',
            },
            {
              label: 'Doraemon',
              href: '/tags/doraemon',
            },
            {
              label: 'Khác',
              href: '/tags/other',
            },
          ],
        },
      ],
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} Quan Pham. All rights reserved.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          path: './blog',
          routeBasePath: '/',
          blogTitle: "Doko's hub",
          blogDescription: 'My new blog with better access and readability.',
          showReadingTime: true,
          editUrl: undefined,
          remarkPlugins: [math, mermaid],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
