'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined, BookOutlined, RocketOutlined, TrophyOutlined, ExperimentOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: '物联网基础', description: '基本概念与发展历程', href: '/study/computer/iot/intro' },
  { number: 2, title: '通信技术', description: '短距离与长距离通信协议', href: '/study/computer/iot/communication' },
  { number: 3, title: '传感器技术', description: '环境、运动与生物传感器', href: '/study/computer/iot/sensors' },
  { number: 4, title: '数据处理', description: '采集、存储、分析与可视化', href: '/study/computer/iot/data-processing' },
  { number: 5, title: '安全防护', description: '安全威胁、防护措施与标准', href: '/study/computer/iot/security' },
  { number: 6, title: '应用场景', description: '智能家居、工业、城市与农业', href: '/study/computer/iot/applications' },
  { number: 7, title: '开发平台', description: '平台架构、工具与案例', href: '/study/computer/iot/platforms' },
  { number: 8, title: '项目实战', description: '完整开发流程与实践项目', href: '/study/computer/iot/projects' },
]

const iotFeatures = [
  { title: '万物互联', description: '实现设备、系统与人的智能互联' },
  { title: '跨界融合', description: '融合通信、传感、数据、AI等多领域' },
  { title: '应用广泛', description: '智慧城市、工业、医疗、家居等场景' },
  { title: '创新驱动', description: '推动新兴产业和智能社会发展' },
  { title: '生态丰富', description: '软硬件平台、开发工具多样' },
  { title: '前景广阔', description: '物联网人才需求持续增长' },
]

const careerPaths = [
  { title: '物联网开发工程师', description: '物联网系统与应用开发', skills: ['嵌入式开发', '通信协议', '平台集成', '数据处理'] },
  { title: '嵌入式工程师', description: '嵌入式设备与传感器开发', skills: ['单片机', '传感器', '硬件接口', '驱动开发'] },
  { title: '物联网架构师', description: '系统架构设计与优化', skills: ['系统设计', '安全防护', '平台选型', '大数据'] },
  { title: '行业解决方案专家', description: '智慧城市、工业、医疗等行业方案', skills: ['行业应用', '项目管理', '需求分析', '集成实施'] },
]

export default function IotHomePage() {
  return (
    <div>
      <BookCover
        title="物联网"
        subtitle="Internet of Things"
        description="学习物联网核心技术，掌握从设备接入到应用开发的全流程技能"
        chapterCount={CHAPTERS.length}
        totalHours={5}
        chapters={CHAPTERS}
        icon="🌐"
        startHref="/study/computer/iot/intro"
        theme={THEMES.computer}
      />

      {/* 特色功能 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择物联网？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iotFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 职业发展 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习建议 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-600">学习方法</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>按照推荐的学习路径循序渐进，打好基础</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多动手实践，理论结合实际</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>遇到不懂的概念可以随时回顾之前的内容</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多阅读官方文档和优秀开源项目</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>定期复习和总结，巩固所学知识</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注物联网安全和性能优化</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>积极参与社区讨论，获取最新资源</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>尝试用物联网技术解决实际问题，提升实战能力</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
