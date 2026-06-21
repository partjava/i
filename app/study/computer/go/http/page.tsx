'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言', chapterTitle: 'HTTP服务开发', chapterNumber: 17, totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '网络编程', href: '/study/computer/go/networking' },
  nextChapter: { label: 'RESTful API开发', href: '/study/computer/go/rest' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'HTTP基础',
    left: (<div className="space-y-4"><PageTitle>HTTP基础</PageTitle><BookParagraph>Go内置net/http包，支持高效的HTTP服务开发。</BookParagraph><BookCode language="go" code={`import ("net/http"; "fmt")

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello, World!")
    })
    http.ListenAndServe(":8080", nil)
}`} /><BookList items={['http.HandleFunc注册路由', 'http.ListenAndServe启动服务', '支持GET、POST等多种HTTP方法']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>路由与处理器</SectionTitle><BookParagraph>Go原生支持简单路由，复杂路由可用第三方库。</BookParagraph><BookCode language="go" code={`import ("net/http"; "github.com/gorilla/mux")
func main() {
    r := mux.NewRouter()
    r.HandleFunc("/user/{id}", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        w.Write([]byte("User ID: " + vars["id"]))
    })
    http.ListenAndServe(":8080", r)
}`} /><TagGrid items={['net/http', 'HandleFunc', 'ListenAndServe', 'mux', '路由']} /></div>),
  },
  {
    label: '中间件',
    left: (<div className="space-y-4"><PageTitle>中间件</PageTitle><BookParagraph>中间件用于统一处理日志、认证、跨域等。</BookParagraph><BookCode language="go" code={`func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}
func main() {
    r := mux.NewRouter()
    r.Use(logging)
    r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Home"))
    })
    http.ListenAndServe(":8080", r)
}`} /><BookList items={['中间件本质是对Handler的包装', '可链式组合多个中间件']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>文件上传下载</SectionTitle><BookCode language="go" code={`func uploadHandler(w http.ResponseWriter, r *http.Request) {
    r.ParseMultipartForm(10 << 20)
    file, handler, err := r.FormFile("file")
    if err != nil { http.Error(w, err.Error(), http.StatusBadRequest); return }
    defer file.Close()
    f, _ := os.Create("./uploads/" + handler.Filename)
    defer f.Close()
    io.Copy(f, file)
    w.Write([]byte("上传成功"))
}
func downloadHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./uploads/test.txt")
}`} /><BookList items={['r.FormFile获取上传文件', 'http.ServeFile实现文件下载']} /><TagGrid items={['中间件', '文件上传', '下载', 'Handler', 'ServeFile']} /></div>),
  },
  {
    label: '认证与练习',
    left: (<div className="space-y-4"><PageTitle>认证与安全</PageTitle><BookParagraph>常见认证方式有Basic Auth、Token、JWT等。</BookParagraph><BookCode language="go" code={`func basicAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        user, pass, ok := r.BasicAuth()
        if !ok || user != "admin" || pass != "123456" {
            w.Header().Set("WWW-Authenticate", "Basic realm=Restricted")
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}`} /><BookList items={['可结合中间件实现统一认证', '生产环境建议使用HTTPS']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>例题与练习</SectionTitle><BookParagraph><b>例题1：</b>实现RESTful风格的用户API</BookParagraph><BookParagraph>{`GET /user/{id}、POST /user、PUT /user/{id}、DELETE /user/{id}`}</BookParagraph><BookParagraph><b>例题2：</b>实现带认证的文件下载接口</BookParagraph><BookParagraph>结合Basic Auth和http.ServeFile实现安全下载</BookParagraph><BookParagraph><b>练习：</b>实现一个简单的中间件链</BookParagraph><BookParagraph>编写日志、认证等中间件并组合使用</BookParagraph><TagGrid items={['Basic Auth', 'JWT', 'HTTPS', '认证', '练习']} /></div>),
  },
  {
    label: '常见问题',
    left: (<div className="space-y-4"><PageTitle>常见问题</PageTitle><BookParagraph><b>如何优雅关闭HTTP服务？</b>使用http.Server的Shutdown方法。</BookParagraph><BookParagraph><b>如何处理跨域请求？</b>设置CORS相关Header或用中间件。</BookParagraph><BookParagraph><b>如何处理大文件上传？</b>增大ParseMultipartForm参数，分块处理。</BookParagraph></div>),
    right: (<div className="space-y-4"><TagGrid items={['FAQ', 'Shutdown', 'CORS', '大文件', '安全']} /></div>),
  },
]

export default function GoHttpPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
