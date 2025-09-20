"use client";
import { useState } from "react";
import Link from "next/link";

export default function PenetrationPostPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">后渗透测试</h1>
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
          onClick={() => setActiveTab("steps")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "steps"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          主要环节
        </button>
        <button
          onClick={() => setActiveTab("tech")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tech"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常用技术
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工具与实践
        </button>
      </div>
      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "intro" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">后渗透测试基础概念</h3>
            <div className="prose max-w-none">
              <p>
                后渗透测试是指在成功获取目标系统初步访问权限后，进一步扩展控制范围、提升权限、收集敏感信息、建立持久化后门等一系列操作。其目的是最大化渗透测试的影响力，模拟真实攻击者的后续行为。
              </p>
              <ul>
                <li>横向移动：在内网中寻找并攻陷更多主机</li>
                <li>权限提升：利用系统漏洞获取更高权限</li>
                <li>凭证收集：获取账号密码、哈希、票据等敏感凭证</li>
                <li>数据提取：窃取敏感文件、数据库、邮件等信息</li>
                <li>持久化控制：植入后门，确保长期访问</li>
                <li>痕迹清理：清除日志，隐藏攻击行为</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "steps" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">后渗透测试主要环节</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li><b>横向移动：</b> 利用已控主机为跳板，攻击内网其他主机，实现权限扩散。</li>
                <li><b>权限提升：</b> 利用本地提权漏洞、配置错误等手段获取管理员权限。</li>
                <li><b>凭证收集：</b> 获取系统、数据库、域控等账号密码、哈希、票据。</li>
                <li><b>数据提取：</b> 搜集并窃取敏感文件、数据库、邮件等核心数据。</li>
                <li><b>持久化控制：</b> 部署后门、计划任务、注册表等方式维持长期访问。</li>
                <li><b>痕迹清理：</b> 删除日志、清理命令历史、隐藏恶意文件。</li>
              </ol>
            </div>
            {/* SVG网络拓扑图：中心主机+分支+icon+渐变+阴影 */}
            <div className="my-8">
              <svg width="900" height="420" viewBox="0 0 900 420" className="w-full">
                <defs>
                  <radialGradient id="postCenter" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e42" />
                  </radialGradient>
                  <linearGradient id="postNode" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
                  </filter>
                  <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
                  </marker>
                  <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f59e42"/>
                  </marker>
                </defs>
                {/* 中心主机 */}
                <circle cx="450" cy="210" r="50" fill="url(#postCenter)" filter="url(#shadow2)" />
                {/* 主机icon */}
                <rect x="425" y="195" width="50" height="30" rx="6" fill="#fff" opacity="0.7"/>
                <rect x="435" y="210" width="30" height="10" rx="2" fill="#6366f1" />
                <text x="450" y="185" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">已控主机</text>
                {/* 横向移动 */}
                <ellipse cx="200" cy="100" rx="60" ry="30" fill="url(#postNode)" filter="url(#shadow2)" />
                <text x="200" y="105" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">横向移动</text>
                {/* 权限提升 */}
                <ellipse cx="700" cy="100" rx="60" ry="30" fill="url(#postNode)" filter="url(#shadow2)" />
                <text x="700" y="105" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">权限提升</text>
                {/* 凭证收集 */}
                <ellipse cx="200" cy="320" rx="60" ry="30" fill="url(#postNode)" filter="url(#shadow2)" />
                <text x="200" y="325" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">凭证收集</text>
                {/* 数据提取 */}
                <ellipse cx="700" cy="320" rx="60" ry="30" fill="url(#postNode)" filter="url(#shadow2)" />
                <text x="700" y="325" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">数据提取</text>
                {/* 持久化 */}
                <ellipse cx="450" cy="390" rx="60" ry="30" fill="url(#postNode)" filter="url(#shadow2)" />
                <text x="450" y="395" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">持久化</text>
                {/* 连线 */}
                <path d="M450,160 Q325,120 260,110" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrow2)" fill="none"/>
                <path d="M450,160 Q575,120 640,110" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrow2)" fill="none"/>
                <path d="M450,260 Q325,300 260,310" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrow2)" fill="none"/>
                <path d="M450,260 Q575,300 640,310" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrow2)" fill="none"/>
                <path d="M450,260 L450,360" stroke="#f59e42" strokeWidth="4" markerEnd="url(#arrow3)" fill="none"/>
                {/* 虚线：隐蔽路径 */}
                <path d="M260,110 Q350,50 450,60" stroke="#f59e42" strokeWidth="2" strokeDasharray="8,6" markerEnd="url(#arrow3)" fill="none"/>
                {/* icon示例 */}
                {/* 钥匙icon-凭证收集 */}
                <g>
                  <circle cx="180" cy="320" r="8" fill="#fff" opacity="0.7"/>
                  <rect x="185" y="320" width="12" height="3" rx="1.5" fill="#6366f1" />
                </g>
                {/* 文件icon-数据提取 */}
                <g>
                  <rect x="685" y="310" width="18" height="14" rx="2" fill="#fff" opacity="0.7"/>
                  <rect x="685" y="310" width="18" height="3" fill="#6366f1" />
                </g>
                {/* 齿轮icon-持久化 */}
                <g>
                  <circle cx="450" cy="390" r="8" fill="#fff" opacity="0.7"/>
                  <path d="M450 382 v16 M442 390 h16" stroke="#6366f1" strokeWidth="2"/>
                </g>
              </svg>
            </div>
          </div>
        )}
        {activeTab === "tech" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常用后渗透技术</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>横向移动：</b> SMB Relay、Pass-the-Hash、RDP、WMI、PsExec、远程桌面等</li>
                <li><b>权限提升：</b> 本地提权漏洞（如CVE-2016-0099）、提权脚本、服务配置错误</li>
                <li><b>凭证收集：</b> Mimikatz、lsass转储、浏览器密码、注册表、票据窃取</li>
                <li><b>数据提取：</b> 文件打包、数据库导出、邮件抓取、内网流量转发</li>
                <li><b>持久化控制：</b> 注册表启动项、计划任务、服务植入、WebShell、Rootkit</li>
                <li><b>痕迹清理：</b> 清除日志、删除命令历史、隐藏文件、时间戳伪造</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">后渗透测试工具与实践</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>Mimikatz：</b> Windows凭证抓取与票据窃取利器</li>
                <li><b>PowerView：</b> 内网信息收集与域渗透工具</li>
                <li><b>Impacket：</b> 支持SMB、RDP、WMI等协议的横向移动工具集</li>
                <li><b>CrackMapExec：</b> 内网批量操作与横向移动自动化工具</li>
                <li><b>SharpHound/BloodHound：</b> 域控关系分析与权限路径可视化</li>
                <li><b>Rubeus：</b> Kerberos票据操作与攻击工具</li>
                <li><b>Netcat/Socat：</b> 反弹Shell、端口转发、隧道搭建</li>
              </ul>
              <h4 className="font-semibold mt-4">实践案例</h4>
              <ol className="list-decimal pl-6">
                <li>利用Mimikatz抓取域控主机的明文密码和哈希，实现横向移动</li>
                <li>使用Impacket的smbexec/psexec模块批量控制内网主机</li>
                <li>通过BloodHound分析域权限关系，寻找最短提权路径</li>
                <li>利用计划任务和注册表实现持久化后门</li>
                <li>清理Windows日志和命令历史，规避检测</li>
              </ol>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/penetration/exploit"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 漏洞利用
        </Link>
        <Link
          href="/study/security/penetration/web"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          Web应用测试 →
        </Link>
      </div>
    </div>
  );
} 