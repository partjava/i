'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotOSPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: 'ROS基础' },
    { id: 'core', label: '核心概念' },
    { id: 'tools', label: '开发工具' },
    { id: 'application', label: '实际应用' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人操作系统(ROS)</h1>
      
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">ROS基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. ROS简介</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS(Robot Operating System)是一个用于机器人开发的灵活框架，
                      提供了一系列工具、库和约定，用于简化机器人软件开发。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">主要特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>分布式架构</li>
                        <li>松耦合设计</li>
                        <li>丰富的工具集</li>
                        <li>活跃的社区</li>
                        <li>跨平台支持</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">系统架构</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">ROS Master</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">节点</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">话题</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="300" y="170" textAnchor="middle" fill="#666">ROS通信</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 安装与配置</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS的安装和配置是开始ROS开发的第一步，
                      需要正确设置环境变量和工作空间。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">安装步骤</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>选择ROS版本</li>
                        <li>配置软件源</li>
                        <li>安装ROS包</li>
                        <li>初始化rosdep</li>
                        <li>配置环境变量</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">工作空间设置</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`# 创建工作空间
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/src
catkin_init_workspace

# 编译工作空间
cd ~/catkin_ws
catkin_make

# 配置环境变量
source ~/catkin_ws/devel/setup.bash`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 基本命令</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS提供了一系列命令行工具，
                      用于管理节点、话题和服务。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常用命令</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>roscore：启动ROS Master</li>
                        <li>rosrun：运行节点</li>
                        <li>roslaunch：启动多个节点</li>
                        <li>rostopic：管理话题</li>
                        <li>rosservice：管理服务</li>
                        <li>rosnode：管理节点</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">命令示例</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`# 启动ROS Master
roscore

# 运行节点
rosrun package_name node_name

# 查看话题列表
rostopic list

# 查看话题信息
rostopic info /topic_name

# 发布消息
rostopic pub /topic_name message_type "data"

# 订阅消息
rostopic echo /topic_name`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'core' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">核心概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 节点与话题</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      节点是ROS中的基本执行单元，
                      话题是节点间通信的主要方式。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">节点特性</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>独立进程</li>
                        <li>松耦合</li>
                        <li>可重用</li>
                        <li>分布式</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">话题特性</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>发布/订阅模式</li>
                        <li>异步通信</li>
                        <li>多对多通信</li>
                        <li>消息队列</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def talker():
    # 初始化节点
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(10)  # 10hz
    
    while not rospy.is_shutdown():
        hello_str = "hello world %s" % rospy.get_time()
        rospy.loginfo(hello_str)
        pub.publish(hello_str)
        rate.sleep()

def listener():
    # 初始化节点
    rospy.init_node('listener', anonymous=True)
    rospy.Subscriber('chatter', String, callback)
    rospy.spin()

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 服务与参数</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      服务提供请求-响应式的通信机制，
                      参数服务器用于存储和访问配置参数。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">服务特性</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>同步通信</li>
                        <li>请求-响应模式</li>
                        <li>一对一通信</li>
                        <li>阻塞调用</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">参数服务器特性</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>全局参数存储</li>
                        <li>动态参数更新</li>
                        <li>参数命名空间</li>
                        <li>参数类型支持</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`#!/usr/bin/env python
import rospy
from std_srvs.srv import AddTwoInts, AddTwoIntsResponse

def handle_add_two_ints(req):
    print("Returning [%s + %s = %s]"%(req.a, req.b, (req.a + req.b)))
    return AddTwoIntsResponse(req.a + req.b)

def add_two_ints_server():
    rospy.init_node('add_two_ints_server')
    s = rospy.Service('add_two_ints', AddTwoInts, handle_add_two_ints)
    print("Ready to add two ints.")
    rospy.spin()

def add_two_ints_client(x, y):
    rospy.wait_for_service('add_two_ints')
    try:
        add_two_ints = rospy.ServiceProxy('add_two_ints', AddTwoInts)
        resp1 = add_two_ints(x, y)
        return resp1.sum
    except rospy.ServiceException as e:
        print("Service call failed: %s"%e)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 消息与包</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      消息定义了节点间通信的数据结构，
                      包是ROS代码的组织单元。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">消息类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>标准消息</li>
                        <li>自定义消息</li>
                        <li>复合消息</li>
                        <li>数组消息</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">包结构</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>package.xml</li>
                        <li>CMakeLists.txt</li>
                        <li>src目录</li>
                        <li>include目录</li>
                        <li>launch目录</li>
                        <li>msg目录</li>
                        <li>srv目录</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">消息定义示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`# 自定义消息定义 (msg/Person.msg)
string name
uint8 age
float32 height
float32 weight

# 自定义服务定义 (srv/AddTwoInts.srv)
int64 a
int64 b
---
int64 sum`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">开发工具</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 可视化工具</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS提供了丰富的可视化工具，
                      用于调试和监控系统运行状态。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">主要工具</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>rqt：图形化工具集</li>
                        <li>rviz：3D可视化工具</li>
                        <li>rqt_plot：数据绘图工具</li>
                        <li>rqt_graph：节点关系图</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">工具使用示例</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`# 启动rqt
rqt

# 启动rviz
rosrun rviz rviz

# 启动rqt_plot
rosrun rqt_plot rqt_plot

# 启动rqt_graph
rosrun rqt_graph rqt_graph`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 调试工具</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS提供了多种调试工具，
                      帮助开发者定位和解决问题。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">调试工具</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>rosbag：数据记录与回放</li>
                        <li>rostopic：话题调试</li>
                        <li>rosnode：节点调试</li>
                        <li>roslaunch：启动文件调试</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">调试命令示例</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`# 记录话题数据
rosbag record /topic1 /topic2

# 回放数据
rosbag play file.bag

# 查看话题信息
rostopic info /topic_name

# 查看节点信息
rosnode info /node_name

# 查看启动文件
roslaunch --screen package_name launch_file.launch`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 开发工具</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS提供了多种开发工具，
                      简化机器人软件开发过程。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">开发工具</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>catkin：构建系统</li>
                        <li>rosdep：依赖管理</li>
                        <li>roswtf：系统诊断</li>
                        <li>rosrun：节点运行</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">开发命令示例</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`# 编译工作空间
catkin_make

# 安装依赖
rosdep install --from-paths src --ignore-src -r -y

# 系统诊断
roswtf

# 运行节点
rosrun package_name node_name`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'application' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实际应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 移动机器人应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS在移动机器人领域有广泛应用，
                      包括导航、SLAM和路径规划等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>自主导航</li>
                        <li>环境建图</li>
                        <li>路径规划</li>
                        <li>避障控制</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">常用功能包</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>navigation</li>
                        <li>gmapping</li>
                        <li>amcl</li>
                        <li>move_base</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 机械臂应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS在机械臂控制领域有广泛应用，
                      包括运动规划、轨迹控制和力控制等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>运动规划</li>
                        <li>轨迹控制</li>
                        <li>力控制</li>
                        <li>抓取操作</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">常用功能包</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>moveit</li>
                        <li>ros_control</li>
                        <li>gazebo_ros_control</li>
                        <li>franka_ros</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 视觉应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      ROS在计算机视觉领域有广泛应用，
                      包括目标检测、跟踪和识别等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>目标检测</li>
                        <li>目标跟踪</li>
                        <li>姿态估计</li>
                        <li>场景理解</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">常用功能包</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>vision_opencv</li>
                        <li>darknet_ros</li>
                        <li>ar_track_alvar</li>
                        <li>apriltag_ros</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/robot/sensors"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回传感器与感知
        </Link>
        <Link 
          href="/study/ai/robot/vision"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          机器人视觉 →
        </Link>
      </div>
    </div>
  );
} 