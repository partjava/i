# PartJava 前端迁移设计文档
## 从 NextAuth 迁移到 Java JWT 认证

> **编写时间**：2026-06-29  
> **当前状态**：执行中（约完成 65%）  
> **目的**：前端完全对接 Spring Boot Java 后端，废弃所有 Next.js 后端逻辑

---

## 一、架构说明

### 迁移前（旧架构）
```
浏览器
  └─> NextAuth SessionProvider (Cookie: next-auth.session-token)
        └─> Next.js API Routes (/app/api/)  ← 直连 MySQL
```

### 迁移后（新架构）
```
浏览器
  └─> JWT Token (localStorage: jwt_token)
        └─> FetchInterceptor (自动注入 Authorization: Bearer <token>)
              └─> Next.js 代理 /api/* → Java Spring Boot :8080
```

### Java 后端配置
- **端口**：`8080`
- **context-path**：`/api`（实际 URL 是 `http://localhost:8080/api/auth/login`）
- **前端代理**：`next.config.js` 把 `/api/*` → `http://localhost:8080/api/*`（已正确配置，无需改动）
- **认证方式**：`Authorization: Bearer <JWT Token>`
- **JWT 签发**：Java `AuthController POST /api/auth/login`

### Java 登录接口返回格式
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJ...",
    "expiresIn": 2592000,
    "id": 1,
    "username": "liming",
    "role": "USER"
  }
}
```

---

## 二、新建文件（已完成 ✅）

### `app/lib/auth-client.ts` ✅
JWT 核心工具库，不依赖 React，可在任何地方调用。

主要导出：
- `login(emailOrUsername, password)` → 调用 Java 登录，保存 token 到 localStorage
- `logout()` → 清除 localStorage，触发 auth-change 事件
- `getToken()` → 读取 localStorage 的 jwt_token
- `getStoredUser()` → 读取缓存的用户信息 (jwt_user)
- `updateStoredUser(updates)` → 更新缓存的用户信息
- `getAuthHeaders()` → 返回 { Authorization: 'Bearer xxx' }
- `isAuthenticated()` → 是否已登录

Token 存储 key：
- `jwt_token` (token 字符串)
- `jwt_user` (JSON 用户信息)
- CustomEvent `auth-change` 通知 useAuth 更新状态

### `app/hooks/useAuth.ts` ✅
替代 useSession() 的核心 Hook，接口与 NextAuth 完全兼容。

用法：
```ts
// 旧写法（从 next-auth/react 导入）
const { data: session, status } = useSession();

// 新写法（只改 import，其他不变）
import { useAuth } from '@/app/hooks/useAuth';
const { data: session, status } = useAuth();
```

session 对象形状（与 NextAuth 兼容）：
```
session.user.id          // string
session.user.name        // string
session.user.email       // string
session.user.image       // string | null
session.user.username    // string (扩展字段)
session.user.role        // string (扩展字段)
session.user.vip         // boolean (扩展字段)
session.user.vipLevel    // number (扩展字段)
```

额外暴露（相比 NextAuth 多出的）：
```ts
const { signIn, signOut, update } = useAuth();
signIn(email, password)  // Promise<{ success, error? }>
signOut({ redirect })    // 清除 token，可选跳转
update(updates?)         // 刷新 session 状态
```

文件还导出了 `useSession` 别名，兼容未改 import 的文件：
```ts
export const useSession = useAuth;
```

### `app/components/FetchInterceptor.tsx` ✅
全局 fetch 拦截器，monkey-patch `window.fetch`，对所有 /api/ 请求自动注入 Bearer Token。

特性：
- 无需修改任何已有的 fetch('/api/...') 调用
- 自动处理 401 → logout() → 跳转 /login?expired=true
- 排除 /auth/login 和 /auth/register 接口（这两个接口不注入 token）
- 挂载在 RootLayoutClient.tsx 里，全局生效

---

## 三、已修改文件（已完成 ✅）

| 文件 | 改动 |
|------|------|
| `app/providers/SessionProvider.tsx` | 改为空壳组件，移除 NextAuth SessionProvider |
| `app/providers/UserProvider.tsx` | useSession → useAuth，移除 updateSession |
| `app/components/RootLayoutClient.tsx` | 添加 `<FetchInterceptor />` |
| `app/login/page.tsx` | signIn 改为调用 useAuth，成功判断 result.ok→result.success |
| `app/components/Navbar.tsx` | useSession/signOut → useAuth，删除轮询 session 逻辑 |
| `app/profile/page.tsx` | useSession/signOut → useAuth（有 TS 错误待修复，见下） |
| `app/bookmarks/page.tsx` | useSession → useAuth |
| `app/notes/page.tsx` | useSession → useAuth |
| `app/notes/[id]/page.tsx` | useSession → useAuth |
| `app/notes/[id]/edit/page.tsx` | useSession → useAuth |
| `app/code/page.tsx` | useSession → useAuth |
| `app/ai-assistant/page.tsx` | useSession → useAuth |
| `app/hooks/useStudyTimer.ts` | useSession → useAuth |
| `app/components/PersistentLearningTracker.tsx` | useSession → useAuth |
| `app/components/CommentSection.tsx` | useSession → useAuth |
| `app/components/BottomNavigation.tsx` | useSession → useAuth |
| `app/components/LearningTracker.tsx` | useSession → useAuth |
| `app/components/SettingModal.tsx` | useSession → useAuth |
| `app/components/RealTimeLearningTracker.tsx` | useSession → useAuth |
| `app/components/SimpleLearningTracker.tsx` | useSession → useAuth |
| `app/components/GlobalSearch.tsx` | useSession → useAuth |
| `app/components/VipModal.tsx` | useSession → useAuth |
| `app/challenges/components/QuizWorkspace.tsx` | useSession → useAuth |

---

## 四、待完成任务 ❌

### 4.1 修复 profile/page.tsx 的 TypeScript 错误（优先！）
**错误信息**：
```
Object literal may only specify known properties, and 'user' does not exist in type 'Partial<JwtUser>'
  - 第 678 行
  - 第 787 行
```

**根因**：这两处用了 NextAuth 的 update 签名 `update({ user: { image: ... } })`，
但我们的 useAuth 的 update 接收 `Partial<JwtUser>` 扁平结构。

**修复方法**：找到这两行：
```bash
grep -n "update({" /home/liming/partjava/i/app/profile/page.tsx
```

把如下代码：
```ts
await update({ user: { image: newAvatarUrl } });
```
改为：
```ts
update({ image: newAvatarUrl }); // useAuth 的 update 接受 Partial<JwtUser>
```

### 4.2 检查注册页面 app/register/page.tsx
```bash
grep -n "next-auth" /home/liming/partjava/i/app/register/page.tsx
```
如果有 NextAuth 导入，需要替换。注册接口直接调用 Java `POST /api/auth/register`。

### 4.3 删除废弃的 Next.js API Route 文件
以下文件直接删除：
```bash
rm "/home/liming/partjava/i/app/api/auth/[...nextauth]/route.ts"
rm /home/liming/partjava/i/app/api/auth/session/route.ts
rm /home/liming/partjava/i/app/api/auth/signout/route.ts
rm /home/liming/partjava/i/app/api/auth/log/route.ts
rm /home/liming/partjava/i/app/api/auth/register/route.ts
```

注意：其他 app/api/ 目录下的 route.ts 文件（notes、challenges 等）因为 next.config.js 代理规则实际不会被调用，先保留不删。

### 4.4 验证/修复 Java 后端缺少的接口

需要用以下命令测试每个接口是否可用（先获取 token）：
```bash
# 第一步：获取 token
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrUsername":"your@email.com","password":"yourpassword"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['token'])")

# 第二步：测试各接口
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/user/profile
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/user/stats
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/user/achievements
```

已知路径差异（前端调用 vs Java 实际路径）：

| 前端调用 | Java 实际路径 | 状态 |
|---------|-------------|------|
| POST /api/study/record | POST /api/study/progress | ❓ 路径不同，需要在前端改路径或 Java 加别名 |
| POST /api/user/track-learning | POST /api/study/sync-time | ❓ 路径不同 |
| GET /api/user/stats | 未确认 | ❓ 检查 UserController |
| GET /api/user/achievements | 未确认 | ❓ 检查是否有对应接口 |
| POST /api/user/avatar | 未确认 | ❓ 头像上传 |
| GET /api/user/bookmarks | 未确认 | ❓ 书签接口 |
| GET /api/user/profile-by-id | 未确认 | ❓ 按 ID 查用户 |
| GET /api/public-notes | 未确认 | ❓ 公开笔记列表 |
| GET /api/stats/platform | 未确认 | ❓ 平台统计 |

### 4.5 验证 Java SecurityConfig 的 CORS 配置
```bash
cat /home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/config/SecurityConfig.java
```
确认允许 localhost:3000 的跨域请求，允许 Authorization Header。

### 4.6 全局测试
```bash
# 1. 前端开发服务器
cd /home/liming/partjava/i && npm run dev

# 2. 打开浏览器，测试以下流程：
# - 登录 → localStorage 有 jwt_token
# - 刷新页面 → 保持登录状态
# - Network 面板 → /api/ 请求都带 Authorization: Bearer xxx
# - 退出 → localStorage 清空
# - 访问 /notes → 正常加载
# - Token 过期(删除 localStorage.jwt_token 后刷新) → 跳转登录页
```

---

## 五、已知 TS 错误速查

| 文件 | 行号 | 错误 | 修复方法 |
|------|------|------|---------|
| profile/page.tsx | 678 | 'user' not in Partial<JwtUser> | 改 update({ user:{} }) → update({}) |
| profile/page.tsx | 787 | 'user' not in Partial<JwtUser> | 同上 |

---

## 六、关键文件路径速查

```
/home/liming/partjava/i/
├── MIGRATION.md                        ← 本文件（迁移设计文档）
├── next.config.js                      ← 代理配置正确，无需改动
├── app/
│   ├── lib/
│   │   ├── auth-client.ts              ← [新建 ✅] JWT 工具库
│   │   ├── auth.ts                     ← [废弃] NextAuth 配置，可删除
│   │   └── database.ts                 ← [保留] 暂时不动
│   ├── hooks/
│   │   ├── useAuth.ts                  ← [新建 ✅] 替代 useSession
│   │   └── useStudyTimer.ts            ← [已改 ✅]
│   ├── components/
│   │   ├── FetchInterceptor.tsx        ← [新建 ✅] 全局 fetch 拦截器
│   │   ├── Navbar.tsx                  ← [已改 ✅]
│   │   └── RootLayoutClient.tsx        ← [已改 ✅]
│   ├── providers/
│   │   ├── SessionProvider.tsx         ← [已改 ✅] 空壳
│   │   └── UserProvider.tsx            ← [已改 ✅]
│   ├── login/page.tsx                  ← [已改 ✅]
│   ├── profile/page.tsx                ← [已改 ✅，有 TS 错误待修复]
│   ├── register/page.tsx               ← [待检查 ❌]
│   └── api/auth/                       ← [待删除 ❌]
└── partjava-backend/                   ← Java Spring Boot，无需改动
```

---

## 七、useAuth Hook 的设计原理（供参考）

useAuth 通过监听 `auth-change` CustomEvent 实现跨组件状态同步：

1. `login()` 在 auth-client.ts 里保存 token → 触发 `window.dispatchEvent(new CustomEvent('auth-change', { detail: { user } }))`
2. `useAuth` Hook 在 `useEffect` 里注册 `auth-change` 监听器
3. 收到事件 → 更新 React state (session / status)
4. `logout()` 清除 localStorage → 触发 `auth-change` with `user: null`
5. FetchInterceptor 收到 401 → 直接调用 `logout()` → 跳转登录页

这样所有使用 `useAuth` 的组件都会同步更新，而不需要 Next.js 的 SessionProvider。

