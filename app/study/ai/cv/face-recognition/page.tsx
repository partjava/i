'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const mtcnnCode = `import cv2
import numpy as np
from mtcnn import MTCNN

detector = MTCNN()
image = cv2.imread('face.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
faces = detector.detect_faces(image)

for face in faces:
    x, y, width, height = face['box']
    keypoints = face['keypoints']
    confidence = face['confidence']
    cv2.rectangle(image, (x, y), (x+width, y+height), (0, 255, 0), 2)
    for keypoint in keypoints.values():
        cv2.circle(image, keypoint, 2, (0, 255, 0), 2)
    cv2.putText(image, f'{confidence:.2f}', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

cv2.imshow('Face Detection', cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
cv2.waitKey(0); cv2.destroyAllWindows()`

const featCode = `import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms

class FaceFeatureExtractor(nn.Module):
    def __init__(self, pretrained=True):
        super().__init__()
        resnet = models.resnet50(pretrained=pretrained)
        self.features = nn.Sequential(*list(resnet.children())[:-1])
        self.projection = nn.Linear(2048, 512)
    def forward(self, x):
        x = self.features(x).view(x.size(0), -1)
        x = self.projection(x)
        return nn.functional.normalize(x, p=2, dim=1)

transform = transforms.Compose([
    transforms.Resize((224, 224)), transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
model = FaceFeatureExtractor(); model.eval()

def extract_features(image):
    image = transform(image).unsqueeze(0)
    with torch.no_grad(): return model(image)`

const recogCode = `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class FaceRecognizer:
    def __init__(self, threshold=0.5):
        self.threshold = threshold; self.feature_database = {}
    def add_face(self, name, features):
        self.feature_database[name] = features
    def verify_face(self, probe_features, gallery_features):
        similarity = cosine_similarity(probe_features, gallery_features)[0][0]
        return similarity > self.threshold, similarity
    def identify_face(self, probe_features):
        best_match = None; best_similarity = -1
        for name, features in self.feature_database.items():
            similarity = cosine_similarity(probe_features, features)[0][0]
            if similarity > best_similarity:
                best_similarity = similarity; best_match = name
        return (best_match, best_similarity) if best_similarity > self.threshold else ("Unknown", best_similarity)`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '人脸识别', chapterNumber: 6, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '图像分割', href: '/study/ai/cv/image-segmentation' },
  nextChapter: { label: '姿态估计', href: '/study/ai/cv/pose-estimation' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>人脸识别概述</PageTitle><BookParagraph>人脸识别是计算机视觉领域的重要研究方向，它通过分析人脸图像来识别或验证个人身份。完整的人脸识别系统通常包括人脸检测、人脸对齐、特征提取和身份识别等步骤。</BookParagraph><SectionTitle>主要任务：</SectionTitle><BookList items={['人脸检测：定位图像中的人脸位置','人脸对齐：标准化人脸姿态和大小','特征提取：提取人脸特征表示','身份识别：匹配和验证身份']} /><SectionTitle>技术挑战</SectionTitle><BookParagraph><b>姿态变化：</b>人脸旋转和倾斜，侧脸和遮挡，表情变化</BookParagraph><BookParagraph><b>光照条件：</b>光照强度变化，阴影和反光，不同光源</BookParagraph><BookParagraph><b>图像质量：</b>分辨率限制，噪声和模糊，压缩失真</BookParagraph><BookParagraph><b>时间跨度：</b>年龄变化，妆容和装饰，发型变化</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookParagraph><b>安防监控：</b>门禁系统、视频监控、可疑人员识别</BookParagraph><BookParagraph><b>身份认证：</b>手机解锁、支付验证、考勤系统</BookParagraph><BookParagraph><b>社交应用：</b>照片标记、人脸美化、表情识别</BookParagraph><BookParagraph><b>智能零售：</b>顾客分析、个性化推荐、行为分析</BookParagraph></div>),
  },
  {
    label: '人脸检测', left: (<div className="space-y-4"><PageTitle>人脸检测方法</PageTitle><SectionTitle>传统检测方法</SectionTitle><BookParagraph><b>Haar特征检测：</b>使用Haar-like特征描述人脸，级联分类器快速筛选，积分图像加速计算。计算效率高，但对姿态敏感，容易受光照影响。</BookParagraph><BookParagraph><b>HOG特征检测：</b>计算图像梯度直方图，SVM分类器判断，滑动窗口检测。对光照变化鲁棒，但计算量较大，检测速度较慢。</BookParagraph><SectionTitle>深度学习方法</SectionTitle><BookParagraph><b>CNN-based检测器：</b>MTCNN(多任务级联CNN)、RetinaFace(高精度单阶段检测器)、BlazeFace(轻量级移动端检测器)</BookParagraph><BookParagraph><b>Anchor-free检测器：</b>CenterNet、FCOS、CornerNet</BookParagraph><BookParagraph><b>关键点检测：</b>人脸特征点定位、姿态估计、表情识别</BookParagraph></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '人脸对齐', left: (<div className="space-y-4"><PageTitle>人脸对齐方法</PageTitle><SectionTitle>几何变换</SectionTitle><BookParagraph><b>仿射变换：</b>平移和旋转，缩放和剪切，保持平行性</BookParagraph><BookParagraph><b>透视变换：</b>处理视角变化，3D姿态估计，投影校正</BookParagraph><SectionTitle>特征点对齐</SectionTitle><BookParagraph><b>关键点检测：</b>眼睛和嘴角，鼻子和下巴，轮廓点</BookParagraph><BookParagraph><b>对齐策略：</b>基于关键点、基于模板、基于3D模型</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>深度学习对齐</SectionTitle><BookParagraph><b>端到端对齐：</b>空间变换网络、可变形卷积、注意力机制</BookParagraph><BookParagraph><b>多任务学习：</b>检测和对齐联合、姿态估计、表情识别</BookParagraph></div>),
  },
  {
    label: '特征提取', left: (<div className="space-y-4"><PageTitle>特征提取</PageTitle><SectionTitle>局部特征</SectionTitle><BookParagraph><b>LBP特征：</b>局部二值模式，纹理描述，光照不变性</BookParagraph><BookParagraph><b>SIFT特征：</b>尺度不变特征，关键点检测，特征描述子</BookParagraph><SectionTitle>全局特征</SectionTitle><BookParagraph><b>PCA降维：</b>主成分分析，特征选择，维度压缩</BookParagraph><BookParagraph><b>LDA降维：</b>线性判别分析，类别可分性，特征提取</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>深度学习特征</SectionTitle><BookParagraph><b>CNN特征：</b>深度卷积网络，特征层次化，端到端学习</BookParagraph><BookParagraph><b>度量学习：</b>Triplet Loss、Contrastive Loss、Center Loss</BookParagraph><BookParagraph><b>注意力机制：</b>空间注意力、通道注意力、自注意力</BookParagraph></div>),
  },
  {
    label: '人脸识别', left: (<div className="space-y-4"><PageTitle>识别方法</PageTitle><SectionTitle>验证任务（一对一匹配）</SectionTitle><BookParagraph>特征相似度计算，阈值判断，ROC曲线评估</BookParagraph><BookParagraph><b>性能指标：</b>FAR（误识率）、FRR（拒识率）、EER（等错误率）</BookParagraph><SectionTitle>识别任务（一对多匹配）</SectionTitle><BookParagraph>特征库构建，最近邻搜索，相似度排序</BookParagraph><BookParagraph><b>性能指标：</b>准确率、召回率、F1分数</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>最新进展</SectionTitle><BookParagraph><b>深度学习方法：</b>ArcFace、CosFace、SphereFace</BookParagraph><BookParagraph><b>大规模应用：</b>分布式特征库，快速检索，增量学习</BookParagraph><BookParagraph><b>安全防护：</b>活体检测、防伪技术、隐私保护</BookParagraph></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>MTCNN人脸检测</SectionTitle><BookCode language="python" code={mtcnnCode} /><SectionTitle>人脸特征提取</SectionTitle><BookCode language="python" code={featCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>人脸识别</SectionTitle><BookCode language="python" code={recogCode} /></div>),
  },
]

export default function CvFaceRecognitionPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
