'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const trackingCode = `import cv2
import numpy as np

tracker = SiamRPN()
cap = cv2.VideoCapture('video.mp4')
ret, frame = cap.read()
bbox = cv2.selectROI('Select Target', frame, False)
tracker.init(frame, bbox)

while True:
    ret, frame = cap.read()
    if not ret: break
    bbox = tracker.update(frame)
    x, y, w, h = [int(v) for v in bbox]
    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
    cv2.imshow('Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
cap.release(); cv2.destroyAllWindows()`

const actionCode = `import torch
import torch.nn as nn
import torchvision.models as models

class ActionRecognitionNet(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.backbone = models.video.r3d_18(pretrained=True)
        self.backbone.fc = nn.Linear(512, num_classes)
    def forward(self, x):
        return self.backbone(x)

def preprocess_video(video_path, num_frames=16):
    frames = []
    cap = cv2.VideoCapture(video_path)
    while len(frames) < num_frames:
        ret, frame = cap.read()
        if not ret: break
        frame = cv2.resize(frame, (224, 224)) / 255.0
        frames.append(frame)
    cap.release()
    if len(frames) < num_frames:
        frames.extend([frames[-1]] * (num_frames - len(frames)))
    else: frames = frames[:num_frames]
    return torch.FloatTensor(frames).permute(3, 0, 1, 2).unsqueeze(0)

def predict_action(model, video_path):
    model.eval()
    with torch.no_grad():
        video = preprocess_video(video_path)
        pred = model(video).argmax(dim=1).item()
        return pred`

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '视频分析', chapterNumber: 8, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '姿态估计', href: '/study/ai/cv/pose-estimation' },
  nextChapter: { label: '3D视觉', href: '/study/ai/cv/3d-vision' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>视频分析概述</PageTitle><BookParagraph>视频分析是计算机视觉的重要分支，它通过分析视频序列来理解场景、跟踪目标、识别行为等。相比图像分析，视频分析需要考虑时序信息和运动特征。</BookParagraph><BookList items={['视频预处理：降噪、稳定、增强','目标检测：定位视频中的目标','目标跟踪：跟踪目标的运动轨迹','行为识别：理解目标的动作和行为']} /><SectionTitle>技术挑战</SectionTitle><BookList items={['实时性要求：计算效率、延迟控制、资源优化','环境变化：光照变化、视角变化、遮挡问题','目标变化：外观变化、尺度变化、运动模糊','场景复杂度：多目标交互、背景干扰、场景切换']} /></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '视频处理', left: (<div className="space-y-4"><PageTitle>视频预处理</PageTitle><SectionTitle>图像增强</SectionTitle><BookParagraph><b>降噪处理：</b>高斯滤波、中值滤波、非局部均值去噪</BookParagraph><BookParagraph><b>图像增强：</b>直方图均衡化、对比度增强、锐化处理</BookParagraph><SectionTitle>视频稳定</SectionTitle><BookParagraph><b>运动估计：</b>光流估计、特征匹配、运动补偿</BookParagraph><BookParagraph><b>稳定处理：</b>运动平滑、帧对齐、抖动消除</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>视频编码</SectionTitle><BookParagraph><b>编码标准：</b>H.264/AVC、H.265/HEVC、AV1</BookParagraph><BookParagraph><b>压缩技术：</b>帧内预测、帧间预测、变换编码</BookParagraph><BookParagraph><b>质量评估：</b>PSNR、SSIM、VMAF</BookParagraph></div>),
  },
  {
    label: '目标跟踪', left: (<div className="space-y-4"><PageTitle>目标跟踪方法</PageTitle><SectionTitle>传统跟踪方法</SectionTitle><BookParagraph><b>基于相关滤波：</b>KCF(循环矩阵、核相关、快速计算)，CSK(密集采样、核函数、尺度估计)</BookParagraph><BookParagraph><b>基于粒子滤波：</b>粒子采样(状态预测、权重更新、重采样)，观测模型(特征提取、相似度计算、状态估计)</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>深度学习方法</SectionTitle><BookParagraph><b>Siam系列：</b>SiamFC、SiamRPN、SiamMask</BookParagraph><BookParagraph><b>MDNet系列：</b>MDNet、RT-MDNet、VITAL</BookParagraph><BookParagraph><b>Transformer系列：</b>TransT、STARK、TrDiMP</BookParagraph></div>),
  },
  {
    label: '行为识别', left: (<div className="space-y-4"><PageTitle>行为识别方法</PageTitle><SectionTitle>传统方法</SectionTitle><BookParagraph><b>基于特征：</b>HOG特征、光流特征、轨迹特征</BookParagraph><BookParagraph><b>基于模型：</b>隐马尔可夫模型、条件随机场、动态贝叶斯网络</BookParagraph><SectionTitle>深度学习方法</SectionTitle><BookParagraph><b>CNN系列：</b>3D CNN、C3D、I3D</BookParagraph><BookParagraph><b>RNN系列：</b>LSTM、GRU、BiLSTM</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>应用场景</SectionTitle><BookParagraph><b>安防监控：</b>异常行为检测、人群行为分析、安全预警</BookParagraph><BookParagraph><b>智能零售：</b>顾客行为分析、商品交互识别、客流统计</BookParagraph><BookParagraph><b>体育分析：</b>动作识别、技术评估、训练指导</BookParagraph></div>),
  },
  {
    label: '代码示例', left: (<div className="space-y-4"><PageTitle>代码示例</PageTitle><SectionTitle>视频目标跟踪</SectionTitle><BookCode language="python" code={trackingCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>行为识别</SectionTitle><BookCode language="python" code={actionCode} /></div>),
  },
]

export default function CvVideoAnalysisPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
