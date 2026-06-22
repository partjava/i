'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '图像处理基础', chapterNumber: 2, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '计算机视觉基础', href: '/study/ai/cv/basic' },
  nextChapter: { label: '特征提取与匹配', href: '/study/ai/cv/feature-extraction' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '基础概念', left: (<div className="space-y-4"><PageTitle>图像的基本概念</PageTitle><BookParagraph>数字图像是由像素（Pixel）组成的二维矩阵，每个像素包含颜色信息。在计算机中，图像通常以数字形式存储和处理。</BookParagraph><SectionTitle>图像类型</SectionTitle><BookParagraph><b>二值图像：</b>每个像素只有0或1两种取值</BookParagraph><BookParagraph><b>灰度图像：</b>单通道，每个像素用0-255的灰度值表示</BookParagraph><BookParagraph><b>RGB图像：</b>三通道，每个像素用RGB三个分量表示</BookParagraph><BookParagraph><b>多光谱图像：</b>包含多个波段信息</BookParagraph><SectionTitle>颜色空间</SectionTitle><BookParagraph><b>RGB：</b>红（Red）、绿（Green）、蓝（Blue）三原色，每个通道取值范围0-255，适用于显示设备</BookParagraph><BookParagraph><b>HSV：</b>色调（Hue）、饱和度（Saturation）、明度（Value），更符合人类视觉感知，适用于颜色分割</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>基本操作</SectionTitle><BookParagraph><b>亮度调整：</b>增加或减少像素值</BookParagraph><BookParagraph><b>对比度调整：</b>拉伸或压缩像素值范围</BookParagraph><BookParagraph><b>阈值处理：</b>二值化图像</BookParagraph><SectionTitle>几何变换</SectionTitle><BookList items={['缩放：改变图像尺寸','旋转：改变图像方向','平移：移动图像位置','仿射变换：平移、旋转、缩放','透视变换：视角校正','投影变换：3D到2D映射']} /></div>),
  },
  {
    label: '基本操作', left: (<div className="space-y-4"><PageTitle>图像基本操作</PageTitle><SectionTitle>几何变换</SectionTitle><BookList items={['缩放：改变图像大小','旋转：图像旋转一定角度','平移：图像沿坐标轴移动','裁剪：选取图像区域','仿射变换：保持平行性变换']} /><SectionTitle>颜色处理</SectionTitle><BookList items={['亮度调整：增加或减少亮度','对比度增强：突出图像细节','直方图均衡化：改善图像对比度','颜色空间转换：RGB到HSV等','颜色映射']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>OpenCV基础操作</SectionTitle><BookCode language="python" code={`import cv2\nimg = cv2.imread('image.jpg')\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nresized = cv2.resize(img, (300, 300))\n(h,w)=img.shape[:2]\nM=cv2.getRotationMatrix2D((w//2,h//2),45,1)\nrotated=cv2.warpAffine(img,M,(w,h))`} /></div>),
  },
  {
    label: '滤波处理', left: (<div className="space-y-4"><PageTitle>滤波处理</PageTitle><BookParagraph>图像滤波是图像处理的基本操作，用于去除噪声、增强边缘、平滑图像等。</BookParagraph><SectionTitle>线性滤波</SectionTitle><BookList items={['均值滤波：邻域平均，去噪但模糊边缘','高斯滤波：加权平均，保留更多边缘','方框滤波：快速均值计算']} /><SectionTitle>非线性滤波</SectionTitle><BookList items={['中值滤波：对椒盐噪声有效','双边滤波：保边去噪','非局部均值滤波：高级去噪']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>OpenCV滤波示例</SectionTitle><BookCode language="python" code={`import cv2\nimg=cv2.imread('image.jpg')\nblur=cv2.blur(img,(5,5))\ngaussian=cv2.GaussianBlur(img,(5,5),1.0)\nmedian=cv2.medianBlur(img,5)\nbilateral=cv2.bilateralFilter(img,9,75,75)\nedges=cv2.Canny(img,100,200)`} /></div>),
  },
  {
    label: '图像变换', left: (<div className="space-y-4"><PageTitle>图像变换</PageTitle><SectionTitle>频域变换</SectionTitle><BookList items={['傅里叶变换：将图像从空间域变换到频域','低通滤波：去除高频噪声，平滑图像','高通滤波：保留高频，增强边缘']} /><SectionTitle>形态学变换</SectionTitle><BookList items={['腐蚀：消除边界点','膨胀：扩大边界','开运算：先腐蚀后膨胀','闭运算：先膨胀后腐蚀']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>傅里叶变换示例</SectionTitle><BookCode language="python" code={`import cv2,numpy as np
from matplotlib import pyplot as plt
img=cv2.imread('image.jpg',0)
f=np.fft.fft2(img); fshift=np.fft.fftshift(f)
mag=np.log(np.abs(fshift))
rows,cols=img.shape
mask=np.zeros((rows,cols),np.uint8)
mask[rows//2-30:rows//2+30,cols//2-30:cols//2+30]=1
img_back=np.abs(np.fft.ifft2(np.fft.ifftshift(fshift*mask)))
plt.subplot(131),plt.imshow(img,cmap='gray'),plt.title('Original')
plt.subplot(132),plt.imshow(mag,cmap='gray'),plt.title('Spectrum')
plt.subplot(133),plt.imshow(img_back,cmap='gray'),plt.title('Filtered')
plt.show()`} /></div>),
  },
]

export default function CvImageProcessingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
