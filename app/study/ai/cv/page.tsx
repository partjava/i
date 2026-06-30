'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '计算机视觉基础', description: 'CV基本概念、历史和应用领域', href: '/study/ai/cv/basic' },
  { number: 2, title: '图像处理基础', description: '图像滤波、增强、变换等基础操作', href: '/study/ai/cv/image-processing' },
  { number: 3, title: '特征提取与匹配', description: 'SIFT、SURF、ORB等特征检测算法', href: '/study/ai/cv/feature-extraction' },
  { number: 4, title: '目标检测', description: 'YOLO、R-CNN等目标检测算法', href: '/study/ai/cv/object-detection' },
  { number: 5, title: '图像分割', description: '语义分割和实例分割技术', href: '/study/ai/cv/image-segmentation' },
  { number: 6, title: '人脸识别', description: '人脸检测、特征提取和识别算法', href: '/study/ai/cv/face-recognition' },
  { number: 7, title: '姿态估计', description: '人体姿态估计和动作识别技术', href: '/study/ai/cv/pose-estimation' },
  { number: 8, title: '视频分析', description: '视频理解和行为分析技术', href: '/study/ai/cv/video-analysis' },
  { number: 9, title: '3D视觉', description: '立体视觉、点云处理和3D重建', href: '/study/ai/cv/3d-vision' },
  { number: 10, title: '视觉框架与工具', description: 'OpenCV、MMCV等CV工具库', href: '/study/ai/cv/frameworks' },
  { number: 11, title: '计算机视觉实战', description: '真实业务场景的CV应用', href: '/study/ai/cv/cases' },
  { number: 12, title: '计算机视觉面试题', description: 'CV面试高频问题', href: '/study/ai/cv/interview' },
  { number: 13, title: '进阶与前沿', description: '最新技术发展和研究方向', href: '/study/ai/cv/advanced' },
]

export default function CvHomePage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="计算机视觉"
        subtitle="Computer Vision"
        description={'计算机视觉是人工智能的一个重要分支，致力于让计算机能够「看见」并理解视觉世界。从图像分类到目标检测，CV技术正在改变自动驾驶、医疗影像、安防监控等领域。'}
        chapterCount={CHAPTERS.length}
        totalHours={150}
        chapters={CHAPTERS}
        icon="👁️"
        startHref="/study/ai/cv/basic"
        theme={THEMES.ai}
      />
    </div>
  )
}
