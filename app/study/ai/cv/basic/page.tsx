'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '计算机视觉基础', chapterNumber: 1, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  nextChapter: { label: '图像处理基础', href: '/study/ai/cv/image-processing' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>什么是计算机视觉？</PageTitle><BookParagraph>计算机视觉是人工智能的一个重要分支，它致力于让计算机能够"看见"并理解视觉世界。通过模拟人类视觉系统，计算机视觉使机器能够从图像或视频中获取信息，理解场景内容，并做出相应的决策。</BookParagraph><SectionTitle>计算机视觉系统的基本组成：</SectionTitle><BookList items={['图像获取：通过相机等设备捕获图像','预处理：图像增强、去噪等','特征提取：提取图像中的关键信息','模式识别：识别图像中的对象和场景','理解与决策：理解场景并做出相应决策']} /><SectionTitle>计算机视觉的核心任务</SectionTitle><BookParagraph><b>基础任务：</b></BookParagraph><BookList items={['图像分类：识别图像中的主要对象','目标检测：定位和识别图像中的多个对象','图像分割：将图像分割成多个区域','特征匹配：在不同图像间找到对应点']} /><BookParagraph><b>高级任务：</b></BookParagraph><BookList items={['场景理解：理解图像中的场景和上下文','姿态估计：估计物体的3D姿态','动作识别：识别视频中的动作','3D重建：从2D图像重建3D场景']} /></div>),
    right: (<div className="space-y-4"><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>),
  },
  {
    label: '发展历史', left: (<div className="space-y-4"><PageTitle>计算机视觉的发展历程</PageTitle><SectionTitle>早期发展（1960-1980）</SectionTitle><BookList items={['1966年：MIT的"Summer Vision Project"','1970年代：边缘检测和特征提取算法','1980年代：早期图像处理技术']} /><SectionTitle>快速发展期（1990-2010）</SectionTitle><BookList items={['1990年代：机器学习方法的应用','2000年代：特征工程和传统机器学习','2010年代初期：深度学习开始兴起']} /><SectionTitle>深度学习时代（2012-至今）</SectionTitle><BookList items={['2012年：AlexNet在ImageNet竞赛中取得突破','2014年：R-CNN目标检测算法','2015年：ResNet和U-Net架构','2017年：Transformer架构引入','2020年至今：自监督学习和多模态融合']} /></div>),
    right: (<div className="space-y-4"><br /><br /><br /><br /><br /><br /><br /><br /></div>),
  },
  {
    label: '应用领域', left: (<div className="space-y-4"><PageTitle>计算机视觉的应用领域</PageTitle><SectionTitle>工业应用</SectionTitle><BookList items={['工业检测：产品质量检测','机器人视觉：工业机器人导航','自动化生产：生产线监控']} /><SectionTitle>医疗健康</SectionTitle><BookList items={['医学影像分析','疾病诊断辅助','手术导航']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>安防监控</SectionTitle><BookList items={['人脸识别','行为分析','异常检测']} /><SectionTitle>智能交通</SectionTitle><BookList items={['自动驾驶','交通监控','车牌识别']} /></div>),
  },
  {
    label: '基础知识', left: (<div className="space-y-4"><PageTitle>图像处理基础</PageTitle><SectionTitle>图像表示</SectionTitle><BookList items={['像素：图像的基本单位','颜色空间：RGB、HSV、灰度等','图像格式：位图、矢量图']} /><SectionTitle>基本操作</SectionTitle><BookList items={['几何变换：缩放、旋转、平移','颜色处理：亮度调整、对比度增强','滤波操作：平滑、锐化、边缘检测']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>特征提取</SectionTitle><BookParagraph><b>传统特征：</b></BookParagraph><BookList items={['SIFT：尺度不变特征变换','HOG：方向梯度直方图','LBP：局部二值模式','Haar特征']} /><BookParagraph><b>深度特征：</b></BookParagraph><BookList items={['CNN特征','注意力特征','多尺度特征','语义特征']} /></div>),
  },
]

export default function CvBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
