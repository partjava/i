'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '微服务基础' },
  { key: 'discovery', label: '服务注册与发现' },
  { key: 'rpc', label: 'RPC与gRPC' },
  { key: 'gateway', label: 'API网关与负载均衡' },
  { key: 'monitor', label: '服务治理与监控' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoMicroservicesPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言微服务开发</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">微服务基础</h2>
            <p>微服务是一种将应用拆分为一组小型、自治服务的架构风格，Go因其高并发和部署便捷成为微服务热门语言。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>每个服务独立部署、独立数据库</li>
              <li>服务间通过API（HTTP/gRPC）通信</li>
              <li>易于扩展、容错和持续交付</li>
            </ul>
          </div>
        )}
        {activeTab === 'discovery' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">服务注册与发现</h2>
            <p>常用etcd、Consul等实现服务注册与发现。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// etcd注册服务示例（go.etcd.io/etcd/clientv3）',
  'import (',
  '    "go.etcd.io/etcd/clientv3"',
  '    "context"',
  '    "time"',
  ')',
  '',
  'cli, _ := clientv3.New(clientv3.Config{',
  '    Endpoints: []string{"localhost:2379"},',
  '    DialTimeout: 5 * time.Second,',
  '})',
  'defer cli.Close()',
  '',
  '// 注册服务',
  'cli.Put(context.Background(), "/services/user", "127.0.0.1:8080")',
  '',
  '// 发现服务',
  'resp, _ := cli.Get(context.Background(), "/services/user")',
  'for _, kv := range resp.Kvs {',
  '    fmt.Println(string(kv.Value))',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>etcd/Consul/ZooKeeper常用于服务注册中心</li>
              <li>可结合健康检查实现高可用</li>
            </ul>
          </div>
        )}
        {activeTab === 'rpc' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">RPC与gRPC</h2>
            <p>gRPC是Google开源的高性能RPC框架，Go有官方支持。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 定义proto文件',
  'service Greeter {',
  '  rpc SayHello (HelloRequest) returns (HelloReply);',
  '}',
  '',
  '// 生成Go代码',
  'protoc --go_out=. --go-grpc_out=. greeter.proto',
  '',
  '// 服务端实现',
  'type server struct { UnimplementedGreeterServer }',
  'func (s *server) SayHello(ctx context.Context, req *HelloRequest) (*HelloReply, error) {',
  '    return &HelloReply{Message: "Hello " + req.Name}, nil',
  '}',
  '',
  '// 启动gRPC服务',
  'grpcServer := grpc.NewServer()',
  'RegisterGreeterServer(grpcServer, &server{})',
  'lis, _ := net.Listen("tcp", ":50051")',
  'grpcServer.Serve(lis)',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>gRPC支持多语言、流式、认证等特性</li>
              <li>推荐配合proto3和官方插件</li>
            </ul>
          </div>
        )}
        {activeTab === 'gateway' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">API网关与负载均衡</h2>
            <p>API网关统一入口，常用Kong、Nginx、自研等实现，Go也可自建简单网关。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import "net/http"',
  '',
  'func proxyHandler(w http.ResponseWriter, r *http.Request) {',
  '    resp, _ := http.Get("http://backend-service" + r.URL.Path)',
  '    body, _ := io.ReadAll(resp.Body)',
  '    w.Write(body)',
  '}',
  '',
  'func main() {',
  '    http.HandleFunc("/", proxyHandler)',
  '    http.ListenAndServe(":8000", nil)',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>API网关可做路由、鉴权、限流等</li>
              <li>负载均衡可用Nginx、Consul、Go自实现</li>
            </ul>
          </div>
        )}
        {activeTab === 'monitor' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">服务治理与监控</h2>
            <p>常用Prometheus+Grafana监控微服务，Go可集成promhttp导出指标。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import (',
  '    "github.com/prometheus/client_golang/prometheus/promhttp"',
  '    "net/http"',
  ')',
  '',
  'func main() {',
  '    http.Handle("/metrics", promhttp.Handler())',
  '    http.ListenAndServe(":2112", nil)',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>Prometheus采集、Grafana展示</li>
              <li>可自定义业务指标</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：gRPC实现用户服务</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// proto定义UserService，生成Go代码，实现增删查改',
  '// 结合gRPC服务端和客户端调用',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">例题2：服务注册与健康检查</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 用etcd注册服务，定期上报健康状态',
  '// 客户端发现服务并调用',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">练习：自定义API网关</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 用Go实现简单的反向代理和路由分发',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: gRPC和RESTful如何选择？</b><br />A: gRPC适合内部高性能通信，REST适合对外API。</li>
              <li><b>Q: 微服务如何保证一致性？</b><br />A: 可用分布式事务、幂等设计、补偿机制等。</li>
              <li><b>Q: 服务间如何鉴权？</b><br />A: 可用JWT、OAuth2、mTLS等方式。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/testing"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：测试与性能优化
          </a>
          <a
            href="/study/go/docker"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：容器化部署
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}