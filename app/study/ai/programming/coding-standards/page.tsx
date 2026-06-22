'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '人工智能程序设计', chapterTitle: 'AI编程规范', chapterNumber: 3, totalChapters: 8, subjectHref: '/study/ai/programming', prevChapter: { label: 'Python基础', href: '/study/ai/programming/python' }, nextChapter: { label: 'AI项目开发流程', href: '/study/ai/programming/workflow' }, theme: THEMES.ai }

const SPREADS = [
  { label: '代码规范', left: (<div className="space-y-4"><PageTitle>代码规范</PageTitle><SectionTitle>PEP 8规范</SectionTitle><BookParagraph>PEP 8是Python代码的官方风格指南，包括缩进(4空格)、行宽(79字符)、命名约定等。</BookParagraph><BookCode language="python" code={`# 正确的命名\nclass ImageClassifier:  # 类名驼峰\n    def predict(self): pass  # 方法名小写\nMAX_ITER = 1000  # 常量全大写\n\ndef load_data(file_path): pass  # 函数名小写+下划线`} /><SectionTitle>类型注解</SectionTitle><BookParagraph>类型注解提高代码可读性，配合mypy进行静态类型检查。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>AI代码规范</SectionTitle><BookParagraph>AI项目特有的编程规范，包括随机种子设置、模型保存、日志记录等。</BookParagraph><BookCode language="python" code={`import random, numpy as np, torch\n\ndef set_seed(seed=42):\n    random.seed(seed)\n    np.random.seed(seed)\n    torch.manual_seed(seed)\n    torch.cuda.manual_seed_all(seed)\n\n# 训练循环规范\nfor epoch in range(epochs):\n    model.train()\n    for batch in loader:\n        loss = train_step(model, batch)\n        logger.log(loss)  # 使用logger而非print`} /></div>) },
  { label: '文档规范', left: (<div className="space-y-4"><PageTitle>文档规范</PageTitle><SectionTitle>文档字符串</SectionTitle><BookParagraph>使用docstring为模块、类和函数编写文档，支持Sphinx自动生成文档。</BookParagraph><BookCode language="python" code={`def train_model(model, train_loader, epochs=10):\n    """训练深度学习模型。\n    Args:\n        model: 神经网络模型\n        train_loader: 训练数据加载器\n        epochs: 训练轮数，默认10\n    Returns:\n        history: 训练历史记录\n    """`} /></div>), right: (<div className="space-y-4"><SectionTitle>README规范</SectionTitle><BookList items={['项目简介和功能说明','环境要求和安装步骤','使用示例和API文档','项目结构和模块说明','贡献指南和许可证']} /></div>) },
  { label: '最佳实践', left: (<div className="space-y-4"><PageTitle>最佳实践</PageTitle><SectionTitle>代码组织</SectionTitle><BookList items={['模块单一职责：每个模块只负责一个功能','配置与代码分离：使用配置文件管理超参数','数据与逻辑分离：数据预处理独立模块','使用requirements.txt管理依赖']} /></div>), right: (<div className="space-y-4"><SectionTitle>性能优化</SectionTitle><BookList items={['使用向量化操作替代循环','合理使用缓存（@lru_cache）','使用生成器处理大文件','使用asyncio处理IO密集型任务']} /></div>) },
  { label: '代码审查', left: (<div className="space-y-4"><PageTitle>代码审查</PageTitle><SectionTitle>审查清单</SectionTitle><BookList items={['代码风格是否符合PEP 8','是否有完善的错误处理','测试覆盖率是否达标','性能是否会成为瓶颈','文档是否完整']} /></div>), right: (<div className="space-y-4"><SectionTitle>Review工具</SectionTitle><BookList items={['Black：自动代码格式化','Flake8：代码质量检查','Pylint：静态分析','Mypy：类型检查','Pytest：单元测试']} /></div>) },
]

export default function ProgrammingStandardsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
