'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotInteractionPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '交互基础' },
    { id: 'interface', label: '交互界面' },
    { id: 'communication', label: '交互方式' },
    { id: 'application', label: '实际应用' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">人机交互</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">交互基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 人机交互概述</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      人机交互是研究人与机器人之间信息交换和控制的学科，涉及心理学、计算机科学、
                      机器人学等多个领域。良好的人机交互设计可以提高用户体验和系统效率。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">交互系统组成</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>输入设备：接收用户指令</li>
                        <li>输出设备：反馈系统状态</li>
                        <li>交互界面：提供交互环境</li>
                        <li>交互逻辑：处理交互流程</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：交互系统实现</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import rospy
from std_msgs.msg import String
from sensor_msgs.msg import Image
import cv2
import numpy as np

class InteractionSystem:
    def __init__(self):
        rospy.init_node('interaction_system')
        
        # 订阅语音输入
        self.voice_sub = rospy.Subscriber('/voice_input', String, self.voice_callback)
        # 订阅手势输入
        self.gesture_sub = rospy.Subscriber('/camera/image_raw', Image, self.gesture_callback)
        # 发布交互反馈
        self.feedback_pub = rospy.Publisher('/interaction_feedback', String, queue_size=10)
        
        self.voice_processor = VoiceProcessor()
        self.gesture_processor = GestureProcessor()
        
    def voice_callback(self, msg):
        # 处理语音输入
        command = self.voice_processor.process(msg.data)
        self.handle_command(command)
        
    def gesture_callback(self, msg):
        # 处理手势输入
        gesture = self.gesture_processor.process(msg)
        self.handle_gesture(gesture)
        
    def handle_command(self, command):
        # 处理语音命令
        if command:
            self.feedback_pub.publish(f"执行命令: {command}")
            
    def handle_gesture(self, gesture):
        # 处理手势命令
        if gesture:
            self.feedback_pub.publish(f"识别手势: {gesture}")
            
    def run(self):
        rospy.spin()

if __name__ == '__main__':
    try:
        system = InteractionSystem()
        system.run()
    except rospy.ROSInterruptException:
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 交互设计原则</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      交互设计原则是指导人机交互系统设计的基本准则，遵循这些原则可以提高
                      系统的可用性和用户体验。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">设计原则</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>易用性：操作简单直观</li>
                        <li>反馈性：及时反馈系统状态</li>
                        <li>一致性：保持交互方式一致</li>
                        <li>容错性：允许用户犯错并恢复</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 交互模式</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      交互模式是人与机器人之间信息交换的方式，不同的交互模式适用于不同的
                      应用场景，选择合适的交互模式对于提高交互效率至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见交互模式</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>命令式：通过指令控制</li>
                        <li>对话式：通过自然语言交互</li>
                        <li>手势式：通过手势控制</li>
                        <li>触控式：通过触摸交互</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interface' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">交互界面</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 界面设计</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      界面设计是人机交互的重要组成部分，良好的界面设计可以提高用户体验和
                      交互效率。界面设计需要考虑用户需求、使用场景等因素。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">设计要素</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>布局：合理的空间布局</li>
                        <li>色彩：协调的色彩搭配</li>
                        <li>字体：清晰的文字显示</li>
                        <li>图标：直观的图形表示</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 界面类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      不同类型的交互界面适用于不同的应用场景，选择合适的界面类型对于
                      提高交互效率至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见界面类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>图形界面：通过图形元素交互</li>
                        <li>语音界面：通过语音交互</li>
                        <li>触控界面：通过触摸交互</li>
                        <li>混合界面：结合多种交互方式</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 界面评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      界面评估是评估交互界面性能和用户体验的过程，通过评估可以发现
                      界面设计中的问题并进行改进。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">评估方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>用户测试：通过用户反馈评估</li>
                        <li>性能测试：评估系统性能</li>
                        <li>可用性测试：评估界面可用性</li>
                        <li>专家评估：通过专家意见评估</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">交互方式</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 语音交互</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      语音交互是通过语音进行人机交互的方式，具有自然、便捷的特点。
                      语音交互技术包括语音识别、语音合成等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">语音交互技术</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>语音识别：将语音转换为文本</li>
                        <li>语音合成：将文本转换为语音</li>
                        <li>语音理解：理解语音语义</li>
                        <li>语音对话：实现语音对话</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：语音交互实现</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import speech_recognition as sr
import pyttsx3
import rospy
from std_msgs.msg import String

class VoiceInteraction:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.engine = pyttsx3.init()
        self.command_pub = rospy.Publisher('/voice_command', String, queue_size=10)
        
    def listen(self):
        with sr.Microphone() as source:
            print("请说话...")
            audio = self.recognizer.listen(source)
            try:
                text = self.recognizer.recognize_google(audio, language='zh-CN')
                return text
            except sr.UnknownValueError:
                print("无法识别语音")
                return None
            except sr.RequestError:
                print("无法连接到语音识别服务")
                return None
                
    def speak(self, text):
        self.engine.say(text)
        self.engine.runAndWait()
        
    def process_command(self, text):
        if text:
            # 简单的命令处理逻辑
            if "前进" in text:
                self.command_pub.publish("move_forward")
                self.speak("正在前进")
            elif "后退" in text:
                self.command_pub.publish("move_backward")
                self.speak("正在后退")
            elif "停止" in text:
                self.command_pub.publish("stop")
                self.speak("已停止")
                
    def run(self):
        while not rospy.is_shutdown():
            text = self.listen()
            if text:
                self.process_command(text)
            rospy.sleep(0.1)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 手势交互</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      手势交互是通过手势进行人机交互的方式，具有直观、自然的特点。
                      手势交互技术包括手势识别、手势跟踪等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">手势交互技术</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>手势识别：识别手势动作</li>
                        <li>手势跟踪：跟踪手势运动</li>
                        <li>手势理解：理解手势语义</li>
                        <li>手势控制：通过手势控制</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：手势交互实现</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import cv2
import mediapipe as mp
import numpy as np
import rospy
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

class GestureInteraction:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.5
        )
        self.bridge = CvBridge()
        self.command_pub = rospy.Publisher('/gesture_command', String, queue_size=10)
        
    def process_frame(self, frame):
        # 转换颜色空间
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(frame_rgb)
        
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # 获取手势特征
                gesture = self.recognize_gesture(hand_landmarks)
                if gesture:
                    self.command_pub.publish(gesture)
                    
                # 绘制手部关键点
                self.draw_landmarks(frame, hand_landmarks)
                
        return frame
        
    def recognize_gesture(self, landmarks):
        # 简单的手势识别逻辑
        thumb_tip = landmarks.landmark[4]
        index_tip = landmarks.landmark[8]
        
        if thumb_tip.y < index_tip.y:
            return "move_forward"
        elif thumb_tip.y > index_tip.y:
            return "move_backward"
        else:
            return "stop"
            
    def draw_landmarks(self, frame, landmarks):
        h, w, _ = frame.shape
        for landmark in landmarks.landmark:
            x, y = int(landmark.x * w), int(landmark.y * h)
            cv2.circle(frame, (x, y), 5, (0, 255, 0), -1)
            
    def run(self):
        cap = cv2.VideoCapture(0)
        while not rospy.is_shutdown():
            ret, frame = cap.read()
            if ret:
                processed_frame = self.process_frame(frame)
                cv2.imshow('Gesture Recognition', processed_frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        cap.release()
        cv2.destroyAllWindows()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 触控交互</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      触控交互是通过触摸进行人机交互的方式，具有直观、便捷的特点。
                      触控交互技术包括多点触控、触觉反馈等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">触控交互技术</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>多点触控：支持多点触控</li>
                        <li>触觉反馈：提供触觉反馈</li>
                        <li>手势识别：识别触控手势</li>
                        <li>触控控制：通过触控控制</li>
                      </ul>
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
                  <h4 className="font-semibold mb-2">1. 服务机器人</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      服务机器人是人机交互的重要应用领域，需要与人类进行自然、高效的交互。
                      服务机器人的交互系统需要处理复杂的交互场景。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>家庭服务：家庭助手</li>
                        <li>商业服务：导购机器人</li>
                        <li>医疗服务：医疗助手</li>
                        <li>教育服务：教育机器人</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 工业机器人</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      工业机器人需要与操作人员进行高效、安全的交互，交互系统需要
                      考虑工业环境的特点和需求。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>生产线：自动化生产</li>
                        <li>装配线：零件装配</li>
                        <li>物流：物料搬运</li>
                        <li>检测：质量检测</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 特殊应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      特殊应用场景需要特殊的人机交互方式，如太空机器人、水下机器人等。
                      这些应用场景对交互系统有特殊的要求。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>太空机器人：远程控制</li>
                        <li>水下机器人：水下操作</li>
                        <li>医疗机器人：手术辅助</li>
                        <li>救援机器人：灾害救援</li>
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
          href="/study/ai/robot/navigation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回机器人导航
        </Link>
        <Link 
          href="/study/ai/robot/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          机器人实战→
        </Link>
      </div>
    </div>
  );
} 