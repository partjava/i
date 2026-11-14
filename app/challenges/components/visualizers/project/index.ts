import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { SupportTicketRouterVisualizer, SentimentPipelineVisualizer } from './CustomerSupportAgentVisualizers';
import { CodeAutocompleteFimVisualizer, CodeReviewAstVisualizer } from './CodingAssistantVisualizers';
import { MultiAgentMeetingSchedulerVisualizer, TaskDagDecompositionVisualizer } from './MultiAgentWorkflowVisualizers';
import { GradioInterfaceFlowVisualizer, GradioInteractiveBlocksVisualizer } from './GradioDemoVisualizers';
import { StreamlitRerunCacheVisualizer, MlTrainingMonitorVisualizer } from './StreamlitDashboardVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: 'AI客服代理', levelIndex: 1, levelTitle: 'AI 客服工单分类器', component: SupportTicketRouterVisualizer },
  { subtopic: 'AI客服代理', levelIndex: 2, levelTitle: '情感分析管道', component: SentimentPipelineVisualizer },
  { subtopic: '自动编程助手', levelIndex: 1, levelTitle: 'AI 代码助手补全器', component: CodeAutocompleteFimVisualizer },
  { subtopic: '自动编程助手', levelIndex: 2, levelTitle: '代码审查工具', component: CodeReviewAstVisualizer },
  { subtopic: '多Agent协同工作流', levelIndex: 1, levelTitle: '多 Agent 会议安排系统', component: MultiAgentMeetingSchedulerVisualizer },
  { subtopic: '多Agent协同工作流', levelIndex: 2, levelTitle: '任务分解与分配', component: TaskDagDecompositionVisualizer },
  { subtopic: 'Gradio模型演示', levelIndex: 1, levelTitle: 'Gradio 演示界面构建器', component: GradioInterfaceFlowVisualizer },
  { subtopic: 'Gradio模型演示', levelIndex: 2, levelTitle: '交互式模型演示', component: GradioInteractiveBlocksVisualizer },
  { subtopic: 'Streamlit数据看板', levelIndex: 1, levelTitle: 'Streamlit 数据监控看板', component: StreamlitRerunCacheVisualizer },
  { subtopic: 'Streamlit数据看板', levelIndex: 2, levelTitle: 'ML 训练监控看板', component: MlTrainingMonitorVisualizer },
];

export const findProjectVisualizer = createStageLookup(ENTRIES);
