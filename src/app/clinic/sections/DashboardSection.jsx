import { useState, useEffect } from "react";
import {
  Calendar, CheckCircle, XCircle, Clock,
  Search, Plus, Filter, Download, MoreHorizontal,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import { weeklyData, specialtyData } from "../data/clinicData";
import { db } from "../../db";

export function DashboardSection() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 10, confirmed: 8, missed: 1, free: 8 });

  useEffect(() => {
    const todayList = db.getTodayAppointments();
    setAppointments(todayList);

    // Calculate dynamic stats
    const total = todayList.length;
    const confirmed = todayList.filter(a => a.status === "Confirmada").length;
    const missed = todayList.filter(a => a.status === "Faltou").length;
    const free = Math.max(0, 18 - total); // 18 maximum daily slots

    setStats({ total, confirmed, missed, free });
  }, []);

  const filtered = appointments.filter(
    a =>
      !search ||
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground" style={{ fontSize: "1.5rem", fontWeight: 800 }}>Painel da Clínica</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Segunda-feira, 9 de junho de 2026</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white transition-all hover:opacity-90 active:scale-95"
          style={{ fontWeight: 700, fontSize: "0.875rem" }}
        >
          <Plus className="w-4 h-4" />
          Adicionar horário
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Consultas hoje" value={stats.total.toString()} change="+12%" positive color="#E8F0F9" iconColor="#1A3A5C" />
        <StatCard icon={CheckCircle} label="Confirmadas" value={stats.confirmed.toString()} change="+8%" positive color="#E8F8F2" iconColor="#27AE60" />
        <StatCard icon={XCircle} label="Faltas / Canceladas" value={stats.missed.toString()} change="-33%" positive color="#FDEDEC" iconColor="#E74C3C" />
        <StatCard icon={Clock} label="Horários livres" value={stats.free.toString()} change="+2" positive color="#FFF8E1" iconColor="#F39C12" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Weekly bar */}
        <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: "1rem" }}>Consultas da semana</h2>
              <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>Confirmadas vs Faltas</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all" style={{ fontSize: "0.8125rem" }}>
              <Filter className="w-3.5 h-3.5" /> Esta semana
            </button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} barGap={4} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7A8D" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7A8D" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13 }} cursor={{ fill: "rgba(26,58,92,0.04)" }} />
              <Bar dataKey="consultas" name="Consultas" fill="#1A3A5C" radius={[6, 6, 0, 0]} maxBarSize={28} />
              <Bar dataKey="faltas" name="Faltas" fill="#FDEDEC" radius={[6, 6, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Specialty pie */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>Por especialidade</h2>
          <p className="text-muted-foreground mb-3" style={{ fontSize: "0.8125rem" }}>Distribuição mensal</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={specialtyData} cx="50%" cy="50%" outerRadius={60} innerRadius={30} dataKey="value" paddingAngle={3}>
                {specialtyData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {specialtyData.slice(0, 4).map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{d.name}</span>
                </div>
                <span className="text-foreground" style={{ fontWeight: 700, fontSize: "0.75rem" }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden flex-1 min-h-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: "1rem" }}>Agendamentos de hoje</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar paciente ou médico..."
                className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                style={{ fontSize: "0.875rem", width: 200 }}
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all" style={{ fontSize: "0.8125rem" }}>
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Horário", "Paciente", "Médico", "Especialidade", "Tipo", "Status", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-primary" style={{ fontWeight: 800, fontSize: "0.9375rem" }}>{appt.time}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-foreground" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{appt.patient}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-foreground" style={{ fontSize: "0.875rem" }}>{appt.doctor}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{appt.specialty}</p>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={appt.type || "Presencial"} /></td>
                  <td className="px-5 py-3.5"><StatusBadge status={appt.status} /></td>
                  <td className="px-5 py-3.5">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add slot modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.125rem" }}>Adicionar horário disponível</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors">✕</button>
            </div>
            {[
              { label: "Médico", placeholder: "Selecionar médico" },
              { label: "Data", placeholder: "DD/MM/AAAA" },
              { label: "Horário de início", placeholder: "HH:MM" },
              { label: "Duração", placeholder: "30 minutos" },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{f.label}</label>
                <input placeholder={f.placeholder} className="w-full bg-muted rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground border border-border focus:border-primary transition-colors" style={{ fontSize: "0.9375rem" }} />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors" style={{ fontWeight: 600 }}>Cancelar</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-all" style={{ fontWeight: 700 }}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
