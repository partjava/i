'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const rosPubCode = `# ROS2发布节点示例
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.pub = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.callback)
    def callback(self):
        msg = String()
        msg.data = 'Hello ROS2'
        self.pub.publish(msg)

rclpy.init()
rclpy.spin(Talker())
rclpy.shutdown()`

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '机器人操作系统', chapterNumber: 6, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '传感器与感知', href: '/study/ai/robot/sensors' }, nextChapter: { label: '机器人视觉', href: '/study/ai/robot/vision' }, theme: THEMES.ai }

const SPREADS = [
  { label: 'ROS基础', left: (<div className="space-y-4"><PageTitle>ROS基础</PageTitle><BookParagraph>ROS（Robot Operating System）是开源的机器人操作系统框架，提供分布式通信、硬件抽象、设备驱动、工具库等功能。ROS采用节点-话题-服务的通信架构。</BookParagraph><SectionTitle>通信机制</SectionTitle><BookList items={['话题(Topic)：异步发布/订阅通信','服务(Service)：同步请求/响应通信','动作(Action)：带反馈的长时间任务']} /></div>), right: (<div className="space-y-4"><SectionTitle>ROS2发布节点</SectionTitle><BookCode language="python" code={rosPubCode} /></div>) },
  { label: '核心概念', left: (<div className="space-y-4"><PageTitle>核心概念</PageTitle><SectionTitle>节点管理</SectionTitle><BookList items={['Master：名称服务器','Node：可执行进程','Parameter Server：参数共享']} /><SectionTitle>常用工具</SectionTitle><BookList items={['rviz：3D可视化工具','gazebo：物理仿真','rqt：GUI工具集','rosbag：数据记录']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '开发工具', left: (<div className="space-y-4"><PageTitle>开发工具</PageTitle><SectionTitle>ROS2新特性</SectionTitle><BookList items={['DDS通信：实时性更好','多平台支持：Linux/Windows','安全机制：加密通信','生命周期管理：节点状态管理']} /></div>), right: (<div className="space-y-4"><SectionTitle>launch文件示例</SectionTitle><BookCode language="python" code={`from launch import LaunchDescription\nfrom launch_ros.actions import Node\n\ndef generate_launch_description():\n    return LaunchDescription([\n        Node(package='my_robot', executable='talker'),\n        Node(package='my_robot', executable='listener'),\n    ])`} /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['移动机器人：Navigation Stack','机械臂控制：MoveIt!','SLAM建图：GMapping/Cartographer','自主导航：AMCL定位']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotRosPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
