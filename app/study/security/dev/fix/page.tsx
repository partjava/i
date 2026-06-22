'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '安全开发',
  chapterTitle: '漏洞修复',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/dev',
  prevChapter: { label: '安全工具使用', href: '/study/security/dev/tools' },
  nextChapter: { label: '安全部署', href: '/study/security/dev/deploy' },
  theme: THEMES.security,
}

const codeFlask = `# 后端校验示例（Python Flask）
if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    file.save(os.path.join(upload_folder, filename))`

const codeJava = `// Java权限注解示例
@PreAuthorize("hasRole('ADMIN')")
public User getAdminData() { ... }`

const codeMaven = `<!-- Maven升级依赖 -->
<dependency>
  <groupId>org.apache.struts</groupId>
  <artifactId>struts2-core</artifactId>
  <version>2.5.30</version>
</dependency>`

const codeNginx = `# Nginx关闭目录浏览
location / {
  autoindex off;
}`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>漏洞概念与危害</PageTitle>
        <SectionTitle>漏洞定义与分类</SectionTitle>
        <BookParagraph>漏洞是指系统、应用、组件或业务流程中存在的安全缺陷，攻击者可利用这些缺陷获取未授权访问、篡改数据或破坏服务。</BookParagraph>
        <BookList items={[
          '代码逻辑漏洞：如SQL注入、XSS、命令注入、越权访问等，源于开发阶段的逻辑缺陷。',
          '配置错误漏洞：如权限配置不当、默认口令、目录遍历、目录浏览未关闭等。',
          '第三方组件漏洞：如依赖库、框架存在已知CVE漏洞（如Struts2、Log4j、Spring4Shell）。',
          '业务逻辑漏洞：如支付绕过、优惠券滥用、接口未做幂等校验等。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>成因分析与危害</PageTitle>
        <SectionTitle>成因分析</SectionTitle>
        <BookList items={[
          '开发安全意识不足，缺乏安全编码规范',
          '依赖组件未及时升级，忽视安全公告',
          '配置不当，缺乏最小权限原则',
          '缺乏系统化的安全测试和审计',
        ]} />
        <SectionTitle>危害与紧迫性</SectionTitle>
        <BookList items={[
          '数据泄露：敏感信息被窃取，企业面临合规风险（如GDPR、等保）',
          '用户隐私受损：用户个人信息泄露，信任度下降',
          '业务中断：服务不可用，直接经济损失，甚至勒索攻击',
          '声誉影响：负面新闻传播，企业形象受损，客户流失',
          '法律责任：因未及时修复漏洞被监管处罚',
        ]} />
        <BookAlert type="warning" message="案例：2017年Equifax因未修复Struts2漏洞，导致1.43亿用户数据泄露，直接损失超7亿美元。2021年Log4j漏洞影响全球数百万系统，造成大范围安全事件。" />
      </div>
    ),
  },
  {
    label: '修复流程',
    left: (
      <div className="space-y-4">
        <PageTitle>修复流程</PageTitle>
        <SectionTitle>1. 漏洞发现</SectionTitle>
        <BookList items={[
          '自动化扫描：Nessus、AWVS、OpenVAS、Qualys等，定期全量扫描。',
          '渗透测试：模拟黑客攻击，发现业务逻辑和组合型漏洞。',
          '代码审计：静态分析（SonarQube、CodeQL）、人工审计结合。',
          '用户/白帽反馈：通过众测平台、SRC、应急响应渠道收集。',
        ]} />
        <SectionTitle>2. 评估分级</SectionTitle>
        <BookList items={[
          'CVSS评分体系：攻击向量、复杂度、影响范围、利用难度等。',
          '业务影响评估：是否涉及核心数据、关键业务、合规要求。',
          '分级标准：高危（RCE、数据库泄露）、中危（信息泄露、权限提升）、低危（错误信息暴露）。',
        ]} />
        <SectionTitle>3. 方案制定</SectionTitle>
        <BookList items={[
          '修复方式选择：补丁、配置、升级、临时缓解措施（如WAF拦截）。',
          '风险评估与回滚方案：灰度发布、蓝绿部署、应急预案。',
          '多部门协作：开发、运维、安全、业务方共同参与。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>修复实施与验证</PageTitle>
        <SectionTitle>4. 修复实施</SectionTitle>
        <BookList items={[
          '严格遵循变更管理流程，修复前备份代码和数据。',
          '多环境同步：开发、测试、预生产、生产环境一致性。',
          '临时缓解措施：如无法立即修复，先用WAF、IPS等防护。',
        ]} />
        <SectionTitle>5. 效果验证</SectionTitle>
        <BookList items={[
          '复测方法：自动化/手工、回归测试、渗透复测。',
          '持续监控：日志、告警、SIEM平台，关注是否有异常访问。',
          '修复报告：记录修复过程、验证结果、经验总结，归档。',
        ]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-3 rounded-lg text-xs">
            <p className="font-semibold text-sm mb-2">自动化扫描工具对比</p>
            <BookList items={[
              'Nessus：功能强大，适合企业级全网扫描',
              'AWVS：Web应用漏洞检测能力突出',
              'OpenVAS：开源，适合中小企业',
              'Qualys：云端扫描，合规性好',
            ]} />
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-xs">
            <p className="font-semibold text-sm mb-2">分级标准示例</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-1" style={{ border: '1px solid #ddd' }}>等级</th>
                    <th className="border p-1" style={{ border: '1px solid #ddd' }}>示例</th>
                    <th className="border p-1" style={{ border: '1px solid #ddd' }}>处置时限</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-1" style={{ border: '1px solid #ddd' }}>高危</td><td className="border p-1" style={{ border: '1px solid #ddd' }}>RCE、数据库泄露</td><td className="border p-1" style={{ border: '1px solid #ddd' }}>24小时内</td></tr>
                  <tr><td className="border p-1" style={{ border: '1px solid #ddd' }}>中危</td><td className="border p-1" style={{ border: '1px solid #ddd' }}>信息泄露、权限提升</td><td className="border p-1" style={{ border: '1px solid #ddd' }}>3天内</td></tr>
                  <tr><td className="border p-1" style={{ border: '1px solid #ddd' }}>低危</td><td className="border p-1" style={{ border: '1px solid #ddd' }}>错误信息暴露</td><td className="border p-1" style={{ border: '1px solid #ddd' }}>7天内</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '修复技术',
    left: (
      <div className="space-y-4">
        <PageTitle>代码补丁修复</PageTitle>
        <SectionTitle>SQL注入修复</SectionTitle>
        <BookCode language="python" code={`# 漏洞代码
query = f"SELECT * FROM users WHERE name = '{name}'"
# 修复
query = "SELECT * FROM users WHERE name = %s"`} />
        <BookList items={[
          '使用参数化查询，防止注入攻击',
          '所有用户输入都需校验和过滤',
          '推荐使用ORM框架',
        ]} />
        <SectionTitle>XSS修复</SectionTitle>
        <BookCode language="javascript" code={`// 漏洞代码
output.innerHTML = userInput;
// 修复
output.textContent = userInput; // 或使用前端库如DOMPurify净化`} />
        <BookList items={[
          '输出编码，防止脚本注入',
          '使用CSP策略限制脚本执行',
          '推荐引入DOMPurify等库',
        ]} />
        <SectionTitle>命令注入修复</SectionTitle>
        <BookCode language="python" code={`# 漏洞代码
os.system("ping " + user_input)
# 修复
subprocess.run(["ping", user_input], check=True)`} />
        <BookList items={[
          '避免拼接命令，使用参数数组',
          '校验输入合法性',
          '禁用危险函数',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>配置文件调整</PageTitle>
        <SectionTitle>Web服务器安全配置</SectionTitle>
        <BookCode language="nginx" code={`# Nginx配置
location /uploads/ {
  deny all;
}`} />
        <BookList items={[
          '关闭目录浏览，限制敏感目录访问',
          '仅允许白名单文件类型上传',
          '强制HTTPS，开启HSTS',
        ]} />
        <SectionTitle>数据库最小权限原则</SectionTitle>
        <BookCode language="sql" code={`GRANT SELECT, INSERT, UPDATE ON db.* TO 'user'@'localhost' IDENTIFIED BY 'pwd';`} />
        <BookList items={[
          '只授予必要权限，防止越权操作',
          '定期审计数据库账号权限',
        ]} />
        <SectionTitle>组件升级替换</SectionTitle>
        <BookCode language="bash" code={`# 升级依赖
npm update package-name
pip install --upgrade package-name
mvn versions:use-latest-releases`} />
        <BookList items={[
          '及时关注CVE和官方安全公告',
          '升级后全面测试兼容性',
          '建立依赖安全监控（如Dependabot）',
        ]} />
        <SectionTitle>临时缓解措施</SectionTitle>
        <BookList items={[
          'WAF规则拦截高危请求',
          'IPS/IDS临时阻断攻击流量',
          '下线高危功能，待彻底修复后再上线',
        ]} />
      </div>
    ),
  },
  {
    label: '案例分析',
    left: (
      <div className="space-y-4">
        <PageTitle>案例分析</PageTitle>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">文件上传漏洞</p>
          <BookList items={[
            '描述：攻击者上传恶意脚本，利用Web服务器配置不当实现远程代码执行。',
            '修复思路：前后端双重校验、白名单、重命名、目录隔离、MIME类型校验。',
            '实施过程：前端限制文件类型，后端校验MIME和扩展名，Nginx配置location /uploads/{ deny all; }',
            '验证方法：上传恶意脚本，尝试访问，确认被拦截。',
          ]} />
          <BookCode language="python" code={codeFlask} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">越权访问漏洞</p>
          <BookList items={[
            '描述：接口未校验用户身份，普通用户可访问管理员数据（水平/垂直越权）。',
            '修复思路：接口权限校验、token/session机制、RBAC模型。',
            '实施过程：后端接口增加token校验和角色判断，前端隐藏敏感操作入口。',
            '验证方法：切换用户、抓包重放，尝试访问未授权资源。',
          ]} />
          <BookCode language="java" code={codeJava} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例分析（续）</PageTitle>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">第三方组件漏洞</p>
          <BookList items={[
            '描述：依赖组件存在CVE高危漏洞，攻击者利用已知漏洞攻击系统。',
            '修复思路：升级依赖、兼容性测试、关注官方公告。',
            '实施过程：查阅CVE公告，升级依赖，回归测试业务功能。',
            '验证方法：复测漏洞POC，确认漏洞已消除。',
          ]} />
          <BookCode language="xml" code={codeMaven} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">配置错误导致信息泄露</p>
          <BookList items={[
            '描述：Web服务器目录未禁用目录浏览，敏感文件可被下载。',
            '修复思路：关闭目录浏览，限制敏感目录访问，敏感信息脱敏。',
            '实施过程：修改nginx/apache配置，重启服务。',
            '验证方法：目录访问、敏感文件下载尝试。',
          ]} />
          <BookCode language="nginx" code={codeNginx} />
        </div>
      </div>
    ),
  },
  {
    label: '实践建议',
    left: (
      <div className="space-y-4">
        <PageTitle>实践建议</PageTitle>
        <BookList items={[
          '优先修复高危漏洞，建议建立漏洞分级响应机制，定期复盘。',
          '使用自动化工具（如Nessus、Burp Suite、SonarQube、Dependabot）定期扫描和代码审计。',
          '修复前备份代码和数据，确保可回滚，避免修复引发新问题。',
          '在测试环境充分验证，通过自动化测试和人工复测确保修复有效。',
          '关注第三方组件安全公告，及时升级依赖，订阅CVE和官方安全通告。',
          '完善修复文档，积累安全知识库，便于团队协作和经验传承。',
          '定期安全培训，提升开发、运维团队安全意识。',
          '建立应急响应预案，遇到高危漏洞可快速隔离和修复。',
          '常见误区：只修复表面、忽视兼容性、未做回归测试。',
        ]} />
        <div className="mt-4">
          <p className="font-semibold mb-2">推荐工具</p>
          <BookList items={[
            'Nessus（漏洞扫描）',
            'Burp Suite（渗透测试）',
            'SonarQube（代码审计）',
            'Dependabot（依赖安全监控）',
            'GitHub Security Advisory',
            'ELK/Splunk（日志监控）',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>注意事项</PageTitle>
        <BookAlert type="info" message="修复操作需有审批流程，避免误操作。生产环境修复需安排低峰期，提前通知相关方。修复后持续监控，防止复发。定期组织应急演练，提升团队响应能力。" />
        <BookList items={[
          '修复操作需有审批流程，避免误操作',
          '生产环境修复需安排低峰期，提前通知相关方',
          '修复后持续监控，防止复发',
          '定期组织应急演练，提升团队响应能力',
        ]} />
      </div>
    ),
  },
]

export default function VulnerabilityFixPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
