'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const amclCode = `import numpy as np

class ParticleFilter:
    def __init__(self, n_particles=1000):
        self.particles = np.random.rand(n_particles, 3) * 10
        self.weights = np.ones(n_particles) / n_particles

    def predict(self, vel, omega, dt):
        theta = self.particles[:, 2]
        self.particles[:, 0] += vel * np.cos(theta) * dt
        self.particles[:, 1] += vel * np.sin(theta) * dt
        self.particles[:, 2] += omega * dt
        self.particles += np.random.randn(*self.particles.shape) * 0.1

    def update(self, landmarks, measurements, std):
        for i, p in enumerate(self.particles):
            dist = np.linalg.norm(p[:2] - landmarks, axis=1)
            self.weights[i] = np.prod(np.exp(-0.5*((dist-measurements)/std)**2))
        self.weights /= np.sum(self.weights)`

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '机器人导航', chapterNumber: 8, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '机器人视觉', href: '/study/ai/robot/vision' }, nextChapter: { label: '人机交互', href: '/study/ai/robot/hci' }, theme: THEMES.ai }

const SPREADS = [
  { label: '导航基础', left: (<div className="space-y-4"><PageTitle>导航基础</PageTitle><BookParagraph>机器人导航是移动机器人的核心技术，包括定位、建图、路径规划和控制。经典的导航框架是"感知-规划-控制"循环。</BookParagraph><SectionTitle>导航框架</SectionTitle><BookList items={['感知：传感器数据采集和处理','定位：确定机器人位置','建图：构建环境地图','规划：生成运动路径','控制：执行运动指令']} /></div>), right: (<div className="space-y-4"><SectionTitle>粒子滤波定位</SectionTitle><BookCode language="python" code={amclCode} /></div>) },
  { label: '定位技术', left: (<div className="space-y-4"><PageTitle>定位技术</PageTitle><SectionTitle>AMCL</SectionTitle><BookParagraph>自适应蒙特卡洛定位，使用粒子滤波估计机器人姿态。通过传感器观测更新粒子权重，在已知地图中定位。</BookParagraph><SectionTitle>卡尔曼滤波</SectionTitle><BookParagraph>融合多传感器信息进行状态估计，分为预测和更新两步。扩展卡尔曼滤波(EKF)适用于非线性系统。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '环境建图', left: (<div className="space-y-4"><PageTitle>环境建图</PageTitle><SectionTitle>栅格地图</SectionTitle><BookParagraph>将环境离散化为栅格，每个栅格表示被占据的概率。适用于2D平面导航，计算效率高。</BookParagraph><SectionTitle>点云地图</SectionTitle><BookParagraph>使用3D点云表示环境，精度高但数据量大。结合SLAM构建3D地图，适用于复杂环境。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>SLAM建图</SectionTitle><BookCode language="python" code={`# 使用ROS Cartographer建图\n# roslaunch cartographer_ros demo_revo_lds.launch\n# 保存地图\nrosservice call /write_state "{filename: '\${HOME}/map.pbstream'}"\n# 转换为pgm/yaml\nrosrun cartographer_ros cartographer_pbstream_to_ros_map \\\n  -pbstream_filename map.pbstream -map_filestem map`} /></div>) },
  { label: '路径规划', left: (<div className="space-y-4"><PageTitle>路径规划</PageTitle><BookList items={['全局规划：A*、Dijkstra','局部规划：DWA、TEB','轨迹优化：梯度优化']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotNavPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
