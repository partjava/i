'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: '机器学习基础', description: '概念、流程与工具', href: '/study/ai/ml/basic' },
  { number: 2, title: '机器学习项目流程', description: '完整项目开发流程', href: '/study/ai/ml/workflow' },
  { number: 3, title: '监督学习算法', description: '回归与分类算法', href: '/study/ai/ml/supervised' },
  { number: 4, title: '无监督学习算法', description: '聚类与降维算法', href: '/study/ai/ml/unsupervised' },
  { number: 5, title: '模型评估与选择', description: '评估指标与验证方法', href: '/study/ai/ml/evaluation' },
  { number: 6, title: '特征工程', description: '特征提取与选择', href: '/study/ai/ml/feature-engineering' },
  { number: 7, title: '集成学习', description: 'Bagging与Boosting', href: '/study/ai/ml/ensemble' },
  { number: 8, title: '机器学习实战案例', description: '端到端项目实战', href: '/study/ai/ml/cases' },
  { number: 9, title: '模型部署与优化', description: '部署、监控与优化', href: '/study/ai/ml/deployment' },
  { number: 10, title: '机器学习面试题', description: '高频面试与算法', href: '/study/ai/ml/interview' },
  { number: 11, title: '进阶与前沿', description: '联邦学习与可解释AI', href: '/study/ai/ml/advanced' },
]

export default function MlHomePage() {
  return (
    <div>
      <BookCover
        title="机器学习"
        subtitle="Machine Learning"
        description="系统学习机器学习理论与实战，从经典算法到模型部署，掌握AI核心技能"
        chapterCount={CHAPTERS.length}
        totalHours={150}
        chapters={CHAPTERS}
        icon="🤖"
        startHref="/study/ai/ml/basic"
        theme={THEMES.ai}
      />

      {/* 核心特点 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择机器学习？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '理论扎实', desc: '系统学习经典与前沿算法' },
              { title: '应用广泛', desc: '覆盖CV/NLP/推荐等多个领域' },
              { title: '前景广阔', desc: 'AI人才需求持续增长' },
              { title: '体系完整', desc: '从理论到部署全流程覆盖' },
            ].map((f, i) => (
              <div key={i} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
        <div className="space-y-6">
          {[
            { phase: '第一阶段：入门基础', desc: '了解ML概念与工具', items: ['机器学习基础', '机器学习项目流程'] },
            { phase: '第二阶段：核心算法', desc: '掌握经典ML算法', items: ['监督学习算法', '无监督学习算法', '模型评估与选择', '特征工程', '集成学习'] },
            { phase: '第三阶段：实战进阶', desc: '完整项目实践', items: ['机器学习实战案例', '模型部署与优化'] },
            { phase: '第四阶段：面试与前沿', desc: '面试准备与前沿技术', items: ['机器学习面试题', '进阶与前沿'] },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium mr-4">阶段 {i + 1}</div>
                <h3 className="text-xl font-bold text-gray-900">{p.phase}</h3>
              </div>
              <p className="text-gray-600 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">{p.items.map((item, j) => (<span key={j} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">{item}</span>))}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 职业发展 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '机器学习工程师', desc: 'ML模型开发与部署', skills: ['Python', 'Scikit-learn', 'TensorFlow', 'MLOps'] },
              { title: '数据分析师', desc: '数据分析与挖掘', skills: ['SQL', 'Python', '可视化', '统计学'] },
              { title: 'AI研究员', desc: '算法研究与创新', skills: ['深度学习', '论文阅读', '数学', 'PyTorch'] },
              { title: '数据科学家', desc: '数据驱动决策', skills: ['机器学习', '统计学', '业务理解', '沟通'] },
            ].map((c, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-green-600">{c.title}</h3>
                <p className="text-gray-600 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">{c.skills.map((s, j) => (<span key={j} className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">{s}</span>))}</div>
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
              <h4 className="text-lg font-semibold mb-4 text-green-600">学习方法</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>理论与实践结合，动手实现每个算法</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>从经典算法开始，逐步深入前沿技术</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多参与Kaggle竞赛，积累实战经验</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>阅读经典论文，理解算法原理</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>避免只调包不理解原理</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>重视数学基础：线性代数、概率论</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注数据质量和特征工程</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>注重模型可解释性和公平性</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
