"use client";
import { useState } from "react";
import Link from "next/link";

export default function PenetrationWirelessPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">无线网络测试</h1>
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
            <h3 className="text-xl font-semibold mb-3">无线网络测试基础概念</h3>
            <div className="prose max-w-none">
              <p>
                无线网络测试是针对Wi-Fi、蓝牙等无线通信协议和设备进行安全性评估，发现无线环境中的加密、认证、隔离、信号覆盖等安全隐患。测试内容涵盖AP配置、加密协议、客户端安全、钓鱼攻击等多个层面。
              </p>
              <ul>
                <li>目标：发现无线网络中的安全漏洞，防止未授权接入和数据泄露</li>
                <li>范围：AP、客户端、无线协议、信号覆盖、隔离策略等</li>
                <li>方法：信号嗅探+协议分析+攻击模拟+手工测试</li>
              </ul>
              <h4 className="font-semibold mt-4">典型渗透测试代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 无线网卡监听模式
ifconfig wlan0 down
airmon-ng start wlan0

# 捕获握手包
airodump-ng wlan0mon -w handshake --write-interval 1

# 断开客户端
aireplay-ng -0 5 -a <AP_MAC> -c <CLIENT_MAC> wlan0mon`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "flow" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">无线网络测试流程</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>环境准备：无线网卡、驱动、测试平台、信号分析工具</li>
                <li>信号嗅探：扫描AP、客户端、信道、信号强度</li>
                <li>协议分析：识别加密类型、认证方式、隔离策略</li>
                <li>攻击模拟：钓鱼AP、握手包捕获、暴力破解、拒绝服务</li>
                <li>漏洞验证：手动复现和确认无线漏洞</li>
                <li>报告编写：整理漏洞细节和修复建议</li>
              </ol>
              <h4 className="font-semibold mt-4">常用无线测试命令</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 扫描AP和客户端
airodump-ng wlan0mon

# 钓鱼AP搭建
hostapd-wpe hostapd-wpe.conf

# WPA握手包破解
aircrack-ng -w rockyou.txt -b <AP_MAC> handshake.cap`}</code>
              </pre>
            </div>
            {/* SVG信号波+设备分布攻击图 */}
            <div className="my-8">
              <svg width="900" height="400" viewBox="0 0 900 400" className="w-full">
                <defs>
                  <radialGradient id="wifiCenter" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </radialGradient>
                  <linearGradient id="wifiWave" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <filter id="wifiShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
                  </filter>
                </defs>
                {/* 中心AP */}
                <g filter="url(#wifiShadow)">
                  <circle cx="450" cy="200" r="36" fill="url(#wifiCenter)" />
                  {/* AP icon */}
                  <rect x="435" y="190" width="30" height="20" rx="5" fill="#fff" opacity="0.8" />
                  <rect x="445" y="200" width="10" height="4" rx="2" fill="#6366f1" />
                </g>
                {/* 信号波 */}
                <circle cx="450" cy="200" r="80" fill="none" stroke="url(#wifiWave)" strokeWidth="8" opacity="0.7" />
                <circle cx="450" cy="200" r="130" fill="none" stroke="url(#wifiWave)" strokeWidth="6" opacity="0.5" />
                <circle cx="450" cy="200" r="180" fill="none" stroke="url(#wifiWave)" strokeWidth="4" opacity="0.3" />
                {/* 客户端icon */}
                <g>
                  <rect x="320" y="120" width="28" height="18" rx="4" fill="#fff" opacity="0.9" />
                  <rect x="330" y="128" width="8" height="4" rx="2" fill="#06b6d4" />
                  <text x="334" y="140" textAnchor="middle" fill="#6366f1" fontSize="12">Client</text>
                </g>
                <g>
                  <rect x="600" y="120" width="28" height="18" rx="4" fill="#fff" opacity="0.9" />
                  <rect x="610" y="128" width="8" height="4" rx="2" fill="#06b6d4" />
                  <text x="614" y="140" textAnchor="middle" fill="#6366f1" fontSize="12">Client</text>
                </g>
                {/* 攻击者icon */}
                <g>
                  <circle cx="320" cy="320" r="16" fill="#f472b6" opacity="0.8" />
                  <text x="320" y="325" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">ATK</text>
                </g>
                {/* 钓鱼AP icon */}
                <g>
                  <rect x="600" y="320" width="32" height="20" rx="6" fill="#fbbf24" opacity="0.8" />
                  <rect x="610" y="330" width="12" height="4" rx="2" fill="#fff" />
                  <text x="616" y="345" textAnchor="middle" fill="#6366f1" fontSize="12">Fake</text>
                </g>
                {/* 攻击路径 */}
                <path d="M320,320 Q400,250 450,236" stroke="#f472b6" strokeWidth="3" fill="none" strokeDasharray="8,6" />
                <path d="M600,320 Q500,250 450,236" stroke="#fbbf24" strokeWidth="3" fill="none" strokeDasharray="8,6" />
              </svg>
            </div>
          </div>
        )}
        {activeTab === "vuln" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见无线网络漏洞类型</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>弱加密协议：</b> WEP、WPA等易被破解的加密方式</li>
                <li><b>钓鱼AP：</b> 伪造合法AP诱骗用户连接</li>
                <li><b>中间人攻击：</b> 劫持通信流量，窃取敏感信息</li>
                <li><b>拒绝服务：</b> 断开客户端、信号干扰、AP泛洪</li>
                <li><b>客户端漏洞：</b> 驱动、配置、认证缺陷</li>
                <li><b>隔离策略缺失：</b> 客户端间可互访、内网暴露</li>
              </ul>
              <h4 className="font-semibold mt-4">漏洞利用代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# WEP破解
aircrack-ng -b <AP_MAC> -w rockyou.txt capture.cap

# 钓鱼AP搭建
hostapd-wpe hostapd-wpe.conf

# 中间人攻击
ettercap -T -q -i wlan0 -M arp:remote /<target_ip>/ /<gateway_ip>/`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">无线安全测试工具与实践</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>aircrack-ng：</b> 无线抓包、破解、注入全能套件</li>
                <li><b>hostapd-wpe：</b> 钓鱼AP搭建与认证信息捕获</li>
                <li><b>Wireshark：</b> 无线协议分析与流量抓取</li>
                <li><b>ettercap：</b> 中间人攻击与ARP欺骗</li>
                <li><b>kismet：</b> 无线信号嗅探与设备发现</li>
                <li><b>Wifite：</b> 自动化无线攻击工具</li>
              </ul>
              <h4 className="font-semibold mt-4">工具实践代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# aircrack-ng破解WPA
aircrack-ng -w rockyou.txt -b <AP_MAC> handshake.cap

# Wireshark抓包分析
wireshark &

# Wifite自动化攻击
wifite --kill --timeout 30`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/penetration/mobile"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 移动应用测试
        </Link>
        <Link
          href="/study/security/penetration/social"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          社会工程学 →
        </Link>
      </div>
    </div>
  );
} 