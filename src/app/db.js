// Banco de Dados Simulado no LocalStorage

const DEFAULT_PROFILE = {
  name: "Ana Paula Souza",
  email: "ana.paula@saudetotal.com",
  phone: "(11) 99999-9999",
  cpf: "123.456.789-00",
  dob: "15/08/1995"
};

const DEFAULT_APPOINTMENTS = [
  { id: 1, doctor: "Dr. Carlos Mendes", specialty: "Cardiologista", date: "Seg, 15/06", time: "09:30", status: "Confirmada", reminder: true, avatar: "CM", color: "#E3F2FD" },
  { id: 2, doctor: "Dra. Mariana Costa", specialty: "Clínica Geral", date: "Qui, 12/06", time: "14:00", status: "Confirmada", reminder: false, avatar: "MC", color: "#FCE4EC" },
  { id: 3, doctor: "Dra. Fernanda Lima", specialty: "Dermatologista", date: "Seg, 16/06", time: "16:00", status: "Pendente", reminder: false, avatar: "FL", color: "#F3E5F5" },
];

const DEFAULT_TODAY_APPOINTMENTS = [
  { id: 101, time: "08:00", patient: "Ana Paula Souza", doctor: "Dra. Mariana Costa", specialty: "Clínico Geral", status: "Confirmada", type: "Presencial" },
  { id: 102, time: "08:30", patient: "João Pedro", doctor: "Dr. Carlos Mendes", specialty: "Cardiologista", status: "Em atendimento", type: "Presencial" },
  { id: 103, time: "09:00", patient: "Maria Silva", doctor: "Dra. Fernanda Lima", specialty: "Dermatologista", status: "Confirmada", type: "Presencial" },
  { id: 104, time: "09:30", patient: "Carlos Souza", doctor: "Dr. Paulo Santos", specialty: "Ortopedista", status: "Pendente", type: "Telemedicina" },
  { id: 105, time: "10:00", patient: "Lucia Ferreira", doctor: "Dra. Juliana Rocha", specialty: "Psicóloga", status: "Confirmada", type: "Telemedicina" },
  { id: 106, time: "10:30", patient: "Roberto Alves", doctor: "Dr. André Moura", specialty: "Ginecologista", status: "Faltou", type: "Presencial" },
  { id: 107, time: "11:00", patient: "Sandra Costa", doctor: "Dra. Mariana Costa", specialty: "Clínico Geral", status: "Confirmada", type: "Presencial" },
  { id: 108, time: "14:00", patient: "Marcos Lima", doctor: "Dr. Carlos Mendes", specialty: "Cardiologista", status: "Aguardando", type: "Presencial" },
  { id: 109, time: "14:30", patient: "Patrícia Nunes", doctor: "Dra. Fernanda Lima", specialty: "Dermatologista", status: "Aguardando", type: "Presencial" },
  { id: 110, time: "15:00", patient: "Diego Moura", doctor: "Dra. Juliana Rocha", specialty: "Psicóloga", status: "Aguardando", type: "Telemedicina" },
];

const DEFAULT_DOCTORS = [
  { id: 1, name: "Dra. Mariana Costa", crm: "CRM-SP 123456", specialty: "Clínico Geral",   days: "Seg, Ter, Qua", start: "08:00", end: "14:00", active: true,  avatar: "MC", color: "#FCE4EC" },
  { id: 2, name: "Dr. Carlos Mendes",  crm: "CRM-SP 234567", specialty: "Cardiologista",   days: "Ter, Qui, Sex", start: "09:00", end: "17:00", active: true,  avatar: "CM", color: "#E3F2FD" },
  { id: 3, name: "Dra. Fernanda Lima", crm: "CRM-SP 345678", specialty: "Dermatologista",  days: "Seg, Qua, Sex", start: "10:00", end: "18:00", active: true,  avatar: "FL", color: "#F3E5F5" },
  { id: 4, name: "Dra. Juliana Rocha", crm: "CRM-SP 456789", specialty: "Psicóloga",       days: "Seg a Sex",     start: "08:00", end: "16:00", active: true,  avatar: "JR", color: "#E0F2F1" },
  { id: 5, name: "Dr. Paulo Santos",   crm: "CRM-SP 567890", specialty: "Ortopedista",     days: "Ter, Qui",      start: "07:00", end: "13:00", active: false, avatar: "PS", color: "#FFF3E0" },
  { id: 6, name: "Dr. André Moura",    crm: "CRM-SP 678901", specialty: "Ginecologista",   days: "Seg, Qua",      start: "14:00", end: "19:00", active: true,  avatar: "AM", color: "#FFF8E1" },
];

const DEFAULT_EVENTS = [
  { id: 1,  doctor: "Dra. Mariana Costa", patient: "Ana Paula Souza", specialty: "Clínico Geral",  day: 0, startHour: 8,  duration: 1, type: "Presencial" },
  { id: 2,  doctor: "Dr. Carlos Mendes",  patient: "João Pedro",       specialty: "Cardiologia",     day: 0, startHour: 9,  duration: 1, type: "Presencial" },
  { id: 3,  doctor: "Dra. Fernanda Lima", patient: "Maria Silva",      specialty: "Dermatologia",    day: 0, startHour: 10, duration: 1, type: "Presencial" },
  { id: 4,  doctor: "Dra. Juliana Rocha", patient: "Lucia Ferreira",   specialty: "Psicologia",      day: 0, startHour: 14, duration: 1, type: "Telemedicina" },
  { id: 5,  doctor: "Dr. Paulo Santos",   patient: "Carlos Souza",     specialty: "Ortopedia",       day: 0, startHour: 9,  duration: 1, type: "Telemedicina" },
  { id: 6,  doctor: "Dr. Carlos Mendes",  patient: "Roberto Alves",    specialty: "Cardiologia",     day: 1, startHour: 10, duration: 1, type: "Presencial" },
  { id: 7,  doctor: "Dra. Mariana Costa", patient: "Sandra Costa",     specialty: "Clínico Geral",  day: 1, startHour: 8,  duration: 1, type: "Presencial" },
  { id: 8,  doctor: "Dra. Fernanda Lima", patient: "Patrícia Nunes",   specialty: "Dermatologia",    day: 1, startHour: 14, duration: 1, type: "Presencial" },
  { id: 9,  doctor: "Dr. André Moura",    patient: "Diego Moura",      specialty: "Ginecologia",     day: 2, startHour: 11, duration: 1, type: "Presencial" },
  { id: 10, doctor: "Dra. Juliana Rocha", patient: "Marcos Lima",      specialty: "Psicologia",      day: 2, startHour: 15, duration: 1, type: "Telemedicina" },
  { id: 11, doctor: "Dr. Paulo Santos",   patient: "Fernanda Alves",   specialty: "Ortopedia",       day: 3, startHour: 8,  duration: 1, type: "Presencial" },
  { id: 12, doctor: "Dr. Carlos Mendes",  patient: "Ricardo Gomes",    specialty: "Cardiologia",     day: 3, startHour: 13, duration: 1, type: "Presencial" },
  { id: 13, doctor: "Dra. Mariana Costa", patient: "Camila Torres",    specialty: "Clínico Geral",  day: 4, startHour: 9,  duration: 1, type: "Presencial" },
  { id: 14, doctor: "Dr. André Moura",    patient: "Beatriz Souza",    specialty: "Ginecologia",     day: 4, startHour: 16, duration: 1, type: "Presencial" },
  { id: 15, doctor: "Dra. Fernanda Lima", patient: "Eduardo Lima",     specialty: "Dermatologia",    day: 5, startHour: 10, duration: 1, type: "Presencial" },
];

const DEFAULT_USERS = [
  { id: 1, name: "Ana Paula Souza",  email: "ana.paula@saudetotal.com", role: "Secretária",    active: true },
  { id: 2, name: "Roberto Carvalho", email: "roberto@saudetotal.com",   role: "Administrador", active: true },
  { id: 3, name: "Juliana Melo",     email: "juliana.m@saudetotal.com", role: "Secretária",    active: false },
];

export const db = {
  init() {
    if (!localStorage.getItem("medagenda_initialized")) {
      localStorage.setItem("medagenda_profile", JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem("medagenda_appointments", JSON.stringify(DEFAULT_APPOINTMENTS));
      localStorage.setItem("medagenda_today", JSON.stringify(DEFAULT_TODAY_APPOINTMENTS));
      localStorage.setItem("medagenda_doctors", JSON.stringify(DEFAULT_DOCTORS));
      localStorage.setItem("medagenda_events", JSON.stringify(DEFAULT_EVENTS));
      localStorage.setItem("medagenda_users", JSON.stringify(DEFAULT_USERS));
      localStorage.setItem("medagenda_initialized", "true");
    }
  },

  // ── Perfil do Paciente ──
  getProfile() {
    this.init();
    return JSON.parse(localStorage.getItem("medagenda_profile"));
  },

  saveProfile(profile) {
    this.init();
    localStorage.setItem("medagenda_profile", JSON.stringify(profile));
  },

  // ── Consultas do Paciente (Celular) ──
  getAppointments() {
    this.init();
    return JSON.parse(localStorage.getItem("medagenda_appointments"));
  },

  addAppointment(appt) {
    this.init();
    const appts = this.getAppointments();
    const profile = this.getProfile();

    const newAppt = {
      id: Date.now(),
      doctor: appt.doctor.name,
      specialty: appt.doctor.specialty,
      date: appt.date,
      time: appt.time,
      status: "Confirmada",
      reminder: true,
      avatar: appt.doctor.avatar,
      color: appt.doctor.color
    };
    appts.unshift(newAppt);
    localStorage.setItem("medagenda_appointments", JSON.stringify(appts));

    // Adiciona na lista da clínica do dia (today)
    const today = this.getTodayAppointments();
    const newToday = {
      id: Date.now() + 1,
      time: appt.time,
      patient: profile.name,
      doctor: appt.doctor.name,
      specialty: appt.doctor.specialty,
      status: "Confirmada",
      type: "Presencial"
    };
    today.unshift(newToday);
    localStorage.setItem("medagenda_today", JSON.stringify(today));

    // Adiciona no calendário semanal (events)
    // Converte o dia literal para índice de 0 a 5
    const dayMap = { "Seg": 0, "Ter": 1, "Qua": 2, "Qui": 3, "Sex": 4, "Sáb": 5 };
    const dayPrefix = appt.date.split(",")[0].trim();
    const dayIndex = dayMap[dayPrefix] !== undefined ? dayMap[dayPrefix] : 0;
    const hourInt = parseInt(appt.time.split(":")[0]) || 9;

    const events = this.getEvents();
    const newEvent = {
      id: Date.now() + 2,
      doctor: appt.doctor.name,
      patient: profile.name,
      specialty: appt.doctor.specialty,
      day: dayIndex,
      startHour: hourInt,
      duration: 1,
      type: "Presencial"
    };
    events.push(newEvent);
    localStorage.setItem("medagenda_events", JSON.stringify(events));

    return newAppt;
  },

  cancelAppointment(id) {
    this.init();
    let appts = this.getAppointments();
    const target = appts.find(a => a.id === id);
    if (!target) return;

    appts = appts.map(a => a.id === id ? { ...a, status: "Cancelada" } : a);
    localStorage.setItem("medagenda_appointments", JSON.stringify(appts));

    // @ts-ignore
    let today = this.getTodayAppointments();
    today = today.map(a => (a.doctor === target.doctor && a.time === target.time) ? { ...a, status: "Faltou" } : a);
    localStorage.setItem("medagenda_today", JSON.stringify(today));
  },

  // ── Consultas da Clínica (Dashboard) ──
  getTodayAppointments() {
    this.init();
    return JSON.parse(localStorage.getItem("medagenda_today"));
  },

  saveTodayAppointments(list) {
    this.init();
    localStorage.setItem("medagenda_today", JSON.stringify(list));
  },

  // ── Médicos da Clínica ──
  getDoctors() {
    this.init();
    return JSON.parse(localStorage.getItem("medagenda_doctors"));
  },

  saveDoctors(list) {
    this.init();
    localStorage.setItem("medagenda_doctors", JSON.stringify(list));
  },

  // ── Eventos do Calendário da Clínica ──
  getEvents() {
    this.init();
    return JSON.parse(localStorage.getItem("medagenda_events"));
  },

  saveEvents(events) {
    this.init();
    localStorage.setItem("medagenda_events", JSON.stringify(events));
  },

  // ── Usuários do Sistema ──
  getUsers() {
    this.init();
    const stored = localStorage.getItem("medagenda_users");
    return stored ? JSON.parse(stored) : DEFAULT_USERS;
  },

  saveUsers(list) {
    this.init();
    localStorage.setItem("medagenda_users", JSON.stringify(list));
  }
};
