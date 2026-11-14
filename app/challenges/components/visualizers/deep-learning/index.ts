import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { MlpForwardVisualizer, CnnConv2dForwardVisualizer } from './MlpVisualizers';
import { ActivationGradientVisualizer, ReluVariantsVisualizer } from './ActivationFunctionsVisualizers';
import { LossComparisonVisualizer, FocalLossVisualizer } from './LossFunctionsVisualizers';
import { BackpropChainVisualizer, AutogradDagVisualizer } from './BackpropagationVisualizers';
import { SgdVsAdamVisualizer, MomentumRosenbrockVisualizer } from './OptimizersVisualizers';
import { BnTrainVsEvalVisualizer, BnStatisticsShiftVisualizer } from './BatchNormalizationVisualizers';
import { InvertedDropoutVisualizer, McDropoutUncertaintyVisualizer } from './DropoutVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: 'MLP多层感知机', levelIndex: 1, levelTitle: '多层感知机前向传播', component: MlpForwardVisualizer },
  { subtopic: 'MLP多层感知机', levelIndex: 2, levelTitle: 'CNN 卷积前向传播', component: CnnConv2dForwardVisualizer },
  { subtopic: '激活函数与梯度消失', levelIndex: 1, levelTitle: '激活函数梯度分析器', component: ActivationGradientVisualizer },
  { subtopic: '激活函数与梯度消失', levelIndex: 2, levelTitle: 'ReLU 变体对比', component: ReluVariantsVisualizer },
  { subtopic: '损失函数', levelIndex: 1, levelTitle: '损失函数计算与对比', component: LossComparisonVisualizer },
  { subtopic: '损失函数', levelIndex: 2, levelTitle: 'Focal Loss 实现', component: FocalLossVisualizer },
  { subtopic: '反向传播', levelIndex: 1, levelTitle: '反向传播自动求导器', component: BackpropChainVisualizer },
  { subtopic: '反向传播', levelIndex: 2, levelTitle: '自动微分计算图', component: AutogradDagVisualizer },
  { subtopic: 'SGD与Adam优化器', levelIndex: 1, levelTitle: 'SGD/Adam 优化器实现', component: SgdVsAdamVisualizer },
  { subtopic: 'SGD与Adam优化器', levelIndex: 2, levelTitle: 'SGD 动量对比实验', component: MomentumRosenbrockVisualizer },
  { subtopic: 'Batch Normalization', levelIndex: 1, levelTitle: 'Batch Normalization 训练与推理', component: BnTrainVsEvalVisualizer },
  { subtopic: 'Batch Normalization', levelIndex: 2, levelTitle: 'BN 训练与推理模式对比', component: BnStatisticsShiftVisualizer },
  { subtopic: 'Dropout正则化', levelIndex: 1, levelTitle: 'Dropout 正则化实现', component: InvertedDropoutVisualizer },
  { subtopic: 'Dropout正则化', levelIndex: 2, levelTitle: 'Dropout 变体与 MC Dropout', component: McDropoutUncertaintyVisualizer },
];

export const findDeepLearningVisualizer = createStageLookup(ENTRIES);
