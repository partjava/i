'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = { subject: '人工智能程序设计', chapterTitle: 'AI项目开发流程', chapterNumber: 4, totalChapters: 8, subjectHref: '/study/ai/programming', prevChapter: { label: 'AI编程规范', href: '/study/ai/programming/coding-standards' }, nextChapter: { label: 'AI系统架构设计', href: '/study/ai/programming/architecture' }, theme: THEMES.ai }

const SPREADS = [
  { label: '项目规划', left: (<div className="space-y-4"><PageTitle>项目规划</PageTitle><SectionTitle>需求分析</SectionTitle><BookParagraph>明确项目目标、业务需求和技术约束，确定评估指标和验收标准。</BookParagraph><SectionTitle>技术选型</SectionTitle><BookList items={['算法选择：根据任务类型选择合适算法','框架选择：PyTorch/TensorFlow/Scikit-learn','硬件配置：CPU/GPU/TPU','数据方案：数据源和存储方式']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '开发流程', left: (<div className="space-y-4"><PageTitle>开发流程</PageTitle><SectionTitle>数据准备</SectionTitle><BookList items={['数据采集：爬虫、API、公开数据集','数据清洗：去重、缺失值处理','数据标注：人工标注、半自动标注','数据增强：翻转、旋转、噪声']} /><SectionTitle>模型开发</SectionTitle><BookList items={['基线模型：快速实现简单模型','模型改进：逐步优化和迭代','超参数调优：Grid Search/Bayesian']} /></div>), right: (<div className="space-y-4"><SectionTitle>代码示例</SectionTitle><BookCode language="python" code={`import wandb\nfrom sklearn.model_selection import GridSearchCV\n\n# 实验跟踪\nwandb.init(project="my-ai-project")\nwandb.config.learning_rate = 0.001\nwandb.config.epochs = 100\n\n# 超参数搜索\nparams = {'lr': [0.1, 0.01, 0.001], 'hidden': [32, 64, 128]}\ngrid = GridSearchCV(model, params, cv=5)\ngrid.fit(X_train, y_train)`} /></div>) },
  { label: '测试部署', left: (<div className="space-y-4"><PageTitle>测试部署</PageTitle><SectionTitle>测试策略</SectionTitle><BookList items={['单元测试：测试各模块功能','集成测试：测试模块间协作','性能测试：测试推理速度','A/B测试：线上对比实验']} /><SectionTitle>部署方式</SectionTitle><BookList items={['REST API：Flask/FastAPI部署','容器化：Docker打包','云部署：AWS/GCP/Azure']} /></div>), right: (<div className="space-y-4"><SectionTitle>部署示例</SectionTitle><BookCode language="python" code={`from fastapi import FastAPI\nimport torch\n\napp = FastAPI()\nmodel = torch.jit.load("model.pt")\n\n@app.post("/predict")\nasync def predict(data: dict):\n    with torch.no_grad():\n        result = model(torch.tensor(data["input"]))\n    return {"prediction": result.tolist()}`} /></div>) },
  { label: '维护优化', left: (<div className="space-y-4"><PageTitle>维护优化</PageTitle><BookList items={['模型监控：性能下降检测和告警','数据漂移：输入数据分布变化检测','模型更新：定期重新训练','版本管理：模型版本控制']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function ProgrammingWorkflowPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
