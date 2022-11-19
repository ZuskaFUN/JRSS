const { pinyin, PINYIN_STYLE } = require('@napi-rs/pinyin');
const { slugify: _slugify } = require('@vuepress/shared-utils');

module.exports = {
    plugins: {
        '@vuepress/google-analytics': {
            ga: 'UA-48084758-10',
        },
        '@vuepress/pwa': {
            serviceWorker: true,
            updatePopup: {
                '/': {
                    message: '发现新内容可用',
                    buttonText: '刷新',
                },
                '/en/': {
                    message: 'New content is available',
                    buttonText: 'Refresh',
                },
            },
        },
        '@vuepress/back-to-top': true,
        sitemap: {
            hostname: 'https://jrssfeeder.herokuapp.com',
        },
        'vuepress-plugin-meilisearch': {
            hostUrl: 'https://meilisearch.rsshub.app',
            apiKey: '375c36cd9573a2c1d1e536214158c37120fdd0ba6cd8829f7a848e940cc22245',
            indexUid: 'rsshub',
            maxSuggestions: 14,
        },
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'JRSS',
            description: 'YAWA KA',
        },
        '/en/': {
            lang: 'en-US',
            title: 'JRSS',
            description: 'YAWA KA',
        },
    },
    markdown: {
        anchor: {
            level: 999, // Disable original Plugin
        },
        extendMarkdown: (md) => {
            md.use(require('../.format/md/hierarchySlug'), {
                slugify(s) {
                    return _slugify(
                        pinyin(s, {
                            style: PINYIN_STYLE.Plain,
                            heteronym: true,
                            segment: true,
                        })
                            .map((item) => item[0])
                            .join('-')
                    );
                },
                level: 2,
                permalink: true,
                permalinkBefore: true,
                permalinkSymbol: '#',
            });
        },
    },
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#fff' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
        ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff8549' }],
        ['script', { type: 'text/javascript', src: 'https://cdn.wwads.cn/js/makemoney.js' }],
    ],
    theme: 'vuepress-theme-rsshub',
    themeConfig: {
        repo: 'ZuskaFUN/JRSS',
        editLinks: true,
        docsDir: 'docs',
        smoothScroll: true,
        locales: {
            '/': {
                lang: 'zh-CN',
                selectText: 'Languages',
                label: '简体中文',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: require('./nav/zh'),
                sidebar: {
                    '/': [
                        {
                            title: '指南',
                            collapsable: true,
                            children: ['', 'usage', 'faq', 'parameter', 'api'],
                        },
                        {
                            title: '路由',
                            collapsable: false,
                            sidebarDepth: 1,
                            children: [
                                'social-media',
                                'new-media',
                                'traditional-media',
                                'bbs',
                                'blog',
                                'programming',
                                'design',
                                'live',
                                'multimedia',
                                'picture',
                                'anime',
                                'program-update',
                                'university',
                                'forecast',
                                'travel',
                                'shopping',
                                'game',
                                'reading',
                                'government',
                                'study',
                                'journal',
                                'finance',
                                'other',
                            ],
                        },
                    ],
                },
            },
            '/en/': {
                lang: 'en-US',
                selectText: '选择语言',
                label: 'English',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: require('./nav/en'),
                sidebar: {
                    '/en/': [
                        {
                            title: 'Guide',
                            collapsable: true,
                            children: ['', 'usage', 'faq', 'parameter', 'api'],
                        },
                        {
                            title: 'Routes',
                            collapsable: false,
                            sidebarDepth: 1,
                            children: [
                                'social-media',
                                'new-media',
                                'traditional-media',
                                'bbs',
                                'blog',
                                'programming',
                                'design',
                                'live',
                                'multimedia',
                                'picture',
                                'anime',
                                'program-update',
                                'university',
                                'forecast',
                                'travel',
                                'shopping',
                                'game',
                                'reading',
                                'government',
                                'study',
                                'journal',
                                'finance',
                                'other',
                            ],
                        },
                    ],
                },
            },
        },
    },
};
