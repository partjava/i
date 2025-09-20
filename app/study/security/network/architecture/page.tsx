 'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NetworkArchitecturePage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">网络基础架构</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'basic'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          网络架构
        </button>
        <button
          onClick={() => setActiveTab('protocol')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'protocol'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          网络协议
        </button>
        <button
          onClick={() => setActiveTab('ip')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'ip'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          IP地址
        </button>
        <button
          onClick={() => setActiveTab('device')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'device'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          网络设备
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络架构基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. OSI七层模型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">OSI（开放系统互连）模型将网络通信分为七个层次：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>应用层（第7层）：提供用户接口和网络服务，如HTTP、FTP、SMTP等</li>
                      <li>表示层（第6层）：负责数据格式转换、加密解密等</li>
                      <li>会话层（第5层）：建立、管理和终止会话</li>
                      <li>传输层（第4层）：提供端到端的可靠传输，如TCP、UDP</li>
                      <li>网络层（第3层）：负责路由选择和IP地址分配</li>
                      <li>数据链路层（第2层）：提供物理寻址和错误检测</li>
                      <li>物理层（第1层）：负责物理介质上的比特流传输</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. TCP/IP四层模型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">TCP/IP模型是互联网实际使用的协议栈，分为四层：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>应用层：对应OSI的应用层、表示层和会话层
                        <ul className="list-disc pl-6 mt-2">
                          <li>HTTP（80端口）：网页浏览</li>
                          <li>HTTPS（443端口）：安全网页浏览</li>
                          <li>FTP（21端口）：文件传输</li>
                          <li>SMTP（25端口）：邮件发送</li>
                          <li>POP3（110端口）：邮件接收</li>
                          <li>DNS（53端口）：域名解析</li>
                        </ul>
                      </li>
                      <li>传输层：对应OSI的传输层
                        <ul className="list-disc pl-6 mt-2">
                          <li>TCP：面向连接，可靠传输</li>
                          <li>UDP：无连接，快速传输</li>
                        </ul>
                      </li>
                      <li>网络层：对应OSI的网络层
                        <ul className="list-disc pl-6 mt-2">
                          <li>IP：网络寻址</li>
                          <li>ICMP：网络控制</li>
                          <li>ARP：地址解析</li>
                        </ul>
                      </li>
                      <li>网络接口层：对应OSI的数据链路层和物理层
                        <ul className="list-disc pl-6 mt-2">
                          <li>以太网</li>
                          <li>Wi-Fi</li>
                          <li>PPP</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protocol' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络协议详解</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 应用层协议</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>HTTP/HTTPS
                        <ul className="list-disc pl-6 mt-2">
                          <li>HTTP：明文传输，端口80</li>
                          <li>HTTPS：加密传输，端口443</li>
                          <li>主要方法：GET、POST、PUT、DELETE等</li>
                          <li>状态码：200（成功）、404（未找到）、500（服务器错误）等</li>
                        </ul>
                      </li>
                      <li>FTP
                        <ul className="list-disc pl-6 mt-2">
                          <li>控制连接：端口21</li>
                          <li>数据连接：端口20</li>
                          <li>支持匿名和认证两种模式</li>
                        </ul>
                      </li>
                      <li>SMTP/POP3/IMAP
                        <ul className="list-disc pl-6 mt-2">
                          <li>SMTP：发送邮件，端口25</li>
                          <li>POP3：接收邮件，端口110</li>
                          <li>IMAP：邮件管理，端口143</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 传输层协议</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>TCP（传输控制协议）
                        <ul className="list-disc pl-6 mt-2">
                          <li>面向连接</li>
                          <li>可靠传输</li>
                          <li>流量控制</li>
                          <li>拥塞控制</li>
                          <li>三次握手建立连接</li>
                          <li>四次挥手断开连接</li>
                        </ul>
                      </li>
                      <li>UDP（用户数据报协议）
                        <ul className="list-disc pl-6 mt-2">
                          <li>无连接</li>
                          <li>不可靠传输</li>
                          <li>无流量控制</li>
                          <li>无拥塞控制</li>
                          <li>适用于实时应用</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ip' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">IP地址详解</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. IPv4地址</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>地址格式
                        <ul className="list-disc pl-6 mt-2">
                          <li>32位二进制数</li>
                          <li>点分十进制表示（如：192.168.1.1）</li>
                          <li>每个字节范围：0-255</li>
                        </ul>
                      </li>
                      <li>地址分类
                        <ul className="list-disc pl-6 mt-2">
                          <li>A类：1.0.0.0 - 126.255.255.255</li>
                          <li>B类：128.0.0.0 - 191.255.255.255</li>
                          <li>C类：192.0.0.0 - 223.255.255.255</li>
                          <li>D类：224.0.0.0 - 239.255.255.255（组播）</li>
                          <li>E类：240.0.0.0 - 255.255.255.255（保留）</li>
                        </ul>
                      </li>
                      <li>特殊地址
                        <ul className="list-disc pl-6 mt-2">
                          <li>127.0.0.1：本地回环地址</li>
                          <li>0.0.0.0：默认路由</li>
                          <li>255.255.255.255：广播地址</li>
                          <li>私有地址范围：
                            <ul className="list-disc pl-6 mt-2">
                              <li>10.0.0.0 - 10.255.255.255</li>
                              <li>172.16.0.0 - 172.31.255.255</li>
                              <li>192.168.0.0 - 192.168.255.255</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. IPv6地址</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>地址格式
                        <ul className="list-disc pl-6 mt-2">
                          <li>128位二进制数</li>
                          <li>冒号分隔的十六进制表示</li>
                          <li>例如：2001:0db8:85a3:0000:0000:8a2e:0370:7334</li>
                        </ul>
                      </li>
                      <li>地址类型
                        <ul className="list-disc pl-6 mt-2">
                          <li>单播地址：一对一通信</li>
                          <li>多播地址：一对多通信</li>
                          <li>任播地址：一对最近通信</li>
                        </ul>
                      </li>
                      <li>特殊地址
                        <ul className="list-disc pl-6 mt-2">
                          <li>::1：本地回环地址</li>
                          <li>::：未指定地址</li>
                          <li>fe80::/10：链路本地地址</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 子网划分</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>子网掩码
                        <ul className="list-disc pl-6 mt-2">
                          <li>用于划分网络和主机部分</li>
                          <li>例如：255.255.255.0（/24）</li>
                          <li>常用掩码：/8、/16、/24、/32</li>
                        </ul>
                      </li>
                      <li>CIDR表示法
                        <ul className="list-disc pl-6 mt-2">
                          <li>例如：192.168.1.0/24</li>
                          <li>表示前24位为网络部分</li>
                          <li>后8位为主机部分</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'device' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络设备</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 物理层设备</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>网卡（NIC）
                        <ul className="list-disc pl-6 mt-2">
                          <li>速率：10Mbps、100Mbps、1Gbps、10Gbps</li>
                          <li>接口类型：RJ45、光纤、无线</li>
                          <li>MAC地址：48位唯一标识符</li>
                        </ul>
                      </li>
                      <li>集线器（Hub）
                        <ul className="list-disc pl-6 mt-2">
                          <li>工作在物理层</li>
                          <li>广播式传输</li>
                          <li>半双工通信</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 数据链路层设备</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>交换机（Switch）
                        <ul className="list-disc pl-6 mt-2">
                          <li>工作在数据链路层</li>
                          <li>基于MAC地址转发</li>
                          <li>全双工通信</li>
                          <li>支持VLAN划分</li>
                        </ul>
                      </li>
                      <li>网桥（Bridge）
                        <ul className="list-disc pl-6 mt-2">
                          <li>连接不同网段</li>
                          <li>过滤和转发数据帧</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 网络层设备</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>路由器（Router）
                        <ul className="list-disc pl-6 mt-2">
                          <li>工作在网络层</li>
                          <li>基于IP地址转发</li>
                          <li>支持路由协议</li>
                          <li>NAT地址转换</li>
                          <li>ACL访问控制</li>
                        </ul>
                      </li>
                      <li>三层交换机
                        <ul className="list-disc pl-6 mt-2">
                          <li>结合交换机和路由器功能</li>
                          <li>支持VLAN间路由</li>
                          <li>高性能转发</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/intro"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 网络安全概述
        </Link>
        <Link 
          href="/study/security/network/framework"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全模型与框架 →
        </Link>
      </div>
    </div>
  );
}