import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { FastApiPipelineVisualizer, FastApiAsyncEventLoopVisualizer } from './FastApiDevelopmentVisualizers';
import { OnnxExportVisualizer, OnnxGraphFusionVisualizer } from './OnnxSerializationVisualizers';
import { DockerLayerCacheVisualizer, DockerMultiStageVisualizer } from './DockerPackagingVisualizers';
import { OllamaLifecycleVisualizer, QuantizationBitWidthVisualizer } from './OllamaInferenceVisualizers';
import { VllmPagedAttentionVisualizer, ContinuousBatchingVisualizer } from './VllmAccelerationVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: 'FastAPI开发', levelIndex: 1, levelTitle: 'FastAPI REST 服务构建器', component: FastApiPipelineVisualizer },
  { subtopic: 'FastAPI开发', levelIndex: 2, levelTitle: '异步请求处理器', component: FastApiAsyncEventLoopVisualizer },
  { subtopic: '模型序列化(ONNX)', levelIndex: 1, levelTitle: 'ONNX 模型导出器', component: OnnxExportVisualizer },
  { subtopic: '模型序列化(ONNX)', levelIndex: 2, levelTitle: 'ONNX 图优化', component: OnnxGraphFusionVisualizer },
  { subtopic: 'Docker镜像打包', levelIndex: 1, levelTitle: 'Docker 镜像构建器', component: DockerLayerCacheVisualizer },
  { subtopic: 'Docker镜像打包', levelIndex: 2, levelTitle: '多阶段 Docker 构建', component: DockerMultiStageVisualizer },
  { subtopic: 'Ollama本地推理', levelIndex: 1, levelTitle: 'Ollama 模型管理 CLI', component: OllamaLifecycleVisualizer },
  { subtopic: 'Ollama本地推理', levelIndex: 2, levelTitle: '模型量化推理', component: QuantizationBitWidthVisualizer },
  { subtopic: 'vLLM加速部署', levelIndex: 1, levelTitle: 'vLLM 推理加速器', component: VllmPagedAttentionVisualizer },
  { subtopic: 'vLLM加速部署', levelIndex: 2, levelTitle: 'Continuous Batching', component: ContinuousBatchingVisualizer },
];

export const findEngineeringDeploymentVisualizer = createStageLookup(ENTRIES);
