#!/usr/bin/env node

/**
 * 每日文章生成脚本
 * 自动生成一篇关于前端学习的高质量文章，并维护索引/归档/标签页
 */

import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join, basename } from 'path';

const DOCS_DIR = join(process.cwd(), 'docs');
const POSTS_DIR = join(DOCS_DIR, 'posts');
const ARCHIVE_FILE = join(DOCS_DIR, 'archive.md');
const TAGS_FILE = join(DOCS_DIR, 'tags.md');
const POSTS_INDEX_FILE = join(POSTS_DIR, 'index.md');

const topics = {
  html: [
    {
      title: 'HTML5 新特性详解',
      tags: ['HTML', 'HTML5', '语义化'],
      summary: '梳理 HTML5 的语义化标签、表单能力、多媒体支持及实际落地场景。'
    },
    {
      title: 'Web Accessibility 无障碍访问指南',
      tags: ['HTML', 'A11Y', '可访问性'],
      summary: '从语义标签、焦点管理到 ARIA，理解如何构建更包容的 Web 页面。'
    },
    {
      title: 'SEO 优化：HTML 层面的实践',
      tags: ['HTML', 'SEO', '结构化数据'],
      summary: '从 title、meta 到语义结构，建立对搜索引擎更友好的内容组织方式。'
    }
  ],
  css: [
    {
      title: 'CSS Grid 高级布局技巧',
      tags: ['CSS', 'Grid', '响应式'],
      summary: '用 Grid 解决复杂二维布局问题，提升页面结构的表达能力。'
    },
    {
      title: 'CSS 动画与性能优化',
      tags: ['CSS', 'Animation', '性能'],
      summary: '理解动画属性、合成层和重排重绘，写出流畅且节制的动效。'
    },
    {
      title: 'CSS 容器查询 Container Queries',
      tags: ['CSS', 'Container Queries', '新特性'],
      summary: '让组件根据容器而非视口自适应，真正实现组件级响应式设计。'
    }
  ],
  javascript: [
    {
      title: 'JavaScript 事件循环深度解析',
      tags: ['JavaScript', 'Event Loop', '异步'],
      summary: '从调用栈、任务队列到微任务，彻底搞懂 JS 的执行顺序。'
    },
    {
      title: 'Proxy 与 Reflect 元编程',
      tags: ['JavaScript', 'Proxy', 'Reflect'],
      summary: '理解拦截器模型与对象操作抽象，掌握元编程的基本能力。'
    },
    {
      title: 'Web Workers 多线程实践',
      tags: ['JavaScript', 'Web Workers', '性能'],
      summary: '把重计算任务移出主线程，改善复杂页面的交互体验。'
    }
  ],
  typescript: [
    {
      title: 'TypeScript 5.x 新特性',
      tags: ['TypeScript', 'TS', '新特性'],
      summary: '聚焦 TS 5.x 的可用改进，提升大型前端项目的类型表达力。'
    },
    {
      title: '高级类型体操实战',
      tags: ['TypeScript', '泛型', '条件类型'],
      summary: '从 infer、映射类型到条件类型，建立更扎实的类型系统思维。'
    },
    {
      title: 'TS 项目配置最佳实践',
      tags: ['TypeScript', 'tsconfig', '工程化'],
      summary: '用合理的编译配置、路径映射和严格模式构建稳定项目基础。'
    }
  ],
  engineering: [
    {
      title: 'Vite 构建原理与优化',
      tags: ['工程化', 'Vite', '构建工具'],
      summary: '理解开发阶段与构建阶段的差异，掌握现代前端构建提速思路。'
    },
    {
      title: 'Monorepo 架构实践',
      tags: ['工程化', 'Monorepo', 'pnpm'],
      summary: '从包管理、共享配置到任务编排，理解 Monorepo 的收益与代价。'
    },
    {
      title: '前端代码规范体系',
      tags: ['工程化', 'ESLint', 'Prettier'],
      summary: '把代码风格、质量检查与团队协作流程串成一套可执行规范。'
    }
  ],
  frontier: [
    {
      title: 'React Server Components 解析',
      tags: ['前沿技术', 'React', 'Server Components'],
      summary: '理解组件运行边界变化，对现代全栈前端架构建立整体视角。'
    },
    {
      title: 'Vue 3 组合式 API 深度实践',
      tags: ['前沿技术', 'Vue', 'Composition API'],
      summary: '结合可复用逻辑组织方式，构建更可维护的 Vue 3 应用。'
    },
    {
      title: 'AI 与前端协作的未来',
      tags: ['前沿技术', 'AI', 'Frontend'],
      summary: '从代码生成、设计辅助到智能交互，观察 AI 对前端的真实影响。'
    }
  ]
};

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function getRandomTopic() {
  const category = sample(Object.keys(topics));
  const topic = sample(topics[category]);
  return { category, ...topic };
}

function buildSections(topic) {
  return {
    intro: `在现代前端开发中，「${topic.title}」不是孤立知识点，而是与页面性能、代码组织、团队协作紧密相关的一环。掌握它，不只是为了“会用”，更是为了在真实项目中做出更稳妥的技术判断。`,
    concepts: `## 核心概念\n\n### 1. 为什么它重要\n${topic.summary}\n\n### 2. 它解决了什么问题\n技术的价值通常来自于对复杂度的重新分配：要么减少运行时成本，要么降低协作成本，要么提高代码可维护性。理解这一点，比死记 API 更重要。\n\n### 3. 实践时要关注什么\n当你把一个知识点真正用于项目时，需要同时考虑：性能、可读性、可测试性、团队共识以及未来扩展。`,
    example: `## 实战示例\n\n\0ts\n// 下面是一个示意性例子，正文重点在于设计思路，而非 API 背诵\nfunction createLearningNote(topic: string) {\n  return {\n    topic,\n    keyPoint: '理解原理后再追求工程化落地',\n    practice() {\n      console.log('将知识迁移到真实项目中');\n    }\n  }\n}\n\nconst note = createLearningNote('${topic.title}');\nnote.practice();\n\0\n\n这个示例虽然简单，但表达了一个重要观点：学习前端技术，不应停留在“能跑”，而要进一步关注“为什么这样设计”。`,
    practices: `## 最佳实践\n\n1. **从规范出发**：先理解标准和设计动机，再决定工程上的折中。\n2. **优先可维护性**：团队长期协作中，可读性通常比短期技巧更重要。\n3. **关注性能边界**：知道什么成本发生在构建时，什么成本发生在运行时。\n4. **建立验证机制**：通过 lint、测试、CI 或基准分析验证方案，而不是只凭感觉。\n5. **沉淀可复用经验**：把一次性结论写成规范、模板或脚本，降低重复劳动。`,
    summary: `## 总结\n\n${topic.title} 的学习价值在于：它既能补齐知识盲区，也能帮助你在真实项目里形成更成熟的工程判断。建议你在阅读后，找一个当前项目的小场景，立即做一次最小实践，把概念转化成可复用经验。`
  };
}

function generatePost(topic) {
  const date = today();
  const slug = slugify(topic.title);
  const fileName = `${date}-${slug}.md`;
  const permalink = `/posts/${basename(fileName, '.md')}`;
  const s = buildSections(topic);

  const content = `---\ntitle: ${topic.title}\ndate: ${date}\ntags: [${topic.tags.map(tag => `'${tag}'`).join(', ')}]\nauthor: fangshipeng\nsummary: ${topic.summary}\n---\n\n# ${topic.title}\n\n> 每天记录一篇前端学习文章，持续建立系统化知识网络。\n\n## 引言\n\n${s.intro}\n\n${s.concepts}\n\n${s.example}\n\n${s.practices}\n\n${s.summary}\n\n## 延伸阅读\n\n- [MDN Web Docs](https://developer.mozilla.org/)\n- [VitePress 官方文档](https://vitepress.dev/)\n- [TypeScript Handbook](https://www.typescriptlang.org/docs/)\n`;

  return { fileName, permalink, content, topic, date };
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const raw = match[1];
  const title = raw.match(/^title:\s*(.*)$/m)?.[1]?.trim();
  const date = raw.match(/^date:\s*(.*)$/m)?.[1]?.trim();
  const summary = raw.match(/^summary:\s*(.*)$/m)?.[1]?.trim() || '';
  const tagsRaw = raw.match(/^tags:\s*\[(.*)\]$/m)?.[1]?.trim() || '';
  const tags = tagsRaw
    ? tagsRaw.split(',').map(x => x.trim().replace(/^'/, '').replace(/'$/, ''))
    : [];
  return { title, date, summary, tags };
}

function collectPosts() {
  ensureDir(POSTS_DIR);
  const files = readdirSync(POSTS_DIR)
    .filter(name => name.endsWith('.md') && name !== 'index.md')
    .sort()
    .reverse();

  return files
    .map(file => {
      const full = join(POSTS_DIR, file);
      const parsed = parseFrontmatter(readFileSync(full, 'utf-8'));
      if (!parsed?.title) return null;
      return {
        file,
        slug: basename(file, '.md'),
        link: `/posts/${basename(file, '.md')}`,
        ...parsed
      };
    })
    .filter(Boolean);
}

function updatePostsIndex(posts) {
  const lines = [
    '# 文章列表',
    '',
    '这里收录站点的全部文章，会随着新文章生成自动更新。',
    '',
    '## 最新文章',
    ''
  ];

  for (const post of posts) {
    lines.push(`- [${post.title}](${post.link})`);
    if (post.summary) lines.push(`  - ${post.summary}`);
  }

  lines.push('', '> 说明：自动生成脚本会同步更新此页、归档页和标签页。', '');
  writeFileSync(POSTS_INDEX_FILE, lines.join('\n'), 'utf-8');
}

function updateArchive(posts) {
  const groups = new Map();
  for (const post of posts) {
    const [year, month] = post.date.split('-');
    const ym = `${year}-${month}`;
    if (!groups.has(ym)) groups.set(ym, []);
    groups.get(ym).push(post);
  }

  const lines = ['# 归档', '', '按时间查看所有文章。', ''];
  let currentYear = null;
  for (const [ym, list] of groups.entries()) {
    const [year, month] = ym.split('-');
    if (year !== currentYear) {
      lines.push(`## ${year}`, '');
      currentYear = year;
    }
    lines.push(`### ${month} 月`, '');
    for (const post of list) {
      lines.push(`- ${post.date} · [${post.title}](${post.link})`);
    }
    lines.push('');
  }

  writeFileSync(ARCHIVE_FILE, lines.join('\n'), 'utf-8');
}

function updateTags(posts) {
  const tagMap = new Map();
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, []);
      tagMap.get(tag).push(post);
    }
  }

  const lines = ['# 标签', '', '按主题快速定位内容。', ''];
  for (const tag of Array.from(tagMap.keys()).sort((a, b) => a.localeCompare(b, 'zh-CN'))) {
    lines.push(`## ${tag}`);
    for (const post of tagMap.get(tag)) {
      lines.push(`- [${post.title}](${post.link})`);
    }
    lines.push('');
  }

  writeFileSync(TAGS_FILE, lines.join('\n'), 'utf-8');
}

function main() {
  ensureDir(POSTS_DIR);
  const topic = getRandomTopic();
  const post = generatePost(topic);
  const filePath = join(POSTS_DIR, post.fileName);

  if (!existsSync(filePath)) {
    writeFileSync(filePath, post.content, 'utf-8');
  }

  const posts = collectPosts();
  updatePostsIndex(posts);
  updateArchive(posts);
  updateTags(posts);

  console.log(`✅ 文章已生成：${post.fileName}`);
  console.log(`📝 标题：${post.topic.title}`);
  console.log(`🏷️ 标签：${post.topic.tags.join(', ')}`);
  console.log(`🔗 链接：${post.permalink}`);
}

main();
