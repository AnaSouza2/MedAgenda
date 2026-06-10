import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, Star, MapPin } from "lucide-react";
import { useState } from "react";

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const today = new Date();

const weekDays = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return { label: days[d.getDay()], date: d.getDate() };
});

const timeSlots = {
  0: ["08:00", "09:30", "14:00", "16:30"],
  1: ["10:00", "11:00", "15:00"],
  2: ["08:30", "09:00", "13:30", "17:00"],
  3: ["09:00", "14:30"],
  4: ["08:00", "10:30", "14:00", "16:00"],
  5: ["11:00", "15:30"],
  6: [],
};

export function ScheduleScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const doctor = state?.doctor;

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  const doc = doctor || {
    name: "Dra. Mariana Costa", specialty: "Clínica Geral", clinic: "Clínica Saúde Total",
    rating: 4.9, reviews: 128, avatar: "MC", color: "#FCE4EC",
  };

  const slots = timeSlots[selectedDay] || [];

  const handleConfirm = () => {
    if (!selectedTime) return;
    const day = weekDays[selectedDay];
    navigate("/app/confirmar", {
      state: {
        booking: {
          doctor: doc,
          date: `${day.label}, ${day.date}/${(today.getMonth() + 1).toString().padStart(2, "0")}`,
          time: selectedTime,
        },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-6 rounded-b-[2rem]">
        <button onClick={() => navigate("/app/buscar")} className="flex items-center gap-1 text-white/70 mb-4">
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontSize: "0.875rem" }}>Busca</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: doc.color || "#FCE4EC" }}>
            <span className="text-primary" style={{ fontWeight: 800, fontSize: "1.125rem" }}>{doc.avatar}</span>
          </div>
          <div>
            <h1 className="text-white" style={{ fontSize: "1.125rem", fontWeight: 800 }}>{doc.name}</h1>
            <p className="text-white/70" style={{ fontSize: "0.875rem" }}>{doc.specialty}</p>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-white" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{doc.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-white/60" />
                <span className="text-white/60" style={{ fontSize: "0.75rem" }}>{doc.clinic}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 pb-28">
        <div>
          <h2 className="text-foreground mb-3" style={{ fontSize: "1rem", fontWeight: 700 }}>Selecione a data</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {weekDays.map((day, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                className="flex-shrink-0 flex flex-col items-center gap-1 w-12 py-3 rounded-2xl transition-all active:scale-95"
                style={{
                  background: selectedDay === i ? "var(--primary)" : "var(--card)",
                  border: selectedDay === i ? "none" : "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: selectedDay === i ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>{day.label}</span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: selectedDay === i ? "white" : "var(--foreground)" }}>{day.date}</span>
                {(timeSlots[i] || []).length > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedDay === i ? "rgba(255,255,255,0.6)" : "var(--accent)" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-foreground mb-3" style={{ fontSize: "1rem", fontWeight: 700 }}>Horários disponíveis</h2>
          {slots.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <p className="text-4xl mb-2">📅</p>
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Nenhum horário disponível neste dia</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className="py-3.5 rounded-2xl transition-all active:scale-95"
                  style={{
                    background: selectedTime === time ? "var(--primary)" : "white",
                    color: selectedTime === time ? "white" : "var(--foreground)",
                    border: selectedTime === time ? "none" : "1px solid var(--border)",
                    fontWeight: 700, fontSize: "0.9375rem",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-secondary rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🏥</span>
          <div>
            <p className="text-primary" style={{ fontWeight: 700, fontSize: "0.875rem" }}>Consulta presencial</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>Duração estimada: 30 minutos</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-0 right-0 px-5 pb-2">
        <button
          onClick={handleConfirm}
          disabled={!selectedTime}
          className="w-full py-4 rounded-2xl bg-primary text-white transition-all active:scale-95 disabled:opacity-40 shadow-lg"
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          {selectedTime ? `Confirmar agendamento — ${selectedTime}` : "Selecione um horário"}
        </button>
      </div>
    </div>
  );
}
