import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, MapPin, Calendar, Clock, User, Bell } from "lucide-react";
import { db } from "../db";

export function ConfirmScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const b = state?.booking || {
    doctor: { name: "Dra. Mariana Costa", specialty: "Clínica Geral", clinic: "Clínica Saúde Total", avatar: "MC", color: "#FCE4EC" },
    date: "Seg, 09/06",
    time: "14:00",
  };

  const handleConfirm = () => {
    db.addAppointment(b);
    navigate("/app/sucesso", { state: { booking: b } });
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-[2rem]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/70 mb-4">
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontSize: "0.875rem" }}>Agenda</span>
        </button>
        <h1 className="text-white" style={{ fontSize: "1.375rem", fontWeight: 800 }}>Confirmar consulta</h1>
        <p className="text-white/60" style={{ fontSize: "0.875rem", marginTop: 4 }}>Revise os detalhes antes de confirmar</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 pb-44">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: b.doctor.color }}>
              <span className="text-primary" style={{ fontWeight: 800, fontSize: "1.125rem" }}>{b.doctor.avatar}</span>
            </div>
            <div>
              <h3 className="text-foreground" style={{ fontWeight: 700, fontSize: "1rem" }}>{b.doctor.name}</h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{b.doctor.specialty}</p>
            </div>
          </div>
          {[
            { icon: Calendar, label: "Data", value: b.date },
            { icon: Clock, label: "Horário", value: b.time },
            { icon: MapPin, label: "Local", value: b.doctor.clinic || "Clínica Saúde Total" },
            { icon: User, label: "Tipo", value: "Consulta presencial" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{label}</p>
                <p className="text-foreground" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-secondary border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-primary" style={{ fontWeight: 700, fontSize: "0.875rem" }}>Lembrete automático</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.5, marginTop: 2 }}>
              Você receberá um lembrete 24 horas antes e 1 hora antes da consulta.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-amber-800" style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
            <strong>Política de cancelamento:</strong> Cancele com pelo menos 4 horas de antecedência para não registrar falta.
          </p>
        </div>
      </div>

      <div className="absolute bottom-20 left-0 right-0 px-5 space-y-2 pb-2">
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-2xl bg-primary text-white transition-all active:scale-95 shadow-lg"
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          Confirmar consulta
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3.5 rounded-2xl border border-border bg-card text-foreground transition-all active:scale-95"
          style={{ fontWeight: 600, fontSize: "0.9375rem" }}
        >
          Alterar horário
        </button>
      </div>
    </div>
  );
}
