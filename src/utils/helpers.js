export const statusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-400 text-green-900";
    case "in_progress":
      return "bg-yellow-300 text-yellow-900";
    case "review":
      return "bg-indigo-200 text-indigo-900";
    case "blocked":
      return "bg-red-300 text-red-900";
    default:
      return "bg-slate-200 text-slate-800";
  }
};

export const computeStepProgress = (step) => {
  const total = step.subtasks.length;
  const done = step.subtasks.filter((s) => s.status === "completed").length;
  return Math.round((done / total) * 100);
};