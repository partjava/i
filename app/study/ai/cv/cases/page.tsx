'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '计算机视觉实战', chapterNumber: 11, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '视觉框架与工具', href: '/study/ai/cv/frameworks' },
  nextChapter: { label: '计算机视觉面试题', href: '/study/ai/cv/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>计算机视觉实战概述</PageTitle><BookParagraph>计算机视觉实战是将理论知识应用于真实世界问题的关键环节。通过实战项目，可以掌握图像处理、模型训练、模型部署等全流程技能。</BookParagraph><SectionTitle>实战流程</SectionTitle><BookList items={['需求分析：明确任务目标和评估指标','数据准备：数据采集、标注、增强','模型选型：根据任务选择合适的模型','训练调优：模型训练、超参数调优','评估测试：模型评估和错误分析','部署上线：模型转换、服务部署']} /><SectionTitle>技术栈</SectionTitle><BookList items={['PyTorch/TensorFlow：深度学习框架','OpenCV：图像处理','MMDetection/Detectron2：检测/分割','ONNX/TensorRT：模型部署']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>常见任务</SectionTitle><BookList items={['目标检测与识别','图像分割与理解','人脸识别与分析','视频分析与处理']} /></div>),
  },
  {
    label: '项目流程', left: (<div className="space-y-4"><PageTitle>项目流程</PageTitle><SectionTitle>需求分析</SectionTitle><BookList items={['任务定义：分类/检测/分割/跟踪','性能指标：准确率/mAP/FPS','约束条件：硬件、时延、资源','资源评估、技术选型、算法选择、框架确定、工具准备']} /><SectionTitle>数据准备</SectionTitle><BookList items={['数据获取、数据清洗、数据标注','数据增强：几何变换、噪声添加、色彩增强','质量控制：标注规范、质量检查']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>模型开发</SectionTitle><BookList items={['模型选择：任务匹配、性能评估、资源考虑','训练优化：损失函数、优化策略、超参数调优','模型压缩：剪枝、量化加速、推理优化']} /><SectionTitle>系统集成</SectionTitle><BookList items={['接口设计、性能优化、错误处理','部署监控：模型更新、问题修复、系统维护']} /></div>),
  },
  {
    label: '实战案例', left: (<div className="space-y-4"><PageTitle>实战案例</PageTitle><SectionTitle>工业缺陷检测</SectionTitle><BookParagraph>使用分类和检测模型实现产品表面缺陷检测系统。包括尺寸测量、质量评估等。采用YOLO检测方案，实时处理生产线图像。</BookParagraph><SectionTitle>人脸门禁系统</SectionTitle><BookParagraph>基于人脸识别技术实现门禁控制系统。包括人脸检测、特征提取、1:N匹配。技术方案采用多目标跟踪和行为识别。</BookParagraph><SectionTitle>自动驾驶感知</SectionTitle><BookParagraph>实现车辆、行人、车道线的实时检测。道路分割、障碍物识别、场景理解。</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>更多案例</SectionTitle><BookParagraph><b>安防监控：</b>人员检测、行为分析、异常识别、实时预警</BookParagraph><BookParagraph><b>医疗影像：</b>辅助诊断、医学图像分割</BookParagraph><BookParagraph><b>遥感图像：</b>地物分类、变化检测、资源监测</BookParagraph></div>),
  },
  {
    label: '最佳实践', left: (<div className="space-y-4"><PageTitle>最佳实践</PageTitle><SectionTitle>项目管理</SectionTitle><BookList items={['数据质量：数据清洗、标注规范、质量控制','模型选择：任务匹配、性能评估、资源考虑','训练优化：损失函数设计、优化策略选择']} /><SectionTitle>模型优化</SectionTitle><BookList items={['模型压缩：剪枝、量化','推理加速：TensorRT优化','资源利用：多线程、GPU优化']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>部署运维</SectionTitle><BookList items={['系统集成：接口设计、错误处理','性能优化：模型压缩、推理加速、资源利用','维护更新：模型更新、问题修复']} /></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>图像分类训练</SectionTitle><BookCode language="python" code={`import torch\nimport torchvision.transforms as T\nfrom torchvision.models import resnet50\ntransform=T.Compose([T.Resize(256),T.CenterCrop(224),T.ToTensor(),T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])])\nmodel=resnet50(pretrained=True)\nmodel.fc=torch.nn.Linear(2048,10)\noptimizer=torch.optim.Adam(model.parameters(),lr=0.001)\nfor epoch in range(10):\n  for images,labels in train_loader:\n    optimizer.zero_grad()\n    loss=torch.nn.CrossEntropyLoss()(model(images),labels)\n    loss.backward();optimizer.step()\n  print(f'Epoch {epoch+1} done')`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>模型部署示例</SectionTitle><BookCode language="python" code={`import torch,onnx\nmodel=torch.load('model.pth')\ndummy=torch.randn(1,3,224,224)\ntorch.onnx.export(model,dummy,'model.onnx',input_names=['input'],output_names=['output'])\nimport onnxruntime as ort\nsession=ort.InferenceSession('model.onnx')\nresult=session.run(None,{'input':image.numpy()})`} /></div>),
  },
]

export default function CvCasesPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
