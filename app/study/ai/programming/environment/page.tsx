'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const condaCode = `# 1. 安装Anaconda
# 访问 https://www.anaconda.com/products/distribution 下载
# 2. 创建Python环境
conda create -n ai_env python=3.9
# 3. 激活环境
conda activate ai_env
# 4. 安装基础包
conda install numpy pandas matplotlib scikit-learn
# 5. 安装深度学习框架
conda install pytorch torchvision torchaudio -c pytorch
# 6. 验证安装
python -c "import torch; print(torch.__version__)"`

const reqCode = `numpy==1.21.0\npandas==1.3.0\nscikit-learn==0.24.2\ntorch==1.9.0\ntensorflow==2.6.0\nmatplotlib==3.4.2\njupyter==1.0.0\npytest==6.2.5\ntransformers==4.8.2\nopencv-python==4.5.3.56`

const pytorchCode = `import torch, torch.nn as nn, torch.optim as optim
class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(nn.Linear(10,64), nn.ReLU(), nn.Linear(64,32), nn.ReLU(), nn.Linear(32,1))
    def forward(self, x): return self.layers(x)
model = SimpleNN()
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
for data, target in dataloader:
    optimizer.zero_grad(); loss = criterion(model(data), target)
    loss.backward(); optimizer.step()`

const META: LessonMeta = {
  subject: '人工智能程序设计', chapterTitle: '开发环境配置', chapterNumber: 1, totalChapters: 8,
  subjectHref: '/study/ai/programming',
  nextChapter: { label: 'Python基础', href: '/study/ai/programming/python' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: 'Python环境', left: (<div className="space-y-4"> <PageTitle>Python环境配置</PageTitle> <SectionTitle>1. Python环境安装</SectionTitle> <BookParagraph>Python是AI开发的首选语言，推荐使用Anaconda或Miniconda来管理Python环境和包。</BookParagraph> <SectionTitle>环境配置步骤：</SectionTitle> <BookCode language="bash" code={condaCode} /> </div>), right: (<div className="space-y-4"> <SectionTitle>虚拟环境管理</SectionTitle> <BookParagraph>使用虚拟环境隔离不同项目的依赖，避免包版本冲突。</BookParagraph> <BookCode language="bash" code={'python -m venv myenv\n# Windows: myenv\\Scripts\\activate\n# Linux: source myenv/bin/activate\npip install -r requirements.txt\npip freeze > requirements.txt\ndeactivate'} /> <SectionTitle>常用AI开发包</SectionTitle> <BookCode language="text" code={reqCode} /> </div>) },
  { label: '深度学习框架', left: (<div className="space-y-4"> <PageTitle>深度学习框架</PageTitle> <SectionTitle>1. PyTorch</SectionTitle> <BookParagraph>PyTorch是一个开源的机器学习库，本节介绍其基本使用和最佳实践。</BookParagraph> <BookCode language="python" code={pytorchCode} /> </div>), right: (<div className="space-y-4"> <SectionTitle>2. TensorFlow</SectionTitle> <BookParagraph>TensorFlow是Google的深度学习框架，提供了完整的工具链和生态系统。</BookParagraph> <BookCode language="python" code={'import tensorflow as tf\nfrom tensorflow.keras import layers, models\nmodel = models.Sequential([layers.Dense(64,activation="relu",input_shape=(10,)),layers.Dropout(0.2),layers.Dense(32,activation="relu"),layers.Dense(1)])\nmodel.compile(optimizer="adam",loss="mse",metrics=["mae"])\nmodel.fit(train_data,train_labels,epochs=10,batch_size=32,validation_split=0.2)'} /> </div>) },
  { label: '开发工具', left: (<div className="space-y-4"> <PageTitle>开发工具</PageTitle> <SectionTitle>1. Jupyter Notebook</SectionTitle> <BookParagraph>Jupyter Notebook提供交互式的开发和可视化功能。</BookParagraph> <BookCode language="bash" code={'pip install jupyter\njupyter notebook'} /> </div>), right: (<div className="space-y-4"> <SectionTitle>2. VS Code</SectionTitle> <BookParagraph>VS Code提供丰富的AI开发插件。推荐：Python、Pylance、Jupyter、GitLens。</BookParagraph> <BookCode language="json" code={'{\n  "python.linting.enabled": true,\n  "editor.formatOnSave": true,\n  "jupyter.enabled": true\n}'} /> </div>) },
  { label: '云平台', left: (<div className="space-y-4"> <PageTitle>云平台</PageTitle> <SectionTitle>1. Google Colab</SectionTitle> <BookParagraph>Google Colab提供免费的GPU和TPU资源，支持挂载Google Drive。</BookParagraph> <BookCode language="python" code={'import torch\nprint(torch.cuda.is_available())\nfrom google.colab import drive\ndrive.mount("/content/drive")\n!pip install transformers'} /> </div>), right: (<div className="space-y-4"> <SectionTitle>2. AWS SageMaker</SectionTitle> <BookParagraph>AWS SageMaker提供完整的ML开发、训练和部署环境。</BookParagraph> <BookCode language="python" code={'import sagemaker\nfrom sagemaker.pytorch import PyTorch\nsession = sagemaker.Session()\nestimator = PyTorch(entry_point="train.py",instance_type="ml.p3.2xlarge")\nestimator.fit({"train":"s3://bucket/train"})'} /> </div>) },
]

export default function ProgrammingEnvPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
