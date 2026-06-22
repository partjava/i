'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const yoloCode = `import torch
from ultralytics import YOLO
model = YOLO('yolov5s.pt')
results = model('image.jpg')
for result in results:
    for box in result.boxes:
        x1, y1, x2, y2 = box.xyxy[0]
        conf = box.conf[0]
        cls = box.cls[0]
        print(f'{model.names[int(cls)]}: {conf:.2f} ({x1:.0f},{y1:.0f},{x2:.0f},{y2:.0f})')`

const frcnnCode = `import torch, torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn
model = fasterrcnn_resnet50_fpn(pretrained=True); model.eval()
image = Image.open('image.jpg')
prediction = model([F.to_tensor(image)])[0]
for box, score, label in zip(prediction['boxes'], prediction['scores'], prediction['labels']):
    if score > 0.5: print(f'{label}: {score:.2f} {box.tolist()}')`

const trainCode = `class CustomDataset(Dataset):
    def __init__(self, image_dir, annotation_file):
        self.image_dir = image_dir
        with open(annotation_file) as f: self.annotations = json.load(f)
    def __getitem__(self, idx):
        image = Image.open(self.image_dir + self.annotations[idx]['image'])
        return image, {'boxes': torch.tensor(self.annotations[idx]['boxes']), 'labels': torch.tensor(self.annotations[idx]['labels'])}

def train_one_epoch(model, optimizer, data_loader):
    model.train()
    for images, targets in data_loader:
        loss = sum(loss for loss in model(images, targets).values())
        optimizer.zero_grad(); loss.backward(); optimizer.step()`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '目标检测', chapterNumber: 4, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '特征提取与匹配', href: '/study/ai/cv/feature-extraction' },
  nextChapter: { label: '图像分割', href: '/study/ai/cv/image-segmentation' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>目标检测概述</PageTitle><BookParagraph>目标检测是计算机视觉中的基础任务，旨在定位和识别图像中的目标对象。它不仅需要识别目标的类别，还需要确定目标在图像中的位置（通常用边界框表示）。</BookParagraph><SectionTitle>主要任务：</SectionTitle><BookList items={['目标定位：确定目标位置','目标分类：识别目标类别','实例分割：像素级目标分割']} /><SectionTitle>评估指标</SectionTitle><BookParagraph><b>IoU（交并比）：</b>预测框与真实框的重叠程度，取值范围0-1</BookParagraph><BookParagraph><b>mAP（平均精度均值）：</b>不同IoU阈值下的平均精度，综合评估检测性能</BookParagraph><BookParagraph><b>FPS（每秒帧数）：</b>检测速度的衡量指标，实时性要求</BookParagraph></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '传统方法', left: (<div className="space-y-4"><PageTitle>传统目标检测方法</PageTitle><SectionTitle>滑动窗口</SectionTitle><BookParagraph><b>基本思想：</b>在图像上滑动固定大小的窗口，对每个窗口进行分类，合并重叠的检测结果</BookParagraph><BookParagraph><b>特点：</b>计算量大，难以处理多尺度目标</BookParagraph><SectionTitle>选择性搜索</SectionTitle><BookParagraph><b>基本思想：</b>基于图像分割生成候选区域，合并相似区域，提取候选框</BookParagraph><BookParagraph><b>特点：</b>计算效率较高，召回率较好</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>经典算法</SectionTitle><BookParagraph><b>Viola-Jones：</b>Haar特征 + AdaBoost分类器 + 级联结构，用于人脸检测</BookParagraph><BookParagraph><b>HOG+SVM：</b>方向梯度直方图 + 支持向量机分类 + 滑动窗口检测，用于行人检测</BookParagraph></div>),
  },
  {
    label: '深度学习方法', left: (<div className="space-y-4"><PageTitle>深度学习目标检测方法</PageTitle><SectionTitle>两阶段检测器</SectionTitle><BookParagraph><b>R-CNN系列：</b>R-CNN（区域提议+CNN分类）、Fast R-CNN（共享特征提取+RoI池化）、Faster R-CNN（区域提议网络RPN）</BookParagraph><BookParagraph><b>特点：</b>精度高，速度相对较慢</BookParagraph><SectionTitle>单阶段检测器</SectionTitle><BookParagraph><b>YOLO系列：</b>YOLOv1（端到端检测）、YOLOv3（多尺度预测）、YOLOv5（高效实现）</BookParagraph><BookParagraph><b>特点：</b>速度快，适合实时应用</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>最新进展</SectionTitle><BookParagraph><b>Transformer-based检测器：</b>DETR（端到端目标检测）、Swin Transformer、Deformable DETR</BookParagraph><BookParagraph><b>无锚框检测器：</b>FCOS、CenterNet、CornerNet</BookParagraph></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>YOLOv5目标检测</SectionTitle><BookCode language="python" code={yoloCode} /><SectionTitle>Faster R-CNN示例</SectionTitle><BookCode language="python" code={frcnnCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>自定义数据集训练</SectionTitle><BookCode language="python" code={trainCode} /></div>),
  },
]

export default function CvObjectDetectionPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
