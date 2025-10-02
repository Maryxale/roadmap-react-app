import React from "react";

export default function SubtaskCard({ subtask, onToggle }) {
  return (
    <div className="flex items-center justify-between bg-white/3 p-3 rounded-lg">
      <div>
        <div className="text-sm font-medium">{subtask.name}</div>
        <div className="text-xs text-slate-300">
          Estado:{" "}
          <span className="capitalize">{subtask.status.replace("_", " ")}</span>
        </div>
      </div>
      <button
        onClick={() => onToggle(subtask.id)}
        className="px-3 py-1 rounded-md bg-white/5 border border-white/6 text-sm"
      >
        Cambiar estado
      </button>
    </div>
  );
}
