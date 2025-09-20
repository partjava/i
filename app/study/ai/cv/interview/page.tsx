'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础知识' },
    { id: 'algorithm', label: '算法原理' },
    { id: 'practice', label: '实践经验' },
    { id: 'frontier', label: '前沿技术' },
    { id: 'code', label: '编程题' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">计算机视觉面试题</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">图像处理基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题1：图像的基本表示方法有哪些？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>灰度图像：单通道，每个像素用0-255的灰度值表示</li>
                      <li>RGB图像：三通道，每个像素用RGB三个分量表示</li>
                      <li>HSV图像：色调、饱和度、亮度三个通道</li>
                      <li>二值图像：每个像素只有0和1两个值</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题2：常见的图像滤波方法有哪些？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>均值滤波：使用邻域像素的平均值</li>
                      <li>高斯滤波：使用高斯核进行加权平均</li>
                      <li>中值滤波：使用邻域像素的中值</li>
                      <li>双边滤波：同时考虑空间距离和像素值差异</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">特征提取</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题3：SIFT特征的主要步骤是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>尺度空间极值检测</li>
                      <li>关键点定位</li>
                      <li>方向分配</li>
                      <li>关键点描述子生成</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题4：HOG特征的计算过程是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>图像预处理（灰度化、归一化）</li>
                      <li>计算梯度</li>
                      <li>计算梯度直方图</li>
                      <li>块归一化</li>
                      <li>特征向量连接</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithm' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">目标检测</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题1：R-CNN系列算法的发展历程是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>R-CNN：选择性搜索+CNN特征提取+SVM分类</li>
                      <li>Fast R-CNN：共享卷积特征+ROI池化</li>
                      <li>Faster R-CNN：引入RPN网络</li>
                      <li>Mask R-CNN：添加实例分割分支</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题2：YOLO算法的核心思想是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>将目标检测视为回归问题</li>
                      <li>直接预测边界框和类别概率</li>
                      <li>端到端训练</li>
                      <li>实时检测能力</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">图像分割</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题3：FCN网络的主要特点是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>全卷积结构</li>
                      <li>反卷积上采样</li>
                      <li>跳跃连接</li>
                      <li>端到端训练</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题4：U-Net网络的优势是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>U型编码器-解码器结构</li>
                      <li>跳跃连接保留细节信息</li>
                      <li>适合医学图像分割</li>
                      <li>小样本学习能力强</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">项目经验</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题1：如何处理数据不平衡问题？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据增强：旋转、翻转、缩放等</li>
                      <li>过采样：SMOTE等算法</li>
                      <li>欠采样：随机采样、聚类等</li>
                      <li>损失函数：Focal Loss等</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题2：如何提高模型推理速度？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>模型压缩：剪枝、量化</li>
                      <li>模型蒸馏</li>
                      <li>硬件加速：GPU、TPU</li>
                      <li>推理优化：TensorRT等</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">工程实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题3：如何设计一个实时目标检测系统？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>选择合适的模型：YOLO、SSD等</li>
                      <li>优化推理速度</li>
                      <li>多线程处理</li>
                      <li>系统架构设计</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题4：如何处理模型部署问题？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>模型转换：ONNX等</li>
                      <li>环境配置</li>
                      <li>性能优化</li>
                      <li>监控和维护</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frontier' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">前沿技术</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题1：Transformer在计算机视觉中的应用有哪些？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>ViT：Vision Transformer</li>
                      <li>DETR：目标检测Transformer</li>
                      <li>Swin Transformer</li>
                      <li>DeiT：数据高效Transformer</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题2：自监督学习在计算机视觉中的应用？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>对比学习：SimCLR、MoCo</li>
                      <li>掩码图像建模：MAE</li>
                      <li>自编码器：BEiT</li>
                      <li>多视角学习</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">发展趋势</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题3：计算机视觉的未来发展方向是什么？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>多模态融合</li>
                      <li>小样本学习</li>
                      <li>可解释性研究</li>
                      <li>边缘计算</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题4：如何应对计算机视觉的挑战？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">答案：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>数据质量提升</li>
                      <li>算法创新</li>
                      <li>计算效率优化</li>
                      <li>应用场景拓展</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">编程题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题1：实现图像边缘检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">要求：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>使用Sobel算子</li>
                      <li>实现非极大值抑制</li>
                      <li>实现双阈值处理</li>
                    </ul>
                    <pre className="text-sm overflow-x-auto mt-4">
                      <code>{`import cv2
import numpy as np

def edge_detection(image):
    # 转换为灰度图
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Sobel算子
    sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    
    # 计算梯度幅值和方向
    magnitude = np.sqrt(sobelx**2 + sobely**2)
    direction = np.arctan2(sobely, sobelx)
    
    # 非极大值抑制
    nms = np.zeros_like(magnitude)
    for i in range(1, magnitude.shape[0]-1):
        for j in range(1, magnitude.shape[1]-1):
            if (direction[i,j] >= -np.pi/8 and direction[i,j] < np.pi/8) or \
               (direction[i,j] >= 7*np.pi/8 and direction[i,j] <= np.pi) or \
               (direction[i,j] >= -np.pi and direction[i,j] < -7*np.pi/8):
                if magnitude[i,j] >= magnitude[i,j+1] and magnitude[i,j] >= magnitude[i,j-1]:
                    nms[i,j] = magnitude[i,j]
            elif (direction[i,j] >= np.pi/8 and direction[i,j] < 3*np.pi/8) or \
                 (direction[i,j] >= -7*np.pi/8 and direction[i,j] < -5*np.pi/8):
                if magnitude[i,j] >= magnitude[i-1,j+1] and magnitude[i,j] >= magnitude[i+1,j-1]:
                    nms[i,j] = magnitude[i,j]
            elif (direction[i,j] >= 3*np.pi/8 and direction[i,j] < 5*np.pi/8) or \
                 (direction[i,j] >= -5*np.pi/8 and direction[i,j] < -3*np.pi/8):
                if magnitude[i,j] >= magnitude[i-1,j] and magnitude[i,j] >= magnitude[i+1,j]:
                    nms[i,j] = magnitude[i,j]
            else:
                if magnitude[i,j] >= magnitude[i-1,j-1] and magnitude[i,j] >= magnitude[i+1,j+1]:
                    nms[i,j] = magnitude[i,j]
    
    # 双阈值处理
    high_threshold = np.max(nms) * 0.15
    low_threshold = high_threshold * 0.05
    
    strong_edges = (nms >= high_threshold)
    weak_edges = (nms >= low_threshold) & (nms < high_threshold)
    
    # 边缘连接
    edges = np.zeros_like(nms)
    edges[strong_edges] = 255
    
    # 连接弱边缘
    for i in range(1, edges.shape[0]-1):
        for j in range(1, edges.shape[1]-1):
            if weak_edges[i,j]:
                if np.any(strong_edges[i-1:i+2, j-1:j+2]):
                    edges[i,j] = 255
    
    return edges`}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题2：实现图像特征匹配</h4>
                  <div className="prose max-w-none">
                    <p className="mb-2">要求：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>使用SIFT特征</li>
                      <li>实现特征匹配</li>
                      <li>使用RANSAC进行匹配点筛选</li>
                    </ul>
                    <pre className="text-sm overflow-x-auto mt-4">
                      <code>{`import cv2
import numpy as np

def feature_matching(img1, img2):
    # 创建SIFT对象
    sift = cv2.SIFT_create()
    
    # 检测关键点和计算描述子
    kp1, des1 = sift.detectAndCompute(img1, None)
    kp2, des2 = sift.detectAndCompute(img2, None)
    
    # 创建FLANN匹配器
    FLANN_INDEX_KDTREE = 1
    index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
    search_params = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_params, search_params)
    
    # 进行特征匹配
    matches = flann.knnMatch(des1, des2, k=2)
    
    # 应用比率测试
    good_matches = []
    for m, n in matches:
        if m.distance < 0.7 * n.distance:
            good_matches.append(m)
    
    # 获取匹配点坐标
    src_pts = np.float32([kp1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    dst_pts = np.float32([kp2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    
    # 使用RANSAC进行匹配点筛选
    M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    
    # 获取内点
    inliers = []
    for i, m in enumerate(good_matches):
        if mask[i]:
            inliers.append(m)
    
    return inliers, M`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回计算机视觉实战
        </Link>
        <Link 
          href="/study/ai/cv/advanced"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          进阶与前沿 →
        </Link>
      </div>
    </div>
  );
} 