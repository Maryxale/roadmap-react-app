import React, { useEffect, useState } from "react";
import roadmapData from "../data/roadmapData";
import StepCard from "./StepCard";

export default function RoadmapApp() {
  const [steps, setSteps] = useState(roadmapData.steps);
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("roadmap");
    if (saved) setSteps(JSON.parse(saved));
  }, []);

  const saveToStorage = () => {
    localStorage.setItem("roadmap", JSON.stringify(steps));
    setMessage("✅ Cambios guardados en tabla simulada (localStorage).");
    setTimeout(() => setMessage(""), 2000);
  };

  const toggleSubtaskStatus = (stepId, subtaskId) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === stepId
          ? {
              ...s,
              subtasks: s.subtasks.map((st) =>
                st.id === subtaskId
                  ? {
                      ...st,
                      status:
                        st.status === "completed" ? "pending" : "completed",
                    }
                  : st
              ),
            }
          : s
      )
    );
  };

  const toggleExpand = (stepId) => {
    setExpanded((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(steps, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roadmap.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSteps =
    filter === "all" ? steps : steps.filter((s) => s.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-indigo-900 to-sky-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Roadmap React App</h1>
        <p className="text-indigo-200 mt-1">
          Challenge Frontend · JSON + Tabla + Filtros
        </p>

        <div className="mt-4 flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded bg-white/10 border border-white/20"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completados</option>
          </select>
          <button
            onClick={saveToStorage}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500"
          >
            Guardar en tabla
          </button>
          <button
            onClick={exportJSON}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500"
          >
            Exportar JSON
          </button>
        </div>
      </header>

      {message && (
        <div className="mb-4 p-3 rounded-md bg-white/5 text-sm text-slate-200">
          {message}
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSteps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            expanded={expanded[step.id]}
            onToggleExpand={toggleExpand}
            onToggleSubtask={toggleSubtaskStatus}
          />
        ))}
      </main>
    </div>
  );
}
