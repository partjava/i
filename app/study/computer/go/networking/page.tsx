'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: '网络编程',
  chapterNumber: 16,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '文件操作', href: '/study/computer/go/file-io' },
  nextChapter: { label: 'HTTP服务开发', href: '/study/computer/go/http' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'HTTP编程',
    left: (
      <div className="space-y-4">
        <PageTitle>HTTP编程</PageTitle>
        <BookCode language="go" code={`// HTTP服务器
http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Query().Get("name"))
})
http.ListenAndServe(":8080", nil)

// HTTP客户端
resp, _ := http.Get("https://api.example.com/data")
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)
fmt.Println(string(body))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>TCP/UDP</SectionTitle>
        <BookCode language="go" code={`// TCP服务器
listener, _ := net.Listen("tcp", ":8080")
conn, _ := listener.Accept()
io.Copy(conn, conn) // 回显
conn.Close()

// UDP
addr, _ := net.ResolveUDPAddr("udp", ":8081")
conn, _ := net.ListenUDP("udp", addr)
buf := make([]byte, 1024)
n, _, _ := conn.ReadFromUDP(buf)`} />
        <TagGrid items={['HTTP', 'TCP', 'UDP', 'WebSocket', 'TLS']} />
      </div>
    ),
  },
  {
    label: '安全与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>网络安全</PageTitle>
        <BookCode language="go" code={`// HTTPS
import "crypto/tls"
server := &http.Server{
    Addr: ":443",
    TLSConfig: &tls.Config{},
}
server.ListenAndServeTLS("cert.pem", "key.pem")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题与练习</SectionTitle>
        <BookParagraph><b>HTTP文件服务器：</b></BookParagraph>
        <BookCode language="go" code={`http.Handle("/", http.FileServer(http.Dir("./static")))
http.ListenAndServe(":8080", nil)`} />
        <BookParagraph><b>TCP回声服务器：</b></BookParagraph>
        <BookCode language="go" code={`func handleConn(c net.Conn) {
    io.Copy(c, c); c.Close()
}
ln, _ := net.Listen("tcp", ":8080")
for { conn, _ := ln.Accept(); go handleConn(conn) }`} />
        <TagGrid items={['HTTPS', 'TCP回声', 'HTTP文件', 'WebSocket', '练习']} />
      </div>
    ),
  },
]

export default function GoNetworkingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
