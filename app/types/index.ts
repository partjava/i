// 数据库用户对象（包含所有可能的数据库字段）
export interface DbUser {
  id: number;
  name: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}

// 客户端使用的用户类型（不包含敏感信息）
export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// 笔记相关类型
export interface Note {
  id: number;
  title: string;
  content: string;
  category?: string;
  technology?: string;
  subcategory?: string;
  tags: string[];
  isPublic: boolean;
  is_public?: boolean; // 兼容旧代码
  authorId: number;
  author_id?: number; // 兼容旧代码
  createdAt: Date;
  created_at?: Date; // 兼容旧代码
  updatedAt: Date;
  updated_at?: Date; // 兼容旧代码
}

export interface NoteWithStats extends Note {
  likeCount: number;
  likesCount?: number; // 兼容旧代码
  bookmarkCount: number;
  bookmarksCount?: number; // 兼容旧代码
  commentCount: number;
  commentsCount?: number; // 兼容旧代码
}

export interface NoteCreateRequest {
  title: string;
  content: string;
  category?: string;
  technology?: string;
  subcategory?: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface NoteUpdateRequest extends Partial<NoteCreateRequest> {
  id: number;
}

// 分页相关类型
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

// 缓存条目接口
export interface CacheEntry {
  data: any;
  timestamp: number;
  promise?: Promise<any>;
}

// 统一笔记数据结构（用于dataAdapter）
export interface UnifiedNote {
  id: string;
  title: string;
  content: string;
  category?: string;
  technology?: string;
  tags?: string[];
  isPublic: boolean;
  authorId: string | number;
  authorName?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 数据库查询结果类型
export interface QueryResult {
  insertId?: number;
  affectedRows?: number;
  changedRows?: number;
}

// 学习统计类型
export interface LearningStat {
  id: number;
  userId: number;
  category?: string;
  technology?: string;
  studyTime: number;
  notesCount: number;
  lastStudyDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 评论类型
export interface Comment {
  id: number;
  noteId: number;
  userId: number;
  content: string;
  parentId?: number;
  createdAt: Date;
}

// 点赞和收藏类型
export interface Like {
  id: number;
  userId: number;
  noteId: number;
  createdAt: Date;
}

export interface Bookmark {
  id: number;
  userId: number;
  noteId: number;
  createdAt: Date;
}

// 搜索相关类型
export interface SearchResult {
  notes: NoteWithStats[];
  users?: User[];
  total: number;
}

export interface SearchHistory {
  id: number;
  userId: number;
  query: string;
  createdAt: Date;
}