'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '人工智能程序设计', chapterTitle: '模型部署与优化', chapterNumber: 6, totalChapters: 8, subjectHref: '/study/ai/programming', prevChapter: { label: 'AI系统架构设计', href: '/study/ai/programming/architecture' }, nextChapter: { label: 'AI项目实战', href: '/study/ai/programming/project' }, theme: THEMES.ai }

const SPREADS = [
  { label: '模型部署', left: (<div className="space-y-4"><PageTitle>模型部署</PageTitle><SectionTitle>导出格式</SectionTitle><BookList items={['TorchScript：PyTorch模型导出','ONNX：跨框架格式','TensorFlow SavedModel','TensorRT：NVIDIA加速']} /><SectionTitle>部署方案</SectionTitle><BookList items={['TensorFlow Serving：高性能模型服务','TorchServe：PyTorch模型服务','ONNX Runtime：跨平台推理','Docker容器化部署']} /></div>), right: (<div className="space-y-4"><SectionTitle>ONNX导出</SectionTitle><BookCode language="python" code={`import torch\nimport torch.onnx\n\nmodel = torch.load("model.pth")\ndummy_input = torch.randn(1, 3, 224, 224)\ntorch.onnx.export(model, dummy_input, "model.onnx",\n    input_names=['input'], output_names=['output'],\n    dynamic_axes={'input': {0: 'batch'}})`} /></div>) },
  { label: '性能优化', left: (<div className="space-y-4"><PageTitle>性能优化</PageTitle><SectionTitle>模型优化</SectionTitle><BookList items={['模型剪枝：移除冗余参数','量化：FP16/INT8量化','蒸馏：大模型教小模型','算子融合：减少计算步骤']} /><SectionTitle>推理加速</SectionTitle><BookList items={['批处理：合并多个请求','异步推理：非阻塞处理','GPU加速：CUDA/TensorRT','缓存：结果缓存']} /></div>), right: (<div className="space-y-4"><SectionTitle>TensorRT加速</SectionTitle><BookCode language="python" code={`import tensorrt as trt\n\n# ONNX转TensorRT\nTRT_LOGGER = trt.Logger(trt.Logger.WARNING)\nbuilder = trt.Builder(TRT_LOGGER)\nnetwork = builder.create_network()\nparser = trt.OnnxParser(network, TRT_LOGGER)\n\nwith open("model.onnx", "rb") as f:\n    parser.parse(f.read())\n\nconfig = builder.create_builder_config()\nconfig.set_memory_pool_limit(trt.MemoryPoolType.WORKSPACE, 1 << 30)\n\nserialized_engine = builder.build_serialized_network(network, config)`} /></div>) },
  { label: '监控维护', left: (<div className="space-y-4"><PageTitle>监控维护</PageTitle><BookList items={['性能监控：延迟、吞吐量','模型监控：预测分布变化','数据监控：输入特征漂移','告警机制：异常自动告警']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '扩展部署', left: (<div className="space-y-4"><PageTitle>扩展部署</PageTitle><BookList items={['多GPU部署：模型并行','分布式推理：多节点推理','弹性伸缩：K8s自动伸缩','蓝绿部署：版本更新']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function ProgrammingDeployPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
