'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：Docker镜像打包

// L1: Docker 镜像构建器
export const DockerLayerCacheVisualizer: React.FC = () => {
  const [changedCodeOnly, setChangedCodeOnly] = useState(1);
  return (
    <VisualizerFrame
      title="Dockerfile 联合文件系统 (OverlayFS) 层缓存复用顺序"
      subtitle="先 COPY requirements.txt && pip install，再 COPY . app 业务代码，改代码时 100% 命中依赖缓存"
      badge="docker_build"
      scenarios={[
        { label: '错误顺序：先 COPY . 后 pip install ✗', summary: '每次修改哪怕 1 行代码都导致后面 pip install 缓存全部失效重下 2GB！' },
        { label: '正确分层：依赖在前、代码在末 ✓', summary: '修改源码时前 3 层缓存 HIT，1 秒完成镜像增量构建！' },
      ]}
      activeScenario={changedCodeOnly}
      onScenarioChange={setChangedCodeOnly}
      metrics={[
        { label: '依赖层缓存状态', value: changedCodeOnly ? 'CACHED ⚡ (1s)' : 'REBUILD ALL (180s)', tone: changedCodeOnly ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'Docker 镜像层栈',
            slots: [
              { label: 'FROM python:3.11', sublabel: 'HIT ✓', tone: 'indigo' },
              { label: changedCodeOnly ? 'pip install reqs' : 'COPY . (改1行)', sublabel: changedCodeOnly ? 'CACHE HIT ✓' : '失效!', tone: changedCodeOnly ? 'emerald' : 'rose' },
              { label: changedCodeOnly ? 'COPY src/ .' : 'pip install (重下!)', sublabel: changedCodeOnly ? '仅增量重建' : '极慢', tone: changedCodeOnly ? 'cyan' : 'rose', pointer: 'CHANGE' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 多阶段 Docker 构建
export const DockerMultiStageVisualizer: React.FC = () => {
  const [multi, setMulti] = useState(1);
  const totalMb = multi ? 145 : 1120;
  return (
    <VisualizerFrame
      title="Multi-Stage Build 多阶段剥离编译器，极限瘦身生产镜像"
      subtitle="在 builder 阶段安装 gcc/cargo 编译产物后，仅把轮子与二进制 COPY --from=builder 进 slim 镜像"
      badge="multi_stage_docker"
      scenarios={[
        { label: '单阶段打包 (含 gcc/源码残余 1.12GB)', summary: '构建工具链与中间编译缓存全部滞留线上镜像，拉取缓慢且存在攻击面。' },
        { label: '多阶段瘦身 (仅运行产物 145MB ✓)', summary: '镜像体积骤降 87%，启动冷拉时间降至秒级！' },
      ]}
      activeScenario={multi}
      onScenarioChange={setMulti}
      metrics={[
        { label: '最终镜像体积', value: `${totalMb} MB`, tone: multi ? 'emerald' : 'rose' },
        { label: '体积缩减', value: multi ? '-87% 极致精简 ✓' : '基准 100%', tone: multi ? 'cyan' : 'slate' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '镜像构成层',
            slots: multi
              ? [
                  { label: 'python:3.11-slim', sublabel: '120 MB', tone: 'cyan' },
                  { label: '--from=builder 产物', sublabel: '25 MB ✓', tone: 'emerald' },
                ]
              : [
                  { label: 'OS + gcc + build-essential', sublabel: '750 MB 冗余', tone: 'rose' },
                  { label: 'pip cache + tmp', sublabel: '240 MB 垃圾', tone: 'amber' },
                  { label: 'App 运行包', sublabel: '130 MB', tone: 'cyan' },
                ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};
