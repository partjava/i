import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { FewShotSelectorVisualizer, PromptTemplateEngineVisualizer } from './FewShotPromptingVisualizers';
import { CotReasoningVisualizer, CotSelfConsistencyVisualizer } from './ChainOfThoughtVisualizers';
import { ReactLoopVisualizer, ToolDispatcherVisualizer } from './ReActFrameworkVisualizers';
import { LoraRankDecompositionVisualizer, QloraNf4QuantizationVisualizer } from './LoraFineTuningVisualizers';
import { RlhfRewardModelVisualizer, DpoAlignmentVisualizer } from './RlhfAndDpoVisualizers';
import { QwenApiWrapperVisualizer, KvCacheInferenceVisualizer } from './QwenModelVisualizers';
import { FixedOverlapChunkerVisualizer, SmartSemanticChunkerVisualizer } from './TextChunkingVisualizers';
import { TextEmbeddingVectorVisualizer, EmbeddingAlignmentContrastiveVisualizer } from './VectorEmbeddingVisualizers';
import { VectorAnnIvfVisualizer, HnswLayerGraphVisualizer } from './VectorDatabaseSearchVisualizers';
import { ToolUseExecutorVisualizer, RagPipelineVisualizer } from './ToolUseAndRagVisualizers';
import { FunctionCallingSchemaVisualizer, SseStreamParserVisualizer } from './FunctionCallingVisualizers';
import { LangChainDagWorkflowVisualizer, AgentMemoryWindowVisualizer } from './LangChainAndCrewAiVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: 'Few-shot提示', levelIndex: 1, levelTitle: 'Few-shot 示例选择器', component: FewShotSelectorVisualizer },
  { subtopic: 'Few-shot提示', levelIndex: 2, levelTitle: 'Prompt 模板引擎', component: PromptTemplateEngineVisualizer },
  { subtopic: 'CoT链式思维', levelIndex: 1, levelTitle: 'Chain-of-Thought 推理器', component: CotReasoningVisualizer },
  { subtopic: 'CoT链式思维', levelIndex: 2, levelTitle: 'CoT 验证器', component: CotSelfConsistencyVisualizer },
  { subtopic: 'ReAct框架', levelIndex: 1, levelTitle: 'ReAct 推理-行动框架', component: ReactLoopVisualizer },
  { subtopic: 'ReAct框架', levelIndex: 2, levelTitle: '工具调度执行器', component: ToolDispatcherVisualizer },
  { subtopic: 'LoRA轻量化微调', levelIndex: 1, levelTitle: 'LoRA 矩阵分解模拟器', component: LoraRankDecompositionVisualizer },
  { subtopic: 'LoRA轻量化微调', levelIndex: 2, levelTitle: 'QLoRA 量化模拟', component: QloraNf4QuantizationVisualizer },
  { subtopic: 'RLHF对齐', levelIndex: 1, levelTitle: 'RLHF 奖励模型模拟器', component: RlhfRewardModelVisualizer },
  { subtopic: 'RLHF对齐', levelIndex: 2, levelTitle: 'DPO 偏好优化', component: DpoAlignmentVisualizer },
  { subtopic: 'Qwen开源大模型', levelIndex: 1, levelTitle: 'Qwen API 调用封装器', component: QwenApiWrapperVisualizer },
  { subtopic: 'Qwen开源大模型', levelIndex: 2, levelTitle: 'KV Cache 实现', component: KvCacheInferenceVisualizer },
  { subtopic: '文本切分与清洗', levelIndex: 1, levelTitle: '文档切片引擎', component: FixedOverlapChunkerVisualizer },
  { subtopic: '文本切分与清洗', levelIndex: 2, levelTitle: '智能切片器', component: SmartSemanticChunkerVisualizer },
  { subtopic: '向量Embedding', levelIndex: 1, levelTitle: '文本向量嵌入器', component: TextEmbeddingVectorVisualizer },
  { subtopic: '向量Embedding', levelIndex: 2, levelTitle: '向量对齐评估', component: EmbeddingAlignmentContrastiveVisualizer },
  { subtopic: '向量数据库检索', levelIndex: 1, levelTitle: '向量数据库 ANN 检索器', component: VectorAnnIvfVisualizer },
  { subtopic: '向量数据库检索', levelIndex: 2, levelTitle: 'HNSW 索引模拟', component: HnswLayerGraphVisualizer },
  { subtopic: '工具调用 (Tool Use)', levelIndex: 1, levelTitle: '工具调用执行器', component: ToolUseExecutorVisualizer },
  { subtopic: '工具调用 (Tool Use)', levelIndex: 2, levelTitle: 'RAG 检索增强生成', component: RagPipelineVisualizer },
  { subtopic: 'Function Calling', levelIndex: 1, levelTitle: 'Function Calling 调度器', component: FunctionCallingSchemaVisualizer },
  { subtopic: 'Function Calling', levelIndex: 2, levelTitle: '流式输出解析器', component: SseStreamParserVisualizer },
  { subtopic: 'LangChain/CrewAI', levelIndex: 1, levelTitle: 'LangChain 链式工作流', component: LangChainDagWorkflowVisualizer },
  { subtopic: 'LangChain/CrewAI', levelIndex: 2, levelTitle: 'Agent 记忆模块', component: AgentMemoryWindowVisualizer },
];

export const findLlmVisualizer = createStageLookup(ENTRIES);
