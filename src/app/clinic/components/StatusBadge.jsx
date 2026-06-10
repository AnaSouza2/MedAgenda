import { statusConfig } from "../data/clinicData";

export function StatusBadge({ status }) {
  const config = statusConfig[status] || { bg: "#EEF2F7", text: "#6B7A8D", dot: "#6B7A8D" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.dot }} />
      {status}
    </span>
  );
}
