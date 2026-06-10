import { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import {
  HOURS, WEEK_DAYS_LABELS, DOCTOR_COLORS, ALL_DOCTORS
} from "../data/clinicData";
import { db } from "../../db";

export function ScheduleSection() {
  const [view, setView] = useState("week");
  const [selectedDay, setSelectedDay] = useState(0);
  const [filterDoctor, setFilterDoctor] = useState("Todos");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ doctor: "", patient: "", day: "0", startHour: "8", type: "Presencial" });

  useEffect(() => {
    setEvents(db.getEvents());
  }, []);

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  const weekDates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const visibleEvents = events.filter(e =>
    (filterDoctor === "Todos" || e.doctor === filterDoctor) &&
    (view === "week" || e.day === selectedDay)
  );

  const getEventsForCell = (day, hour) =>
    visibleEvents.filter(e => e.day === day && e.startHour === hour);

  const addEvent = () => {
    const ev = {
      id: Date.now(),
      doctor: newEvent.doctor || ALL_DOCTORS[0],
      patient: newEvent.patient || "Novo Paciente",
      specialty: "Clínico Geral",
      day: Number(newEvent.day),
      startHour: Number(newEvent.startHour),
      duration: 1,
      type: newEvent.type,
    };
    const updated = [...events, ev];
    setEvents(updated);
    db.saveEvents(updated);
    setShowAddModal(false);
    setNewEvent({ doctor: "", patient: "", day: "0", startHour: "8", type: "Presencial" });
  };

  const removeEvent = (id) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    db.saveEvents(updated);
    setSelectedEvent(null);
  };

  const displayDayIndices = view === "week" ? [0, 1, 2, 3, 4, 5] : [selectedDay];
  const displayDays = view === "week" ? WEEK_DAYS_LABELS : [WEEK_DAYS_LABELS[selectedDay]];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Agenda da Clínica</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
            Semana de {weekDates[0].getDate()}/{(weekDates[0].getMonth() + 1).toString().padStart(2, "0")} a {weekDates[5].getDate()}/{(weekDates[5].getMonth() + 1).toString().padStart(2, "0")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterDoctor}
            onChange={e => setFilterDoctor(e.target.value)}
            className="bg-muted border border-border rounded-xl px-3 py-2 text-foreground outline-none"
            style={{ fontSize: "0.875rem" }}
          >
            <option>Todos</option>
            {ALL_DOCTORS.map(d => <option key={d}>{d}</option>)}
          </select>
          <div className="flex bg-muted rounded-xl p-1">
            {["week", "day"].map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-lg transition-all"
                style={{ background: view === v ? "var(--card)" : "transparent", color: view === v ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: view === v ? 700 : 500, fontSize: "0.875rem", boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}
              >
                {v === "week" ? "Semana" : "Dia"}
              </button>
            ))}
          </div>
          {view === "day" && (
            <div className="flex items-center gap-1">
              <button onClick={() => setSelectedDay(d => Math.max(0, d - 1))} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-border transition-colors">
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <span className="text-foreground px-2" style={{ fontWeight: 700, fontSize: "0.875rem" }}>{WEEK_DAYS_LABELS[selectedDay]}</span>
              <button onClick={() => setSelectedDay(d => Math.min(5, d + 1))} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-border transition-colors">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:opacity-90 transition-all"
            style={{ fontWeight: 700, fontSize: "0.875rem" }}
          >
            <Plus className="w-4 h-4" /> Novo horário
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[700px]" style={{ display: "grid", gridTemplateColumns: `64px repeat(${displayDayIndices.length}, 1fr)` }}>
          {/* Header row */}
          <div className="sticky top-0 z-10 bg-card border-b border-r border-border" style={{ height: 52 }} />
          {displayDayIndices.map((di, i) => {
            const date = weekDates[di];
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div
                key={di}
                onClick={() => { if (view === "week") { setView("day"); setSelectedDay(di); } }}
                className="sticky top-0 z-10 bg-card border-b border-r border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                style={{ height: 52 }}
              >
                <span className="text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" }}>{displayDays[i]}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${isToday ? "bg-primary" : ""}`}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: isToday ? "white" : "var(--foreground)" }}>{date.getDate()}</span>
                </div>
              </div>
            );
          })}
          {/* Hour rows */}
          {HOURS.map(hour => {
            const hourNum = parseInt(hour);
            return [
              <div key={`label-${hour}`} className="border-b border-r border-border flex items-start justify-end pr-2 pt-1" style={{ height: 72 }}>
                <span className="text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{hour}</span>
              </div>,
              ...displayDayIndices.map(di => {
                const cellEvents = getEventsForCell(di, hourNum);
                return (
                  <div key={`cell-${di}-${hour}`} className="border-b border-r border-border relative" style={{ height: 72, padding: "3px 4px" }}>
                    {cellEvents.map(ev => {
                      const colors = DOCTOR_COLORS[ev.doctor] || { bg: "#F5F5F5", border: "#BDBDBD", text: "#333" };
                      return (
                        <button
                          key={ev.id}
                          onClick={() => setSelectedEvent(ev)}
                          className="w-full h-full rounded-lg border-l-4 px-2 py-1 text-left hover:opacity-80 transition-all overflow-hidden"
                          style={{ background: colors.bg, borderLeftColor: colors.border }}
                        >
                          <p style={{ fontWeight: 700, fontSize: "0.6875rem", color: colors.text, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.patient}</p>
                          <p style={{ fontSize: "0.625rem", color: colors.text, opacity: 0.75, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Dr(a). {ev.doctor.split(" ")[0]} · {ev.specialty}</p>
                        </button>
                      );
                    })}
                  </div>
                );
              }),
            ];
          })}
        </div>
      </div>

      {/* Doctor legend */}
      <div className="flex items-center gap-4 px-6 py-3 border-t border-border bg-card flex-shrink-0 overflow-x-auto">
        <span className="text-muted-foreground flex-shrink-0" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Médicos:</span>
        {ALL_DOCTORS.map(doc => {
          const colors = DOCTOR_COLORS[doc];
          return (
            <div key={doc} className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-3 h-3 rounded-sm border-l-2" style={{ background: colors.bg, borderLeftColor: colors.border }} />
              <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Dr(a). {doc}</span>
            </div>
          );
        })}
      </div>

      {/* Event detail modal */}
      {selectedEvent && (() => {
        const colors = DOCTOR_COLORS[selectedEvent.doctor] || { bg: "#F5F5F5", border: "#BDBDBD", text: "#333" };
        return (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
            <div className="bg-card rounded-3xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border-l-4 flex items-center justify-center" style={{ background: colors.bg, borderLeftColor: colors.border }}>
                    <span style={{ fontSize: "1.25rem" }}>{selectedEvent.type === "Telemedicina" ? "💻" : "🏥"}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--foreground)" }}>{selectedEvent.patient}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{selectedEvent.specialty}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors">✕</button>
              </div>
              {[
                { label: "Médico", value: `Dr(a). ${selectedEvent.doctor}` },
                { label: "Dia", value: WEEK_DAYS_LABELS[selectedEvent.day] },
                { label: "Horário", value: `${selectedEvent.startHour.toString().padStart(2, "0")}:00 — ${(selectedEvent.startHour + 1).toString().padStart(2, "0")}:00` },
                { label: "Tipo", value: selectedEvent.type },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{label}</span>
                  <span className="text-foreground" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{value}</span>
                </div>
              ))}
              <button
                onClick={() => removeEvent(selectedEvent.id)}
                className="w-full mt-4 py-2.5 rounded-xl border border-destructive/30 text-destructive flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors"
                style={{ fontWeight: 600, fontSize: "0.875rem" }}
              >
                <Trash2 className="w-4 h-4" /> Remover consulta
              </button>
            </div>
          </div>
        );
      })()}

      {/* Add event modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.125rem" }}>Adicionar consulta</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors">✕</button>
            </div>
            <div>
              <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Paciente</label>
              <input
                type="text" placeholder="Nome do paciente"
                value={newEvent.patient}
                onChange={e => setNewEvent(prev => ({ ...prev, patient: e.target.value }))}
                className="w-full bg-muted rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground border border-border focus:border-primary transition-colors"
                style={{ fontSize: "0.9375rem" }}
              />
            </div>
            <div>
              <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Médico</label>
              <select value={newEvent.doctor} onChange={e => setNewEvent(prev => ({ ...prev, doctor: e.target.value }))}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground" style={{ fontSize: "0.9375rem" }}>
                {ALL_DOCTORS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Dia</label>
                <select value={newEvent.day} onChange={e => setNewEvent(prev => ({ ...prev, day: e.target.value }))}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground" style={{ fontSize: "0.9375rem" }}>
                  {WEEK_DAYS_LABELS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Horário</label>
                <select value={newEvent.startHour} onChange={e => setNewEvent(prev => ({ ...prev, startHour: e.target.value }))}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground" style={{ fontSize: "0.9375rem" }}>
                  {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(h => <option key={h} value={h}>{h.toString().padStart(2, "0")}:00</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Tipo</label>
              <div className="flex gap-2">
                {["Presencial", "Telemedicina"].map(t => (
                  <button key={t} onClick={() => setNewEvent(prev => ({ ...prev, type: t }))}
                    className="flex-1 py-2.5 rounded-xl border transition-all"
                    style={{ border: newEvent.type === t ? "2px solid var(--primary)" : "1px solid var(--border)", background: newEvent.type === t ? "var(--secondary)" : "transparent", color: newEvent.type === t ? "var(--primary)" : "var(--muted-foreground)", fontWeight: 600, fontSize: "0.875rem" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors" style={{ fontWeight: 600 }}>Cancelar</button>
              <button onClick={addEvent} className="flex-1 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-all" style={{ fontWeight: 700 }}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
