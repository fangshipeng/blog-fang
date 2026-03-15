# 前端学习笔记 📚

每天一篇高质量前端技术文章，涵盖 HTML、CSS、JavaScript、TypeScript 及工程化实践。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
blog-fang/
├── docs/
│   ├── .vitepress/     # VitePress 配置
│   │   └── config.ts
│   ├── posts/          # 博客文章
│   ├── index.md        # 首页
│   └── about.md        # 关于页面
├── scripts/            # 工具脚本
│   ├── generate-daily-post.js  # 文章生成
│   └── daily-article-cron.js   # Cron 入口
├── .github/workflows/  # GitHub Actions
└── package.json
```

## 📝 技术栈

- **VitePress** - 基于 Vite 的静态站点生成器
- **Vue 3** - 渐进式 JavaScript 框架
- **GitHub Pages** - 静态站点托管
- **GitHub Actions** - 自动化部署

## 🔧 每日文章生成

项目包含自动文章生成脚本，每天自动生成一篇前端技术文章。

### 手动生成

```bash
node scripts/generate-daily-post.js
```

### 定时任务

使用 OpenClaw cron 配置每日自动执行 `scripts/daily-article-cron.js`

## 🚢 部署到 GitHub Pages

### 1. 推送到 GitHub

```bash
# 如果使用 SSH
git remote add origin git@github.com:fangshipeng/blog-fang.git
git push -u origin main

# 或使用 HTTPS
git remote add origin https://github.com/fangshipeng/blog-fang.git
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 访问仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 等待 Actions 完成构建部署

### 3. 访问站点

部署完成后，站点将在以下地址可用：
```
https://fangshipeng.github.io/blog-fang/
```

## 📅 已包含文章

- HTML 语义化与最佳实践
- CSS 最佳实践与工程化
- JavaScript 核心概念详解
- TypeScript 入门指南
- CI/CD 实践指南

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
