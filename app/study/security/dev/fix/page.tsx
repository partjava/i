"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function VulnerabilityFixPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">漏洞修复</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'process'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          修复流程
        </button>
        <button
          onClick={() => setActiveTab('techniques')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'techniques'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          修复技术
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          案例分析
        </button>
        <button
          onClick={() => setActiveTab('advice')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'advice'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          实践建议
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">漏洞概念与危害</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 漏洞定义与分类</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  漏洞是指系统、应用、组件或业务流程中存在的安全缺陷，攻击者可利用这些缺陷获取未授权访问、篡改数据或破坏服务。
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>代码逻辑漏洞：如SQL注入、XSS、命令注入、越权访问等，源于开发阶段的逻辑缺陷。</li>
                  <li>配置错误漏洞：如权限配置不当、默认口令、目录遍历、目录浏览未关闭等。</li>
                  <li>第三方组件漏洞：如依赖库、框架存在已知CVE漏洞（如Struts2、Log4j、Spring4Shell）。</li>
                  <li>业务逻辑漏洞：如支付绕过、优惠券滥用、接口未做幂等校验等。</li>
                </ul>
              </div>
              <h4 className="font-semibold">2. 成因分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>开发安全意识不足，缺乏安全编码规范</li>
                  <li>依赖组件未及时升级，忽视安全公告</li>
                  <li>配置不当，缺乏最小权限原则</li>
                  <li>缺乏系统化的安全测试和审计</li>
                </ul>
              </div>
              <h4 className="font-semibold">3. 危害与紧迫性</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>数据泄露：敏感信息被窃取，企业面临合规风险（如GDPR、等保）</li>
                  <li>用户隐私受损：用户个人信息泄露，信任度下降</li>
                  <li>业务中断：服务不可用，直接经济损失，甚至勒索攻击</li>
                  <li>声誉影响：负面新闻传播，企业形象受损，客户流失</li>
                  <li>法律责任：因未及时修复漏洞被监管处罚</li>
                </ul>
                <div className="bg-gray-200 p-3 rounded mt-2">
                  <b>案例：</b>2017年Equifax因未修复Struts2漏洞，导致1.43亿用户数据泄露，直接损失超7亿美元。2021年Log4j漏洞影响全球数百万系统，造成大范围安全事件。
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">修复流程</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6 mb-4">
                <li>
                  <b>漏洞发现</b>
                  <ul className="list-disc pl-6 mt-2">
                    <li>自动化扫描：Nessus、AWVS、OpenVAS、Qualys等，定期全量扫描。</li>
                    <li>渗透测试：模拟黑客攻击，发现业务逻辑和组合型漏洞。</li>
                    <li>代码审计：静态分析（SonarQube、CodeQL）、人工审计结合。</li>
                    <li>用户/白帽反馈：通过众测平台、SRC、应急响应渠道收集。</li>
                  </ul>
                </li>
                <li>
                  <b>评估分级</b>
                  <ul className="list-disc pl-6 mt-2">
                    <li>CVSS评分体系：攻击向量、复杂度、影响范围、利用难度等。</li>
                    <li>业务影响评估：是否涉及核心数据、关键业务、合规要求。</li>
                    <li>分级标准：高危（RCE、数据库泄露）、中危（信息泄露、权限提升）、低危（错误信息暴露）。</li>
                  </ul>
                </li>
                <li>
                  <b>方案制定</b>
                  <ul className="list-disc pl-6 mt-2">
                    <li>修复方式选择：补丁、配置、升级、临时缓解措施（如WAF拦截）。</li>
                    <li>风险评估与回滚方案：灰度发布、蓝绿部署、应急预案。</li>
                    <li>多部门协作：开发、运维、安全、业务方共同参与。</li>
                  </ul>
                </li>
                <li>
                  <b>修复实施</b>
                  <ul className="list-disc pl-6 mt-2">
                    <li>严格遵循变更管理流程，修复前备份代码和数据。</li>
                    <li>多环境同步：开发、测试、预生产、生产环境一致性。</li>
                    <li>临时缓解措施：如无法立即修复，先用WAF、IPS等防护。</li>
                  </ul>
                </li>
                <li>
                  <b>效果验证</b>
                  <ul className="list-disc pl-6 mt-2">
                    <li>复测方法：自动化/手工、回归测试、渗透复测。</li>
                    <li>持续监控：日志、告警、SIEM平台，关注是否有异常访问。</li>
                    <li>修复报告：记录修复过程、验证结果、经验总结，归档。</li>
                  </ul>
                </li>
              </ol>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <b>自动化扫描工具对比</b>
                  <ul className="list-disc pl-6 mt-2 text-sm">
                    <li>Nessus：功能强大，适合企业级全网扫描</li>
                    <li>AWVS：Web应用漏洞检测能力突出</li>
                    <li>OpenVAS：开源，适合中小企业</li>
                    <li>Qualys：云端扫描，合规性好</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <b>分级标准示例</b>
                  <table className="table-auto text-xs mt-2">
                    <thead>
                      <tr><th className="px-2">等级</th><th className="px-2">示例</th><th className="px-2">处置时限</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-2">高危</td><td className="px-2">RCE、数据库泄露</td><td className="px-2">24小时内</td></tr>
                      <tr><td className="px-2">中危</td><td className="px-2">信息泄露、权限提升</td><td className="px-2">3天内</td></tr>
                      <tr><td className="px-2">低危</td><td className="px-2">错误信息暴露</td><td className="px-2">7天内</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'techniques' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">修复技术</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 代码补丁修复</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">SQL注入修复：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# 漏洞代码
query = f"SELECT * FROM users WHERE name = '{name}'"
# 修复
query = "SELECT * FROM users WHERE name = %s"`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>使用参数化查询，防止注入攻击</li>
                  <li>所有用户输入都需校验和过滤</li>
                  <li>推荐使用ORM框架</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">XSS修复：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`// 漏洞代码
output.innerHTML = userInput;
// 修复
output.textContent = userInput; // 或使用前端库如DOMPurify净化`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>输出编码，防止脚本注入</li>
                  <li>使用CSP策略限制脚本执行</li>
                  <li>推荐引入DOMPurify等库</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">命令注入修复：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# 漏洞代码
os.system("ping " + user_input)
# 修复
subprocess.run(["ping", user_input], check=True)`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>避免拼接命令，使用参数数组</li>
                  <li>校验输入合法性</li>
                  <li>禁用危险函数</li>
                </ul>
              </div>
              <h4 className="font-semibold">2. 配置文件调整</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Web服务器安全配置：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# Nginx配置
location /uploads/ {
  deny all;
}`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>关闭目录浏览，限制敏感目录访问</li>
                  <li>仅允许白名单文件类型上传</li>
                  <li>强制HTTPS，开启HSTS</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">数据库最小权限原则：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`GRANT SELECT, INSERT, UPDATE ON db.* TO 'user'@'localhost' IDENTIFIED BY 'pwd';`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>只授予必要权限，防止越权操作</li>
                  <li>定期审计数据库账号权限</li>
                </ul>
              </div>
              <h4 className="font-semibold">3. 组件升级替换</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">依赖升级：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# 升级依赖
npm update package-name
pip install --upgrade package-name
mvn versions:use-latest-releases`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>及时关注CVE和官方安全公告</li>
                  <li>升级后全面测试兼容性</li>
                  <li>建立依赖安全监控（如Dependabot）</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">临时缓解措施：</p>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>WAF规则拦截高危请求</li>
                  <li>IPS/IDS临时阻断攻击流量</li>
                  <li>下线高危功能，待彻底修复后再上线</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">案例分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <b>文件上传漏洞</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>描述：</b>攻击者上传恶意脚本，利用Web服务器配置不当实现远程代码执行。</li>
                  <li><b>修复思路：</b>前后端双重校验、白名单、重命名、目录隔离、MIME类型校验。</li>
                  <li><b>实施过程：</b>前端限制文件类型，后端校验MIME和扩展名，Nginx配置location /uploads/ {'{'} deny all; {'}'}</li>
                  <li><b>验证方法：</b>上传恶意脚本，尝试访问，确认被拦截。</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# 后端校验示例（Python Flask）
if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    file.save(os.path.join(upload_folder, filename))`}</code></pre>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <b>越权访问漏洞</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>描述：</b>接口未校验用户身份，普通用户可访问管理员数据（水平/垂直越权）。</li>
                  <li><b>修复思路：</b>接口权限校验、token/session机制、RBAC模型。</li>
                  <li><b>实施过程：</b>后端接口增加token校验和角色判断，前端隐藏敏感操作入口。</li>
                  <li><b>验证方法：</b>切换用户、抓包重放，尝试访问未授权资源。</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`// Java权限注解示例
@PreAuthorize("hasRole('ADMIN')")
public User getAdminData() { ... }`}</code></pre>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <b>第三方组件漏洞</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>描述：</b>依赖组件存在CVE高危漏洞，攻击者利用已知漏洞攻击系统。</li>
                  <li><b>修复思路：</b>升级依赖、兼容性测试、关注官方公告。</li>
                  <li><b>实施过程：</b>查阅CVE公告，升级依赖，回归测试业务功能。</li>
                  <li><b>验证方法：</b>复测漏洞POC，确认漏洞已消除。</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# Maven升级依赖
<dependency>
  <groupId>org.apache.struts</groupId>
  <artifactId>struts2-core</artifactId>
  <version>2.5.30</version>
</dependency>`}</code></pre>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <b>配置错误导致信息泄露</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>描述：</b>Web服务器目录未禁用目录浏览，敏感文件可被下载。</li>
                  <li><b>修复思路：</b>关闭目录浏览，限制敏感目录访问，敏感信息脱敏。</li>
                  <li><b>实施过程：</b>修改nginx/apache配置，重启服务。</li>
                  <li><b>验证方法：</b>目录访问、敏感文件下载尝试。</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# Nginx关闭目录浏览
location / {
  autoindex off;
}`}</code></pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践建议</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>优先修复高危漏洞</b>，建议建立漏洞分级响应机制，定期复盘。</li>
                <li><b>使用自动化工具</b>（如Nessus、Burp Suite、SonarQube、Dependabot）定期扫描和代码审计。</li>
                <li><b>修复前备份代码和数据</b>，确保可回滚，避免修复引发新问题。</li>
                <li><b>在测试环境充分验证</b>，通过自动化测试和人工复测确保修复有效。</li>
                <li><b>关注第三方组件安全公告</b>，及时升级依赖，订阅CVE和官方安全通告。</li>
                <li><b>完善修复文档</b>，积累安全知识库，便于团队协作和经验传承。</li>
                <li><b>定期安全培训</b>，提升开发、运维团队安全意识。</li>
                <li><b>建立应急响应预案</b>，遇到高危漏洞可快速隔离和修复。</li>
                <li><b>常见误区：</b>只修复表面、忽视兼容性、未做回归测试。</li>
              </ul>
              <div className="mt-4">
                <b>推荐工具：</b>
                <ul className="list-disc pl-6">
                  <li>Nessus（漏洞扫描）</li>
                  <li>Burp Suite（渗透测试）</li>
                  <li>SonarQube（代码审计）</li>
                  <li>Dependabot（依赖安全监控）</li>
                  <li>GitHub Security Advisory</li>
                  <li>ELK/Splunk（日志监控）</li>
                </ul>
              </div>
              <div className="mt-4">
                <b>注意事项：</b>
                <ul className="list-disc pl-6">
                  <li>修复操作需有审批流程，避免误操作</li>
                  <li>生产环境修复需安排低峰期，提前通知相关方</li>
                  <li>修复后持续监控，防止复发</li>
                  <li>定期组织应急演练，提升团队响应能力</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/dev/tools"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全工具使用
        </Link>
        <Link
          href="/study/security/dev/deploy"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全部署 →
        </Link>
      </div>
    </div>
  );
} 