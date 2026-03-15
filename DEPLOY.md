# 部署指南

## 前置条件

- GitHub 账号
- Git 已安装并配置
- Node.js 20+

## 步骤一：推送到 GitHub

由于 Git 推送可能需要交互式认证，请手动执行以下命令：

```bash
cd /Users/fangshipeng/.openclaw/workspace/blog-fang

# 方式 A: 使用 HTTPS（推荐，配合 gh 认证）
git remote set-url origin https://github.com/fangshipeng/blog-fang.git
git push -u origin main

# 方式 B: 使用 SSH（需要先配置 SSH 密钥）
git remote set-url origin git@github.com:fangshipeng/blog-fang.git
git push -u origin main
```

### 如果推送失败

1. **检查 GitHub 认证**：
   ```bash
   gh auth status
   ```

2. **重新认证**：
   ```bash
   gh auth login
   ```

3. **配置 Git 凭证助手**：
   ```bash
   git config --global credential.helper '!gh auth git-credential'
   ```

4. **再次推送**：
   ```bash
   git push -u origin main
   ```

## 步骤二：配置 GitHub Pages

1. 访问 https://github.com/fangshipeng/blog-fang/settings/pages

2. **Build and deployment** 部分：
   - Source: 选择 "GitHub Actions"

3. GitHub Actions 会自动触发部署工作流

## 步骤三：验证部署

1. 访问 Actions 标签页，确认部署成功
2. 访问站点：https://fangshipeng.github.io/blog-fang/

## 日常维护

### 发布新文章

```bash
# 手动生成文章
node scripts/generate-daily-post.js

# 提交并推送
git add docs/posts/
git commit -m "docs: 添加新文章"
git push
```

### 自动文章生成

已配置 OpenClaw cron 任务，每天上午 9:00 (Asia/Shanghai) 自动生成文章。

查看 cron 状态：
```bash
# 在 OpenClaw 中查看 cron 任务
```

## 故障排查

### 构建失败

1. 检查 Node 版本是否为 20+
2. 检查 package.json 依赖是否完整
3. 查看 Actions 日志获取详细错误

### 页面 404

1. 确认 GitHub Pages 已启用
2. 确认 base 路径配置正确：`/blog-fang/`
3. 等待几分钟让 CDN 刷新

### 样式丢失

检查 `docs/.vitepress/dist` 是否正确生成，确认构建成功。
