'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'
import { CheckCircleOutlined } from '@ant-design/icons'

const CHAPTERS = [
  { number: 1, title: '深度学习基础', description: '概念、历史与框架', href: '/study/ai/dl/basic' },
  { number: 2, title: '神经网络基础', description: '感知机与激活函数', href: '/study/ai/dl/neural-networks' },
  { number: 3, title: '卷积神经网络', description: '卷积、池化与经典架构', href: '/study/ai/dl/cnn' },
  { number: 4, title: '循环神经网络', description: 'RNN、LSTM与GRU', href: '/study/ai/dl/rnn' },
  { number: 5, title: '注意力机制', description: 'Self-Attention与Multi-Head', href: '/study/ai/dl/attention' },
  { number: 6, title: 'Transformer架构', description: 'Encoder-Decoder与预训练', href: '/study/ai/dl/transformer' },
  { number: 7, title: '生成对抗网络', description: 'GAN与DCGAN/WGAN', href: '/study/ai/dl/gan' },
  { number: 8, title: '自编码器', description: 'AE、VAE与去噪AE', href: '/study/ai/dl/autoencoder' },
  { number: 9, title: '迁移学习', description: '微调与领域自适应', href: '/study/ai/dl/transfer-learning' },
  { number: 10, title: '深度学习框架', description: 'PyTorch/TensorFlow/Keras', href: '/study/ai/dl/frameworks' },
  { number: 11, title: '模型压缩与优化', description: '量化、剪枝与蒸馏', href: '/study/ai/dl/optimization' },
  { number: 12, title: '深度学习实战', description: '图像/文本/语音项目', href: '/study/ai/dl/cases' },
  { number: 13, title: '深度学习面试题', description: '高频面试与手撕代码', href: '/study/ai/dl/interview' },
  { number: 14, title: '进阶与前沿', description: '前沿研究与资源', href: '/study/ai/dl/advanced' },
]

export default function DlHomePage() {
  return (
    <div>
      <BookCover
        title="深度学习"
        subtitle="Deep Learning"
        description="系统学习深度学习理论与实战，从神经网络基础到Transformer架构，掌握CV/NLP核心技术"
        chapterCount={CHAPTERS.length}
        totalHours={200}
        chapters={CHAPTERS}
        icon="🧠"
        startHref="/study/ai/dl/basic"
        theme={THEMES.ai}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择深度学习？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '表征学习', desc: '自动提取特征，无需手工设计' },
              { title: '端到端', desc: '从原始输入到最终输出一体学习' },
              { title: '性能卓越', desc: '图像/语音/文本超越传统方法' },
              { title: '应用广泛', desc: 'CV/NLP/语音/推荐全覆盖' },
            ].map((f, i) => (
              <div key={i} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
        <div className="space-y-6">
          {[
            { phase: '第一阶段：基础理论', desc: '掌握DL基础概念', items: ['深度学习基础', '神经网络基础'] },
            { phase: '第二阶段：核心架构', desc: '主流网络结构', items: ['卷积神经网络', '循环神经网络', '注意力机制', 'Transformer架构'] },
            { phase: '第三阶段：前沿技术', desc: 'GAN/自编码器/迁移学习', items: ['生成对抗网络', '自编码器', '迁移学习'] },
            { phase: '第四阶段：实战应用', desc: '框架与项目实践', items: ['深度学习框架', '模型压缩与优化', '深度学习实战'] },
            { phase: '第五阶段：进阶提升', desc: '面试与前沿', items: ['深度学习面试题', '进阶与前沿'] },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业发展方向</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '深度学习工程师', desc: 'DL模型开发与部署', skills: ['PyTorch', 'TensorFlow', 'CV/NLP', '模型优化'] },
              { title: '计算机视觉工程师', desc: '图像/视频算法开发', skills: ['CNN', '目标检测', '图像分割', 'OpenCV'] },
              { title: 'NLP算法工程师', desc: '文本算法开发', skills: ['Transformer', 'BERT', 'GPT', '序列模型'] },
              { title: 'AI研究员', desc: '算法研究与创新', skills: ['论文阅读', 'PyTorch', '数学', '实验设计'] },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">学习建议</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-600">学习方法</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>打好数学基础：线性代数、概率论、微积分</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>从经典网络入手，逐步理解前沿架构</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>动手实现每个论文中的核心模块</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>多跑实验，理解超参数对结果的影响</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-600">注意事项</h4>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>避免只调参不理解原理</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>重视数据质量和预处理</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>关注模型的可解释性和公平性</span></li>
                <li className="flex items-start"><CheckCircleOutlined className="text-green-500 mr-3 mt-1" /><span>合理利用GPU资源，避免浪费</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
