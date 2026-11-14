import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { LinearRegressionNormalVisualizer, RidgeRegressionVisualizer } from './LinearRegressionVisualizers';
import { LogisticSigmoidVisualizer, SoftmaxTemperatureVisualizer } from './LogisticRegressionVisualizers';
import { SvmHingeVisualizer, SvmKernelVisualizer } from './SvmVisualizers';
import { DecisionTreeEntropyVisualizer, DecisionTreeMseSplitVisualizer } from './DecisionTreeVisualizers';
import { RandomForestBaggingVisualizer, RandomForestOobVisualizer } from './RandomForestVisualizers';
import { XgboostResidualVisualizer, XgboostNewtonGainVisualizer } from './XgboostVisualizers';
import { KnnClassifierVisualizer, KnnRegressionTuningVisualizer } from './KnnVisualizers';
import { KMeansIterationVisualizer, KMeansPlusPlusVisualizer } from './KMeansVisualizers';
import { DbscanDensityVisualizer, DbscanEpsElbowVisualizer } from './DbscanVisualizers';
import { HierarchicalDendrogramVisualizer, HierarchicalLinkageCutVisualizer } from './HierarchicalClusteringVisualizers';
import { PcaProjectionVisualizer, PcaWhiteningVisualizer } from './PcaVisualizers';
import { FeatureScalerVisualizer, RobustScalerVisualizer } from './FeatureScalingVisualizers';
import { BatchNormForwardVisualizer, BnVsLnAxisVisualizer } from './DataNormalizationVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '线性回归', levelIndex: 1, levelTitle: '线性回归闭式求解器', component: LinearRegressionNormalVisualizer },
  { subtopic: '线性回归', levelIndex: 2, levelTitle: '岭回归闭式解', component: RidgeRegressionVisualizer },
  { subtopic: 'Logistic回归', levelIndex: 1, levelTitle: 'Logistic 回归分类器', component: LogisticSigmoidVisualizer },
  { subtopic: 'Logistic回归', levelIndex: 2, levelTitle: 'Softmax 多分类器', component: SoftmaxTemperatureVisualizer },
  { subtopic: '支持向量机 (SVM)', levelIndex: 1, levelTitle: 'SVM 铰链损失分类器', component: SvmHingeVisualizer },
  { subtopic: '支持向量机 (SVM)', levelIndex: 2, levelTitle: 'SVM 核函数与对偶', component: SvmKernelVisualizer },
  { subtopic: '决策树', levelIndex: 1, levelTitle: '决策树信息增益分裂器', component: DecisionTreeEntropyVisualizer },
  { subtopic: '决策树', levelIndex: 2, levelTitle: '决策树回归器', component: DecisionTreeMseSplitVisualizer },
  { subtopic: '随机森林', levelIndex: 1, levelTitle: '随机森林 Bagging 集成', component: RandomForestBaggingVisualizer },
  { subtopic: '随机森林', levelIndex: 2, levelTitle: '随机森林袋外评估', component: RandomForestOobVisualizer },
  { subtopic: 'XGBoost', levelIndex: 1, levelTitle: 'XGBoost 梯度提升模拟器', component: XgboostResidualVisualizer },
  { subtopic: 'XGBoost', levelIndex: 2, levelTitle: 'XGBoost 回归训练器', component: XgboostNewtonGainVisualizer },
  { subtopic: 'KNN', levelIndex: 1, levelTitle: 'K 近邻分类器', component: KnnClassifierVisualizer },
  { subtopic: 'KNN', levelIndex: 2, levelTitle: 'KNN 回归与超参调优', component: KnnRegressionTuningVisualizer },
  { subtopic: 'K-Means聚类', levelIndex: 1, levelTitle: 'K-Means 聚类引擎', component: KMeansIterationVisualizer },
  { subtopic: 'K-Means聚类', levelIndex: 2, levelTitle: 'K-Means++ 初始化', component: KMeansPlusPlusVisualizer },
  { subtopic: 'DBSCAN', levelIndex: 1, levelTitle: 'DBSCAN 密度聚类器', component: DbscanDensityVisualizer },
  { subtopic: 'DBSCAN', levelIndex: 2, levelTitle: 'DBSCAN eps 参数调优', component: DbscanEpsElbowVisualizer },
  { subtopic: '层次聚类', levelIndex: 1, levelTitle: '层次聚类与树状图', component: HierarchicalDendrogramVisualizer },
  { subtopic: '层次聚类', levelIndex: 2, levelTitle: '层次聚类与树状图截断', component: HierarchicalLinkageCutVisualizer },
  { subtopic: 'PCA主成分分析', levelIndex: 1, levelTitle: 'PCA 降维与重建', component: PcaProjectionVisualizer },
  { subtopic: 'PCA主成分分析', levelIndex: 2, levelTitle: 'PCA 白化与重建误差', component: PcaWhiteningVisualizer },
  { subtopic: '特征标准化', levelIndex: 1, levelTitle: '特征标准化与归一化器', component: FeatureScalerVisualizer },
  { subtopic: '特征标准化', levelIndex: 2, levelTitle: '鲁棒缩放与分位数变换', component: RobustScalerVisualizer },
  { subtopic: '数据归一化', levelIndex: 1, levelTitle: '批量归一化层模拟器', component: BatchNormForwardVisualizer },
  { subtopic: '数据归一化', levelIndex: 2, levelTitle: '层归一化与批归一化对比', component: BnVsLnAxisVisualizer },
];

export const findMachineLearningVisualizer = createStageLookup(ENTRIES);
