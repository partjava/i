// ==========================================
// 核心宇宙与关卡配置数据定义 (Stage & Topics Data)
// ==========================================

export const AI_TERMS = [
  // 基础 AI
  "AI",
  "AGI",
  "AIGC",
  "ML",
  "DL",
  "RL",

  // 感知方向
  "CV",
  "NLP",
  "OCR",
  "ASR",
  "TTS",

  // 大模型方向
  "LLM",
  "VLM",
  "MLLM",
  "SLM",
  "MoE",
  "Token",
  "Prompt",
  "Context",
  "Embedding",

  // Prompt / 推理
  "PE",
  "CoT",
  "ToT",
  "ReAct",
  "Reasoning",

  // RAG / 知识库
  "RAG",
  "Vector",
  "Chunk",
  "Rerank",
  "KB",
  "Recall",
  "Retrieval",

  // Agent 方向
  "Agent",
  "Tool",
  "Skill",
  "Memory",
  "Workflow",
  "Planning",
  "Action",
  "Reflection",
  "Multi-Agent",
  "MCP",

  // 工具调用 / 接口
  "FC",
  "API",
  "SDK",
  "Function Call",
  "Tool Call",

  // 微调 / 训练
  "SFT",
  "RLHF",
  "DPO",
  "LoRA",
  "QLoRA",
  "PEFT",
  "Fine-tune",
  "Alignment",

  // 部署 / 硬件
  "CPU",
  "GPU",
  "TPU",
  "NPU",
  "ONNX",
  "vLLM",
  "Ollama"
];

export interface SubtopicDetail {
  id: string;
  name: string;
  theory: string;
  latexFormulas: string[];
  starterCode: string;
  expectedOutput: string;
  conceptualQuizzes: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
  thinkingQuestion: string;
  aiPrompt: string;
}

export interface Topic {
  name: string;
  children: string[];
}

export interface Stage {
  id: number;
  name: string;
  desc: string;
  color: string; // 星球基础颜色
  glowColor: string;
  bgColor: string;
  borderColor: string;
  topics: Topic[];
}

export const STAGES: Stage[] = [
  {
    id: 1,
    name: "基础知识",
    desc: "探索计算机体系、Linux命令行与Git代码协作的根本奥秘",
    color: "#4FC3F7",
    glowColor: "rgba(59, 130, 246, 0.6)",
    bgColor: "from-blue-500/20 to-indigo-600/10",
    borderColor: "border-blue-500/30",
    topics: [
      {
        name: "计算机基础",
        children: ["计算机组成原理", "操作系统", "计算机网络", "编码系统"]
      },
      {
        name: "Linux基础",
        children: ["常用命令", "文件系统", "权限管理", "进程管理", "Shell脚本"]
      },
      {
        name: "Git版本控制",
        children: ["init/clone", "add/commit/push", "branch/merge", "rebase", "conflict解决"]
      }
    ]
  },
  {
    id: 2,
    name: "Python编程",
    desc: "筑基人工智能，掌握高阶数据结构、生成器与装饰器",
    color: "#81C784",
    glowColor: "rgba(16, 185, 129, 0.6)",
    bgColor: "from-green-500/20 to-emerald-600/10",
    borderColor: "border-green-500/30",
    topics: [
      {
        name: "基础语法",
        children: ["变量与数据类型", "条件语句", "循环", "函数"]
      },
      {
        name: "数据结构",
        children: ["List 列表", "Tuple 元组", "Dict 字典", "Set 集合"]
      },
      {
        name: "文件处理",
        children: ["文件读写", "JSON解析", "CSV数据分析"]
      },
      {
        name: "面向对象",
        children: ["Class类", "封装", "继承", "多态"]
      },
      {
        name: "高级特性",
        children: ["迭代器", "生成器", "装饰器", "Lambda表达式"]
      }
    ]
  },
  {
    id: 3,
    name: "数学基础",
    desc: "打通机器学习背后的核心代数、偏导数与凸优化根基",
    color: "#FFD54F",
    glowColor: "rgba(139, 92, 246, 0.6)",
    bgColor: "from-purple-500/20 to-violet-600/10",
    borderColor: "border-purple-500/30",
    topics: [
      {
        name: "线性代数",
        children: ["向量与空间", "矩阵乘法与逆", "SVD奇异值分解", "特征值与特征向量"]
      },
      {
        name: "概率论与数理统计",
        children: ["贝意斯公式", "高斯/伯努利分布", "最大似然估计(MLE)"]
      },
      {
        name: "微积分与优化",
        children: ["偏导数与梯度", "梯度下降算法", "泰勒展开式"]
      }
    ]
  },
  {
    id: 4,
    name: "机器学习",
    desc: "传统监督与无监督机器学习算法、降维与特征工程",
    color: "#BA68C8",
    glowColor: "rgba(186, 104, 200, 0.6)",
    bgColor: "from-purple-500/20 to-indigo-600/10",
    borderColor: "border-purple-500/30",
    topics: [
      {
        name: "监督学习",
        children: ["线性回归", "Logistic回归", "支持向量机 (SVM)", "决策树", "随机森林", "XGBoost", "KNN"]
      },
      {
        name: "无监督学习",
        children: ["K-Means聚类", "DBSCAN", "层次聚类"]
      },
      {
        name: "特征工程与降维",
        children: ["PCA主成分分析", "特征标准化", "数据归一化"]
      }
    ]
  },
  {
    id: 5,
    name: "深度学习",
    desc: "激活函数、损失函数、MLP与反向传播求导算法",
    color: "#64B5F6",
    glowColor: "rgba(100, 181, 246, 0.6)",
    bgColor: "from-blue-500/20 to-indigo-600/10",
    borderColor: "border-blue-500/30",
    topics: [
      {
        name: "神经网络基础",
        children: ["MLP多层感知机", "激活函数与梯度消失", "损失函数", "反向传播"]
      },
      {
        name: "神经网络优化",
        children: ["SGD与Adam优化器", "Batch Normalization", "Dropout正则化"]
      }
    ]
  },
  {
    id: 6,
    name: "计算机视觉",
    desc: "卷积神经网络CNN、目标检测YOLO与图像分割网络",
    color: "#00B4D8",
    glowColor: "rgba(0, 180, 216, 0.6)",
    bgColor: "from-cyan-500/20 to-teal-600/10",
    borderColor: "border-cyan-500/30",
    topics: [
      {
        name: "图像基础与提取",
        children: ["图像滤波与增强", "边缘检测 (Canny)", "色彩空间转换", "SIFT特征提取"]
      },
      {
        name: "深度学习视觉模型",
        children: ["LeNet/ResNet分类", "目标检测 (YOLO)", "图像分割 (U-Net)", "SAM分割大模型"]
      }
    ]
  },
  {
    id: 7,
    name: "自然语言处理",
    desc: "文本分词、RNN序列建模与前沿Transformer注意力机制",
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.6)",
    bgColor: "from-pink-500/20 to-rose-600/10",
    borderColor: "border-pink-500/30",
    topics: [
      {
        name: "文本与词嵌入",
        children: ["分词与词性标注", "TF-IDF特征", "Word2Vec词向量", "BERT预训练模型"]
      },
      {
        name: "序列与Transformer",
        children: ["LSTM/GRU序列建模", "Self-Attention自注意力", "多头注意力机制", "编码与解码器"]
      }
    ]
  },
  {
    id: 8,
    name: "大模型（LLM）",
    desc: "解锁Prompt链式思维、向量数据库RAG与多Agent架构",
    color: "#FF8A65",
    glowColor: "rgba(255, 138, 101, 0.6)",
    bgColor: "from-orange-500/20 to-red-600/10",
    borderColor: "border-orange-500/30",
    topics: [
      {
        name: "Prompt工程",
        children: ["Few-shot提示", "CoT链式思维", "ReAct框架"]
      },
      {
        name: "LLM微调与优化",
        children: ["LoRA轻量化微调", "RLHF对齐", "Qwen开源大模型"]
      },
      {
        name: "检索增强生成 (RAG)",
        children: ["文本切分与清洗", "向量Embedding", "向量数据库检索"]
      },
      {
        name: "智能代理 (Agent)",
        children: ["工具调用 (Tool Use)", "Function Calling", "LangChain/CrewAI"]
      }
    ]
  },
  {
    id: 9,
    name: "强化学习",
    desc: "马尔可夫决策过程(MDP)及DQN、PPO前沿游戏AI智能算法",
    color: "#A1887F",
    glowColor: "rgba(161, 136, 127, 0.6)",
    bgColor: "from-amber-700/20 to-yellow-600/10",
    borderColor: "border-amber-700/30",
    topics: [
      {
        name: "基础强化学习",
        children: ["马尔可夫决策(MDP)", "Q-Learning", "SARSA"]
      },
      {
        name: "深度强化学习",
        children: ["DQN算法", "PPO优化", "AC双网络架构"]
      }
    ]
  },
  {
    id: 10,
    name: "工程部署",
    desc: "将模型封装为FastAPI接口，支持Docker容器集群与本地推理",
    color: "#90A4AE",
    glowColor: "rgba(144, 164, 174, 0.6)",
    bgColor: "from-slate-500/20 to-slate-700/10",
    borderColor: "border-slate-500/30",
    topics: [
      {
        name: "开发工程化",
        children: ["FastAPI开发", "模型序列化(ONNX)"]
      },
      {
        name: "本地加速与容器",
        children: ["Docker镜像打包", "Ollama本地推理", "vLLM加速部署"]
      }
    ]
  },
  {
    id: 11,
    name: "项目实战",
    desc: "开发多智能体系统、自动编程助手与自进化AI工作流应用",
    color: "#F06292",
    glowColor: "rgba(240, 98, 146, 0.6)",
    bgColor: "from-pink-500/20 to-rose-600/10",
    borderColor: "border-pink-500/30",
    topics: [
      {
        name: "AI应用系统",
        children: ["AI客服代理", "自动编程助手", "多Agent协同工作流"]
      },
      {
        name: "展示与控制",
        children: ["Gradio模型演示", "Streamlit数据看板"]
      }
    ]
  }
];

export const SUBTOPIC_DETAILS: Record<string, SubtopicDetail> = {
  "支持向量机 (SVM)": {
    id: "svm",
    name: "支持向量机 (SVM) 分类",
    theory: `### 支持向量机 (SVM)
支持向量机是一种广泛应用于分类和回归任务的经典有监督学习算法。它的目标是寻找一个超平面，使得两类数据样本之间的几何间隔（Margin）最大化。

#### 1. 线性超平面
超平面方程表示为：
$$w^T x + b = 0$$

其中：
- $w$ 为法向量，决定了超平面的方向。
- $b$ 为偏置，决定了超平面与原点的距离。

#### 2. 最大化间隔优化目标
在硬间隔情况下，优化目标可表述为：
$$\\min_{w, b} \\frac{1}{2}||w||^2$$
$$s.t. \\quad y_i(w^T x_i + b) \\ge 1, \\quad \\forall i=1, \\dots, N$$

如果数据线性不可分，我们可以通过引入松弛变量 $\\xi_i$ 和惩罚参数 $C$ 来构建**软间隔 SVM**，允许部分样本跨越边界。`,
    latexFormulas: [
      "w^T x + b = 0",
      "\\min_{w, b} \\frac{1}{2}||w||^2"
    ],
    starterCode: `import numpy as np
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

class SVMClassifier:
    def train_and_predict(self, X_train: np.ndarray, y_train: np.ndarray, X_test: np.ndarray) -> np.ndarray:
        """
        待补全：使用 sklearn 的 SVC 训练线性支持向量机模型，并返回对测试集的预测类别数组。
        要求：
        1. 实例化一个 kernel='linear' 且 C=1.0 的支持向量分类器
        2. 拟合训练集数据 (X_train, y_train)
        3. 预测测试集 X_test 的类别并返回预测数组
        """
        # --- 在此编写你的 code ---
        model = None
        return np.array([])
`,
    expectedOutput: "[0 0 1 1]",
    conceptualQuizzes: [
      {
        question: "下列关于支持向量机 (SVM) 中支持向量的描述，哪个是正确的？",
        options: [
          "A. 支持向量是数据集里所有参与距离计算的样本点",
          "B. 支持向量是距离分类超平面最近的那些样本点，它们唯一决定了超平面的位置",
          "C. 支持向量是距离超平面最远的边界噪点",
          "D. 支持向量是一组指向分类中心的方向向量"
        ],
        answer: 1,
        explanation: "支持向量是距离分类边界最近的临界样本点，决定了超平面斜率与截距。如果删除非支持向量，超平面的边界完全保持不变."
      },
      {
        question: "在软间隔 SVM 中，增大惩罚参数 C 会导致什么结果？",
        options: [
          "A. 允许更多的错误分类，使得分类间隔变大，减少过拟合",
          "B. 严格限制错误分类，使分类间隔变窄，可能导致过拟合",
          "C. 超平面会变得线性不可分",
          "D. 导致模型无法收敛"
        ],
        answer: 1,
        explanation: "惩罚参数 C 越大，表示对错分样本的惩罚越重。因此模型会极力避免分类错误，从而使分类间隔缩小，容易发生过拟合。"
      }
    ],
    thinkingQuestion: "既然核函数（Kernel Trick）能将低维数据映射到无穷维高维空间，为什么 SVM 在高维空间中不会轻易面临‘维度灾难’和严重的过拟合问题？",
    aiPrompt: "评估学生对SVM抗过拟合机制的理解。核心得分点：1. SVM的复杂度是由支持向量的个数（而不是特征维数）决定的；2. SVM目标函数是最大化分类间隔（正则化项 1/2||w||^2 起到泛化控制作用）。请给打分（0-10分）并附上中文指导建议。"
  }
};

export const getDefaultDetail = (nodeName: string): SubtopicDetail => {
  return {
    id: "default-id",
    name: nodeName,
    theory: `### ${nodeName} 深度学习要点
本关卡探讨的是关于 **\u200b${nodeName}\u200b** 的理论基础与工程实现。

#### 1. 理论背景
在现代 AI 理论中，该课题起到了极其关键的数据转换和特征表达作用。我们需要通过科学规范的表达形式对特征实施变换：
$$f(x) = \\sigma(W^T x + b)$$

#### 2. 实现规范
通过 Python 编写核心算子并实现闭环校验。`,
    latexFormulas: ["f(x) = \\sigma(W^T x + b)"],
    starterCode: `import numpy as np

def run_task(data: list) -> list:
    """
    对输入的数据列表实施 ${nodeName} 核心处理逻辑。
    请补全核心流程并返回处理后的数组。
    """
    arr = np.array(data)
    # --- 在此补全你的代码逻辑 ---
    
    return list(arr * 2)
`,
    expectedOutput: "[2, 4, 6, 8]",
    conceptualQuizzes: [
      {
        question: `在研究 ${nodeName} 时，哪个因素对模型泛化能力影响最大？`,
        options: [
          "A. 超参数的随机设定",
          "B. 训练样本的分布均衡性与数据噪声水平",
          "C. 执行代码的操作系统类型",
          "D. 使用的 CPU 核心频率"
        ],
        answer: 1,
        explanation: "数据分布的质量和信噪比在机器学习中始终是决定泛化性能的最关键前置要素。"
      }
    ],
    thinkingQuestion: `在实际复杂场景中，如何评估 ${nodeName} 任务的效率和鲁棒性瓶颈？`,
    aiPrompt: "评估学生对本算法瓶颈的思考，涉及数据偏置、时间/空间复杂度分析。"
  };
};
