/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: "Doko's blog",
  tagline: 'Wall of text',
  url: 'https://doko.aniviet.com',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Clip-sub', // Usually your GitHub org/user name.
  projectName: 'aniviet-hub', // Usually your repo name.
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        sizes: [200]
      }
    ],
    'docusaurus-plugin-sass',
  ],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/palenight'),
      additionalLanguages: ['dart', 'rust'],
    },
    navbar: {
      title: "Doko's hub",
      logo: {
        alt: 'Chime logo',
        src: 'img/pc_header_lower_doraemon.png',
      },
      items: [
        {
          href: '/portfolio',
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
        docs: false,
        blog: {
          path: './blog',
          routeBasePath: '/',
          blogTitle: "Doko's hub",
          blogDescription: 'My new blog with better access and readability.',
          showReadingTime: true,
          editUrl:
            'https://github.com/Doko-Demo-Doa/aniviet-hub/tree/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
