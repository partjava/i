'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '人工智能程序设计', chapterTitle: 'AI项目实战', chapterNumber: 7, totalChapters: 8, subjectHref: '/study/ai/programming', prevChapter: { label: '模型部署与优化', href: '/study/ai/programming/deployment' }, nextChapter: { label: '常见问题与面试题', href: '/study/ai/programming/interview' }, theme: THEMES.ai }

const SPREADS = [
  { label: '项目案例', left: (<div className="space-y-4"><PageTitle>项目案例</PageTitle><SectionTitle>图像分类项目</SectionTitle><BookParagraph>从零构建一个图像分类系统，包括数据准备、模型训练、部署上线全流程。</BookParagraph><BookCode language="python" code={`import torch\nimport torchvision.transforms as T\nfrom torchvision.models import resnet50\n\n# 数据准备\ntransform = T.Compose([T.Resize(256), T.CenterCrop(224), T.ToTensor()])\ndataset = torchvision.datasets.ImageFolder("data/", transform=transform)\nloader = torch.utils.data.DataLoader(dataset, batch_size=32, shuffle=True)`} /></div>), right: (<div className="space-y-4"><SectionTitle>项目结构</SectionTitle><BookCode language="text" code={`project/\n├── data/          # 数据集\n├── src/           # 源代码\n│   ├── train.py   # 训练脚本\n│   ├── predict.py # 推理脚本\n│   └── utils.py   # 工具函数\n├── models/        # 模型保存\n├── configs/       # 配置文件\n├── tests/         # 测试\n├── requirements.txt\n└── README.md`} /></div>) },
  { label: '开发流程', left: (<div className="space-y-4"><PageTitle>开发流程</PageTitle><SectionTitle>迭代开发</SectionTitle><BookList items={['基线模型：快速实现验证可行性','模型优化：逐步改进提升性能','代码重构：优化代码质量','文档完善：补充API和使用文档']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '最佳实践', left: (<div className="space-y-4"><PageTitle>最佳实践</PageTitle><BookList items={['版本控制：Git管理代码和数据','实验记录：Wandb/TensorBoard','代码复用：提取通用模块','持续集成：自动化测试']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '开发工具', left: (<div className="space-y-4"><PageTitle>开发工具</PageTitle><BookList items={['Jupyter Lab：交互式开发','VS Code + Remote：远程开发','Docker：环境一致性','MLflow：实验管理']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function ProgrammingProjectPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
