import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({ icon: Icon, label, value, change, positive, color, iconColor }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color }}>
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg"
          style={{ background: positive ? "#E8F8F2" : "#FDEDEC" }}
        >
          {positive
            ? <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#27AE60" }} />
            : <ArrowDownRight className="w-3.5 h-3.5" style={{ color: "#E74C3C" }} />
          }
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: positive ? "#27AE60" : "#E74C3C" }}>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-foreground" style={{ fontWeight: 800, fontSize: "1.75rem", lineHeight: 1 }}>{value}</p>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "0.8125rem" }}>{label}</p>
      </div>
    </div>
  );
}
