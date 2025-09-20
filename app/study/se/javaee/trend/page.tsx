'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'cloudnative', label: '云原生与Serverless' },
  { key: 'mesh', label: 'Service Mesh与可观测性' },
  { key: 'aiops', label: 'AI与智能运维' },
  { key: 'microservice', label: '新一代微服务架构' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEETrendPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">前沿技术趋势</h1>
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">技术趋势概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li>• 云原生成为主流，Serverless推动架构变革</li>
                <li>• Service Mesh提升微服务治理与可观测性</li>
                <li>• AI赋能智能运维（AIOps）</li>
                <li>• 微服务架构持续演进，关注弹性与高可用</li>
                <li>• DevSecOps与安全左移</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'cloudnative' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">云原生与Serverless</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">云原生核心特性</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 容器化部署</li>
                <li>• 动态编排（Kubernetes）</li>
                <li>• 微服务架构</li>
                <li>• 弹性伸缩</li>
                <li>• 持续交付</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Serverless函数示例（阿里云函数计算）</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`exports.handler = function(event, context, callback) {
  callback(null, 'Hello from Serverless!');
};`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'mesh' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Service Mesh与可观测性</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Service Mesh优势</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 流量治理与灰度发布</li>
                <li>• 服务间安全通信</li>
                <li>• 可观测性增强（Tracing、Metrics、Logging）</li>
                <li>• 统一配置与管理</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Istio流量管理示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: javaee-app
spec:
  hosts:
    - javaee-app
  http:
    - route:
        - destination:
            host: javaee-app
            subset: v2
          weight: 80
        - destination:
            host: javaee-app
            subset: v1
          weight: 20`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'aiops' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">AI与智能运维（AIOps）</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">AIOps应用场景</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 日志智能分析</li>
                <li>• 异常检测与自动告警</li>
                <li>• 智能容量规划</li>
                <li>• 故障预测与自愈</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">日志异常检测Python示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import pandas as pd
from sklearn.ensemble import IsolationForest

data = pd.read_csv('logs.csv')
model = IsolationForest()
model.fit(data[['response_time']])
# 预测异常
anomalies = model.predict(data[['response_time']])
print(data[anomalies == -1])`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'microservice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">新一代微服务架构</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">架构演进方向</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 事件驱动架构（EDA）</li>
                <li>• 无状态服务与弹性伸缩</li>
                <li>• API网关与服务注册</li>
                <li>• 多语言微服务协作</li>
                <li>• 零信任安全</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Spring Cloud Stream事件驱动示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@EnableBinding(Sink.class)
public class LogConsumer {
    @StreamListener(Sink.INPUT)
    public void handle(String message) {
        System.out.println("接收到消息: " + message);
    }
}`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">多云部署脚本</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#!/bin/bash
# 同时部署到阿里云与华为云
kubectl --kubeconfig=aliyun.yaml apply -f k8s/deployment.yaml
kubectl --kubeconfig=huawei.yaml apply -f k8s/deployment.yaml`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Prometheus自定义指标采集</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@RestController
public class MetricsController {
    @GetMapping("/metrics/custom")
    public String customMetrics() {
        return "my_custom_metric 123\n";
    }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/devops" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← DevOps与CI/CD
        </a>
        <a
          href="/study/se/javaee/suggestion"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          学习建议 →
        </a>
      </div>
    </div>
  );
}