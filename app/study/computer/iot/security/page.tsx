'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function IoTSecurity() {
  const [activeTab, setActiveTab] = useState('安全威胁');
  const [showCase, setShowCase] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">安全防护</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('安全威胁')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '安全威胁'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          安全威胁
        </button>
        <button
          onClick={() => setActiveTab('防护措施')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '防护措施'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          防护措施
        </button>
        <button
          onClick={() => setActiveTab('安全标准')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '安全标准'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          安全标准
        </button>
        <button
          onClick={() => setActiveTab('案例分析')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '案例分析'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          案例分析
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === '安全威胁' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安全威胁</h2>
            
            {/* 威胁类型 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 威胁类型</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">设备层威胁</h4>
                    <ul className="list-disc pl-6">
                      <li>物理攻击</li>
                      <li>固件篡改</li>
                      <li>侧信道攻击</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">网络层威胁</h4>
                    <ul className="list-disc pl-6">
                      <li>中间人攻击</li>
                      <li>拒绝服务攻击</li>
                      <li>重放攻击</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">应用层威胁</h4>
                    <ul className="list-disc pl-6">
                      <li>数据泄露</li>
                      <li>身份伪造</li>
                      <li>权限提升</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">云平台威胁</h4>
                    <ul className="list-disc pl-6">
                      <li>API滥用</li>
                      <li>数据篡改</li>
                      <li>服务中断</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 攻击流程图 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 攻击流程</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-center">
                  <div className="w-full max-w-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">1</div>
                        <p className="mt-2">信息收集</p>
                      </div>
                      <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">2</div>
                        <p className="mt-2">漏洞利用</p>
                      </div>
                      <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">3</div>
                        <p className="mt-2">权限获取</p>
                      </div>
                      <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">4</div>
                        <p className="mt-2">数据窃取</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 风险等级 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 风险等级</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>低风险</span>
                      <span>高风险</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <h4 className="font-bold">低风险</h4>
                      <p>信息泄露</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <h4 className="font-bold">中风险</h4>
                      <p>服务中断</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <h4 className="font-bold">高风险</h4>
                      <p>系统控制</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '防护措施' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">防护措施</h2>
            
            {/* 设备安全 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 设备安全</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">物理安全</h4>
                    <ul className="list-disc pl-6">
                      <li>防拆设计</li>
                      <li>安全存储</li>
                      <li>访问控制</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">固件安全</h4>
                    <ul className="list-disc pl-6">
                      <li>安全启动</li>
                      <li>固件签名</li>
                      <li>安全更新</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">数据安全</h4>
                    <ul className="list-disc pl-6">
                      <li>加密存储</li>
                      <li>安全擦除</li>
                      <li>访问控制</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 网络安全 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 网络安全</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">通信安全</h4>
                    <ul className="list-disc pl-6">
                      <li>TLS/SSL加密</li>
                      <li>VPN隧道</li>
                      <li>安全协议</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">访问控制</h4>
                    <ul className="list-disc pl-6">
                      <li>身份认证</li>
                      <li>权限管理</li>
                      <li>访问审计</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 应用安全 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 应用安全</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">代码安全</h4>
                    <ul className="list-disc pl-6">
                      <li>代码审计</li>
                      <li>漏洞扫描</li>
                      <li>安全测试</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">API安全</h4>
                    <ul className="list-disc pl-6">
                      <li>接口认证</li>
                      <li>参数验证</li>
                      <li>访问控制</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">数据安全</h4>
                    <ul className="list-disc pl-6">
                      <li>数据加密</li>
                      <li>数据脱敏</li>
                      <li>备份恢复</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '安全标准' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安全标准</h2>
            
            {/* 国际标准 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 国际标准</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">ISO/IEC 27001</h4>
                    <p>信息安全管理体系</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">NIST SP 800-53</h4>
                    <p>安全控制框架</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">IEC 62443</h4>
                    <p>工业控制系统安全</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 国家标准 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 国家标准</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">GB/T 22239</h4>
                    <p>信息安全等级保护</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">GB/T 25069</h4>
                    <p>信息安全术语</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">GB/T 35273</h4>
                    <p>个人信息安全规范</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 行业标准 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 行业标准</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">工业物联网</h4>
                    <ul className="list-disc pl-6">
                      <li>设备安全</li>
                      <li>通信安全</li>
                      <li>数据安全</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">智能家居</h4>
                    <ul className="list-disc pl-6">
                      <li>隐私保护</li>
                      <li>访问控制</li>
                      <li>数据加密</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '案例分析' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">案例分析</h2>
            
            {/* 案例展示 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 智能家居安全</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">攻击场景</h4>
                    <ul className="list-disc pl-6">
                      <li>设备劫持</li>
                      <li>数据窃取</li>
                      <li>远程控制</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">防护措施</h4>
                    <ul className="list-disc pl-6">
                      <li>设备认证</li>
                      <li>通信加密</li>
                      <li>访问控制</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 交互演示 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 安全演示</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <button
                  onClick={() => setShowCase(!showCase)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {showCase ? '隐藏演示' : '显示演示'}
                </button>
                {showCase && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold mb-2">安全攻击演示</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span>设备扫描</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                        <span>漏洞利用</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span>安全防护</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 最佳实践 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 最佳实践</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">设备安全</h4>
                    <ul className="list-disc pl-6">
                      <li>定期更新固件</li>
                      <li>使用强密码</li>
                      <li>启用安全功能</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">网络安全</h4>
                    <ul className="list-disc pl-6">
                      <li>使用加密通信</li>
                      <li>配置防火墙</li>
                      <li>监控网络流量</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">数据安全</h4>
                    <ul className="list-disc pl-6">
                      <li>数据加密存储</li>
                      <li>定期备份数据</li>
                      <li>访问权限控制</li>
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
          href="/study/iot/data-processing"
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          上一页：数据处理
        </Link>
        <Link
          href="/study/iot/applications"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          下一页：应用场景
        </Link>
      </div>
    </div>
  );
} 