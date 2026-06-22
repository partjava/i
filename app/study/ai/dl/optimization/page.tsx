'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const quantizeCode = `import torch
import torch.nn as nn
import torch.quantization

# 定义模型
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.conv = nn.Conv2d(3, 64, kernel_size=3)
        self.relu = nn.ReLU()
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(64 * 14 * 14, 10)

    def forward(self, x):
        x = self.conv(x)
        x = self.relu(x)
        x = self.pool(x)
        x = x.view(-1, 64 * 14 * 14)
        x = self.fc(x)
        return x

# 准备量化
def prepare_for_quantization(model):
    # 设置量化配置
    model.qconfig = torch.quantization.get_default_qconfig('fbgemm')

    # 准备模型
    torch.quantization.prepare(model, inplace=True)

    # 校准
    with torch.no_grad():
        for data in calibration_data:
            model(data)

    # 转换模型
    torch.quantization.convert(model, inplace=True)

    return model

# 主函数
def main():
    # 创建模型
    model = SimpleModel()

    # 训练模型
    # ... 训练代码 ...

    # 量化模型
    quantized_model = prepare_for_quantization(model)

    # 保存量化模型
    torch.save(quantized_model.state_dict(), 'quantized_model.pth')

    # 评估量化模型
    evaluate_model(quantized_model)`

const pruneCode = `import torch
import torch.nn as nn
import torch.nn.utils.prune as prune

class PrunedModel(nn.Module):
    def __init__(self):
        super(PrunedModel, self).__init__()
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3)
        self.conv2 = nn.Conv2d(64, 128, kernel_size=3)
        self.fc1 = nn.Linear(128 * 6 * 6, 512)
        self.fc2 = nn.Linear(512, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = nn.functional.relu(x)
        x = self.conv2(x)
        x = nn.functional.relu(x)
        x = x.view(-1, 128 * 6 * 6)
        x = self.fc1(x)
        x = nn.functional.relu(x)
        x = self.fc2(x)
        return x

def prune_model(model, amount=0.3):
    # 对卷积层进行剪枝
    for name, module in model.named_modules():
        if isinstance(module, nn.Conv2d):
            prune.l1_unstructured(
                module,
                name='weight',
                amount=amount
            )

    # 对全连接层进行剪枝
    for name, module in model.named_modules():
        if isinstance(module, nn.Linear):
            prune.l1_unstructured(
                module,
                name='weight',
                amount=amount
            )

    return model

def main():
    # 创建模型
    model = PrunedModel()

    # 训练模型
    # ... 训练代码 ...

    # 剪枝模型
    pruned_model = prune_model(model, amount=0.3)

    # 保存剪枝后的模型
    torch.save(pruned_model.state_dict(), 'pruned_model.pth')

    # 评估剪枝后的模型
    evaluate_model(pruned_model)`

const quantizeResnetCode = `import torch
import torchvision.models as models
import torch.quantization
import time

def quantize_resnet18():
    # 加载预训练模型
    model = models.resnet18(pretrained=True)
    model.eval()

    # 准备量化
    model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
    torch.quantization.prepare(model, inplace=True)

    # 校准
    with torch.no_grad():
        for data in calibration_data:
            model(data)

    # 转换模型
    torch.quantization.convert(model, inplace=True)

    return model

def compare_models(original_model, quantized_model):
    # 比较模型大小
    original_size = sum(p.numel() * p.element_size() for p in original_model.parameters())
    quantized_size = sum(p.numel() * p.element_size() for p in quantized_model.parameters())

    print(f"Original model size: {original_size / 1024 / 1024:.2f} MB")
    print(f"Quantized model size: {quantized_size / 1024 / 1024:.2f} MB")

    # 比较推理速度
    input_tensor = torch.randn(1, 3, 224, 224)

    # 原始模型推理时间
    start_time = time.time()
    with torch.no_grad():
        original_model(input_tensor)
    original_time = time.time() - start_time

    # 量化模型推理时间
    start_time = time.time()
    with torch.no_grad():
        quantized_model(input_tensor)
    quantized_time = time.time() - start_time

    print(f"Original model inference time: {original_time:.4f} seconds")
    print(f"Quantized model inference time: {quantized_time:.4f} seconds")

def main():
    # 加载原始模型
    original_model = models.resnet18(pretrained=True)
    original_model.eval()

    # 量化模型
    quantized_model = quantize_resnet18()

    # 比较模型
    compare_models(original_model, quantized_model)

    # 保存量化模型
    torch.save(quantized_model.state_dict(), 'quantized_resnet18.pth')`

const distillationCode = `import torch
import torch.nn as nn
import torchvision.models as models
import torch.optim as optim

class DistillationLoss(nn.Module):
    def __init__(self, alpha=0.5, temperature=2.0):
        super(DistillationLoss, self).__init__()
        self.alpha = alpha
        self.temperature = temperature
        self.ce_loss = nn.CrossEntropyLoss()
        self.kl_loss = nn.KLDivLoss(reduction='batchmean')

    def forward(self, student_logits, teacher_logits, labels):
        # 计算硬标签损失
        hard_loss = self.ce_loss(student_logits, labels)

        # 计算软标签损失
        soft_loss = self.kl_loss(
            nn.functional.log_softmax(student_logits / self.temperature, dim=1),
            nn.functional.softmax(teacher_logits / self.temperature, dim=1)
        ) * (self.temperature ** 2)

        # 组合损失
        total_loss = self.alpha * hard_loss + (1 - self.alpha) * soft_loss
        return total_loss

def train_distillation(teacher_model, student_model, train_loader, num_epochs=10):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    teacher_model = teacher_model.to(device)
    student_model = student_model.to(device)

    # 设置教师模型为评估模式
    teacher_model.eval()

    # 定义损失函数和优化器
    criterion = DistillationLoss(alpha=0.5, temperature=2.0)
    optimizer = optim.Adam(student_model.parameters(), lr=0.001)

    for epoch in range(num_epochs):
        student_model.train()
        running_loss = 0.0

        for inputs, labels in train_loader:
            inputs = inputs.to(device)
            labels = labels.to(device)

            # 获取教师模型的输出
            with torch.no_grad():
                teacher_outputs = teacher_model(inputs)

            # 获取学生模型的输出
            student_outputs = student_model(inputs)

            # 计算蒸馏损失
            loss = criterion(student_outputs, teacher_outputs, labels)

            # 反向传播和优化
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss/len(train_loader):.4f}')

def main():
    # 加载预训练模型
    teacher_model = models.resnet50(pretrained=True)
    student_model = models.resnet18(pretrained=False)

    # 准备数据加载器
    # ... 数据加载代码 ...

    # 训练蒸馏
    train_distillation(teacher_model, student_model, train_loader)

    # 保存学生模型
    torch.save(student_model.state_dict(), 'distilled_resnet18.pth')`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '模型压缩与优化',
  chapterNumber: 11,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '深度学习框架', href: '/study/ai/dl/frameworks' },
  nextChapter: { label: '深度学习实战', href: '/study/ai/dl/cases' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>模型压缩与优化概述</PageTitle>
        <BookParagraph>
          深度学习模型压缩与优化是提高模型部署效率的关键技术。随着深度学习模型规模的不断增大，如何在保持模型性能的同时减小模型体积、提高推理速度，成为了一个重要的研究方向。
        </BookParagraph>
        <BookParagraph>
          本课程将详细介绍模型压缩与优化的主要方法，包括模型量化、模型剪枝、知识蒸馏等技术，以及相关的优化工具和框架。通过学习这些技术，您将能够：
        </BookParagraph>
        <BookList items={[
          '理解模型压缩与优化的基本原理',
          '掌握常用的模型压缩技术',
          '学会使用各种优化工具和框架',
          '在实际项目中应用这些技术',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>优化方法</SectionTitle>
        <BookParagraph><b>1. 模型量化</b></BookParagraph>
        <BookList items={['INT8量化', '混合精度训练', '量化感知训练', '后训练量化', '量化误差分析']} />
        <BookParagraph><b>2. 模型剪枝</b></BookParagraph>
        <BookList items={['结构化剪枝', '非结构化剪枝', '通道剪枝', '层剪枝', '稀疏训练']} />
        <BookParagraph><b>3. 知识蒸馏</b></BookParagraph>
        <BookList items={['教师-学生模型', '软标签蒸馏', '特征蒸馏', '注意力蒸馏', '多教师蒸馏']} />

        <SectionTitle>优化工具</SectionTitle>
        <BookParagraph><b>TensorRT</b> — 高性能推理引擎，自动优化，多精度支持，动态形状，跨平台部署</BookParagraph>
        <BookParagraph><b>ONNX Runtime</b> — 跨框架支持，图优化，量化支持，硬件加速，动态推理</BookParagraph>
        <BookParagraph><b>OpenVINO</b> — Intel优化，模型转换，量化工具，性能分析，部署工具</BookParagraph>
      </div>
    ),
  },
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <SectionTitle>模型压缩与优化流程</SectionTitle>
        <div className="flex justify-center">
          <svg width="100%" height="180" viewBox="0 0 800 180">
            {/* 原始模型 */}
            <rect x="50" y="40" width="100" height="80" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" rx="10" />
            <text x="100" y="80" textAnchor="middle" fill="#1565C0" fontSize="14" fontWeight="bold">原始模型</text>
            {/* 箭头 */}
            <path d="M150 80 L210 80" stroke="#2196F3" strokeWidth="2" />
            <polygon points="210,80 200,75 200,85" fill="#2196F3" />
            {/* 压缩方法 */}
            <rect x="210" y="40" width="100" height="80" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" rx="10" />
            <text x="260" y="70" textAnchor="middle" fill="#2E7D32" fontSize="13" fontWeight="bold">压缩方法</text>
            <text x="260" y="90" textAnchor="middle" fill="#2E7D32" fontSize="11">量化/剪枝/蒸馏</text>
            {/* 箭头 */}
            <path d="M310 80 L370 80" stroke="#2196F3" strokeWidth="2" />
            <polygon points="370,80 360,75 360,85" fill="#2196F3" />
            {/* 优化后模型 */}
            <rect x="370" y="40" width="100" height="80" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" rx="10" />
            <text x="420" y="70" textAnchor="middle" fill="#E65100" fontSize="13" fontWeight="bold">优化后模型</text>
            <text x="420" y="90" textAnchor="middle" fill="#E65100" fontSize="11">更小/更快</text>
            {/* 评估指标 */}
            <rect x="210" y="140" width="100" height="50" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="2" rx="10" />
            <text x="260" y="160" textAnchor="middle" fill="#6A1B9A" fontSize="12" fontWeight="bold">评估指标</text>
            <text x="260" y="178" textAnchor="middle" fill="#6A1B9A" fontSize="11">性能/大小/速度</text>
            {/* 连接线 */}
            <path d="M260 140 L260 120" stroke="#9C27B0" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>压缩方法对比</SectionTitle>
        <div className="flex justify-center">
          <svg width="100%" height="260" viewBox="0 0 800 260">
            {/* 量化 */}
            <rect x="30" y="40" width="220" height="180" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" rx="10" />
            <text x="140" y="65" textAnchor="middle" fill="#1565C0" fontSize="14" fontWeight="bold">模型量化</text>
            <text x="140" y="92" textAnchor="middle" fill="#1565C0" fontSize="12">• INT8量化</text>
            <text x="140" y="112" textAnchor="middle" fill="#1565C0" fontSize="12">• 混合精度训练</text>
            <text x="140" y="132" textAnchor="middle" fill="#1565C0" fontSize="12">• 量化感知训练</text>
            <text x="140" y="152" textAnchor="middle" fill="#1565C0" fontSize="12">• 后训练量化</text>
            {/* 剪枝 */}
            <rect x="280" y="40" width="220" height="180" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" rx="10" />
            <text x="390" y="65" textAnchor="middle" fill="#2E7D32" fontSize="14" fontWeight="bold">模型剪枝</text>
            <text x="390" y="92" textAnchor="middle" fill="#2E7D32" fontSize="12">• 结构化剪枝</text>
            <text x="390" y="112" textAnchor="middle" fill="#2E7D32" fontSize="12">• 非结构化剪枝</text>
            <text x="390" y="132" textAnchor="middle" fill="#2E7D32" fontSize="12">• 通道剪枝</text>
            <text x="390" y="152" textAnchor="middle" fill="#2E7D32" fontSize="12">• 层剪枝</text>
            {/* 知识蒸馏 */}
            <rect x="530" y="40" width="220" height="180" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" rx="10" />
            <text x="640" y="65" textAnchor="middle" fill="#E65100" fontSize="14" fontWeight="bold">知识蒸馏</text>
            <text x="640" y="92" textAnchor="middle" fill="#E65100" fontSize="12">• 教师-学生模型</text>
            <text x="640" y="112" textAnchor="middle" fill="#E65100" fontSize="12">• 软标签蒸馏</text>
            <text x="640" y="132" textAnchor="middle" fill="#E65100" fontSize="12">• 特征蒸馏</text>
            <text x="640" y="152" textAnchor="middle" fill="#E65100" fontSize="12">• 注意力蒸馏</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>代码实践</PageTitle>

        <SectionTitle>模型量化示例</SectionTitle>
        <BookCode language="python" code={quantizeCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>模型剪枝示例</SectionTitle>
        <BookCode language="python" code={pruneCode} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习一：模型量化实践</SectionTitle>
        <BookParagraph><b>要求：</b>对预训练的ResNet18模型进行INT8量化，并比较量化前后的模型大小和推理速度。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={quantizeResnetCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习二：知识蒸馏实践</SectionTitle>
        <BookParagraph><b>要求：</b>使用ResNet50作为教师模型，ResNet18作为学生模型，实现知识蒸馏。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={distillationCode} />
      </div>
    ),
  },
]

export default function DlOptimizationPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
