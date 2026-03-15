#!/usr/bin/env node

/**
 * 每日文章自动生成 - Cron 任务入口
 * 配合 OpenClaw cron 使用，每天自动生成一篇前端技术文章
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const LOG_FILE = join(process.cwd(), 'logs', 'daily-article.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  console.log(logLine.trim());
  
  // 写入日志文件
  try {
    writeFileSync(LOG_FILE, logLine, { flag: 'a' });
  } catch (e) {
    // 日志目录可能不存在，忽略
  }
}

function run() {
  log('🚀 开始生成每日文章...');
  
  try {
    // 执行文章生成脚本
    const output = execSync('node scripts/generate-daily-post.js', {
      cwd: process.cwd(),
      encoding: 'utf-8'
    });
    
    log('✅ 文章生成成功');
    log(output);
    
    // 提交到 git
    log('📦 提交变更到 git...');
    execSync('git add docs/posts/', { cwd: process.cwd() });
    execSync('git commit -m "docs: 添加每日文章 [auto-generated]"', { cwd: process.cwd() });
    log('✅ Git 提交成功');
    
    // 推送到远程
    log('📤 推送到远程仓库...');
    execSync('git push', { cwd: process.cwd() });
    log('✅ 推送成功');
    
    log('🎉 每日文章任务完成！');
    
  } catch (error) {
    log('❌ 任务失败');
    log(error.message);
    process.exit(1);
  }
}

run();
