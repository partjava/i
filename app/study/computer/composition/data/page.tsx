'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机组成原理',
  chapterTitle: '数据的表示与运算',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '系统结构概述', href: '/study/computer/composition/structure' },
  nextChapter: { label: '存储系统', href: '/study/computer/composition/storage' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '进制与编码',
    left: (
      <div className="space-y-4">
        <PageTitle>进制基础</PageTitle>
        <BookParagraph>计算机使用二进制表示数据，理解进制转换是学习计算机组成的基础。</BookParagraph>
        <BookList items={[
          '二进制：逢二进一，只有0和1，如 1011₂ = 1×2³+0×2²+1×2¹+1×2⁰=11₁₀',
          '八进制：逢八进一，0~7，如 157₈ = 1×8²+5×8¹+7×8⁰=111₁₀',
          '十六进制：0~9,A~F，逢十六进一，如 2F₁₆ = 2×16¹+15×16⁰=47₁₀',
        ]} />
        <PageTitle>进制转换</PageTitle>
        <BookList items={[
          '十进制转二进制：除2取余法，从下往上写余数，如 156₁₀ → 10011100₂',
          '二进制转十进制：权展开法，如 1101₂ = 1×2³+1×2²+0×2¹+1×2⁰=13₁₀',
          '二进制转八进制：每3位一组直接换算',
          '二进制转十六进制：每4位一组直接换算',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见编码</PageTitle>
        <BookList items={[
          'ASCII：7位或8位编码，A=65，a=97，数字0=48',
          'Unicode/UTF-8：支持全球字符，1~4字节变长编码',
          'BCD码：每4位二进制表示1位十进制数字，常用于金融领域',
        ]} />
        <PageTitle>易错点</PageTitle>
        <BookList items={[
          '进制转换顺序：除基取余法要从下往上写',
          '二进制分组时要从低位开始分组',
          '十六进制中A-F分别代表10-15',
        ]} />
        <BookAlert type="info" message="进制转换是计算机组成的基础技能，建议多加练习做到熟练转换。" />
        <TagGrid items={['二进制', '八进制', '十六进制', 'ASCII', 'BCD', '进制转换']} />
      </div>
    ),
  },
  {
    label: '定点数与浮点数',
    left: (
      <div className="space-y-4">
        <PageTitle>定点数表示</PageTitle>
        <BookParagraph>定点数中小数点位置固定，常用原码、反码、补码表示有符号数。</BookParagraph>
        <BookList items={[
          '原码：最高位为符号位，0正1负，其余为数值本身',
          '反码：正数反码=原码，负数反码=符号位不变其余位取反',
          '补码：正数补码=原码，负数补码=反码+1',
          '补码的优点：统一了加减法电路，只有一个0，简化硬件设计',
        ]} />
        <BookCode language="text" code={`+7 原码=00000111  反码=00000111  补码=00000111
-7 原码=10000111  反码=11111000  补码=11111001`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>浮点数表示（IEEE 754）</PageTitle>
        <BookParagraph>IEEE 754单精度浮点数：32位 = 1位符号 + 8位阶码 + 23位尾数。</BookParagraph>
        <BookParagraph>表示方法：(-1)^S × 1.M × 2^(E-127)</BookParagraph>
        <BookCode language="text" code={`例：-5.75 的 IEEE 754 表示
十进制 -5.75 → 二进制 -101.11
= -1.0111 × 2²
S=1, E=127+2=129=10000001₂
M=01110000000000000000000
结果：1 10000001 01110000000000000000000`} />
        <BookAlert type="warning" message="浮点数精度丢失：二进制无法精确表示所有十进制小数，如0.1在二进制中是无限循环小数。" />
      </div>
    ),
  },
  {
    label: '常用运算',
    left: (
      <div className="space-y-4">
        <PageTitle>补码加减法</PageTitle>
        <BookParagraph>补码加减法直接按位相加，溢出时丢弃最高位。溢出判断规则：同号相加得异号即溢出。</BookParagraph>
        <BookCode language="text" code={`例：8位补码，-35 + 20
-35补码 = 11011101
 20补码 = 00010100
相加结果 = 11110001（补码）
结果为 -15`} />
        <PageTitle>逻辑运算</PageTitle>
        <BookList items={[
          '与（AND）：两个都为1才为1，用于位屏蔽',
          '或（OR）：有一个为1就为1，用于位置位',
          '非（NOT）：0变1，1变0，用于位取反',
          '异或（XOR）：相同为0，不同为1，用于位翻转',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>乘除法与移位</PageTitle>
        <BookParagraph>移位运算与乘除法密切相关，是计算机算术运算的基础。</BookParagraph>
        <BookList items={[
          '左移一位等于乘2，右移一位等于除2',
          '算术右移保持符号位不变，逻辑右移高位补0',
          '补码乘法同样遵循补码运算规则',
          ' Booth算法：高效实现补码乘法',
        ]} />
        <PageTitle>易错点</PageTitle>
        <BookList items={[
          '补码加减法时注意溢出判断和符号位变化',
          '逻辑运算与移位运算的优先级不同',
          '算术移位和逻辑移位的区别',
        ]} />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>将十进制数156转换为二进制、八进制和十六进制。</BookParagraph>
        <BookParagraph>二进制：156 ÷ 2取余，从下往上为 10011100₂；八进制：10 011 100 → 234₈；十六进制：1001 1100 → 9C₁₆。</BookParagraph>
        <BookParagraph><strong>例题2：</strong>已知8位补码，求-35的补码表示，并计算-35+20。</BookParagraph>
        <BookParagraph>-35补码=11011101，20补码=00010100，相加=11110001，结果为-15。</BookParagraph>
        <BookParagraph><strong>例题3：</strong>简述IEEE 754单精度浮点数的结构并举例。</BookParagraph>
        <BookParagraph>1位符号+8位阶码+23位尾数，如-5.75表示为 1 10000001 01110000000000000000000。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握进制转换、补码、浮点数等基础知识',
          '理解常用运算规则和溢出判断',
          '熟悉IEEE 754浮点数标准',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '将十进制数-45转换为8位补码，并与+30相加，写出结果。',
          '简述浮点数与定点数的主要区别。',
          '请写出十进制数255的二进制、八进制和十六进制表示。',
          '什么是溢出？如何判断补码加减法是否溢出？',
        ]} />
      </div>
    ),
  },
]

export default function CompositionDataPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
