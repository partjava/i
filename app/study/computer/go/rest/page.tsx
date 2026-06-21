'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: 'RESTful API开发',
  chapterNumber: 18,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: 'HTTP服务开发', href: '/study/computer/go/http' },
  nextChapter: { label: '数据库操作', href: '/study/computer/go/database' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'REST基础与路由',
    left: (
      <div className="space-y-4">
        <PageTitle>REST基础</PageTitle>
        <BookParagraph>RESTful API基于HTTP方法（GET/POST/PUT/DELETE）和资源路径设计。</BookParagraph>
        <SectionTitle>路由设计</SectionTitle>
        <BookCode language="go" code={`r := mux.NewRouter()
r.HandleFunc("/api/users", getUsers).Methods("GET")
r.HandleFunc("/api/users/{id}", getUser).Methods("GET")
r.HandleFunc("/api/users", createUser).Methods("POST")
r.HandleFunc("/api/users/{id}", updateUser).Methods("PUT")
r.HandleFunc("/api/users/{id}", deleteUser).Methods("DELETE")
http.ListenAndServe(":8080", r)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>请求与响应</SectionTitle>
        <BookCode language="go" code={`func getUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    // 查询数据库...
    json.NewEncoder(w).Encode(user)
}
func createUser(w http.ResponseWriter, r *http.Request) {
    var u User
    json.NewDecoder(r.Body).Decode(&u)
    // 保存...
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(u)
}`} />
        <TagGrid items={['REST', 'mux', 'JSON', 'CRUD', '路由']} />
      </div>
    ),
  },
  {
    label: '练习与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>CRUD API示例：</b></BookParagraph>
        <BookCode language="go" code={`var users = []User{}
func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}`} />
        <BookParagraph><b>分页查询：</b></BookParagraph>
        <BookCode language="go" code={`func getUsers(w http.ResponseWriter, r *http.Request) {
    page, _ := strconv.Atoi(r.URL.Query().Get("page"))
    limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
    start := (page - 1) * limit
    // 返回分页数据
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>RESTful API设计原则？</b>资源路径用名词、HTTP方法表示操作、合理使用状态码。</BookParagraph>
        <BookParagraph><b>如何统一错误响应？</b>定义统一的错误结构体，包含code和message字段。</BookParagraph>
        <TagGrid items={['CRUD', '分页', '错误码', 'JSON响应', '设计']} />
      </div>
    ),
  },
]

export default function GoRestPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
