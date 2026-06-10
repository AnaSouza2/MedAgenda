import { Search } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useState, useEffect } from "react";
import { db } from "../../db";

const initialPatients = [
  { name: "Ana Lima", lastVisit: "02/06/2026", nextVisit: "10/06/2026", doctor: "Dra. Mariana Costa", status: "Confirmada" },
  { name: "João Pedro", lastVisit: "28/05/2026", nextVisit: "09/06/2026", doctor: "Dr. Carlos Mendes", status: "Em atendimento" },
  { name: "Maria Silva", lastVisit: "15/05/2026", nextVisit: "09/06/2026", doctor: "Dra. Fernanda Lima", status: "Confirmada" },
  { name: "Carlos Souza", lastVisit: "10/04/2026", nextVisit: "09/06/2026", doctor: "Dr. Paulo Santos", status: "Pendente" },
  { name: "Lucia Ferreira", lastVisit: "01/06/2026", nextVisit: "16/06/2026", doctor: "Dra. Juliana Rocha", status: "Confirmada" },
];

export function PatientsSection() {
  const [search, setSearch] = useState("");
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    const defaultList = [...initialPatients];
    const profile = db.getProfile();
    if (profile && profile.name && !defaultList.some(p => p.name.toLowerCase() === profile.name.toLowerCase())) {
      defaultList.unshift({
        name: profile.name,
        lastVisit: "Nunca",
        nextVisit: "Agendada",
        doctor: "Dra. Mariana Costa",
        status: "Confirmada"
      });
    }
    setPatientList(defaultList);
  }, []);

  const filtered = patientList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">
      <h1 className="text-foreground" style={{ fontSize: "1.5rem", fontWeight: 800 }}>Pacientes</h1>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar paciente..." 
              className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground" 
              style={{ fontSize: "0.875rem", width: 220 }} 
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Paciente", "Última consulta", "Próxima consulta", "Médico", "Status"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary" style={{ fontWeight: 700, fontSize: "0.8125rem" }}>
                      {p.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <span className="text-foreground" style={{ fontWeight: 600 }}>{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground" style={{ fontSize: "0.875rem" }}>{p.lastVisit}</td>
                <td className="px-5 py-4 text-primary" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{p.nextVisit}</td>
                <td className="px-5 py-4 text-muted-foreground" style={{ fontSize: "0.875rem" }}>{p.doctor}</td>
                <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
