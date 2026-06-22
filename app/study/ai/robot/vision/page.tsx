'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const orbCode = `import cv2
img = cv2.imread('scene.jpg', 0)
orb = cv2.ORB_create()
kp, des = orb.detectAndCompute(img, None)
img_kp = cv2.drawKeypoints(img, kp, None)
cv2.imshow('ORB Features', img_kp)
cv2.waitKey(0)`

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '机器人视觉', chapterNumber: 7, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '机器人操作系统', href: '/study/ai/robot/ros' }, nextChapter: { label: '机器人导航', href: '/study/ai/robot/navigation' }, theme: THEMES.ai }

const SPREADS = [
  { label: '视觉基础', left: (<div className="space-y-4"><PageTitle>机器人视觉基础</PageTitle><BookParagraph>机器人视觉是机器人感知环境的重要手段，包括视觉SLAM、目标检测、深度估计等任务。视觉传感器提供丰富的环境信息，帮助机器人理解场景。</BookParagraph><SectionTitle>相机模型</SectionTitle><BookList items={['针孔相机模型：内参和外参','畸变校正：径向和切向畸变','立体视觉：双目深度估计']} /></div>), right: (<div className="space-y-4"><SectionTitle>相机标定</SectionTitle><BookCode language="python" code={`import cv2\nimport numpy as np\n# 棋盘格标定\ncriteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)\nret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(objpoints, imgpoints, gray.shape[::-1], None, None)`} /></div>) },
  { label: '图像处理', left: (<div className="space-y-4"><PageTitle>图像处理</PageTitle><SectionTitle>特征提取</SectionTitle><BookList items={['ORB特征：快速特征提取','特征匹配：FLANN匹配器','光流法：运动估计']} /><SectionTitle>深度估计</SectionTitle><BookList items={['双目立体匹配：视差计算','结构光：深度相机','单目深度估计：深度学习']} /></div>), right: (<div className="space-y-4"><SectionTitle>ORB特征提取</SectionTitle><BookCode language="python" code={orbCode} /></div>) },
  { label: '目标识别', left: (<div className="space-y-4"><PageTitle>目标识别</PageTitle><BookList items={['YOLO：实时目标检测','语义分割：场景理解','实例分割：物体分割','姿态估计：6D姿态']} /></div>), right: (<div className="space-y-4"><SectionTitle>YOLO检测</SectionTitle><BookCode language="python" code={`from ultralytics import YOLO\nmodel = YOLO('yolov8n.pt')\nresults = model('robot_view.jpg')\nfor r in results:\n    for box in r.boxes:\n        print(f'{model.names[int(box.cls[0])]}: {box.conf[0]:.2f}')`} /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['视觉SLAM：ORB-SLAM3','物体抓取：位姿估计','人脸识别：人机交互','视觉导航：路径规划']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotVisionPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
