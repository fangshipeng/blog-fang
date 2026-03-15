# TypeScript 入门指南

## 为什么使用 TypeScript？

1. **类型安全** - 编译时捕获错误
2. **智能提示** - 更好的 IDE 支持
3. **代码重构** - 安全的重命名和修改
4. **文档即代码** - 类型即文档

## 基础类型

```typescript
// 基本类型
let name: string = 'Alice';
let age: number = 25;
let isActive: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['A', 'B', 'C'];

// 元组
let tuple: [string, number] = ['hello', 42];

// 枚举
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;

// any 和 unknown
let anyValue: any = 'anything';
let unknownValue: unknown = 'something';

// void 和 never
function log(): void {
  console.log('hello');
}

function error(): never {
  throw new Error('error');
}
```

## 接口与类型别名

### 接口（Interface）

```typescript
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
  readonly createdAt: Date; // 只读属性
}

interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

### 类型别名（Type Alias）

```typescript
type ID = string | number;

type Point = {
  x: number;
  y: number;
};

type Result<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};
```

### 接口 vs 类型别名

- **接口**：支持声明合并，适合定义对象形状
- **类型别名**：更灵活，支持联合类型、映射类型

## 泛型（Generics）

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

identity<string>('hello');
identity<number>(42);

// 泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // ✅
logLength(42); // ❌
```

## 高级类型

### 联合类型与交叉类型

```typescript
// 联合类型
type Status = 'pending' | 'success' | 'error';

// 交叉类型
type A = { a: string };
type B = { b: number };
type C = A & B; // { a: string; b: number }
```

### 工具类型

```typescript
// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必填
type RequiredUser = Required<User>;

// Pick - 选取部分属性
type UserName = Pick<User, 'name'>;

// Omit - 排除部分属性
type UserNoId = Omit<User, 'id'>;

// Record - 键值对类型
type UserMap = Record<string, User>;

// ReturnType - 函数返回类型
type FnReturn = ReturnType<() => string>;

// Parameters - 函数参数类型
type FnParams = Parameters<(a: string, b: number) => void>;
```

### 条件类型

```typescript
type IsString<T> = T extends string ? true : false;

type Flatten<T> = T extends Array<infer U> ? U : T;
```

## 实战示例

### API 响应类型

```typescript
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### 类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function process(value: string | number) {
  if (isString(value)) {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

## 最佳实践

1. **避免 any** - 使用 unknown 或具体类型
2. **启用严格模式** - `"strict": true`
3. **类型推断优先** - 让 TS 自动推断
4. **接口用于公开 API** - 类型别名用于内部
5. **使用 as const** - 字面量类型推断

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```
