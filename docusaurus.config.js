/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

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
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "ja", "vi"],
        indexBlog: true,
        indexDocs: false,
        indexPages: true,
        blogRouteBasePath: '/'
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        sizes: [200]
      }
    ],
    'docusaurus-plugin-sass',
  ],
  themeConfig: {
    metadatas: [{name: 'twitter:card', content: "Doko's lair"}],
    prism: {
      theme: require('prism-react-renderer/themes/palenight'),
      additionalLanguages: ['dart', 'rust', 'toml'],
    },
    navbar: {
      title: "Doko's lair",
      logo: {
        alt: 'Chime logo',
        src: 'img/pc_header_lower_doraemon.png',
      },
      items: [
        {
          label: 'Guides',
          position: 'right', // or 'right'
          items: [
            {
              label: 'Video encoding guide (2021 edition)',
              href: '#',
            },
            {
              label: 'Fansubbing',
              to: '/docs',
            },
            // ... more items
          ],
        },
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
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Doko-Demo-Doa/doko-blog/tree/main/docs/',
        },
        blog: {
          path: './blog',
          routeBasePath: '/',
          blogTitle: "Doko's hub",
          blogDescription: 'My new blog with better access and readability.',
          showReadingTime: true,
          editUrl:
            'https://github.com/Doko-Demo-Doa/doko-blog/tree/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
