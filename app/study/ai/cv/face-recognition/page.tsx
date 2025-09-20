'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FaceRecognitionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'detection', label: '人脸检测' },
    { id: 'alignment', label: '人脸对齐' },
    { id: 'feature', label: '特征提取' },
    { id: 'recognition', label: '人脸识别' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">人脸识别</h1>
      
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">人脸识别概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  人脸识别是计算机视觉领域的重要研究方向，它通过分析人脸图像来识别或验证个人身份。
                  完整的人脸识别系统通常包括人脸检测、人脸对齐、特征提取和身份识别等步骤。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要任务：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>人脸检测：定位图像中的人脸位置</li>
                      <li>人脸对齐：标准化人脸姿态和大小</li>
                      <li>特征提取：提取人脸特征表示</li>
                      <li>身份识别：匹配和验证身份</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 人脸识别流程示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="30" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="200" cy="100" r="30" fill="#e24a90" opacity="0.3"/>
                      <line x1="130" y1="100" x2="170" y2="100" stroke="#333" strokeWidth="2" strokeDasharray="5,5"/>
                      <text x="85" y="105" className="text-sm">检测</text>
                      <text x="185" y="105" className="text-sm">识别</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">技术挑战</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>姿态变化
                    <ul className="list-disc pl-6 mt-2">
                      <li>人脸旋转和倾斜</li>
                      <li>侧脸和遮挡</li>
                      <li>表情变化</li>
                    </ul>
                  </li>
                  <li>光照条件
                    <ul className="list-disc pl-6 mt-2">
                      <li>光照强度变化</li>
                      <li>阴影和反光</li>
                      <li>不同光源</li>
                    </ul>
                  </li>
                  <li>图像质量
                    <ul className="list-disc pl-6 mt-2">
                      <li>分辨率限制</li>
                      <li>噪声和模糊</li>
                      <li>压缩失真</li>
                    </ul>
                  </li>
                  <li>时间跨度
                    <ul className="list-disc pl-6 mt-2">
                      <li>年龄变化</li>
                      <li>妆容和装饰</li>
                      <li>发型变化</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>安防监控
                    <ul className="list-disc pl-6 mt-2">
                      <li>门禁系统</li>
                      <li>视频监控</li>
                      <li>可疑人员识别</li>
                    </ul>
                  </li>
                  <li>身份认证
                    <ul className="list-disc pl-6 mt-2">
                      <li>手机解锁</li>
                      <li>支付验证</li>
                      <li>考勤系统</li>
                    </ul>
                  </li>
                  <li>社交应用
                    <ul className="list-disc pl-6 mt-2">
                      <li>照片标记</li>
                      <li>人脸美化</li>
                      <li>表情识别</li>
                    </ul>
                  </li>
                  <li>智能零售
                    <ul className="list-disc pl-6 mt-2">
                      <li>顾客分析</li>
                      <li>个性化推荐</li>
                      <li>行为分析</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detection' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传统检测方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Haar特征检测</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基本原理：
                      <ul className="list-disc pl-6 mt-2">
                        <li>使用Haar-like特征描述人脸</li>
                        <li>级联分类器快速筛选</li>
                        <li>积分图像加速计算</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>计算效率高</li>
                        <li>对姿态敏感</li>
                        <li>容易受光照影响</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">HOG特征检测</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基本原理：
                      <ul className="list-disc pl-6 mt-2">
                        <li>计算图像梯度直方图</li>
                        <li>SVM分类器判断</li>
                        <li>滑动窗口检测</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>对光照变化鲁棒</li>
                        <li>计算量较大</li>
                        <li>检测速度较慢</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习方法</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>CNN-based检测器
                    <ul className="list-disc pl-6 mt-2">
                      <li>MTCNN：多任务级联CNN</li>
                      <li>RetinaFace：高精度单阶段检测器</li>
                      <li>BlazeFace：轻量级移动端检测器</li>
                    </ul>
                  </li>
                  <li>Anchor-free检测器
                    <ul className="list-disc pl-6 mt-2">
                      <li>CenterNet</li>
                      <li>FCOS</li>
                      <li>CornerNet</li>
                    </ul>
                  </li>
                  <li>关键点检测
                    <ul className="list-disc pl-6 mt-2">
                      <li>人脸特征点定位</li>
                      <li>姿态估计</li>
                      <li>表情识别</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alignment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">人脸对齐方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">几何变换</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>仿射变换
                      <ul className="list-disc pl-6 mt-2">
                        <li>平移和旋转</li>
                        <li>缩放和剪切</li>
                        <li>保持平行性</li>
                      </ul>
                    </li>
                    <li>透视变换
                      <ul className="list-disc pl-6 mt-2">
                        <li>处理视角变化</li>
                        <li>3D姿态估计</li>
                        <li>投影校正</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">特征点对齐</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>关键点检测
                      <ul className="list-disc pl-6 mt-2">
                        <li>眼睛和嘴角</li>
                        <li>鼻子和下巴</li>
                        <li>轮廓点</li>
                      </ul>
                    </li>
                    <li>对齐策略
                      <ul className="list-disc pl-6 mt-2">
                        <li>基于关键点</li>
                        <li>基于模板</li>
                        <li>基于3D模型</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习对齐</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>端到端对齐
                    <ul className="list-disc pl-6 mt-2">
                      <li>空间变换网络</li>
                      <li>可变形卷积</li>
                      <li>注意力机制</li>
                    </ul>
                  </li>
                  <li>多任务学习
                    <ul className="list-disc pl-6 mt-2">
                      <li>检测和对齐联合</li>
                      <li>姿态估计</li>
                      <li>表情识别</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feature' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传统特征提取</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">局部特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>LBP特征
                      <ul className="list-disc pl-6 mt-2">
                        <li>局部二值模式</li>
                        <li>纹理描述</li>
                        <li>光照不变性</li>
                      </ul>
                    </li>
                    <li>SIFT特征
                      <ul className="list-disc pl-6 mt-2">
                        <li>尺度不变特征</li>
                        <li>关键点检测</li>
                        <li>特征描述子</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">全局特征</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>PCA降维
                      <ul className="list-disc pl-6 mt-2">
                        <li>主成分分析</li>
                        <li>特征选择</li>
                        <li>维度压缩</li>
                      </ul>
                    </li>
                    <li>LDA降维
                      <ul className="list-disc pl-6 mt-2">
                        <li>线性判别分析</li>
                        <li>类别可分性</li>
                        <li>特征提取</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习特征</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>CNN特征
                    <ul className="list-disc pl-6 mt-2">
                      <li>深度卷积网络</li>
                      <li>特征层次化</li>
                      <li>端到端学习</li>
                    </ul>
                  </li>
                  <li>度量学习
                    <ul className="list-disc pl-6 mt-2">
                      <li>Triplet Loss</li>
                      <li>Contrastive Loss</li>
                      <li>Center Loss</li>
                    </ul>
                  </li>
                  <li>注意力机制
                    <ul className="list-disc pl-6 mt-2">
                      <li>空间注意力</li>
                      <li>通道注意力</li>
                      <li>自注意力</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recognition' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">识别方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">验证任务</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>一对一匹配
                      <ul className="list-disc pl-6 mt-2">
                        <li>特征相似度计算</li>
                        <li>阈值判断</li>
                        <li>ROC曲线评估</li>
                      </ul>
                    </li>
                    <li>性能指标
                      <ul className="list-disc pl-6 mt-2">
                        <li>FAR（误识率）</li>
                        <li>FRR（拒识率）</li>
                        <li>EER（等错误率）</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">识别任务</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>一对多匹配
                      <ul className="list-disc pl-6 mt-2">
                        <li>特征库构建</li>
                        <li>最近邻搜索</li>
                        <li>相似度排序</li>
                      </ul>
                    </li>
                    <li>性能指标
                      <ul className="list-disc pl-6 mt-2">
                        <li>准确率</li>
                        <li>召回率</li>
                        <li>F1分数</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">最新进展</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>深度学习方法
                    <ul className="list-disc pl-6 mt-2">
                      <li>ArcFace</li>
                      <li>CosFace</li>
                      <li>SphereFace</li>
                    </ul>
                  </li>
                  <li>大规模应用
                    <ul className="list-disc pl-6 mt-2">
                      <li>分布式特征库</li>
                      <li>快速检索</li>
                      <li>增量学习</li>
                    </ul>
                  </li>
                  <li>安全防护
                    <ul className="list-disc pl-6 mt-2">
                      <li>活体检测</li>
                      <li>防伪技术</li>
                      <li>隐私保护</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">MTCNN人脸检测示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import cv2
import numpy as np
from mtcnn import MTCNN

# 初始化检测器
detector = MTCNN()

# 读取图像
image = cv2.imread('face.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# 检测人脸
faces = detector.detect_faces(image)

# 处理检测结果
for face in faces:
    # 获取边界框
    x, y, width, height = face['box']
    # 获取关键点
    keypoints = face['keypoints']
    # 获取置信度
    confidence = face['confidence']
    
    # 绘制边界框
    cv2.rectangle(image, (x, y), (x+width, y+height), (0, 255, 0), 2)
    
    # 绘制关键点
    for keypoint in keypoints.values():
        cv2.circle(image, keypoint, 2, (0, 255, 0), 2)
    
    # 显示置信度
    cv2.putText(image, f'{confidence:.2f}', (x, y-10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# 显示结果
cv2.imshow('Face Detection', cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
cv2.waitKey(0)
cv2.destroyAllWindows()`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">人脸特征提取示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms

class FaceFeatureExtractor(nn.Module):
    def __init__(self, pretrained=True):
        super().__init__()
        # 使用预训练的ResNet作为基础网络
        resnet = models.resnet50(pretrained=pretrained)
        # 移除最后的全连接层
        self.features = nn.Sequential(*list(resnet.children())[:-1])
        # 添加特征投影层
        self.projection = nn.Linear(2048, 512)
        
    def forward(self, x):
        # 提取特征
        x = self.features(x)
        x = x.view(x.size(0), -1)
        # 投影到低维空间
        x = self.projection(x)
        # L2归一化
        x = nn.functional.normalize(x, p=2, dim=1)
        return x

# 图像预处理
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                       std=[0.229, 0.224, 0.225])
])

# 初始化模型
model = FaceFeatureExtractor()
model.eval()

# 特征提取函数
def extract_features(image):
    # 预处理图像
    image = transform(image).unsqueeze(0)
    # 提取特征
    with torch.no_grad():
        features = model(image)
    return features`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">人脸识别示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class FaceRecognizer:
    def __init__(self, threshold=0.5):
        self.threshold = threshold
        self.feature_database = {}
        
    def add_face(self, name, features):
        """添加人脸特征到数据库"""
        self.feature_database[name] = features
        
    def verify_face(self, probe_features, gallery_features):
        """验证人脸身份"""
        # 计算相似度
        similarity = cosine_similarity(probe_features, gallery_features)[0][0]
        # 判断是否匹配
        return similarity > self.threshold, similarity
        
    def identify_face(self, probe_features):
        """识别人脸身份"""
        best_match = None
        best_similarity = -1
        
        # 遍历数据库中的所有特征
        for name, features in self.feature_database.items():
            similarity = cosine_similarity(probe_features, features)[0][0]
            if similarity > best_similarity:
                best_similarity = similarity
                best_match = name
                
        # 判断是否超过阈值
        if best_similarity > self.threshold:
            return best_match, best_similarity
        else:
            return "Unknown", best_similarity

# 使用示例
recognizer = FaceRecognizer(threshold=0.6)

# 添加已知人脸
known_face_features = extract_features(known_face_image)
recognizer.add_face("person1", known_face_features)

# 验证人脸
probe_features = extract_features(probe_image)
is_match, similarity = recognizer.verify_face(probe_features, known_face_features)

# 识别人脸
identity, confidence = recognizer.identify_face(probe_features)`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/image-segmentation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回图像分割
        </Link>
        <Link 
          href="/study/ai/cv/pose-estimation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          姿态估计 →
        </Link>
      </div>
    </div>
  );
} 