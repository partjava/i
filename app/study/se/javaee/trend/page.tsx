'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const SERVERLESS_CODE = `exports.handler = function(event, context, callback) {
  callback(null, 'Hello from Serverless!');
};`

const ISTIO_CODE = `apiVersion: networking.istio.io/v1alpha3
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
          weight: 20`

const AIOPS_CODE = `import pandas as pd
from sklearn.ensemble import IsolationForest

data = pd.read_csv('logs.csv')
model = IsolationForest()
model.fit(data[['response_time']])
# 预测异常
anomalies = model.predict(data[['response_time']])
print(data[anomalies == -1])`

const SPRING_CLOUD_CODE = `@EnableBinding(Sink.class)
public class LogConsumer {
    @StreamListener(Sink.INPUT)
    public void handle(String message) {
        System.out.println("接收到消息: " + message);
    }
}`

const DEPLOY_CODE = `#!/bin/bash
# 同时部署到阿里云与华为云
kubectl --kubeconfig=aliyun.yaml apply -f k8s/deployment.yaml
kubectl --kubeconfig=huawei.yaml apply -f k8s/deployment.yaml`

const PROMETHEUS_CODE = `@RestController
public class MetricsController {
    @GetMapping("/metrics/custom")
    public String customMetrics() {
        return "my_custom_metric 123\n";
    }
}`

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '前沿技术趋势',
  chapterNumber: 16,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: 'DevOps与CI/CD', href: '/study/se/javaee/devops' },
  nextChapter: { label: '学习建议', href: '/study/se/javaee/suggestion' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>技术趋势概述</PageTitle>
        <BookParagraph>JavaEE 技术生态持续演进，随着云原生和人工智能技术的快速发展，企业级应用架构正经历深刻变革。</BookParagraph>
        <BookList items={[
          '云原生成为主流，Serverless推动架构变革',
          'Service Mesh提升微服务治理与可观测性',
          'AI赋能智能运维（AIOps）',
          '微服务架构持续演进，关注弹性与高可用',
          'DevSecOps与安全左移',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">趋势洞察</h3>
        <BookParagraph>在云原生时代，JavaEE 正在向 Jakarta EE 演进，传统企业级技术栈与云原生技术的融合日益深入。开发者需要同时掌握传统企业级开发能力和云原生技术栈。</BookParagraph>
        <BookAlert type="info" message="掌握云原生技术已成为JavaEE开发者的核心竞争力。建议结合企业实际需求，逐步将传统架构向云原生方向演进。" />
      </div>
    ),
  },
  {
    label: '云原生与Serverless',
    left: (
      <div className="space-y-4">
        <PageTitle>云原生与Serverless</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">云原生核心特性</h3>
        <BookList items={[
          '容器化部署',
          '动态编排（Kubernetes）',
          '微服务架构',
          '弹性伸缩',
          '持续交付',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Serverless函数示例（阿里云函数计算）</h3>
        <BookCode language="javascript" code={SERVERLESS_CODE} />
        <BookAlert type="info" message="Serverless 让开发者无需关注基础设施，专注于业务逻辑实现。结合 Kubernetes 与函数计算，可构建弹性、高可用的企业应用。" />
      </div>
    ),
  },
  {
    label: 'Service Mesh与可观测性',
    left: (
      <div className="space-y-4">
        <PageTitle>Service Mesh与可观测性</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">Service Mesh优势</h3>
        <BookList items={[
          '流量治理与灰度发布',
          '服务间安全通信',
          '可观测性增强（Tracing、Metrics、Logging）',
          '统一配置与管理',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Istio流量管理示例</h3>
        <BookCode language="yaml" code={ISTIO_CODE} />
        <TagGrid items={['Istio', 'Service Mesh', '灰度发布', '流量治理', '可观测性']} />
      </div>
    ),
  },
  {
    label: 'AI与智能运维',
    left: (
      <div className="space-y-4">
        <PageTitle>AI与智能运维（AIOps）</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">AIOps应用场景</h3>
        <BookList items={[
          '日志智能分析',
          '异常检测与自动告警',
          '智能容量规划',
          '故障预测与自愈',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">日志异常检测Python示例</h3>
        <BookCode language="python" code={AIOPS_CODE} />
        <BookAlert type="info" message="AIOps 通过机器学习算法对运维数据进行分析，实现智能化的故障检测与自愈，是未来运维的重要方向。" />
        <TagGrid items={['AIOps', '异常检测', 'Isolation Forest', '智能运维']} />
      </div>
    ),
  },
  {
    label: '新一代微服务架构',
    left: (
      <div className="space-y-4">
        <PageTitle>新一代微服务架构</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">架构演进方向</h3>
        <BookList items={[
          '事件驱动架构（EDA）',
          '无状态服务与弹性伸缩',
          'API网关与服务注册',
          '多语言微服务协作',
          '零信任安全',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Spring Cloud Stream事件驱动示例</h3>
        <BookCode language="java" code={SPRING_CLOUD_CODE} />
        <BookAlert type="success" message="事件驱动架构（EDA）能够有效解耦服务，提高系统弹性与可扩展性。Spring Cloud Stream 提供了对多种消息中间件的统一编程模型。" />
        <TagGrid items={['微服务', '事件驱动', 'EDA', 'Spring Cloud', '消息驱动']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>实用示例</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">多云部署脚本</h3>
        <BookCode language="bash" code={DEPLOY_CODE} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Prometheus自定义指标采集</h3>
        <BookCode language="java" code={PROMETHEUS_CODE} />
        <BookAlert type="info" message="结合多云部署与可观测性工具，可以实现高可用、可监控的企业级生产环境。" />
        <TagGrid items={['多云部署', 'Prometheus', '监控', 'Kubernetes', '可观测性']} />
      </div>
    ),
  },
]

export default function JavaEETrendPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
