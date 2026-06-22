'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '人工智能程序设计', chapterTitle: '常见问题与面试题', chapterNumber: 8, totalChapters: 8, subjectHref: '/study/ai/programming', prevChapter: { label: 'AI项目实战', href: '/study/ai/programming/project' }, theme: THEMES.ai }

const SPREADS = [
  { label: '常见问题', left: (<div className="space-y-4"><PageTitle>常见问题</PageTitle><SectionTitle>1. Python内存管理</SectionTitle><BookParagraph>Python使用引用计数和垃圾回收管理内存。循环引用会导致内存泄漏，可使用weakref解决。</BookParagraph><SectionTitle>2. GIL锁</SectionTitle><BookParagraph>全局解释器锁(GIL)限制同一时刻只有一个线程执行Python字节码。多线程适合IO密集型任务，CPU密集任务用多进程。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '面试题', left: (<div className="space-y-4"><PageTitle>面试题</PageTitle><SectionTitle>1. 实现LRU Cache</SectionTitle><BookCode language="python" code={`from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    def get(self, key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]`} /></div>), right: (<div className="space-y-4"><SectionTitle>2. Python装饰器原理</SectionTitle><BookParagraph>装饰器是一个返回函数的高阶函数，用于在不修改原函数的情况下添加功能。常用于日志、性能统计、权限检查等场景。</BookParagraph></div>) },
  { label: '前沿技术', left: (<div className="space-y-4"><PageTitle>前沿技术</PageTitle><BookList items={['JAX：高性能数值计算','Ray：分布式AI框架','ONNX：模型格式标准','MLOps：ML工程化']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function ProgrammingInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
