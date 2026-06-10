// ─── Status Config ─────────────────────────────────────────────────────────────
export const statusConfig = {
  "Confirmada":      { bg: "#E8F8F2", text: "#27AE60", dot: "#2ECC71" },
  "Em atendimento":  { bg: "#E8F0F9", text: "#1A3A5C", dot: "#1A3A5C" },
  "Pendente":        { bg: "#FFF8E1", text: "#F39C12", dot: "#F39C12" },
  "Faltou":          { bg: "#FDEDEC", text: "#E74C3C", dot: "#E74C3C" },
  "Aguardando":      { bg: "#F5F0FF", text: "#8E44AD", dot: "#9B59B6" },
  "Telemedicina":    { bg: "#E3F2FD", text: "#1565C0", dot: "#1565C0" },
};

// ─── Schedule / Calendar Data ──────────────────────────────────────────────────
export const HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
export const WEEK_DAYS_LABELS = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];

export const DOCTOR_COLORS = {
  "Mariana Costa": { bg: "#FCE4EC", border: "#F48FB1", text: "#880E4F" },
  "Carlos Mendes":  { bg: "#E3F2FD", border: "#90CAF9", text: "#0D47A1" },
  "Fernanda Lima":  { bg: "#F3E5F5", border: "#CE93D8", text: "#4A148C" },
  "Juliana Rocha":  { bg: "#E0F2F1", border: "#80CBC4", text: "#004D40" },
  "Paulo Santos":   { bg: "#FFF3E0", border: "#FFCC80", text: "#E65100" },
  "André Moura":    { bg: "#FFF8E1", border: "#FFE082", text: "#F57F17" },
};

export const ALL_DOCTORS = Object.keys(DOCTOR_COLORS);

// ─── Chart Mock Data ───────────────────────────────────────────────────────────
// Esses dados são apenas para desenhar os gráficos estáticos do Dashboard/Análises
export const weeklyData = [
  { day: "Seg", consultas: 18, faltas: 2 },
  { day: "Ter", consultas: 22, faltas: 1 },
  { day: "Qua", consultas: 15, faltas: 3 },
  { day: "Qui", consultas: 25, faltas: 0 },
  { day: "Sex", consultas: 20, faltas: 2 },
  { day: "Sáb", consultas: 8, faltas: 1 },
];

export const monthlyTrend = [
  { month: "Jan", value: 120 },
  { month: "Fev", value: 145 },
  { month: "Mar", value: 160 },
  { month: "Abr", value: 132 },
  { month: "Mai", value: 178 },
  { month: "Jun", value: 195 },
];

export const specialtyData = [
  { name: "Clínico Geral", value: 87, color: "#1A3A5C" },
  { name: "Cardiologia", value: 64, color: "#2ECC71" },
  { name: "Dermatologia", value: 58, color: "#3498DB" },
  { name: "Psicologia", value: 45, color: "#9B59B6" },
  { name: "Ortopedia", value: 38, color: "#E67E22" },
];

// ─── Navigation ────────────────────────────────────────────────────────────────
export const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "analytics", label: "Análise" },
  { id: "patients",  label: "Pacientes" },
  { id: "schedule",  label: "Agenda" },
  { id: "settings",  label: "Configurações" },
];

export const clinicRoutes = {
  dashboard: "/clinica",
  analytics: "/clinica/analise",
  patients:  "/clinica/pacientes",
  schedule:  "/clinica/agenda",
  settings:  "/clinica/configuracoes",
};
