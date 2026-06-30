'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '特征提取与匹配', chapterNumber: 3, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '图像处理基础', href: '/study/ai/cv/image-processing' },
  nextChapter: { label: '目标检测', href: '/study/ai/cv/object-detection' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '传统特征', left: (<div className="space-y-4"><PageTitle>传统特征提取方法</PageTitle><SectionTitle>SIFT特征</SectionTitle><BookParagraph>尺度不变特征变换（Scale-Invariant Feature Transform），对旋转、缩放、亮度变化具有不变性。提取步骤：尺度空间极值检测 → 关键点定位 → 方向分配 → 特征描述子生成。</BookParagraph><SectionTitle>HOG特征</SectionTitle><BookParagraph>方向梯度直方图（Histogram of Oriented Gradients），用于目标检测和行人检测。提取步骤：图像预处理(灰度化、归一化) → 计算梯度 → 计算梯度直方图 → 块归一化 → 特征向量连接。</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>LBP特征</SectionTitle><BookParagraph>局部二值模式（Local Binary Pattern），对纹理特征进行编码。计算简单，对光照变化鲁棒。将每个像素与邻域像素比较，生成二进制模式。</BookParagraph><SectionTitle>Haar特征</SectionTitle><BookParagraph>用于人脸检测（Viola-Jones检测器）。计算相邻矩形区域的像素差，利用积分图像加速计算。计算快速，适合实时应用。</BookParagraph></div>),
  },
  {
    label: '深度特征', left: (<div className="space-y-4"><PageTitle>深度特征提取</PageTitle><SectionTitle>CNN特征</SectionTitle><BookParagraph>卷积神经网络提取的层次化特征表示：浅层（边缘、纹理）、中层（部件、形状）、深层（语义、类别）。</BookParagraph><BookParagraph><b>常用网络：</b>VGG、ResNet、DenseNet、EfficientNet</BookParagraph><SectionTitle>注意力特征</SectionTitle><BookParagraph>自注意力机制让模型关注重要区域：通道注意力（SENet学习通道重要性）、空间注意力（CBAM关注空间重要区域）、时间注意力（视频理解）。</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>特征融合</SectionTitle><BookParagraph><b>多尺度特征融合：</b>FPN（特征金字塔网络）、U-Net结构，融合不同分辨率特征图</BookParagraph><BookParagraph><b>多模态特征融合：</b>图像-文本、RGB-D、多传感器融合</BookParagraph></div>),
  },
  {
    label: '特征匹配', left: (<div className="space-y-4"><PageTitle>特征匹配方法</PageTitle><SectionTitle>传统匹配方法</SectionTitle><BookParagraph><b>最近邻匹配：</b>欧氏距离、余弦相似度、汉明距离</BookParagraph><BookParagraph><b>比率测试：</b>最近邻/次近邻比值小于阈值时接受匹配，剔除错误匹配</BookParagraph><SectionTitle>深度匹配方法</SectionTitle><BookParagraph><b>孪生网络：</b>共享权重，对比损失</BookParagraph><BookParagraph><b>图匹配网络：</b>图结构表示，消息传递机制</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>匹配优化</SectionTitle><BookParagraph><b>RANSAC算法：</b>随机采样一致性，通过迭代估计模型参数，有效剔除外点</BookParagraph><BookParagraph><b>几何验证：</b>单应性矩阵（平面）、基础矩阵（未标定）、本质矩阵（已标定）</BookParagraph><SectionTitle>实践建议</SectionTitle><BookParagraph>特征选择根据任务特点选型，考虑计算效率，权衡精度和速度。匹配策略选择合适的距离度量，设置合理阈值，使用多阶段验证。</BookParagraph></div>),
  },
  {
    label: '应用案例', left: (<div className="space-y-4"><PageTitle>应用案例</PageTitle><SectionTitle>图像拼接（Panorama）</SectionTitle><BookParagraph>流程：特征点检测与匹配 → 计算单应性矩阵 → 图像对齐 → 接缝融合</BookParagraph><BookParagraph><b>应用场景：</b>全景图像、卫星图像拼接、医学图像拼接</BookParagraph><SectionTitle>目标跟踪</SectionTitle><BookParagraph>流程：特征提取与匹配 → 运动估计 → 目标定位</BookParagraph><BookParagraph><b>应用场景：</b>视频监控、自动驾驶、增强现实</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>3D重建</SectionTitle><BookParagraph>流程：多视角特征匹配 → 稀疏重建(SfM) → 稠密重建(MVS) → 表面重建</BookParagraph><BookParagraph><b>应用场景：</b>文化遗产数字化、逆向工程、AR/VR</BookParagraph></div>),
  },
]

export default function CvFeatureExtractionPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
