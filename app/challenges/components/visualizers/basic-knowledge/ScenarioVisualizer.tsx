'use client';

import { useState, type ReactNode } from 'react';
import { VisualizerFrame, type MetricItem, type SliderControl } from '../shared/VisualizerEngine';

interface Scenario {
  label: string;
  steps: string[];
  metrics?: MetricItem[];
}

export function ScenarioVisualizer({
  title,
  description,
  badge,
  scenarios,
  renderDiagram,
  diagramOnly = true,
  sliders,
  metrics,
}: {
  title: string;
  description: string;
  badge?: string;
  scenarios: Scenario[];
  renderDiagram?: (active: number) => ReactNode;
  diagramOnly?: boolean;
  sliders?: SliderControl[];
  metrics?: (active: number) => MetricItem[];
}) {
  const [active, setActive] = useState(0);
  const current = scenarios[active] ?? scenarios[0];
  const resolvedMetrics = metrics ? metrics(active) : current?.metrics;

  return (
    <VisualizerFrame
      title={title}
      subtitle={description}
      badge={badge}
      scenarios={scenarios.map((s) => ({
        label: s.label,
        summary: s.steps.join(' → '),
      }))}
      activeScenario={active}
      onScenarioChange={setActive}
      sliders={sliders}
      metrics={resolvedMetrics}
      caption={
        diagramOnly ? (
          <span>{current?.steps.at(-1)}</span>
        ) : (
          <div className="space-y-1">
            {current?.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]">
                <span className="font-mono text-cyan-400">0{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        )
      }
    >
      {renderDiagram ? renderDiagram(active) : null}
    </VisualizerFrame>
  );
}
