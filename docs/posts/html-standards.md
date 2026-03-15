# HTML 语义化与最佳实践

## 什么是 HTML 语义化？

HTML 语义化是指使用恰当的 HTML 标签来表达内容的含义，而不仅仅是为了呈现效果。

## 为什么重要？

1. **可访问性**：屏幕阅读器能更好地理解页面结构
2. **SEO 优化**：搜索引擎能更准确地索引内容
3. **代码可维护性**：语义清晰的代码更易读、易维护
4. **设备兼容**：在不同设备上都能正确解析

## 常用语义标签

```html
<!-- 页面结构 -->
<header>页面头部</header>
<nav>导航区域</nav>
<main>主要内容</main>
<article>独立文章</article>
<section>内容区块</section>
<aside>侧边内容</aside>
<footer>页面底部</footer>

<!-- 内容标签 -->
<h1>-<h6> 标题层级
<p>段落</p>
<ul>/<ol> 列表
<blockquote>引用</blockquote>
<code>代码</code>
<pre>预格式化文本</pre>
```

## 最佳实践

### 1. 正确的标题层级

```html
<!-- ✅ 正确 -->
<h1>页面主标题</h1>
  <h2>章节标题</h2>
    <h3>小节标题</h3>

<!-- ❌ 错误：跳过层级 -->
<h1>主标题</h1>
<h3>直接跳到 h3</h3>
```

### 2. 使用适当的列表

```html
<!-- 无序列表 -->
<ul>
  <li>项目一</li>
  <li>项目二</li>
</ul>

<!-- 有序列表 -->
<ol>
  <li>第一步</li>
  <li>第二步</li>
</ol>

<!-- 描述列表 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言</dd>
</dl>
```

### 3. 图片的 alt 属性

```html
<!-- ✅ 提供描述性 alt -->
<img src="logo.png" alt="公司 Logo">

<!-- ❌ 避免无意义的 alt -->
<img src="logo.png" alt="图片">
<img src="logo.png" alt="">
```

### 4. 表单语义化

```html
<form>
  <label for="email">邮箱地址</label>
  <input type="email" id="email" name="email" required>
  
  <label for="message">留言内容</label>
  <textarea id="message" name="message"></textarea>
  
  <button type="submit">提交</button>
</form>
```

## ARIA 属性

当原生语义不足时，使用 ARIA 增强可访问性：

```html
<nav aria-label="主导航">
  <ul role="menubar">
    <li role="menuitem">首页</li>
    <li role="menuitem">关于</li>
  </ul>
</nav>
```

## 总结

- 优先使用原生语义标签
- 保持标题层级连贯
- 为媒体内容提供替代文本
- 必要时使用 ARIA 补充
- 定期用工具检查可访问性
