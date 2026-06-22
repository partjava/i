'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '开发规范', description: '软件开发规范与最佳实践', href: '/study/se/standards-testing/spec' },
  { number: 2, title: '测试基础', description: '软件测试基本概念与流程', href: '/study/se/standards-testing/basic' },
  { number: 3, title: '单元测试', description: '单元测试框架与实践', href: '/study/se/standards-testing/unit' },
  { number: 4, title: '集成测试', description: '集成测试策略与框架', href: '/study/se/standards-testing/integration' },
  { number: 5, title: '系统测试', description: '系统测试类型与流程', href: '/study/se/standards-testing/system' },
  { number: 6, title: '自动化测试', description: '自动化测试框架与工具', href: '/study/se/standards-testing/automation' },
  { number: 7, title: '测试管理', description: '测试管理流程与工具', href: '/study/se/standards-testing/management' },
  { number: 8, title: '专项测试', description: '安全、性能等专项测试', href: '/study/se/standards-testing/special' },
  { number: 9, title: '实际项目案例', description: '各行业测试实践案例', href: '/study/se/standards-testing/case' },
]

export default function StandardsTestingPage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="开发规范与测试"
        subtitle="Standards & Testing"
        description="掌握软件开发规范与测试技术，建立完善的质量保证体系，提升软件开发效率与质量"
        chapterCount={CHAPTERS.length}
        totalHours={25}
        chapters={CHAPTERS}
        icon="🧪"
        startHref="/study/se/standards-testing/spec"
        theme={THEMES.software}
      />
    </div>
  )
}
