'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const reconCode = `import cv2
import numpy as np
import open3d as o3d

def reconstruct_3d(images, camera_matrix):
    sift = cv2.SIFT_create()
    keypoints, descriptors = [], []
    for img in images:
        kp, des = sift.detectAndCompute(img, None)
        keypoints.append(kp); descriptors.append(des)
    matcher = cv2.BFMatcher()
    matches = matcher.knnMatch(descriptors[0], descriptors[1], k=2)
    good_matches = [m for m, n in matches if m.distance < 0.75 * n.distance]
    pts1 = np.float32([keypoints[0][m.queryIdx].pt for m in good_matches])
    pts2 = np.float32([keypoints[1][m.trainIdx].pt for m in good_matches])
    E, _ = cv2.findEssentialMat(pts1, pts2, camera_matrix)
    _, R, t, _ = cv2.recoverPose(E, pts1, pts2, camera_matrix)
    P1 = np.dot(camera_matrix, np.hstack((np.eye(3), np.zeros((3, 1)))))
    P2 = np.dot(camera_matrix, np.hstack((R, t)))
    points_4d = cv2.triangulatePoints(P1, P2, pts1.T, pts2.T)
    points_3d = points_4d[:3] / points_4d[3]
    return points_3d.T

def create_point_cloud(points_3d, colors):
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(points_3d)
    pcd.colors = o3d.utility.Vector3dVector(colors)
    return pcd`

const depthCode = `import torch
import torch.nn as nn
import torchvision.models as models

class DepthNet(nn.Module):
    def __init__(self):
        super().__init__()
        resnet = models.resnet50(pretrained=True)
        self.encoder = nn.Sequential(*list(resnet.children())[:-2])
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(2048, 1024, 3, 2, 1, output_padding=1), nn.ReLU(),
            nn.ConvTranspose2d(1024, 512, 3, 2, 1, output_padding=1), nn.ReLU(),
            nn.ConvTranspose2d(512, 256, 3, 2, 1, output_padding=1), nn.ReLU(),
            nn.ConvTranspose2d(256, 128, 3, 2, 1, output_padding=1), nn.ReLU(),
            nn.ConvTranspose2d(128, 64, 3, 2, 1, output_padding=1), nn.ReLU(),
            nn.Conv2d(64, 1, 3, padding=1), nn.Sigmoid())
    def forward(self, x):
        return self.decoder(self.encoder(x))

def depth_loss(pred, target):
    grad_pred_x = torch.abs(pred[:,:,:,:-1] - pred[:,:,:,1:])
    grad_pred_y = torch.abs(pred[:,:,:-1,:] - pred[:,:,1:,:])
    grad_target_x = torch.abs(target[:,:,:,:-1] - target[:,:,:,1:])
    grad_target_y = torch.abs(target[:,:,:-1,:] - target[:,:,1:,:])
    grad_loss = torch.mean(torch.abs(grad_pred_x - grad_target_x) + torch.abs(grad_pred_y - grad_target_y))
    return torch.mean(torch.abs(pred - target)) + 0.5 * grad_loss`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '3D视觉', chapterNumber: 9, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '视频分析', href: '/study/ai/cv/video-analysis' },
  nextChapter: { label: '视觉框架与工具', href: '/study/ai/cv/frameworks' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>3D视觉概述</PageTitle><BookParagraph>3D视觉是计算机视觉的重要分支，致力于从2D图像或视频中恢复和理解3D场景信息。它结合了几何学、光学和计算机图形学等多个领域的知识。</BookParagraph><SectionTitle>主要任务：</SectionTitle><BookList items={['3D重建：从多视角图像重建3D场景','深度估计：估计场景的深度信息','点云处理：处理和分析3D点云数据','3D目标检测：检测和识别3D空间中的物体']} /><SectionTitle>技术挑战</SectionTitle><BookParagraph><b>几何约束：</b>相机标定、多视角几何、尺度一致性</BookParagraph><BookParagraph><b>数据获取：</b>传感器噪声、数据缺失、分辨率限制</BookParagraph><BookParagraph><b>计算效率：</b>实时处理、大规模数据、资源优化</BookParagraph><BookParagraph><b>应用需求：</b>精度要求、鲁棒性、通用性</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><br /></div>),
  },
  {
    label: '3D重建', left: (<div className="space-y-4"><PageTitle>多视角重建</PageTitle><SectionTitle>特征匹配</SectionTitle><BookParagraph><b>特征提取：</b>SIFT特征、SURF特征、ORB特征</BookParagraph><BookParagraph><b>匹配策略：</b>最近邻匹配、比率测试、几何验证</BookParagraph><SectionTitle>三角测量</SectionTitle><BookParagraph><b>相机位姿：</b>本质矩阵、基础矩阵、PnP问题</BookParagraph><BookParagraph><b>点云生成：</b>三角化、深度估计、点云优化</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>深度学习方法</SectionTitle><BookParagraph><b>端到端重建：</b>MVSNet、DenseFusion、NeRF</BookParagraph><BookParagraph><b>混合方法：</b>传统+深度学习、多阶段处理、自适应融合</BookParagraph><BookParagraph><b>优化策略：</b>几何约束、光度一致性、正则化</BookParagraph></div>),
  },
  {
    label: '深度估计', left: (<div className="space-y-4"><PageTitle>单目深度估计</PageTitle><SectionTitle>传统方法</SectionTitle><BookParagraph><b>基于线索：</b>纹理梯度、遮挡关系、相对大小</BookParagraph><BookParagraph><b>基于学习：</b>MRF模型、CRF模型、结构化预测</BookParagraph><SectionTitle>深度学习方法</SectionTitle><BookParagraph><b>监督学习：</b>深度网络、多尺度特征、损失函数</BookParagraph><BookParagraph><b>自监督学习：</b>光度一致性、几何约束、多视角监督</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>立体视觉</SectionTitle><BookParagraph><b>立体匹配：</b>局部方法、全局方法、半全局方法(SGM)</BookParagraph><BookParagraph><b>深度相机：</b>结构光、飞行时间(ToF)、双目相机</BookParagraph><BookParagraph><b>应用场景：</b>AR/VR、机器人导航、3D扫描</BookParagraph></div>),
  },
  {
    label: '点云处理', left: (<div className="space-y-4"><PageTitle>点云处理</PageTitle><SectionTitle>预处理</SectionTitle><BookParagraph><b>降噪滤波：</b>统计滤波、半径滤波、体素滤波</BookParagraph><BookParagraph><b>配准对齐：</b>ICP算法、NDT算法、特征匹配</BookParagraph><SectionTitle>特征提取</SectionTitle><BookParagraph><b>局部特征：</b>FPFH、SHOT、Spin Image</BookParagraph><BookParagraph><b>全局特征：</b>VFH、ESF、3D Shape Context</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>深度学习应用</SectionTitle><BookParagraph><b>点云网络：</b>PointNet、PointNet++、DGCNN</BookParagraph><BookParagraph><b>应用任务：</b>分类、分割、配准</BookParagraph><BookParagraph><b>优化方法：</b>数据增强、损失函数、训练策略</BookParagraph></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>3D重建示例</SectionTitle><BookCode language="python" code={reconCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>深度估计示例</SectionTitle><BookCode language="python" code={depthCode} /></div>),
  },
]

export default function Cv3dVisionPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
