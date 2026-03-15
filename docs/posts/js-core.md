# JavaScript 核心概念详解

## 1. 作用域与闭包

### 作用域链

```javascript
let globalVar = 'global';

function outer() {
  let outerVar = 'outer';
  
  function inner() {
    let innerVar = 'inner';
    console.log(globalVar, outerVar, innerVar);
  }
  
  inner();
}
```

### 闭包实战

```javascript
// 计数器工厂
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
```

## 2. 原型与继承

### 原型链

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const person = new Person('Alice');
person.greet(); // "Hello, I'm Alice"
```

### ES6 Class

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Developer extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
  
  code() {
    return `${this.name} codes in ${this.language}`;
  }
}
```

## 3. 异步编程

### Promise 基础

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'success' });
    }, 1000);
  });
};

fetchData()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Async/Await

```javascript
async function getData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
```

### Promise.all 并发

```javascript
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
]);
```

## 4. 事件循环

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出顺序：1, 4, 3, 2
```

## 5. 模块化

### ES Modules

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { add, subtract } from './math.js';
```

## 6. 实用技巧

### 防抖与节流

```javascript
// 防抖 - 最后一次执行
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 节流 - 固定间隔执行
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### 深拷贝

```javascript
// 简单场景
const copy = JSON.parse(JSON.stringify(obj));

// 复杂场景（处理循环引用）
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);
  
  for (let key in obj) {
    clone[key] = deepClone(obj[key], hash);
  }
  
  return clone;
}
```
