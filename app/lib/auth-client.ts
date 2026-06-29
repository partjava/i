/**
 * auth-client.ts
 * JWT 客户端认证工具库，完全替代 NextAuth。
 * Token 存储在 localStorage，兼容 SSR（服务端返回 null）。
 */

const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'jwt_user';

export interface JwtUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  image?: string | null;
  vip?: boolean;
  vipLevel?: number;
  vipExpireTime?: string | null;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

// ─── Token 存取 ────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ─── 用户信息存取 ───────────────────────────────────────────────────────────

export function getStoredUser(): JwtUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JwtUser;
  } catch {
    return null;
  }
}

function setStoredUser(user: JwtUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateStoredUser(updates: Partial<JwtUser>): void {
  const current = getStoredUser();
  if (current) {
    setStoredUser({ ...current, ...updates });
  }
}

// ─── 登录 / 登出 ─────────────────────────────────────────────────────────

/**
 * 调用 Java 后端登录接口，成功后保存 token 和用户信息到 localStorage。
 * Java AuthController POST /api/auth/login
 * 返回：{ code, message, data: { token, expiresIn, id, username, role } }
 */
export async function login(emailOrUsername: string, password: string): Promise<LoginResult> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const json = await res.json();

    // Java ApiResponse 格式: { code: 200, message: 'success', data: {...} }
    if (res.ok && json.code === 200 && json.data?.token) {
      const data = json.data;
      setToken(data.token);

      const user: JwtUser = {
        id: String(data.id ?? ''),
        name: data.username ?? '',
        email: data.email ?? emailOrUsername,
        username: data.username ?? '',
        role: data.role ?? 'USER',
        image: data.avatar ?? null,
        vip: data.vip ?? false,
        vipLevel: data.vipLevel ?? 0,
        vipExpireTime: data.vipExpireTime ?? null,
      };
      setStoredUser(user);

      // 触发全局认证状态变更事件，通知 useAuth Hook 更新
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { user } }));
      return { success: true };
    } else {
      const errMsg = json.message || '用户名或密码错误';
      return { success: false, error: errMsg };
    }
  } catch (e: any) {
    return { success: false, error: '网络连接失败，请检查服务是否运行' };
  }
}

/**
 * 退出登录：清除本地存储，触发状态变更事件。
 */
export function logout(): void {
  clearToken();
  window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: null } }));
}

// ─── HTTP 请求辅助 ─────────────────────────────────────────────────────────

/**
 * 返回带有 JWT Authorization Header 的请求头对象。
 * 如果 token 不存在则返回空对象。
 */
export function getAuthHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/**
 * 判断当前是否已认证（token 存在且用户数据存在）。
 */
export function isAuthenticated(): boolean {
  return !!getToken() && !!getStoredUser();
}
