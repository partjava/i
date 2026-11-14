import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { VectorProjectionViz, CauchySchwarzViz } from './VectorsAndSpaceVisualizers';
import { LinearSystemViz, MatrixDetViz } from './MatrixMultiplicationAndInverseVisualizers';
import { SvdCompressionViz, SvdRankViz } from './SvdDecompositionVisualizers';
import { EigenPageRankViz, EigenVectorActionViz } from './EigenvaluesAndVectorsVisualizers';
import { NaiveBayesSpamViz, BayesTheoremViz } from './BayesTheoremVisualizers';
import { GaussianPdfViz, CltSimulationViz } from './ProbabilityDistributionsVisualizers';
import { GaussianMleViz, BernoulliMleViz } from './MaximumLikelihoodVisualizers';
import { NumericalGradViz, MultiVarGradientViz } from './PartialDerivativesAndGradientsVisualizers';
import { GradientDescentTraceViz, GdConvergenceViz } from './GradientDescentVisualizers';
import { TaylorExpViz, TaylorLnErrorViz } from './TaylorExpansionVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '向量与空间', levelIndex: 1, levelTitle: '向量投影与正交分解器', component: VectorProjectionViz },
  { subtopic: '向量与空间', levelIndex: 2, levelTitle: '柯西-施瓦茨不等式验证', component: CauchySchwarzViz },
  { subtopic: '矩阵乘法与逆', levelIndex: 1, levelTitle: '线性方程组求解器', component: LinearSystemViz },
  { subtopic: '矩阵乘法与逆', levelIndex: 2, levelTitle: '矩阵行列式与逆矩阵', component: MatrixDetViz },
  { subtopic: 'SVD奇异值分解', levelIndex: 1, levelTitle: 'SVD 图像压缩模拟器', component: SvdCompressionViz },
  { subtopic: 'SVD奇异值分解', levelIndex: 2, levelTitle: 'SVD 与矩阵秩', component: SvdRankViz },
  { subtopic: '特征值与特征向量', levelIndex: 1, levelTitle: '特征值分解与网页排名模拟', component: EigenPageRankViz },
  { subtopic: '特征值与特征向量', levelIndex: 2, levelTitle: '特征分解与对角化', component: EigenVectorActionViz },
  { subtopic: '贝意斯公式', levelIndex: 1, levelTitle: '朴素贝叶斯垃圾邮件分类器', component: NaiveBayesSpamViz },
  { subtopic: '贝意斯公式', levelIndex: 2, levelTitle: '贝叶斯定理计算器', component: BayesTheoremViz },
  { subtopic: '高斯/伯努利分布', levelIndex: 1, levelTitle: '概率分布统计模拟器', component: GaussianPdfViz },
  { subtopic: '高斯/伯努利分布', levelIndex: 2, levelTitle: '中心极限定理模拟', component: CltSimulationViz },
  { subtopic: '最大似然估计(MLE)', levelIndex: 1, levelTitle: '最大似然估计参数求解器', component: GaussianMleViz },
  { subtopic: '最大似然估计(MLE)', levelIndex: 2, levelTitle: 'MLE 参数估计', component: BernoulliMleViz },
  { subtopic: '偏导数与梯度', levelIndex: 1, levelTitle: '数值梯度检查器', component: NumericalGradViz },
  { subtopic: '偏导数与梯度', levelIndex: 2, levelTitle: '多元函数梯度计算', component: MultiVarGradientViz },
  { subtopic: '梯度下降算法', levelIndex: 1, levelTitle: '梯度下降优化器', component: GradientDescentTraceViz },
  { subtopic: '梯度下降算法', levelIndex: 2, levelTitle: '梯度下降收敛分析', component: GdConvergenceViz },
  { subtopic: '泰勒展开式', levelIndex: 1, levelTitle: '泰勒展开近似计算器', component: TaylorExpViz },
  { subtopic: '泰勒展开式', levelIndex: 2, levelTitle: '泰勒展开误差分析', component: TaylorLnErrorViz },
];

export const findMathFoundationVisualizer = createStageLookup(ENTRIES);
