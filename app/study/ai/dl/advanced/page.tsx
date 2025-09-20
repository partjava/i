'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaRocket, FaBook, FaLightbulb, FaGlobe } from 'react-icons/fa';

export default function DLAdvancedPage() {
  const [activeTab, setActiveTab] = useState('advanced');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">进阶与前沿</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('advanced')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'advanced' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          进阶知识
        </button>
        <button
          onClick={() => setActiveTab('sota')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'sota' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          前沿进展
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'resources' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          实用资源
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'explore' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          探索与思考
        </button>
      </div>

      {/* 进阶知识 */}
      {activeTab === 'advanced' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaRocket className="mr-2" />进阶知识</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><b>自注意力机制（Self-Attention）</b>：捕捉序列中任意位置之间的依赖关系，是Transformer的核心。</li>
            <li><b>Transformer架构</b>：基于自注意力的深度学习模型，广泛应用于NLP、CV等领域。</li>
            <li><b>预训练与微调（Pre-training & Fine-tuning）</b>：先在大规模数据上预训练，再在下游任务上微调，提升泛化能力。</li>
            <li><b>多模态学习</b>：融合图像、文本、语音等多种模态信息，提升模型理解能力。</li>
            <li><b>大模型与参数高效化</b>：如GPT、BERT、ViT等，及其高效推理与压缩技术。</li>
          </ul>
        </section>
      )}

      {/* 前沿进展 */}
      {activeTab === 'sota' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaGlobe className="mr-2" />前沿进展</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><b>大语言模型（LLM）</b>：如GPT-4、Llama、ERNIE等，推动NLP和多模态智能发展。</li>
            <li><b>扩散模型（Diffusion Model）</b>：如Stable Diffusion、DALL·E等，生成式AI领域的突破。</li>
            <li><b>视觉Transformer（ViT）</b>：将Transformer应用于图像识别，取得SOTA性能。</li>
            <li><b>多模态融合</b>：CLIP、BLIP等模型实现图文联合理解与生成。</li>
            <li><b>自动机器学习（AutoML）</b>：如NAS、自动调参，提升模型开发效率。</li>
            <li><b>AI安全与可解释性</b>：对抗样本、模型可解释性、隐私保护等成为研究热点。</li>
          </ul>
        </section>
      )}

      {/* 实用资源 */}
      {activeTab === 'resources' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaBook className="mr-2" />实用资源</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><b>论文推荐：</b> <a href="https://arxiv.org/abs/1706.03762" className="text-blue-600 underline" target="_blank">Attention is All You Need</a>、<a href="https://arxiv.org/abs/1810.04805" className="text-blue-600 underline" target="_blank">BERT</a>、<a href="https://arxiv.org/abs/2006.11239" className="text-blue-600 underline" target="_blank">Vision Transformer</a></li>
            <li><b>开源项目：</b> <a href="https://github.com/huggingface/transformers" className="text-blue-600 underline" target="_blank">HuggingFace Transformers</a>、<a href="https://github.com/ultralytics/yolov5" className="text-blue-600 underline" target="_blank">YOLOv5</a>、<a href="https://github.com/openai/whisper" className="text-blue-600 underline" target="_blank">OpenAI Whisper</a></li>
            <li><b>学习网站：</b> <a href="https://paperswithcode.com/" className="text-blue-600 underline" target="_blank">Papers with Code</a>、<a href="https://www.deeplearning.ai/" className="text-blue-600 underline" target="_blank">DeepLearning.AI</a>、<a href="https://www.kaggle.com/" className="text-blue-600 underline" target="_blank">Kaggle</a></li>
            <li><b>社区与资讯：</b> <a href="https://www.zhihu.com/topic/19554298/hot" className="text-blue-600 underline" target="_blank">知乎-深度学习</a>、<a href="https://www.reddit.com/r/MachineLearning/" className="text-blue-600 underline" target="_blank">Reddit ML</a></li>
          </ul>
        </section>
      )}

      {/* 探索与思考 */}
      {activeTab === 'explore' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaLightbulb className="mr-2" />探索与思考</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>你如何看待AI大模型对未来社会和行业的影响？</li>
            <li>深度学习还有哪些瓶颈和挑战？</li>
            <li>你最感兴趣的前沿方向是什么？为什么？</li>
            <li>如何平衡AI创新与伦理安全？</li>
            <li>未来你希望在哪些领域用AI创造价值？</li>
          </ul>
        </section>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/dl/interview"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：深度学习面试题
        </Link>
      </div>
    </div>
  );
} 