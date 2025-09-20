"use client";
import { useState } from "react";
import Link from "next/link";

export default function PenetrationMobilePage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">移动应用测试</h1>
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
          测试流程
        </button>
        <button
          onClick={() => setActiveTab("vuln")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "vuln"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常见漏洞
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
            <h3 className="text-xl font-semibold mb-3">移动应用测试基础概念</h3>
            <div className="prose max-w-none">
              <p>
                移动应用测试是针对Android、iOS等移动端App进行安全性评估，发现应用在数据存储、通信、权限、加密、逆向等方面的安全隐患。测试内容涵盖本地存储、网络通信、组件滥用、代码安全、第三方库等多个层面。
              </p>
              <ul>
                <li>目标：发现移动App中的安全漏洞，防止数据泄露和被攻击</li>
                <li>范围：APK/IPA包、App本地存储、网络接口、系统权限、加密实现等</li>
                <li>方法：静态分析+动态分析+逆向工程+手工测试</li>
              </ul>
              <h4 className="font-semibold mt-4">典型渗透测试代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# APK反编译
apktool d app.apk -o out

# iOS砸壳
frida -U -f com.example.app -l dump.js --no-pause

# 抓包分析
mitmproxy -p 8080`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "flow" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">移动应用测试流程</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>环境准备：搭建测试手机/模拟器、抓包代理、root/jailbreak</li>
                <li>静态分析：反编译App，分析代码、资源、配置</li>
                <li>动态分析：运行时监控、Hook、流量抓取、行为分析</li>
                <li>逆向工程：分析加密算法、协议、关键逻辑</li>
                <li>漏洞验证：手动复现和确认漏洞</li>
                <li>报告编写：整理漏洞细节和修复建议</li>
              </ol>
              <h4 className="font-semibold mt-4">常用测试命令</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# Android抓取本地数据库
adb shell "run-as com.example.app cat /data/data/com.example.app/databases/user.db > /sdcard/user.db"
adb pull /sdcard/user.db

# iOS查看Keychain
security dump-keychain -d login.keychain-db

# Frida注入脚本
frida -U -f com.example.app -l hook.js --no-pause`}</code>
              </pre>
            </div>
            {/* SVG环形攻击链图 */}
            <div className="my-8">
              <svg width="900" height="400" viewBox="0 0 900 400" className="w-full">
                <defs>
                  <radialGradient id="mobileCenter" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </radialGradient>
                  <linearGradient id="mobileArc" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <filter id="mobileShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
                  </filter>
                </defs>
                {/* 中心手机icon */}
                <g filter="url(#mobileShadow)">
                  <rect x="420" y="160" width="60" height="120" rx="16" fill="url(#mobileCenter)" />
                  <rect x="440" y="180" width="20" height="60" rx="6" fill="#fff" opacity="0.3" />
                  <circle cx="450" cy="265" r="5" fill="#fff" />
                </g>
                {/* 环形攻击链 */}
                <g>
                  <path d="M450,100 A120,120 0 1,1 449,100.1" stroke="url(#mobileArc)" strokeWidth="18" fill="none" />
                  {/* 各类攻击icon分布在环上 */}
                  {/* 数据泄露 */}
                  <g>
                    <circle cx="570" cy="140" r="18" fill="#fff" opacity="0.8" />
                    <text x="570" y="145" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">DB</text>
                  </g>
                  {/* 逆向破解 */}
                  <g>
                    <circle cx="650" cy="220" r="18" fill="#fff" opacity="0.8" />
                    <text x="650" y="225" textAnchor="middle" fill="#6366f1" fontSize="16" fontWeight="bold">逆</text>
                  </g>
                  {/* 权限绕过 */}
                  <g>
                    <circle cx="570" cy="300" r="18" fill="#fff" opacity="0.8" />
                    <text x="570" y="305" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="bold">权</text>
                  </g>
                  {/* 通信劫持 */}
                  <g>
                    <circle cx="330" cy="300" r="18" fill="#fff" opacity="0.8" />
                    <text x="330" y="305" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">通</text>
                  </g>
                  {/* 恶意注入 */}
                  <g>
                    <circle cx="250" cy="220" r="18" fill="#fff" opacity="0.8" />
                    <text x="250" y="225" textAnchor="middle" fill="#f472b6" fontSize="16" fontWeight="bold">注</text>
                  </g>
                  {/* 代码执行 */}
                  <g>
                    <circle cx="330" cy="140" r="18" fill="#fff" opacity="0.8" />
                    <text x="330" y="145" textAnchor="middle" fill="#6366f1" fontSize="16" fontWeight="bold">执</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        )}
        {activeTab === "vuln" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见移动应用漏洞类型</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>数据泄露：</b> 敏感信息明文存储、日志泄露、SD卡泄露</li>
                <li><b>逆向破解：</b> 代码混淆不足、加固绕过、算法泄露</li>
                <li><b>权限绕过：</b> 滥用系统权限、未授权操作、组件导出</li>
                <li><b>通信劫持：</b> HTTP明文、证书校验缺失、中间人攻击</li>
                <li><b>恶意注入：</b> WebView注入、动态加载、反射调用</li>
                <li><b>代码执行：</b> 远程命令执行、动态代码加载</li>
              </ul>
              <h4 className="font-semibold mt-4">漏洞利用代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# Android本地数据库明文
adb shell "cat /data/data/com.example.app/databases/user.db"

# iOS越狱后提权
su root

# WebView注入
javascript:alert(document.cookie)`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">移动安全测试工具与实践</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>Frida：</b> 动态注入与Hook分析</li>
                <li><b>Jadx/Apktool：</b> APK反编译与静态分析</li>
                <li><b>MobSF：</b> 一站式移动安全自动化分析平台</li>
                <li><b>Burp Suite/mitmproxy：</b> 抓包与流量劫持</li>
                <li><b>Objection：</b> 无Root/Jailbreak下的渗透测试工具</li>
                <li><b>Cycript/Needle：</b> iOS动态分析与注入</li>
              </ul>
              <h4 className="font-semibold mt-4">工具实践代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# MobSF自动化分析
python manage.py runserver
# 浏览器访问 http://127.0.0.1:8000 上传APK/IPA

# Frida注入
frida -U -f com.example.app -l hook.js --no-pause

# Jadx反编译APK
jadx-gui app.apk`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/penetration/web"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← Web应用测试
        </Link>
        <Link
          href="/study/security/penetration/wireless"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          无线网络测试 →
        </Link>
      </div>
    </div>
  );
} 