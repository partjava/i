'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: 'CSS动画与过渡',
  chapterNumber: 5,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'CSS布局', href: '/study/computer/frontend/css-layout' },
  nextChapter: { label: 'CSS高级与预处理器', href: '/study/computer/frontend/css-advanced' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '动画基础与过渡',
    left: (
      <div className="space-y-4">
        <PageTitle>动画基础</PageTitle>
        <BookList items={[
          'CSS动画用于实现元素的动态效果，提升用户体验',
          '常用方式：transition（过渡）、animation（关键帧动画）',
          '优势：无需JS即可实现大部分动画，性能较好',
        ]} />
        <SectionTitle>transition 过渡</SectionTitle>
        <BookParagraph>transition用于在状态变化时平滑过渡，如hover效果。</BookParagraph>
        <BookList items={['指定属性、时长、缓动函数、延迟', '简写：transition: all 0.3s ease']} />
        <BookCode language="css" code={`/* 过渡效果 */
.button {
  background: blue;
  color: white;
  transition: all 0.3s ease;
}
.button:hover {
  background: darkblue;
  transform: scale(1.05);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>animation 关键帧动画</SectionTitle>
        <BookParagraph>animation通过@keyframes定义动画序列，可实现复杂动画效果。</BookParagraph>
        <BookList items={['定义关键帧：@keyframes name { 0% { } 100% { } }', '应用动画：animation: name 2s infinite']} />
        <BookCode language="css" code={`/* 关键帧动画 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.ball {
  animation: bounce 1s ease infinite;
}`} />
        <SectionTitle>淡入淡出动画</SectionTitle>
        <BookCode language="css" code={`@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.5s ease; }`} />
        <TagGrid items={['transition', 'animation', 'keyframes', 'hover', 'transform']} />
      </div>
    ),
  },
  {
    label: '案例与性能',
    left: (
      <div className="space-y-4">
        <PageTitle>常见动画案例</PageTitle>
        <SectionTitle>加载动画（Spinner）</SectionTitle>
        <BookCode language="css" code={`@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #ccc;
  border-top-color: blue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>性能与兼容性</SectionTitle>
        <BookList items={[
          '优先使用transform和opacity动画，触发GPU加速',
          '避免频繁重排（reflow）的属性如width、height、top',
          'will-change提示浏览器提前优化',
          '使用@supports检测特性支持',
        ]} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '实现一个按钮点击后颜色渐变的动画',
          '制作一个循环旋转的加载动画',
          '用animation实现弹性小球跳动',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN CSS动画：developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations',
          'W3School CSS3动画：www.w3school.com.cn/css/css3_animations.asp',
        ]} />
        <TagGrid items={['性能', 'GPU', '兼容性', 'spinner', '练习']} />
      </div>
    ),
  },
]

export default function FrontendCssAnimationPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
