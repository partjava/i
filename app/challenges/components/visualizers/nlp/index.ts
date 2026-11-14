import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { TokenizerPosVisualizer, BpeMergeVisualizer } from './TokenizationAndPosVisualizers';
import { TfIdfRetrievalVisualizer, Bm25SaturationVisualizer } from './TfIdfAndBm25Visualizers';
import { Word2VecCbowVisualizer, Word2VecSkipGramVisualizer } from './Word2VecVisualizers';
import { BertMlmSimulatorVisualizer, BertMlmMaskRatioVisualizer } from './BertPretrainingVisualizers';
import { LstmGatesSentimentVisualizer, GruResetUpdateVisualizer } from './LstmAndGruVisualizers';
import { SelfAttentionHeatmapVisualizer, CrossAttentionBridgeVisualizer } from './SelfAttentionVisualizers';
import { MultiHeadSplitConcatVisualizer, MultiHeadSubspaceFocusVisualizer } from './MultiHeadAttentionVisualizers';
import { Seq2SeqTranslationVisualizer, BeamSearchTreeVisualizer } from './Seq2SeqAndBeamSearchVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '分词与词性标注', levelIndex: 1, levelTitle: '分词与词性标注器', component: TokenizerPosVisualizer },
  { subtopic: '分词与词性标注', levelIndex: 2, levelTitle: 'BPE 分词器', component: BpeMergeVisualizer },
  { subtopic: 'TF-IDF特征', levelIndex: 1, levelTitle: 'TF-IDF 文档检索器', component: TfIdfRetrievalVisualizer },
  { subtopic: 'TF-IDF特征', levelIndex: 2, levelTitle: 'BM25 检索算法', component: Bm25SaturationVisualizer },
  { subtopic: 'Word2Vec词向量', levelIndex: 1, levelTitle: 'Word2Vec CBOW 嵌入训练器', component: Word2VecCbowVisualizer },
  { subtopic: 'Word2Vec词向量', levelIndex: 2, levelTitle: 'Skip-Gram 训练器', component: Word2VecSkipGramVisualizer },
  { subtopic: 'BERT预训练模型', levelIndex: 1, levelTitle: 'BERT MLM 预训练模拟器', component: BertMlmSimulatorVisualizer },
  { subtopic: 'BERT预训练模型', levelIndex: 2, levelTitle: 'BERT MLM 实现', component: BertMlmMaskRatioVisualizer },
  { subtopic: 'LSTM/GRU序列建模', levelIndex: 1, levelTitle: 'LSTM 序列情感分类器', component: LstmGatesSentimentVisualizer },
  { subtopic: 'LSTM/GRU序列建模', levelIndex: 2, levelTitle: 'GRU 序列分类器', component: GruResetUpdateVisualizer },
  { subtopic: 'Self-Attention自注意力', levelIndex: 1, levelTitle: 'Self-Attention 自注意力计算器', component: SelfAttentionHeatmapVisualizer },
  { subtopic: 'Self-Attention自注意力', levelIndex: 2, levelTitle: '交叉注意力', component: CrossAttentionBridgeVisualizer },
  { subtopic: '多头注意力机制', levelIndex: 1, levelTitle: '多头注意力聚合器', component: MultiHeadSplitConcatVisualizer },
  { subtopic: '多头注意力机制', levelIndex: 2, levelTitle: '多头注意力', component: MultiHeadSubspaceFocusVisualizer },
  { subtopic: '编码与解码器', levelIndex: 1, levelTitle: 'Seq2Seq 翻译模型', component: Seq2SeqTranslationVisualizer },
  { subtopic: '编码与解码器', levelIndex: 2, levelTitle: 'Beam Search 解码', component: BeamSearchTreeVisualizer },
];

export const findNlpVisualizer = createStageLookup(ENTRIES);
