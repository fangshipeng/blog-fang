# CSS 最佳实践与工程化

## 现代 CSS 开发原则

### 1. 使用 CSS 变量

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing-unit: 8px;
  --font-base: 16px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-size: var(--font-base);
}
```

**优势**：
- 主题切换更容易
- 维护成本更低
- 支持动态修改

### 2. 采用 BEM 命名规范

```css
/* Block */
.card {}

/* Element */
.card__header {}
.card__body {}
.card__footer {}

/* Modifier */
.card--featured {}
.card__button--primary {}
```

### 3. 使用现代布局方案

#### Flexbox - 一维布局

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

#### Grid - 二维布局

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

### 4. 响应式设计

```css
/* 移动优先 */
.container {
  padding: 1rem;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
}
```

### 5. 性能优化

#### 避免选择器过深

```css
/* ❌ 不推荐 */
div.wrapper ul.list li.item a.link {}

/* ✅ 推荐 */
.list-item-link {}
```

#### 使用 will-change 谨慎

```css
.animated {
  will-change: transform;
}
```

#### 压缩与分割

- 生产环境压缩 CSS
- 按需加载关键 CSS
- 使用 CSS-in-JS 或 CSS Modules

### 6. 实用工具类

```css
/* 间距工具 */
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 1rem; }

/* 显示工具 */
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }

/* 文本工具 */
.text-center { text-align: center; }
.text-bold { font-weight: 700; }
```

## CSS 架构建议

1. **分层组织**：基础层 → 组件层 → 应用层
2. **统一命名**：团队约定命名规范
3. **文档化**：使用 Styleguidist 等工具
4. **自动化检查**：Stylelint 保证代码质量

## 推荐工具

- **Stylelint** - CSS 代码检查
- **PostCSS** - CSS 预处理
- **PurgeCSS** - 移除未使用样式
- **CSS Modules** - 作用域隔离
