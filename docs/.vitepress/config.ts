import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '前端学习笔记',
  description: '每天一篇高质量前端技术文章，覆盖 HTML、CSS、JavaScript、TypeScript 与现代工程化实践',
  lang: 'zh-CN',
  base: '/blog-fang/',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '归档', link: '/archive' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '开始阅读',
          items: [
            { text: '文章首页', link: '/posts/' },
            { text: '归档', link: '/archive' },
            { text: '标签', link: '/tags' }
          ]
        },
        {
          text: '基础与工程化',
          items: [
            { text: 'HTML 语义化与最佳实践', link: '/posts/html-standards' },
            { text: 'CSS 最佳实践与工程化', link: '/posts/css-best-practices' },
            { text: 'JavaScript 核心概念详解', link: '/posts/js-core' },
            { text: 'TypeScript 入门指南', link: '/posts/ts-intro' },
            { text: 'CI/CD 实践指南', link: '/posts/cicd-practice' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fangshipeng/blog-fang' }
    ],
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: [2, 3],
      label: '文章目录'
    },
    footer: {
      message: '用 VitePress 构建，持续记录前端学习。',
      copyright: 'Copyright © 2026 fangshipeng'
    }
  },
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  }
})
