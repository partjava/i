'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveCurveCanvas,
} from '../shared/VisualizerEngine';

// 章节：TF-IDF特征

// L1: TF-IDF 文档检索器
export const TfIdfRetrievalVisualizer: React.FC = () => {
  const [docFreq, setDocFreq] = useState(2);
  const N = 100;
  const tf = 3;
  const idf = Math.log((N + 1) / (docFreq + 1)) + 1;
  const tfidf = tf * idf;
  return (
    <VisualizerFrame
      title="TF-IDF 逆文档频率加权与停用词自动降权"
      subtitle="某个词在越少的文档里出现（df 越低），其辨别区分度 IDF 越高"
      badge="tf_idf"
      sliders={[{ label: '包含该词的文档数 df (总N=100)', value: docFreq, min: 1, max: 95, step: 5, onChange: setDocFreq }]}
      metrics={[
        { label: '词频 TF', value: `${tf}`, tone: 'cyan' },
        { label: 'IDF 区分度', value: idf.toFixed(2), tone: idf > 3 ? 'emerald' : 'amber' },
        { label: 'TF × IDF 权重', value: tfidf.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[1, 100]}
        domainY={[0, 6]}
        xLabel="文档频率 df"
        yLabel="IDF 权重"
        curves={[
          {
            id: 'idf',
            label: 'log((N+1)/(df+1)) + 1',
            tone: 'cyan',
            fillArea: true,
            points: Array.from({ length: 20 }, (_, i) => {
              const df = 1 + i * 5;
              return [df, Math.log((N + 1) / (df + 1)) + 1];
            }),
          },
        ]}
        markers={[{ x: docFreq, y: idf, label: `IDF=${idf.toFixed(2)}`, tone: 'emerald', radius: 5 }]}
      />
    </VisualizerFrame>
  );
};

// L2: BM25 检索算法
export const Bm25SaturationVisualizer: React.FC = () => {
  const [k1, setK1] = useState(1.5);
  const tfScore = (tf: number, kk: number) => (tf * (kk + 1)) / (tf + kk);
  return (
    <VisualizerFrame
      title="BM25 词频饱和曲线 vs TF-IDF 线性增长对比"
      subtitle="BM25 引入参数 k₁ 使词频增益渐近饱和在 (k₁+1)，防止关键词堆砌作弊刷榜"
      badge="bm25_score"
      sliders={[{ label: '饱和参数 k₁', value: k1, min: 0.5, max: 3.0, step: 0.5, displayValue: k1.toFixed(1), onChange: setK1 }]}
      metrics={[
        { label: '饱和渐近上界 k₁+1', value: (k1 + 1).toFixed(1), tone: 'emerald' },
        { label: 'tf=10 得分', value: tfScore(10, k1).toFixed(2), tone: 'cyan' },
      ]}
    >
      <InteractiveCurveCanvas
        domainX={[0, 12]}
        domainY={[0, 5]}
        xLabel="词频 tf"
        yLabel="TF 贡献分量"
        curves={[
          {
            id: 'bm25',
            label: `BM25 TF(k₁=${k1.toFixed(1)})`,
            tone: 'emerald',
            fillArea: true,
            points: Array.from({ length: 13 }, (_, f) => [f, tfScore(f, k1)]),
          },
          {
            id: 'lin',
            label: '线性 TF (易作弊)',
            tone: 'rose',
            dashed: true,
            points: [
              [0, 0],
              [5, 5],
            ],
          },
        ]}
        hLines={[{ y: k1 + 1, label: `饱和极限 ${k1 + 1}`, tone: 'amber' }]}
      />
    </VisualizerFrame>
  );
};
