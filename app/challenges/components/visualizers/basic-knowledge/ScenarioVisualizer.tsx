'use client';

import { useState, type ReactNode } from 'react';

interface Scenario {
  label: string;
  steps: string[];
}

export function ScenarioVisualizer({ title, description, scenarios, renderDiagram, diagramOnly = false }: {
  title: string;
  description: string;
  scenarios: Scenario[];
  renderDiagram?: (active: number) => ReactNode;
  diagramOnly?: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <section aria-label={title} className="min-w-0 rounded-2xl border border-indigo-900/60 bg-gradient-to-b from-indigo-950/40 to-slate-950 p-4 sm:p-5">
      <h3 className="text-base font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">{description}</p>
      <div className="my-4 flex flex-wrap gap-2" role="group" aria-label="切换示例">
        {scenarios.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`rounded-lg border px-3 py-1.5 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300 ${active === index ? 'border-indigo-400 bg-indigo-500/25 text-indigo-100' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-indigo-500'}`}
          >
            {label}
          </button>
        ))}
      </div>
      {renderDiagram && <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950 p-4">{renderDiagram(active)}</div>}
      {diagramOnly && <p aria-live="polite" className="text-xs leading-relaxed text-cyan-200">{scenarios[active].steps.at(-1)}</p>}
      {!diagramOnly && <ol aria-live="polite" className="space-y-2 border-l border-indigo-900/70 pl-3">
        {scenarios[active].steps.map((step, index, steps) => (
          <li key={index} className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs leading-relaxed [overflow-wrap:anywhere] ${index === steps.length - 1 ? 'border-cyan-900 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-950 text-slate-200'}`}>
            <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-indigo-950 font-mono text-[10px] text-indigo-200">{index + 1}</span>
            <span className="min-w-0">{step}</span>
          </li>
        ))}
      </ol>}
    </section>
  );
}
