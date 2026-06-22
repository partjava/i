'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const openposeCode = `import cv2
import numpy as np
from openpose import OpenPose

op = OpenPose()
image = cv2.imread('person.jpg')
keypoints = op.detect(image)

def draw_skeleton(image, keypoints):
    skeleton = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16]]
    for point in keypoints:
        x, y = point
        cv2.circle(image, (int(x), int(y)), 4, (0, 255, 0), -1)
    for connection in skeleton:
        start = keypoints[connection[0]]; end = keypoints[connection[1]]
        cv2.line(image, (int(start[0]), int(start[1])), (int(end[0]), int(end[1])), (0, 255, 0), 2)
    return image

result = draw_skeleton(image.copy(), keypoints)
cv2.imshow('Pose Estimation', result); cv2.waitKey(0); cv2.destroyAllWindows()`

const pose3dCode = `import torch
import torch.nn as nn
import torchvision.models as models

class Pose3DNet(nn.Module):
    def __init__(self, num_joints=17):
        super().__init__()
        resnet = models.resnet50(pretrained=True)
        self.features = nn.Sequential(*list(resnet.children())[:-1])
        self.pose_head = nn.Sequential(
            nn.Linear(2048, 1024), nn.ReLU(), nn.Dropout(0.5),
            nn.Linear(1024, num_joints * 3))
    def forward(self, x):
        features = self.features(x).view(x.size(0), -1)
        return self.pose_head(features).view(-1, 17, 3)

def train_pose3d(model, train_loader, criterion, optimizer):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad(); output = model(data); loss = criterion(output, target)
        loss.backward(); optimizer.step()
        if batch_idx % 100 == 0:
            print(f'Train Epoch: {epoch} [{batch_idx}/{len(train_loader)}] Loss: {loss.item():.6f}')

def evaluate_pose3d(model, test_loader):
    model.eval(); total_error = 0
    with torch.no_grad():
        for data, target in test_loader:
            output = model(data)
            total_error += torch.norm(output - target, dim=2).mean().item()
    return total_error / len(test_loader)`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '姿态估计', chapterNumber: 7, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '人脸识别', href: '/study/ai/cv/face-recognition' },
  nextChapter: { label: '视频分析', href: '/study/ai/cv/video-analysis' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>姿态估计概述</PageTitle><BookParagraph>姿态估计是计算机视觉中的重要任务，旨在从图像或视频中估计人体或物体的空间位置和姿态。根据输出维度的不同，可以分为2D姿态估计和3D姿态估计。</BookParagraph><SectionTitle>主要任务：</SectionTitle><BookList items={['关键点检测：定位身体关键点','骨架估计：连接关键点形成骨架','姿态分析：理解动作和姿态','3D重建：估计3D空间中的姿态']} /><SectionTitle>技术挑战</SectionTitle><BookParagraph><b>遮挡问题：</b>自遮挡、物体遮挡、多人遮挡</BookParagraph><BookParagraph><b>姿态多样性：</b>复杂动作、快速运动、极端姿态</BookParagraph><BookParagraph><b>环境因素：</b>光照变化、背景干扰、视角变化</BookParagraph><BookParagraph><b>实时性要求：</b>计算效率、延迟控制、资源限制</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>),
  },
  {
    label: '2D姿态估计', left: (<div className="space-y-4"><PageTitle>2D姿态估计</PageTitle><SectionTitle>传统方法</SectionTitle><BookParagraph><b>基于图形模型：</b>Pictorial Structures(部件检测、空间关系建模、图模型推理)，Deformable Part Models(可变形部件、空间约束、结构预测)</BookParagraph><BookParagraph><b>基于回归：</b>随机森林(特征提取、回归预测、级联回归)，深度回归(CNN特征、坐标回归、多任务学习)</BookParagraph><SectionTitle>深度学习方法</SectionTitle><BookParagraph><b>基于热图：</b>Stacked Hourglass、HRNet、CPN</BookParagraph><BookParagraph><b>基于回归：</b>DeepPose、DensePose、OpenPose</BookParagraph><BookParagraph><b>混合方法：</b>热图+回归、多尺度特征、注意力机制</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>),
  },
  {
    label: '3D姿态估计', left: (<div className="space-y-4"><PageTitle>3D姿态估计</PageTitle><SectionTitle>单目3D姿态估计</SectionTitle><BookParagraph><b>基于模型：</b>SMPL模型(参数化人体模型、姿态参数估计、形状参数估计)，骨架模型(关节角度估计、骨骼长度约束、运动学约束)</BookParagraph><BookParagraph><b>基于学习：</b>端到端方法(直接回归、多任务学习、自监督学习)，两阶段方法(2D检测、3D重建、优化后处理)</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>多视角方法</SectionTitle><BookParagraph><b>多相机系统：</b>相机标定、三角测量、多视角融合</BookParagraph><BookParagraph><b>深度相机：</b>深度信息、点云处理、实时跟踪</BookParagraph><BookParagraph><b>混合方法：</b>RGB-D融合、多模态学习、传感器融合</BookParagraph></div>),
  },
  {
    label: '应用场景', left: (<div className="space-y-4"><PageTitle>应用场景</PageTitle><SectionTitle>人机交互</SectionTitle><BookParagraph><b>动作控制：</b>手势识别、体感游戏、虚拟现实</BookParagraph><BookParagraph><b>行为分析：</b>动作识别、姿态评估、异常检测</BookParagraph><SectionTitle>医疗健康</SectionTitle><BookParagraph><b>康复训练：</b>动作指导、姿态纠正、进度评估</BookParagraph><BookParagraph><b>运动分析：</b>运动捕捉、生物力学、运动评估</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>其他应用</SectionTitle><BookParagraph><b>安防监控：</b>行为分析、异常检测、人数统计</BookParagraph><BookParagraph><b>智能零售：</b>顾客行为、商品交互、客流分析</BookParagraph><BookParagraph><b>体育分析：</b>动作分析、技术评估、训练指导</BookParagraph></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>OpenPose示例</SectionTitle><BookCode language="python" code={openposeCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>3D姿态估计示例</SectionTitle><BookCode language="python" code={pose3dCode} /></div>),
  },
]

export default function CvPoseEstimationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
