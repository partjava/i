'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompositionDataPage() {
  const [activeTab, setActiveTab] = useState('知识讲解');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">数据的表示与运算</h1>

      {/* 顶部Tab栏 */}
      <div className="flex space-x-4 mb-8">
        {['知识讲解', '例题解析', '小结与思考题'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 知识讲解 */}
      {activeTab === '知识讲解' && (
        <div className="space-y-6">
          {/* 进制与编码 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">进制与编码（详细讲解）</h2>
            <h3 className="font-semibold mb-2">1. 进制基础</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>二进制：逢二进一，只有0和1。例如：1011₂ = 1×2³+0×2²+1×2¹+1×2⁰=11₁₀</li>
              <li>八进制：逢八进一，0~7。例如：157₈ = 1×8²+5×8¹+7×8⁰=111₁₀</li>
              <li>十六进制：0~9,A~F，逢十六进一。例如：2F₁₆ = 2×16¹+15×16⁰=47₁₀</li>
            </ul>
            <h3 className="font-semibold mb-2">2. 进制转换</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>十进制转二进制：除2取余法，从下往上写余数。例如：156₁₀ → 10011100₂</li>
              <li>二进制转十进制：权展开法。例如：1101₂ = 1×2³+1×2²+0×2¹+1×2⁰=13₁₀</li>
              <li>二进制转八/十六进制：每3/4位一组，直接换算。</li>
            </ul>
            <h3 className="font-semibold mb-2">3. 常见编码</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>ASCII：7位或8位编码，A=65，a=97</li>
              <li>Unicode/UTF-8：支持全球字符，1~4字节变长编码</li>
              <li>BCD码：每4位二进制表示1位十进制数字，常用于金融</li>
            </ul>
            <h3 className="font-semibold mb-2">易错点</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>进制转换顺序：除基取余法要从下往上写</li>
              <li>二进制分组时要从低位开始分组</li>
            </ul>
          </div>
          {/* 定点数与浮点数 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">定点数与浮点数（详细讲解）</h2>
            <h3 className="font-semibold mb-2">1. 定点数</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>原码：最高位为符号位，0正1负，其余为数值本身。例如：+7原码=00000111，-7原码=10000111</li>
              <li>反码：正数反码=原码，负数反码=符号位不变，其余位取反。例如：-7反码=11111000</li>
              <li>补码：正数补码=原码，负数补码=反码+1。例如：-7补码=11111001</li>
              <li>补码的优点：统一了加减法电路，只有一个0，简化硬件设计</li>
            </ul>
            <h3 className="font-semibold mb-2">2. 浮点数</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>IEEE 754单精度浮点数：32位=1符号+8阶码+23尾数</li>
              <li>表示方法：(-1)^S × 1.M × 2^(E-127)</li>
              <li>例：-5.75的IEEE 754表示<br/>-5.75₁₀ = -101.11₂ = -1.0111 × 2²<br/>符号位S=1，阶码E=127+2=129=10000001₂，尾数M=011100000...<br/>最终：1 10000001 01110000000000000000000</li>
            </ul>
            <h3 className="font-semibold mb-2">易错点</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>补码溢出：注意符号位变化</li>
              <li>浮点数精度丢失：二进制无法精确表示所有小数</li>
            </ul>
          </div>
          {/* 常用运算 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">常用运算（详细讲解）</h2>
            <h3 className="font-semibold mb-2">1. 补码加减法</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>补码加减法：直接按位相加，溢出时丢弃最高位</li>
              <li>溢出判断：同号相加得异号即溢出</li>
              <li>例：8位补码，-35+20<br/>-35补码=11011101，20补码=00010100，相加=11110001，符号位1，结果为-15</li>
            </ul>
            <h3 className="font-semibold mb-2">2. 逻辑运算</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>与（AND）：两个都为1才为1</li>
              <li>或（OR）：有一个为1就为1</li>
              <li>非（NOT）：0变1，1变0</li>
              <li>异或（XOR）：相同为0，不同为1</li>
            </ul>
            <h3 className="font-semibold mb-2">3. 乘除法与移位</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>移位乘法：左移一位等于乘2，右移一位等于除2</li>
              <li>补码乘法：同样用补码规则</li>
            </ul>
            <h3 className="font-semibold mb-2">易错点</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>补码加减法时，注意溢出判断和符号位变化</li>
              <li>逻辑运算与移位运算的优先级</li>
            </ul>
          </div>
        </div>
      )}

      {/* 例题解析 */}
      {activeTab === '例题解析' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题1：进制转换</h2>
            <p className="mb-2">将十进制数 <strong>156</strong> 转换为二进制、八进制和十六进制。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>二进制：156 ÷ 2 取余，依次为0,0,1,1,1,0,0,1（从下往上写）= <strong>10011100</strong></li>
              <li>八进制：10011100分组为10 011 100，分别为2 3 4，结果为<strong>234</strong></li>
              <li>十六进制：1001 1100，分别为9 C，结果为<strong>9C</strong></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题2：补码运算</h2>
            <p className="mb-2">已知8位补码，求-35的补码表示，并计算-35+20的补码结果。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>-35的原码：00100011，反码：11011100，补码：11011101</li>
              <li>20的补码：00010100</li>
              <li>相加：11011101 + 00010100 = 11110001（补码），结果为-15</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">例题3：浮点数表示</h2>
            <p className="mb-2">简述IEEE 754单精度浮点数的结构，并举例说明。</p>
            <p><strong>解答：</strong></p>
            <ul className="list-disc pl-6">
              <li>1位符号位，8位阶码，23位尾数</li>
              <li>如：十进制数-5.75，IEEE 754表示为：<br/>符号位1，阶码127+2=129（10000001），尾数101110000...（去掉首位1）</li>
            </ul>
          </div>
        </div>
      )}

      {/* 小结与思考题 */}
      {activeTab === '小结与思考题' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">小结</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>掌握进制转换、补码、浮点数等基础知识</li>
              <li>理解常用运算规则和溢出判断</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">思考题</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>将十进制数-45转换为8位补码，并与+30相加，写出结果。</li>
              <li>简述浮点数与定点数的主要区别。</li>
              <li>请写出十进制数255的二进制、八进制和十六进制表示。</li>
            </ol>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/composition/structure" className="text-blue-500 hover:underline">上一页：系统结构概述</Link>
        <Link href="/study/composition/storage" className="text-blue-500 hover:underline">下一页：存储系统</Link>
      </div>
    </div>
  );
} 