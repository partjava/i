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

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '性能调优与监控',
  chapterNumber: 13,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '开发工具与环境', href: '/study/se/javaee/tools' },
  nextChapter: { label: '容器化与云服务', href: '/study/se/javaee/cloud' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>性能调优与监控概述</PageTitle>
        <BookParagraph>JavaEE应用性能优化涉及多个层面，包括JVM参数调优、数据库SQL优化、代码性能提升和实时监控等。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">优化要点</h3>
        <BookList items={[
          'JVM参数调优',
          '数据库SQL优化',
          '代码性能提升',
          '实时监控与告警',
          '性能瓶颈定位与排查',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="性能优化应遵循先测量后优化的原则，避免过早优化。使用性能分析工具定位瓶颈，有针对性地进行优化。" />
        <TagGrid items={['JVM调优', 'SQL优化', '代码优化', '监控', '性能分析']} />
      </div>
    ),
  },
  {
    label: 'JVM调优',
    left: (
      <div className="space-y-4">
        <PageTitle>JVM调优</PageTitle>
        <BookParagraph>JVM参数配置直接影响应用的运行性能和稳定性。合理的堆内存、栈大小和GC策略选择至关重要。</BookParagraph>
        <BookCode language="bash" code={`# 常用JVM参数
-Xms512m -Xmx2048m -Xss256k \
-XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m \
-XX:+PrintGCDetails -XX:+HeapDumpOnOutOfMemoryError`} />
        <BookCode language="bash" code={`# 启用GC日志
-XX:+PrintGCDetails -Xloggc:gc.log
# 使用G1垃圾收集器
-XX:+UseG1GC
# 设置最大暂停时间目标
-XX:MaxGCPauseMillis=200`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">JVM调优建议</h3>
        <BookList items={[
          '根据应用内存需求设置合理的 -Xms 和 -Xmx（通常设为相同值）',
          'Metaspace 设置足够大小避免频繁GC',
          '选择合适的GC算法（G1适合大堆、ZGC适合低延迟）',
          '启用OOM HeapDump方便排查内存泄漏',
          '使用JMX暴露JVM指标给监控系统',
        ]} />
        <BookAlert type="info" message="JDK 17+ 推荐使用 ZGC 或 Shenandoah GC，它们将暂停时间控制在10ms以内，适合对延迟敏感的场景。" />
        <TagGrid items={['-Xmx', 'G1GC', 'ZGC', 'GC日志', 'HeapDump']} />
      </div>
    ),
  },
  {
    label: 'SQL与代码优化',
    left: (
      <div className="space-y-4">
        <PageTitle>SQL优化</PageTitle>
        <BookParagraph>数据库性能是应用性能的关键瓶颈之一，优化SQL和索引可以显著提升系统吞吐量。</BookParagraph>
        <BookCode language="sql" code={`-- 创建索引
CREATE INDEX idx_user_name ON users(name);

-- 查询慢SQL
EXPLAIN SELECT * FROM users WHERE name = 'Tom';
`} />
        <h3 className="text-sm font-medium text-ink mt-4">SQL优化建议</h3>
        <BookList items={[
          '避免全表扫描，合理使用索引',
          '使用预编译SQL防止注入',
          '分页、分库分表优化大数据量',
          '避免在WHERE子句中对字段使用函数',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码优化</PageTitle>
        <BookParagraph>代码层面的优化直接影响应用的运行效率。</BookParagraph>
        <BookList items={[
          '减少不必要的对象创建',
          '使用StringBuilder拼接字符串',
          '合理使用缓存（如Guava、Redis）',
          '并发优化（线程池、异步处理）',
        ]} />
        <BookCode language="java" code={`// 字符串拼接优化
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    sb.append(i);
}
String result = sb.toString();`} />
        <TagGrid items={['索引', 'EXPLAIN', 'API设计', '缓存', 'StringBuilder']} />
      </div>
    ),
  },
  {
    label: '监控工具',
    left: (
      <div className="space-y-4">
        <PageTitle>监控工具</PageTitle>
        <BookParagraph>完善的监控体系是保障应用稳定运行的基础。常用的JavaEE监控工具：</BookParagraph>
        <BookList items={[
          'JVisualVM：JVM监控与分析',
          'Prometheus + Grafana：系统与业务监控',
          'Spring Boot Actuator：应用健康检查',
          'ELK（Elasticsearch、Logstash、Kibana）：日志分析',
          'Arthas：在线诊断工具',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Spring Boot Actuator配置</h3>
        <BookCode language="properties" code={`# application.properties
management.endpoints.web.exposure.include=*`} />
        <h3 className="text-sm font-medium text-ink mt-4">Prometheus + Grafana集成</h3>
        <BookCode language="xml" code={`<!-- Maven依赖 -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>`} />
        <BookAlert type="success" message="可观测性的三大支柱：Metrics（指标）、Tracing（链路追踪）、Logging（日志）。推荐组合：Prometheus + Jaeger + ELK。" />
        <TagGrid items={['JVisualVM', 'Prometheus', 'Grafana', 'Actuator', 'ELK']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>JVM监控与GC分析</PageTitle>
        <BookParagraph>启动JVisualVM连接本地或远程JVM进程，分析内存、线程、GC等性能指标。</BookParagraph>
        <BookCode language="bash" code={`# 启动JVisualVM，连接本地或远程JVM进程
# 分析内存、线程、GC等性能指标

# 远程JMX配置
-Dcom.sun.management.jmxremote \
-Dcom.sun.management.jmxremote.port=9999 \
-Dcom.sun.management.jmxremote.authenticate=false \
-Dcom.sun.management.jmxremote.ssl=false`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Prometheus监控Spring Boot</h3>
        <BookCode language="properties" code={`# 配置Prometheus端点
management.endpoints.web.exposure.include=*
management.metrics.export.prometheus.enabled=true`} />
        <BookCode language="yaml" code={`# prometheus.yml
scrape_configs:
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['localhost:8080']`} />
        <BookAlert type="info" message="Arthas是阿里巴巴开源的Java诊断工具，可以在线排查CPU飙高、内存泄漏、线程死锁等问题，无需重启应用。" />
        <TagGrid items={['JMX', '远程诊断', 'Arthas', '监控配置', '性能分析']} />
      </div>
    ),
  },
]

export default function JavaEEPerformancePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
