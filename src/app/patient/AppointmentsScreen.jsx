import { useNavigate } from "react-router";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "../db";

const statusConfig = {
  "Confirmada": { bg: "#E8F8F2", text: "#27AE60" },
  "Pendente":   { bg: "#FFF8E1", text: "#F39C12" },
  "Cancelada":  { bg: "#FDEDEC", text: "#E74C3C" },
};

export function AppointmentsScreen() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    setAppointments(db.getAppointments());
  }, []);

  const handleCancel = (id) => {
    db.cancelAppointment(id);
    setAppointments(db.getAppointments());
  };

  const upcoming = appointments.filter(a => a.status !== "Cancelada");
  const past = appointments.filter(a => a.status === "Cancelada");
  const items = tab === "upcoming" ? upcoming : past;

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-6 rounded-b-[2rem]">
        <h1 className="text-white" style={{ fontSize: "1.375rem", fontWeight: 800 }}>Minhas consultas</h1>
        <p className="text-white/60" style={{ fontSize: "0.875rem", marginTop: 4 }}>{upcoming.length} consultas agendadas</p>
        <div className="flex gap-2 mt-5">
          {["upcoming", "past"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 rounded-xl transition-all"
              style={{
                background: tab === t ? "white" : "rgba(255,255,255,0.15)",
                color: tab === t ? "var(--primary)" : "rgba(255,255,255,0.7)",
                fontWeight: 700, fontSize: "0.875rem",
              }}
            >
              {t === "upcoming" ? "Próximas" : "Histórico"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground" style={{ fontSize: "0.9375rem" }}>
            Nenhuma consulta encontrada nesta aba.
          </div>
        ) : (
          items.map(appt => {
            const sc = statusConfig[appt.status] || { bg: "#EEF2F7", text: "#6B7A8D" };
            return (
              <div key={appt.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                {appt.reminder && appt.status !== "Cancelada" && (
                  <div className="flex items-center gap-2 bg-amber-50 border-b border-amber-100 px-4 py-2">
                    <Bell className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-700" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Lembrete: consulta para {appt.date} às {appt.time}</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: appt.color || "#EEF2F7" }}>
                      <span className="text-primary" style={{ fontWeight: 800, fontSize: "0.875rem" }}>{appt.avatar || "MC"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-foreground" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{appt.doctor}</h3>
                          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{appt.specialty}</p>
                        </div>
                        <span className="flex-shrink-0 px-2.5 py-1 rounded-xl" style={{ background: sc.bg, color: sc.text, fontSize: "0.6875rem", fontWeight: 700 }}>
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-primary mt-1.5" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>📅 {appt.date} às {appt.time}</p>
                    </div>
                  </div>
                  {appt.status !== "Cancelada" && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => navigate("/app/buscar")} className="flex-1 py-2.5 rounded-xl border border-primary/30 text-primary transition-all active:scale-95" style={{ fontWeight: 600, fontSize: "0.8125rem" }}>
                        Remarcar
                      </button>
                      <button onClick={() => handleCancel(appt.id)} className="flex-1 py-2.5 rounded-xl border border-destructive/30 text-destructive transition-all active:scale-95" style={{ fontWeight: 600, fontSize: "0.8125rem" }}>
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
