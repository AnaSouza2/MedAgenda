import { useNavigate } from "react-router";
import { Search, Star, ChevronLeft, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "../db";

const filters = ["Todos", "Clínico", "Cardio", "Dermato", "Ortopedia", "Psicólogo"];

export function SearchScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const dbDocs = db.getDoctors()
      .filter(d => d.active)
      .map(d => ({
        ...d,
        clinic: "Clínica Saúde Total",
        rating: (4.7 + (d.id * 7) % 4 * 0.1).toFixed(1),
        reviews: 30 + (d.id * 17) % 100,
        nextSlot: d.days.split(",")[0] + ", 14:00"
      }));
    setDoctors(dbDocs);
  }, []);

  const filtered = doctors.filter(d => {
    const matchesQuery = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === "Todos" || 
      d.specialty.toLowerCase().includes(activeFilter.toLowerCase()) ||
      (activeFilter === "Clínico" && d.specialty.toLowerCase().includes("clínico"));
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-5 rounded-b-[2rem]">
        <button onClick={() => navigate("/app")} className="flex items-center gap-1 text-white/70 mb-4">
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontSize: "0.875rem" }}>Início</span>
        </button>
        <h1 className="text-white mb-4" style={{ fontSize: "1.375rem", fontWeight: 800 }}>Buscar médicos</h1>
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Médico ou especialidade..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            style={{ fontSize: "0.9375rem" }}
          />
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-2 rounded-xl transition-all active:scale-95"
              style={{
                fontSize: "0.8125rem", fontWeight: 600,
                background: activeFilter === f ? "var(--primary)" : "var(--card)",
                color: activeFilter === f ? "white" : "var(--muted-foreground)",
                border: activeFilter === f ? "none" : "1px solid var(--border)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 space-y-3 pb-6">
        <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{filtered.length} médicos encontrados</p>
        {filtered.map(doc => (
          <div key={doc.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: doc.color }}>
                <span className="text-primary" style={{ fontWeight: 800, fontSize: "1rem" }}>{doc.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground truncate" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{doc.name}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{doc.specialty}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate" style={{ fontSize: "0.75rem" }}>{doc.clinic}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-foreground" style={{ fontWeight: 700, fontSize: "0.8125rem" }}>{doc.rating}</span>
                    <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>({doc.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-accent" style={{ fontWeight: 600, fontSize: "0.75rem" }}>{doc.nextSlot}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/app/agenda", { state: { doctor: doc } })}
              className="w-full mt-3 py-3 rounded-xl bg-secondary text-primary transition-all active:scale-95"
              style={{ fontWeight: 700, fontSize: "0.875rem" }}
            >
              Ver agenda
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
