'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const edgeCode = `import cv2
import numpy as np

def edge_detection(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    magnitude = np.sqrt(sobelx**2 + sobely**2)
    direction = np.arctan2(sobely, sobelx)
    nms = np.zeros_like(magnitude)
    for i in range(1, magnitude.shape[0]-1):
        for j in range(1, magnitude.shape[1]-1):
            cond1 = (direction[i,j] >= -np.pi/8 and direction[i,j] < np.pi/8) or (direction[i,j] >= 7*np.pi/8 and direction[i,j] <= np.pi) or (direction[i,j] >= -np.pi and direction[i,j] < -7*np.pi/8)
            cond2 = (direction[i,j] >= np.pi/8 and direction[i,j] < 3*np.pi/8) or (direction[i,j] >= -7*np.pi/8 and direction[i,j] < -5*np.pi/8)
            cond3 = (direction[i,j] >= 3*np.pi/8 and direction[i,j] < 5*np.pi/8) or (direction[i,j] >= -5*np.pi/8 and direction[i,j] < -3*np.pi/8)
            if cond1 and magnitude[i,j] >= magnitude[i,j+1] and magnitude[i,j] >= magnitude[i,j-1]: nms[i,j] = magnitude[i,j]
            elif cond2 and magnitude[i,j] >= magnitude[i-1,j+1] and magnitude[i,j] >= magnitude[i+1,j-1]: nms[i,j] = magnitude[i,j]
            elif cond3 and magnitude[i,j] >= magnitude[i-1,j] and magnitude[i,j] >= magnitude[i+1,j]: nms[i,j] = magnitude[i,j]
            elif magnitude[i,j] >= magnitude[i-1,j-1] and magnitude[i,j] >= magnitude[i+1,j+1]: nms[i,j] = magnitude[i,j]
    high_threshold = np.max(nms) * 0.15
    low_threshold = high_threshold * 0.05
    strong_edges = (nms >= high_threshold)
    weak_edges = (nms >= low_threshold) & (nms < high_threshold)
    edges = np.zeros_like(nms)
    edges[strong_edges] = 255
    for i in range(1, edges.shape[0]-1):
        for j in range(1, edges.shape[1]-1):
            if weak_edges[i,j] and np.any(strong_edges[i-1:i+2, j-1:j+2]):
                edges[i,j] = 255
    return edges`

const matchCode = `import cv2
import numpy as np

def feature_matching(img1, img2):
    sift = cv2.SIFT_create()
    kp1, des1 = sift.detectAndCompute(img1, None)
    kp2, des2 = sift.detectAndCompute(img2, None)
    FLANN_INDEX_KDTREE = 1
    index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
    search_params = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_params, search_params)
    matches = flann.knnMatch(des1, des2, k=2)
    good_matches = [m for m, n in matches if m.distance < 0.7 * n.distance]
    src_pts = np.float32([kp1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    dst_pts = np.float32([kp2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    inliers = [good_matches[i] for i in range(len(good_matches)) if mask[i]]
    return inliers, M`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '计算机视觉面试题', chapterNumber: 12, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '计算机视觉实战', href: '/study/ai/cv/cases' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/cv/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '基础知识', left: (<div className="space-y-4"><PageTitle>图像处理基础</PageTitle><SectionTitle>问题1：图像的基本表示方法有哪些？</SectionTitle><BookList items={['灰度图像：单通道，每个像素用0-255的灰度值表示','RGB图像：三通道，每个像素用RGB三个分量表示','HSV图像：色调、饱和度、亮度三个通道','二值图像：每个像素只有0和1两个值']} /><SectionTitle>问题2：常见的图像滤波方法有哪些？</SectionTitle><BookList items={['均值滤波：使用邻域像素的平均值','高斯滤波：使用高斯核进行加权平均','中值滤波：使用邻域像素的中值','双边滤波：同时考虑空间距离和像素值差异']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>问题3：SIFT特征的主要步骤是什么？</SectionTitle><BookList items={['尺度空间极值检测','关键点定位','方向分配','关键点描述子生成']} /><SectionTitle>问题4：HOG特征的计算过程是什么？</SectionTitle><BookList items={['图像预处理（灰度化、归一化）','计算梯度','计算梯度直方图','块归一化','特征向量连接']} /></div>),
  },
  {
    label: '算法原理', left: (<div className="space-y-4"><PageTitle>目标检测</PageTitle><SectionTitle>问题1：R-CNN系列算法的发展历程是什么？</SectionTitle><BookList items={['R-CNN：选择性搜索+CNN特征提取+SVM分类','Fast R-CNN：共享卷积特征+ROI池化','Faster R-CNN：引入RPN网络','Mask R-CNN：添加实例分割分支']} /><SectionTitle>问题2：YOLO算法的核心思想是什么？</SectionTitle><BookList items={['将目标检测视为回归问题','直接预测边界框和类别概率','端到端训练','实时检测能力']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>问题3：FCN网络的主要特点是什么？</SectionTitle><BookList items={['全卷积结构','反卷积上采样','跳跃连接','端到端训练']} /><SectionTitle>问题4：U-Net网络的优势是什么？</SectionTitle><BookList items={['U型编码器-解码器结构','跳跃连接保留细节信息','适合医学图像分割','小样本学习能力强']} /></div>),
  },
  {
    label: '实践经验', left: (<div className="space-y-4"><PageTitle>项目经验</PageTitle><SectionTitle>问题1：如何处理数据不平衡问题？</SectionTitle><BookList items={['数据增强：旋转、翻转、缩放等','过采样：SMOTE等算法','欠采样：随机采样、聚类等','损失函数：Focal Loss等']} /><SectionTitle>问题2：如何提高模型推理速度？</SectionTitle><BookList items={['模型压缩：剪枝、量化','模型蒸馏','硬件加速：GPU、TPU','推理优化：TensorRT等']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>问题3：如何设计一个实时目标检测系统？</SectionTitle><BookList items={['选择合适的模型：YOLO、SSD等','优化推理速度','多线程处理','系统架构设计']} /><SectionTitle>问题4：如何处理模型部署问题？</SectionTitle><BookList items={['模型转换：ONNX等','环境配置','性能优化','监控和维护']} /></div>),
  },
  {
    label: '前沿技术', left: (<div className="space-y-4"><PageTitle>前沿技术</PageTitle><SectionTitle>问题1：Transformer在计算机视觉中的应用有哪些？</SectionTitle><BookList items={['ViT：Vision Transformer','DETR：目标检测Transformer','Swin Transformer','DeiT：数据高效Transformer']} /><SectionTitle>问题2：自监督学习在计算机视觉中的应用？</SectionTitle><BookList items={['对比学习：SimCLR、MoCo','掩码图像建模：MAE','自编码器：BEiT','多视角学习']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>问题3：计算机视觉的未来发展方向是什么？</SectionTitle><BookList items={['多模态融合','小样本学习','可解释性研究','边缘计算']} /><SectionTitle>问题4：如何应对计算机视觉的挑战？</SectionTitle><BookList items={['数据质量提升','算法创新','计算效率优化','应用场景拓展']} /></div>),
  },
  {
    label: '编程题', left: (<div className="space-y-4"><PageTitle>编程题</PageTitle><SectionTitle>问题1：实现图像边缘检测</SectionTitle><BookParagraph><b>要求：</b>使用Sobel算子，实现非极大值抑制，实现双阈值处理</BookParagraph><BookCode language="python" code={edgeCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>问题2：实现图像特征匹配</SectionTitle><BookParagraph><b>要求：</b>使用SIFT特征，实现特征匹配，使用RANSAC进行匹配点筛选</BookParagraph><BookCode language="python" code={matchCode} /></div>),
  },
]

export default function CvInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
