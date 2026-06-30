'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const unetCode = `import torch
import torch.nn as nn
import torch.nn.functional as F

class DoubleConv(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.double_conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels), nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels), nn.ReLU(inplace=True))
    def forward(self, x): return self.double_conv(x)

class UNet(nn.Module):
    def __init__(self, n_channels, n_classes):
        super().__init__()
        self.inc = DoubleConv(n_channels, 64)
        self.down1 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(64, 128))
        self.down2 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(128, 256))
        self.down3 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(256, 512))
        self.down4 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(512, 1024))
        self.up1 = nn.ConvTranspose2d(1024, 512, 2, 2); self.up_conv1 = DoubleConv(1024, 512)
        self.up2 = nn.ConvTranspose2d(512, 256, 2, 2); self.up_conv2 = DoubleConv(512, 256)
        self.up3 = nn.ConvTranspose2d(256, 128, 2, 2); self.up_conv3 = DoubleConv(256, 128)
        self.up4 = nn.ConvTranspose2d(128, 64, 2, 2); self.up_conv4 = DoubleConv(128, 64)
        self.outc = nn.Conv2d(64, n_classes, kernel_size=1)
    def forward(self, x):
        x1 = self.inc(x); x2 = self.down1(x1); x3 = self.down2(x2); x4 = self.down3(x3); x5 = self.down4(x4)
        x = self.up1(x5); x = torch.cat([x4, x], dim=1); x = self.up_conv1(x)
        x = self.up2(x); x = torch.cat([x3, x], dim=1); x = self.up_conv2(x)
        x = self.up3(x); x = torch.cat([x2, x], dim=1); x = self.up_conv3(x)
        x = self.up4(x); x = torch.cat([x1, x], dim=1); x = self.up_conv4(x)
        return self.outc(x)`

const maskRcnnCode = `import torch
import torchvision
from torchvision.models.detection import maskrcnn_resnet50_fpn
from torchvision.transforms import functional as F
model = maskrcnn_resnet50_fpn(pretrained=True); model.eval()
image = Image.open('image.jpg'); image_tensor = F.to_tensor(image)
with torch.no_grad(): prediction = model([image_tensor])
masks = prediction[0]['masks']; scores = prediction[0]['scores']; labels = prediction[0]['labels']
for mask, score, label in zip(masks, scores, labels):
    if score > 0.5: print(f'类别：{label}，置信度：{score:.2f}')`

const evalMetricsCode = `def calculate_iou(pred_mask, gt_mask):
    intersection = np.logical_and(pred_mask, gt_mask).sum()
    union = np.logical_or(pred_mask, gt_mask).sum()
    return intersection / union if union > 0 else 0

def calculate_pixel_accuracy(pred_mask, gt_mask):
    return (pred_mask == gt_mask).mean()

def calculate_mean_iou(pred_masks, gt_masks, num_classes):
    ious = [calculate_iou(pred_masks==cls, gt_masks==cls) for cls in range(num_classes)]
    return np.mean(ious)

def calculate_pq(pred_masks, gt_masks, num_classes):
    sq = calculate_mean_iou(pred_masks, gt_masks, num_classes)
    rq = calculate_pixel_accuracy(pred_masks, gt_masks)
    return sq * rq`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '图像分割', chapterNumber: 5, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '目标检测', href: '/study/ai/cv/object-detection' },
  nextChapter: { label: '人脸识别', href: '/study/ai/cv/face-recognition' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>图像分割概述</PageTitle><BookParagraph>图像分割是计算机视觉中的基础任务，旨在将图像分割成多个具有语义的区域。根据任务的不同，可以分为语义分割、实例分割和全景分割等。</BookParagraph><SectionTitle>主要类型：</SectionTitle><BookList items={['语义分割：为每个像素分配类别标签','实例分割：区分同类别的不同实例','全景分割：同时进行语义分割和实例分割']} /><SectionTitle>应用场景</SectionTitle><BookParagraph><b>医学图像分析：</b>器官分割、病变区域识别、细胞分析</BookParagraph><BookParagraph><b>自动驾驶：</b>道路场景理解、障碍物检测、车道线识别</BookParagraph><BookParagraph><b>遥感图像处理：</b>土地利用分类、建筑物提取、植被监测</BookParagraph></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '传统方法', left: (<div className="space-y-4"><PageTitle>传统分割方法</PageTitle><SectionTitle>基于阈值的分割</SectionTitle><BookParagraph><b>基本思想：</b>设定阈值将图像分为前景和背景，包括全局阈值和局部阈值、自适应阈值选择。</BookParagraph><BookParagraph><b>特点：</b>计算简单，对噪声敏感，难以处理复杂场景</BookParagraph><SectionTitle>基于区域的分割</SectionTitle><BookParagraph><b>基本思想：</b>区域生长算法、分水岭算法、区域合并与分裂</BookParagraph><BookParagraph><b>特点：</b>考虑空间信息，计算复杂度较高，需要种子点选择</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>基于边缘的分割</SectionTitle><BookParagraph><b>Canny边缘检测步骤：</b>高斯滤波 → 梯度计算 → 非极大值抑制 → 双阈值处理</BookParagraph><BookParagraph><b>主动轮廓模型：</b>Snake模型、水平集方法、能量最小化</BookParagraph></div>),
  },
  {
    label: '深度学习方法', left: (<div className="space-y-4"><PageTitle>深度学习分割方法</PageTitle><SectionTitle>全卷积网络（FCN）</SectionTitle><BookParagraph><b>网络结构：</b>编码器-解码器结构，跳跃连接，转置卷积上采样</BookParagraph><BookParagraph><b>特点：</b>端到端训练，任意尺寸输入，像素级预测</BookParagraph><SectionTitle>U-Net</SectionTitle><BookParagraph><b>网络结构：</b>U形对称结构，多尺度特征融合，跳跃连接</BookParagraph><BookParagraph><b>特点：</b>适合医学图像，小样本学习，精确边界定位</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>最新进展</SectionTitle><BookParagraph><b>Transformer-based分割：</b>SETR、TransUNet、Swin Transformer</BookParagraph><BookParagraph><b>实例分割：</b>Mask R-CNN、SOLO、YOLACT</BookParagraph><BookParagraph><b>全景分割：</b>Panoptic FPN、UPSNet、DETR</BookParagraph></div>),
  },
  {
    label: '评估指标', left: (<div className="space-y-4"><PageTitle>评估指标</PageTitle><SectionTitle>像素级指标</SectionTitle><BookParagraph><b>像素准确率（Pixel Accuracy）：</b>正确分类的像素比例，简单直观，类别不平衡时不够准确</BookParagraph><BookParagraph><b>平均像素准确率（Mean Pixel Accuracy）：</b>各类别像素准确率的平均，考虑类别平衡</BookParagraph><SectionTitle>区域级指标</SectionTitle><BookParagraph><b>IoU（交并比）：</b>预测区域与真实区域的重叠度，取值范围0-1，常用评估指标</BookParagraph><BookParagraph><b>mIoU（平均交并比）：</b>各类别IoU的平均值，综合评估分割性能</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>实例级指标</SectionTitle><BookParagraph><b>平均精度（AP）：</b>不同IoU阈值下的精度，考虑检测和分割质量</BookParagraph><BookParagraph><b>全景质量（PQ）：</b>PQ = 分割质量(SQ) × 识别质量(RQ)</BookParagraph><BookCode language="python" code={evalMetricsCode} /></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>U-Net分割示例</SectionTitle><BookCode language="python" code={unetCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Mask R-CNN示例</SectionTitle><BookCode language="python" code={maskRcnnCode} /></div>),
  },
]

export default function CvImageSegmentationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
