# CI/CD 实践指南

## 什么是 CI/CD？

- **CI (Continuous Integration)** - 持续集成：频繁合并代码，自动构建测试
- **CD (Continuous Delivery/Deployment)** - 持续交付/部署：自动发布到生产环境

## GitHub Actions 基础

### 工作流文件结构

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: npm run deploy
```

### 触发条件

```yaml
on:
  # 推送触发
  push:
    branches: [main, develop]
    tags: ['v*']
  
  # PR 触发
  pull_request:
    branches: [main]
  
  # 定时触发
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 0 点
  
  # 手动触发
  workflow_dispatch:
    inputs:
      environment:
        description: '部署环境'
        required: true
        default: 'production'
```

## VitePress 部署配置

### package.json 脚本

```json
{
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  }
}
```

### GitHub Pages 部署

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 最佳实践

### 1. 缓存依赖

```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 2. 环境变量管理

```yaml
env:
  NODE_ENV: production
  API_URL: ${{ secrets.API_URL }}

steps:
  - name: Use secret
    run: echo "Deploying with $API_URL"
```

### 3. 并发控制

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 4. 多环境部署

```yaml
jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    environment: staging
    
  deploy-production:
    if: github.ref == 'refs/heads/main'
    environment: production
```

## 质量检查流程

```yaml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        
      - name: Install
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type Check
        run: npm run type-check
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
```

## 通知与监控

### Slack 通知

```yaml
- name: Slack Notify
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Deployed ${{ github.sha }} to production"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 部署状态检查

```yaml
- name: Health Check
  run: |
    for i in {1..5}; do
      status=$(curl -s -o /dev/null -w "%{http_code}" https://your-site.com)
      if [ "$status" = "200" ]; then
        echo "Deploy successful!"
        exit 0
      fi
      sleep 10
    done
    exit 1
```

## 常见问题

1. **构建失败** - 检查 Node 版本、依赖锁定
2. **权限错误** - 配置正确的 permissions
3. **缓存失效** - 清理缓存或更新 cache key
4. **超时** - 增加 timeout-minutes
