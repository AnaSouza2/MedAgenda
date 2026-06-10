import {
  Calendar, CheckCircle, Users, TrendingUp, Download,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { StatCard } from "../components/StatCard";
import { monthlyTrend, specialtyData } from "../data/clinicData";
import { useState, useEffect } from "react";
import { db } from "../../db";

export function AnalyticsSection() {
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    // Carrega a lista de médicos cadastrados
    const list = db.getDoctors().map((d, i) => ({
      ...d,
      consultas: 20 + (d.id * 7) % 15,
      rating: (4.6 + (d.id * 11) % 5 * 0.1).toFixed(1)
    }));
    setDoctorsList(list);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground" style={{ fontSize: "1.5rem", fontWeight: 800 }}>Análise de dados</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Visão geral — Junho 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
          <Download className="w-4 h-4" /> Exportar relatório
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total de consultas", value: "195", change: "+9.6%", positive: true, icon: Calendar, color: "#E8F0F9", iconColor: "#1A3A5C" },
          { label: "Taxa de presença", value: "78%", change: "+3%", positive: true, icon: CheckCircle, color: "#E8F8F2", iconColor: "#27AE60" },
          { label: "Novos pacientes", value: "43", change: "+18%", positive: true, icon: Users, color: "#F3E5F5", iconColor: "#8E44AD" },
          { label: "Média por dia", value: "8.9", change: "-0.5", positive: false, icon: TrendingUp, color: "#FFF8E1", iconColor: "#F39C12" },
        ].map(c => <StatCard key={c.label} {...c} />)}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Monthly trend */}
        <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
          <h2 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>Consultas por mês</h2>
          <p className="text-muted-foreground mb-4" style={{ fontSize: "0.8125rem" }}>Evolução nos últimos 6 meses</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A3A5C" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1A3A5C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7A8D" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7A8D" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13 }} />
              <Area type="monotone" dataKey="value" name="Consultas" stroke="#1A3A5C" strokeWidth={3} fill="url(#grad)" dot={{ r: 5, fill: "#1A3A5C", strokeWidth: 0 }} activeDot={{ r: 7 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance pie */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>Presença vs Faltas</h2>
          <p className="text-muted-foreground mb-4" style={{ fontSize: "0.8125rem" }}>Junho 2026</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={[{ name: "Compareceu", value: 78 }, { name: "Faltou", value: 22 }]} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" paddingAngle={4}>
                <Cell fill="#2ECC71" />
                <Cell fill="#E74C3C" />
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {[{ label: "Compareceu", value: "78%", color: "#2ECC71" }, { label: "Faltou", value: "22%", color: "#E74C3C" }].map(d => (
              <div key={d.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{d.label}</span>
                </div>
                <span className="text-foreground" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Specialty bar */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>Especialidades mais procuradas</h2>
          <p className="text-muted-foreground mb-4" style={{ fontSize: "0.8125rem" }}>Ranking por volume de consultas</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={specialtyData} layout="vertical" margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6B7A8D" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#6B7A8D" }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} cursor={{ fill: "rgba(26,58,92,0.04)" }} />
              <Bar dataKey="value" name="Consultas" radius={[0, 6, 6, 0]} maxBarSize={22}>
                {specialtyData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Doctors table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: "1rem" }}>Desempenho por médico</h2>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>Consultas realizadas em junho</p>
          </div>
          <div className="divide-y divide-border">
            {doctorsList.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
                <div className="flex items-center justify-center w-6 text-muted-foreground" style={{ fontWeight: 700, fontSize: "0.875rem" }}>{i + 1}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: doc.color || "#EEF2F7" }}>
                  <span className="text-primary" style={{ fontWeight: 800, fontSize: "0.8125rem" }}>{doc.avatar || "MC"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{doc.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{doc.specialty}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-foreground" style={{ fontWeight: 800, fontSize: "1rem" }}>{doc.consultas}</p>
                  <div className="flex items-center gap-0.5 justify-end">
                    <span className="text-amber-400" style={{ fontSize: "0.75rem" }}>★</span>
                    <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{doc.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
