'use client'

import React, { useState } from 'react'
import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '物联网',
  chapterTitle: '安全防护',
  chapterNumber: 5,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '数据处理', href: '/study/computer/iot/data-processing' },
  nextChapter: { label: '应用场景', href: '/study/computer/iot/applications' },
  theme: THEMES.computer,
}

function SecurityDemo() {
  const [showCase, setShowCase] = useState(false)
  return (
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
            <div className="flex items-center"><div className="w-4 h-4 bg-red-500 rounded-full mr-2" /><span>设备扫描</span></div>
            <div className="flex items-center"><div className="w-4 h-4 bg-yellow-500 rounded-full mr-2" /><span>漏洞利用</span></div>
            <div className="flex items-center"><div className="w-4 h-4 bg-green-500 rounded-full mr-2" /><span>安全防护</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

const SPREADS = [
  {
    label: '安全威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>安全威胁</PageTitle>
        <SectionTitle>1. 威胁类型</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">设备层威胁</h4>
            <BookList items={['物理攻击', '固件篡改', '侧信道攻击']} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">网络层威胁</h4>
            <BookList items={['中间人攻击', '拒绝服务攻击', '重放攻击']} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">应用层威胁</h4>
            <BookList items={['数据泄露', '身份伪造', '权限提升']} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">云平台威胁</h4>
            <BookList items={['API滥用', '数据篡改', '服务中断']} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 攻击流程</SectionTitle>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">1</div>
              <p className="mt-2">信息收集</p>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4" />
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">2</div>
              <p className="mt-2">漏洞利用</p>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4" />
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">3</div>
              <p className="mt-2">权限获取</p>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4" />
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">4</div>
              <p className="mt-2">数据窃取</p>
            </div>
          </div>
        </div>
        <SectionTitle>3. 风险等级</SectionTitle>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-4 rounded-full" style={{ width: '100%' }} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-100 p-3 rounded-lg"><h4 className="font-bold">低风险</h4><p>信息泄露</p></div>
              <div className="bg-yellow-100 p-3 rounded-lg"><h4 className="font-bold">中风险</h4><p>服务中断</p></div>
              <div className="bg-red-100 p-3 rounded-lg"><h4 className="font-bold">高风险</h4><p>系统控制</p></div>
            </div>
          </div>
        </div>
        <TagGrid items={['攻击', '威胁', '风险', '中间人', 'DDoS']} />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>防护措施</PageTitle>
        <SectionTitle>1. 设备安全</SectionTitle>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold mb-2">物理安全</h4>
              <BookList items={['防拆设计', '安全存储', '访问控制']} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold mb-2">固件安全</h4>
              <BookList items={['安全启动', '固件签名', '安全更新']} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold mb-2">数据安全</h4>
              <BookList items={['加密存储', '安全擦除', '访问控制']} />
            </div>
          </div>
        </div>
        <SectionTitle>2. 网络安全</SectionTitle>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><h4 className="font-bold mb-2">通信安全</h4><BookList items={['TLS/SSL加密', 'VPN隧道', '安全协议']} /></div>
            <div><h4 className="font-bold mb-2">访问控制</h4><BookList items={['身份认证', '权限管理', '访问审计']} /></div>
          </div>
        </div>
        <SectionTitle>3. 应用安全</SectionTitle>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold mb-2">代码安全</h4><BookList items={['代码审计', '漏洞扫描', '安全测试']} /></div>
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold mb-2">API安全</h4><BookList items={['接口认证', '参数验证', '访问控制']} /></div>
            <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold mb-2">数据安全</h4><BookList items={['数据加密', '数据脱敏', '备份恢复']} /></div>
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>安全标准</SectionTitle>
        <BookParagraph><strong>国际标准：</strong></BookParagraph>
        <div className="bg-white p-4 rounded-lg shadow mb-4"><h4 className="font-bold mb-1">ISO/IEC 27001</h4><p>信息安全管理体系</p></div>
        <div className="bg-white p-4 rounded-lg shadow mb-4"><h4 className="font-bold mb-1">NIST SP 800-53</h4><p>安全控制框架</p></div>
        <div className="bg-white p-4 rounded-lg shadow mb-4"><h4 className="font-bold mb-1">IEC 62443</h4><p>工业控制系统安全</p></div>
        <BookParagraph><strong>国家标准：</strong></BookParagraph>
        <div className="bg-white p-4 rounded-lg shadow mb-4"><h4 className="font-bold mb-1">GB/T 22239</h4><p>信息安全等级保护</p></div>
        <div className="bg-white p-4 rounded-lg shadow mb-4"><h4 className="font-bold mb-1">GB/T 25069</h4><p>信息安全术语</p></div>
        <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold mb-1">GB/T 35273</h4><p>个人信息安全规范</p></div>
      </div>
    ),
  },
  {
    label: '案例分析',
    left: (
      <div className="space-y-4">
        <PageTitle>案例分析</PageTitle>
        <SectionTitle>1. 智能家居安全</SectionTitle>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><h4 className="font-bold mb-2">攻击场景</h4><BookList items={['设备劫持', '数据窃取', '远程控制']} /></div>
            <div><h4 className="font-bold mb-2">防护措施</h4><BookList items={['设备认证', '通信加密', '访问控制']} /></div>
          </div>
        </div>
        <SectionTitle>2. 安全演示</SectionTitle>
        <SecurityDemo />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h4 className="font-bold mb-2">设备安全</h4>
          <BookList items={['定期更新固件', '使用强密码', '启用安全功能']} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h4 className="font-bold mb-2">网络安全</h4>
          <BookList items={['使用加密通信', '配置防火墙', '监控网络流量']} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2">数据安全</h4>
          <BookList items={['数据加密存储', '定期备份数据', '访问权限控制']} />
        </div>
        <TagGrid items={['安全标准', 'ISO27001', '等级保护', '最佳实践']} />
      </div>
    ),
  },
]

export default function IoTSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
