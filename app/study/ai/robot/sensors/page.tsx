'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '传感器与感知', chapterNumber: 5, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '机器人控制', href: '/study/ai/robot/control' }, nextChapter: { label: '机器人操作系统', href: '/study/ai/robot/ros' }, theme: THEMES.ai }

const SPREADS = [
  { label: '传感器类型', left: (<div className="space-y-4"><PageTitle>传感器类型</PageTitle><SectionTitle>内部传感器</SectionTitle><BookList items={['编码器：测量关节角度/位置','IMU：加速度计+陀螺仪','力/力矩传感器：检测交互力','温度传感器：监控温度']} /><SectionTitle>外部传感器</SectionTitle><BookList items={['激光雷达(LiDAR)：测距和建图','摄像头：视觉信息获取','超声波：近距离测距','触觉传感器：接触检测']} /></div>), right: (<div className="space-y-4"><SectionTitle>IMU数据读取</SectionTitle><BookCode language="python" code={`import smbus\nbus = smbus.SMBus(1)\n# MPU6050读取加速度和陀螺仪数据\naccel = bus.read_i2c_block_data(0x68, 0x3B, 6)\ngyro = bus.read_i2c_block_data(0x68, 0x43, 6)\nax = (accel[0]<<8 | accel[1]) / 16384.0\nay = (accel[2]<<8 | accel[3]) / 16384.0\naz = (accel[4]<<8 | accel[5]) / 16384.0`} /></div>) },
  { label: '感知算法', left: (<div className="space-y-4"><PageTitle>感知算法</PageTitle><SectionTitle>激光雷达感知</SectionTitle><BookList items={['点云滤波：离群点去除','地面分割：分离地面点云','聚类分割：提取障碍物','目标跟踪：多目标跟踪']} /><SectionTitle>视觉感知</SectionTitle><BookList items={['视觉SLAM：ORB-SLAM','深度估计：单目/双目','目标检测：YOLO','语义分割：SegNet']} /></div>), right: (<div className="space-y-4"><SectionTitle>点云滤波</SectionTitle><BookCode language="python" code={`import open3d as o3d\npcd = o3d.io.read_point_cloud("scan.ply")\npcd = pcd.voxel_down_sample(0.05)\ncl, ind = pcd.remove_statistical_outlier(20, 2.0)\npcd = pcd.select_by_index(ind)`} /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['自动驾驶：多传感器融合','服务机器人：室内导航','工业检测：质量检测','环境监测：数据采集']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotSensorsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
