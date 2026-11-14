import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { ImageConvolutionEngineVisualizer, HistogramEqualizationVisualizer } from './ImageFilteringVisualizers';
import { CannyPipelineVisualizer, HoughTransformVisualizer } from './CannyEdgeDetectionVisualizers';
import { ColorSpaceConverterVisualizer, ColorTransferLabVisualizer } from './ColorSpaceVisualizers';
import { SiftDogKeypointsVisualizer, HarrisCornerEigenVisualizer } from './SiftFeaturesVisualizers';
import { CnnClassifierArchVisualizer, ResNetSkipConnectionVisualizer } from './LeNetResNetVisualizers';
import { YoloIouAnchorVisualizer, YoloMultiTaskLossVisualizer } from './YoloObjectDetectionVisualizers';
import { UnetSkipEncoderDecoderVisualizer, DiceVsIouMetricsVisualizer } from './UnetSegmentationVisualizers';
import { SamPromptSegmentVisualizer, SamMaskDecoderArchVisualizer } from './SamSegmentationVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '图像滤波与增强', levelIndex: 1, levelTitle: '图像卷积滤波引擎', component: ImageConvolutionEngineVisualizer },
  { subtopic: '图像滤波与增强', levelIndex: 2, levelTitle: '直方图均衡化', component: HistogramEqualizationVisualizer },
  { subtopic: '边缘检测 (Canny)', levelIndex: 1, levelTitle: 'Canny 边缘检测管道', component: CannyPipelineVisualizer },
  { subtopic: '边缘检测 (Canny)', levelIndex: 2, levelTitle: '霍夫变换直线检测', component: HoughTransformVisualizer },
  { subtopic: '色彩空间转换', levelIndex: 1, levelTitle: '色彩空间转换器', component: ColorSpaceConverterVisualizer },
  { subtopic: '色彩空间转换', levelIndex: 2, levelTitle: '颜色迁移算法', component: ColorTransferLabVisualizer },
  { subtopic: 'SIFT特征提取', levelIndex: 1, levelTitle: 'SIFT 特征检测与匹配模拟器', component: SiftDogKeypointsVisualizer },
  { subtopic: 'SIFT特征提取', levelIndex: 2, levelTitle: 'Harris 角点检测', component: HarrisCornerEigenVisualizer },
  { subtopic: 'LeNet/ResNet分类', levelIndex: 1, levelTitle: 'CNN 卷积分类器', component: CnnClassifierArchVisualizer },
  { subtopic: 'LeNet/ResNet分类', levelIndex: 2, levelTitle: 'ResNet 残差块', component: ResNetSkipConnectionVisualizer },
  { subtopic: '目标检测 (YOLO)', levelIndex: 1, levelTitle: 'YOLO 锚框与 IoU 计算器', component: YoloIouAnchorVisualizer },
  { subtopic: '目标检测 (YOLO)', levelIndex: 2, levelTitle: 'YOLO 损失函数', component: YoloMultiTaskLossVisualizer },
  { subtopic: '图像分割 (U-Net)', levelIndex: 1, levelTitle: 'U-Net 图像分割模拟器', component: UnetSkipEncoderDecoderVisualizer },
  { subtopic: '图像分割 (U-Net)', levelIndex: 2, levelTitle: 'Dice 与 IoU 评估', component: DiceVsIouMetricsVisualizer },
  { subtopic: 'SAM分割大模型', levelIndex: 1, levelTitle: 'SAM 提示分割模拟器', component: SamPromptSegmentVisualizer },
  { subtopic: 'SAM分割大模型', levelIndex: 2, levelTitle: '嵌入提取与掩码解码', component: SamMaskDecoderArchVisualizer },
];

export const findComputerVisionVisualizer = createStageLookup(ENTRIES);
