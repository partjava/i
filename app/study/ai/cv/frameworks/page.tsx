'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '视觉框架与工具', chapterNumber: 10, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '3D视觉', href: '/study/ai/cv/3d-vision' },
  nextChapter: { label: '计算机视觉实战', href: '/study/ai/cv/cases' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>框架与工具概述</PageTitle><BookParagraph>计算机视觉领域有众多优秀的框架和工具，它们为开发者提供了强大的支持。选择合适的框架和工具可以大大提高开发效率和项目质量。</BookParagraph><SectionTitle>主要类别：</SectionTitle><BookList items={['深度学习框架：PyTorch、TensorFlow等','计算机视觉库：OpenCV、PIL等','开发工具：CUDA、cuDNN等','可视化工具：TensorBoard、Visdom等']} /><SectionTitle>选择考虑因素</SectionTitle><BookParagraph><b>性能需求：</b>计算效率、内存占用、并行能力</BookParagraph><BookParagraph><b>开发效率：</b>API友好度、文档完善度、社区活跃度</BookParagraph><BookParagraph><b>部署要求：</b>平台支持、模型转换、优化工具</BookParagraph><BookParagraph><b>生态支持：</b>预训练模型、扩展库、工具链</BookParagraph></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '主流框架', left: (<div className="space-y-4"><PageTitle>深度学习框架</PageTitle><SectionTitle>PyTorch</SectionTitle><BookParagraph><b>优势：</b>动态计算图、Python优先、灵活性强、灵活调试能力、活跃的社区支持、与Python深度集成</BookParagraph><BookParagraph><b>应用：</b>研究开发、原型验证、快速迭代</BookParagraph><SectionTitle>TensorFlow</SectionTitle><BookParagraph><b>优势：</b>静态计算图、部署友好、生态完善、功能全面、性能优化</BookParagraph><BookParagraph><b>应用：</b>生产部署、大规模应用、跨平台支持</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>其他框架</SectionTitle><BookParagraph><b>MXNet：</b>多语言支持、分布式训练、内存优化</BookParagraph><BookParagraph><b>PaddlePaddle：</b>国产框架、产业应用、工具丰富</BookParagraph><BookParagraph><b>JAX：</b>函数式编程、自动微分、高性能计算</BookParagraph><SectionTitle>开发环境配置</SectionTitle><BookParagraph><b>虚拟环境：</b>Anaconda包管理、Docker容器化部署、CUDA环境(驱动安装、工具包配置、版本匹配)</BookParagraph><BookParagraph><b>IDE：</b>PyCharm(专业版/社区版、插件支持)、VS Code(轻量级、扩展丰富、调试支持)</BookParagraph></div>),
  },
  {
    label: '工具库', left: (<div className="space-y-4"><PageTitle>计算机视觉库</PageTitle><SectionTitle>OpenCV</SectionTitle><BookParagraph>最流行的计算机视觉库，提供丰富的图像处理和分析功能。支持C++、Python、Java等语言。包含图像处理、特征提取、目标检测、目标跟踪、相机标定等模块。</BookParagraph><SectionTitle>PIL/Pillow</SectionTitle><BookParagraph>Python图像处理库，支持图像打开、操作和保存。简单易用，Python集成好，轻量级。</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>其他工具</SectionTitle><BookParagraph><b>MMCV：</b>MMLab开源的基础库</BookParagraph><BookParagraph><b>Detectron2：</b>Facebook开源的检测推理平台</BookParagraph><BookParagraph><b>CUDA/cuDNN：</b>GPU加速库，深度学习优化，并行计算</BookParagraph><BookParagraph><b>训练加速：</b>混合精度训练(FP16)、分布式训练(DataParallel/DDP)、梯度累积、学习率调度</BookParagraph><BookParagraph><b>模型部署：</b>ONNX(跨框架支持、标准化)、TensorRT(模型优化、推理加速)、OpenVINO</BookParagraph></div>),
  },
  {
    label: '开发环境', left: (<div className="space-y-4"><PageTitle>开发环境配置</PageTitle><SectionTitle>版本控制</SectionTitle><BookList items={['Git','GitHub/GitLab','项目管理']} /><SectionTitle>开发工具</SectionTitle><BookList items={['Jupyter Notebook：交互式开发','CI/CD自动化','Weights & Biases：实验跟踪','MLflow：机器学习生命周期管理']} /></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>OpenCV基础操作</SectionTitle><BookCode language="python" code={`import cv2, numpy as np\nimg=cv2.imread('image.jpg')\ngray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)\nedges=cv2.Canny(gray,100,200)\nblur=cv2.GaussianBlur(img,(5,5),1.5)\nsift=cv2.SIFT_create()\nkp=sift.detect(gray,None)`} /></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
]

export default function CvFrameworksPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
