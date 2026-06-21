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
  chapterTitle: '微服务开发',
  chapterNumber: 21,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '测试与性能优化', href: '/study/computer/go/testing' },
  nextChapter: { label: '容器化部署', href: '/study/computer/go/docker' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '服务注册与RPC',
    left: (
      <div className="space-y-4">
        <PageTitle>服务注册与发现</PageTitle>
        <BookCode language="go" code={`import clientv3 "go.etcd.io/etcd/client/v3"
cli, _ := clientv3.New(clientv3.Config{Endpoints: []string{"localhost:2379"}})
// 注册服务
cli.Put(context.Background(), "/services/user-api", "localhost:8080")
// 发现服务
resp, _ := cli.Get(context.Background(), "/services/user-api")
for _, ev := range resp.Kvs { fmt.Println(string(ev.Value)) }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>RPC与gRPC</SectionTitle>
        <BookCode language="go" code={`// proto定义
service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
}
// 服务端
type server struct{ pb.UnimplementedUserServiceServer }
func (s *server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {
    return &pb.UserResponse{Name: "Tom"}, nil
}`} />
        <TagGrid items={['etcd', 'gRPC', 'protobuf', '服务注册', '发现']} />
      </div>
    ),
  },
  {
    label: '网关与治理',
    left: (
      <div className="space-y-4">
        <PageTitle>API网关与负载均衡</PageTitle>
        <BookCode language="go" code={`// 反向代理
http.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
    proxy := httputil.ReverseProxy{Director: func(req *http.Request) {
        req.URL.Scheme = "http"
        req.URL.Host = "backend:8080"
    }}
    proxy.ServeHTTP(w, r)
})`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>服务治理与监控</SectionTitle>
        <BookCode language="go" code={`import "github.com/prometheus/client_golang/prometheus"
var reqCount = prometheus.NewCounter(prometheus.CounterOpts{
    Name: "api_requests_total",
})
prometheus.MustRegister(reqCount)`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={['实现gRPC用户服务', '添加健康检查接口', '设计API网关']} />
        <TagGrid items={['网关', 'Prometheus', '健康检查', '治理', '监控']} />
      </div>
    ),
  },
]

export default function GoMicroservicesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
