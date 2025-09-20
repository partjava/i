"use client";
import { useState } from "react";
import Link from "next/link";

export default function PenetrationSocialPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">社会工程学</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("intro")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "intro"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "flow"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          攻击流程
        </button>
        <button
          onClick={() => setActiveTab("methods")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "methods"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常见手法
        </button>
        <button
          onClick={() => setActiveTab("defense")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "defense"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工具与防御
        </button>
      </div>
      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "intro" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">社会工程学基础概念</h3>
            <div className="prose max-w-none">
              <p>
                社会工程学（Social Engineering）是指利用人性的弱点，通过心理操控、欺骗、诱导等手段获取敏感信息、访问权限或实施攻击的技术和方法。它强调"攻心为上"，往往绕过技术防线，直接针对人。
              </p>
              <ul>
                <li>目标：获取账号密码、敏感数据、物理访问、植入恶意程序等</li>
                <li>常见对象：企业员工、管理人员、IT支持、普通用户</li>
                <li>典型特征：伪装、诱骗、紧急感、权威感、好奇心、贪婪心理</li>
              </ul>
              <h4 className="font-semibold mt-4">典型社会工程学攻击脚本示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 钓鱼邮件伪造
sendEmail -f fake@company.com -t victim@company.com -u "紧急：请重置密码" -m "请点击链接重置密码" -s smtp.server.com:25

# 伪造登录页面（Phishing）
# 使用SET工具包
setoolkit
# 选择 Social-Engineering Attacks -> Website Attack Vectors -> Credential Harvester Attack Method`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "flow" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">社会工程学攻击流程</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>信息收集：收集目标个人、组织、联系方式、兴趣、社交账号等信息</li>
                <li>关系建立：通过邮件、电话、社交平台等建立初步信任</li>
                <li>心理诱导：利用权威、紧急、好奇、贪婪等心理弱点设计诱饵</li>
                <li>实施攻击：发送钓鱼邮件、伪造网站、电话诈骗、USB投递等</li>
                <li>获取结果：收集凭证、植入后门、窃取数据、物理入侵等</li>
                <li>痕迹清理：删除痕迹、销毁证据、转移赃物</li>
              </ol>
              <h4 className="font-semibold mt-4">自动化信息收集脚本</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 社交平台信息收集
python3 sherlock.py username

# 邮箱泄露查询
python3 holehe.py victim@email.com

# 电话钓鱼自动拨号
# 使用Twilio API
from twilio.rest import Client
client = Client(account_sid, auth_token)
call = client.calls.create(to='+8613812345678', from_='+12025550123', url='http://demo.twilio.com/docs/voice.xml')`}</code>
              </pre>
            </div>
            {/* SVG攻击链与心理诱导流程图 */}
            <div className="my-8">
              <svg width="900" height="420" viewBox="0 0 900 420" className="w-full">
                <defs>
                  <linearGradient id="socialMain" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="socialBranch" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <filter id="socialShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
                  </filter>
                  <marker id="socialArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
                  </marker>
                </defs>
                {/* 主流程 */}
                <rect x="80" y="180" width="120" height="60" rx="20" fill="url(#socialMain)" filter="url(#socialShadow)" />
                <text x="140" y="215" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">信息收集</text>
                <rect x="240" y="180" width="120" height="60" rx="20" fill="url(#socialMain)" filter="url(#socialShadow)" />
                <text x="300" y="215" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">关系建立</text>
                <rect x="400" y="180" width="120" height="60" rx="20" fill="url(#socialMain)" filter="url(#socialShadow)" />
                <text x="460" y="215" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">心理诱导</text>
                <rect x="560" y="180" width="120" height="60" rx="20" fill="url(#socialMain)" filter="url(#socialShadow)" />
                <text x="620" y="215" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">实施攻击</text>
                <rect x="720" y="180" width="120" height="60" rx="20" fill="url(#socialMain)" filter="url(#socialShadow)" />
                <text x="780" y="215" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">获取结果</text>
                {/* 分支：心理诱导分流 */}
                <rect x="400" y="80" width="120" height="60" rx="20" fill="url(#socialBranch)" filter="url(#socialShadow)" />
                <text x="460" y="115" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">权威感</text>
                <rect x="400" y="320" width="120" height="60" rx="20" fill="url(#socialBranch)" filter="url(#socialShadow)" />
                <text x="460" y="355" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">贪婪心理</text>
                {/* 箭头 */}
                <path d="M200,210 L240,210" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#socialArrow)" />
                <path d="M360,210 L400,210" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#socialArrow)" />
                <path d="M520,210 L560,210" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#socialArrow)" />
                <path d="M680,210 L720,210" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#socialArrow)" />
                {/* 分支箭头 */}
                <path d="M460,180 Q470,150 460,140" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#socialArrow)" fill="none" />
                <path d="M460,240 Q470,300 460,320" stroke="#f472b6" strokeWidth="3" markerEnd="url(#socialArrow)" fill="none" />
              </svg>
            </div>
          </div>
        )}
        {activeTab === "methods" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见社会工程学攻击手法</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>钓鱼攻击（Phishing）：</b> 伪造邮件、网站、短信诱骗用户输入敏感信息</li>
                <li><b>电话诈骗（Vishing）：</b> 伪装成客服、银行、技术支持等进行电话欺骗</li>
                <li><b>鱼叉式攻击（Spear Phishing）：</b> 针对特定目标定制化钓鱼内容</li>
                <li><b>诱骗U盘投递：</b> 故意丢弃带有恶意程序的U盘，诱使目标插入电脑</li>
                <li><b>假冒身份：</b> 伪装成同事、领导、供应商等获取信任</li>
                <li><b>尾随入侵：</b> 跟随合法人员进入受限区域</li>
                <li><b>社交媒体诱导：</b> 通过社交平台获取信息或实施攻击</li>
              </ul>
              <h4 className="font-semibold mt-4">攻击实操脚本/命令示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 伪造短信钓鱼
sms-tool send --to 13812345678 --text "您的快递已到，请点击链接填写信息"

# U盘自动运行木马
[autorun]
open=malware.exe

# 社交平台自动化私信
python3 mass_dm.py --platform twitter --message "Hi, 请查收附件"`}</code>
              </pre>
              <h4 className="font-semibold mt-4">真实案例分析</h4>
              <ul>
                <li>2016年美国民主党邮件泄露事件：黑客通过鱼叉式钓鱼邮件窃取账号密码，导致大量敏感邮件泄露。</li>
                <li>某企业员工收到伪造领导的紧急转账邮件，因信任权威被骗数十万元。</li>
                <li>某公司门口投放带有木马的U盘，员工好奇插入后导致内网沦陷。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">社会工程学防御与检测工具</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>安全意识培训：</b> 定期开展员工安全教育，提升防范意识</li>
                <li><b>钓鱼邮件仿真演练：</b> 使用PhishMe、GoPhish等平台进行内部演练</li>
                <li><b>多因素认证：</b> 降低凭证泄露带来的风险</li>
                <li><b>邮件/短信网关过滤：</b> 部署反钓鱼、反垃圾邮件系统</li>
                <li><b>物理安全措施：</b> 门禁、访客登记、视频监控等</li>
                <li><b>异常行为检测：</b> 日志分析、UEBA、SOC联动</li>
              </ul>
              <h4 className="font-semibold mt-4">防御实操脚本/命令示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# GoPhish搭建钓鱼演练平台
gophish admin --listen 0.0.0.0:3333

# 邮件网关规则示例
if subject contains "重置密码" and sender not in whitelist then quarantine

# 检测异常登录
python3 detect_login_anomaly.py --logfile auth.log`}</code>
              </pre>
              <h4 className="font-semibold mt-4">防御建议总结</h4>
              <ul>
                <li>定期开展社会工程学攻防演练，检验员工防范能力</li>
                <li>完善应急响应流程，发现异常及时处置</li>
                <li>加强物理和信息安全的协同防护</li>
                <li>建立举报机制，鼓励员工发现可疑行为及时上报</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/penetration/wireless"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 无线网络测试
        </Link>
        <Link
          href="/study/security/penetration/report"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          渗透测试报告 →
        </Link>
      </div>
    </div>
  );
} 