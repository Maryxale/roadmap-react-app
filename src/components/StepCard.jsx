import React from "react";
import { statusColor, computeStepProgress } from "../utils/helpers";
import SubtaskCard from "./SubtaskCard";

export default function StepCard({
  step,
  expanded,
  onToggleExpand,
  onToggleSubtask,
}) {
  return (
    <article className="rounded-2xl p-4 bg-gradient-to-br from-white/3 to-white/2 border border-white/6 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{step.title}</h2>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs rounded ${statusColor(
                step.status
              )}`}
            >
              {step.status.replace("_", " ")}
            </span>
            <span className="text-xs text-slate-400">Paso {step.id}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-300">Progreso</div>
          <div className="mt-1 w-28 bg-white/5 rounded-full h-3 overflow-hidden">
            <div
              style={{ width: `${computeStepProgress(step)}%` }}
              className="h-3 rounded-full bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400"
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {computeStepProgress(step)}%
          </div>
        </div>
      </div>

      {/* Expandir subtareas */}
      <div className="mt-4">
        <button
          onClick={() => onToggleExpand(step.id)}
          className="text-sm text-indigo-100/80 hover:underline"
        >
          {expanded ? "Ocultar detalles" : "Ver subtareas"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-3">
            {step.subtasks.map((st) => (
              <SubtaskCard
                key={st.id}
                subtask={st}
                onToggle={(subId) => onToggleSubtask(step.id, subId)}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
