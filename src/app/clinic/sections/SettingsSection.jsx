import { useState, useEffect } from "react";
import {
  Building2, Bell, Users, UserCog, Globe,
  MapPin, Phone, Mail, Lock, Clock,
  Smartphone, XCircle, CheckCircle, BarChart2,
  Plus, Edit3, Trash2, Calendar, ToggleLeft, ToggleRight, Save,
} from "lucide-react";
import { db } from "../../db";

const settingsTabs = [
  { id: "clinic",         icon: Building2,  label: "Clínica"       },
  { id: "notifications",  icon: Bell,       label: "Notificações"  },
  { id: "doctors",        icon: Users,      label: "Médicos"       },
  { id: "users",          icon: UserCog,    label: "Usuários"      },
  { id: "integrations",   icon: Globe,      label: "Integrações"   },
];

function Toggle({ value, onChange }) {
  return (
    <button onClick={onChange} className="transition-all">
      {value
        ? <ToggleRight className="w-8 h-8 text-primary" />
        : <ToggleLeft className="w-8 h-8 text-muted-foreground" />}
    </button>
  );
}

const DOCTOR_PRESET_COLORS = [
  { name: "Rosa", value: "#FCE4EC" },
  { name: "Azul", value: "#E3F2FD" },
  { name: "Roxo", value: "#F3E5F5" },
  { name: "Verde Água", value: "#E0F2F1" },
  { name: "Laranja", value: "#FFF3E0" },
  { name: "Amarelo", value: "#FFF8E1" },
  { name: "Verde", value: "#E8F5E9" },
  { name: "Lilás", value: "#EDE7F6" },
  { name: "Índigo", value: "#E8EAF6" },
];

export function SettingsSection() {
  const [tab, setTab] = useState("clinic");
  const [saved, setSaved] = useState(false);
  const [clinicInfo, setClinicInfo] = useState({
    name: "Clínica Saúde Total", cnpj: "12.345.678/0001-90",
    address: "Av. Paulista, 1200, Bela Vista, São Paulo – SP",
    phone: "(11) 3456-7890", email: "contato@saudetotal.com.br",
    hoursStart: "08:00", hoursEnd: "18:00",
    workDays: ["Seg", "Ter", "Qua", "Qui", "Sex"],
  });
  const [notifs, setNotifs] = useState({
    emailReminder: true, smsReminder: true, pushReminder: true,
    reminderBefore24h: true, reminderBefore1h: true,
    cancellationAlert: true, newAppointmentAlert: true, dailySummary: false,
  });
  const [doctors, setDoctors] = useState([]);
  const [showDocModal, setShowDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [docForm, setDocForm] = useState({
    title: "Dr.",
    name: "",
    crm: "",
    specialty: "",
    days: [],
    start: "08:00",
    end: "17:00",
    color: "#FCE4EC",
    active: true,
  });
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Secretária",
    active: true,
  });

  useEffect(() => {
    setDoctors(db.getDoctors());
    setUsers(db.getUsers());
  }, []);

  const getInitials = (fullName) => {
    const cleanName = fullName.replace(/^(Dr\.|Dra\.)\s+/, "");
    return cleanName
      .split(" ")
      .filter(Boolean)
      .map(w => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handleAddDocClick = () => {
    setEditingDoc(null);
    setDocForm({
      title: "Dr.",
      name: "",
      crm: "",
      specialty: "",
      days: ["Seg", "Ter", "Qua"],
      start: "08:00",
      end: "17:00",
      color: "#FCE4EC",
      active: true,
    });
    setShowDocModal(true);
  };

  const handleEditDocClick = (doc) => {
    setEditingDoc(doc);
    const titleMatch = doc.name.match(/^(Dr\.|Dra\.)/);
    const title = titleMatch ? titleMatch[0] : "Dr.";
    const cleanName = doc.name.replace(/^(Dr\.|Dra\.)\s+/, "");
    const daysArr = doc.days ? doc.days.split(",").map(d => d.trim()) : [];
    
    setDocForm({
      title: title,
      name: cleanName,
      crm: doc.crm || "",
      specialty: doc.specialty || "",
      days: daysArr,
      start: doc.start || "08:00",
      end: doc.end || "17:00",
      color: doc.color || "#FCE4EC",
      active: doc.active !== undefined ? doc.active : true,
    });
    setShowDocModal(true);
  };

  const handleSaveDoctor = (e) => {
    e.preventDefault();
    if (!docForm.name.trim() || !docForm.crm.trim() || !docForm.specialty.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios (Nome, CRM e Especialidade).");
      return;
    }

    const fullName = `${docForm.title} ${docForm.name.trim()}`;
    const avatar = getInitials(fullName);

    const docData = {
      id: editingDoc ? editingDoc.id : Date.now(),
      name: fullName,
      crm: docForm.crm.trim(),
      specialty: docForm.specialty.trim(),
      days: docForm.days.join(", "),
      start: docForm.start,
      end: docForm.end,
      active: docForm.active,
      avatar: avatar,
      color: docForm.color,
    };

    let updated;
    if (editingDoc) {
      updated = doctors.map(d => d.id === editingDoc.id ? docData : d);
    } else {
      updated = [...doctors, docData];
    }

    setDoctors(updated);
    db.saveDoctors(updated);
    setShowDocModal(false);
    setEditingDoc(null);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDoctorToggle = (id) => {
    const updated = doctors.map(d => d.id === id ? { ...d, active: !d.active } : d);
    setDoctors(updated);
    db.saveDoctors(updated);
  };

  const handleDoctorDelete = (id) => {
    const updated = doctors.filter(d => d.id !== id);
    setDoctors(updated);
    db.saveDoctors(updated);
  };

  const handleUserToggle = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, active: !u.active } : u);
    setUsers(updated);
    db.saveUsers(updated);
  };

  const handleUserDelete = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    db.saveUsers(updated);
  };

  const handleAddUserClick = () => {
    setEditingUser(null);
    setUserForm({
      name: "",
      email: "",
      role: "Secretária",
      active: true,
    });
    setShowUserModal(true);
  };

  const handleEditUserClick = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active !== undefined ? user.active : true,
    });
    setShowUserModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios (Nome e E-mail).");
      return;
    }

    const userData = {
      id: editingUser ? editingUser.id : Date.now(),
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      role: userForm.role,
      active: userForm.active,
    };

    let updated;
    if (editingUser) {
      updated = users.map(u => u.id === editingUser.id ? userData : u);
    } else {
      updated = [...users, userData];
    }

    setUsers(updated);
    db.saveUsers(updated);
    setShowUserModal(false);
    setEditingUser(null);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Settings sidebar */}
      <div className="w-56 flex-shrink-0 border-r border-border bg-card overflow-y-auto">
        <div className="p-4">
          <p className="text-muted-foreground mb-3" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Configurações</p>
          <nav className="space-y-1">
            {settingsTabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                style={{ background: tab === id ? "var(--secondary)" : "transparent", color: tab === id ? "var(--primary)" : "var(--muted-foreground)" }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span style={{ fontWeight: tab === id ? 700 : 500, fontSize: "0.875rem" }}>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Settings content */}
      <div className="flex-1 overflow-y-auto">
        {/* ── Clinic ── */}
        {tab === "clinic" && (
          <div className="p-6 max-w-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Dados da clínica</h2>
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Informações gerais e horário de funcionamento</p>
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:opacity-90 transition-all" style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                <Save className="w-4 h-4" />{saved ? "Salvo!" : "Salvar"}
              </button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <label className="text-foreground mb-3 block" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Logo da clínica</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                  <span className="text-white" style={{ fontWeight: 800, fontSize: "1.25rem" }}>ST</span>
                </div>
                <button className="px-4 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors" style={{ fontSize: "0.875rem" }}>Alterar imagem</button>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <label className="text-foreground block" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Informações gerais</label>
              {[
                { label: "Nome da clínica", key: "name", icon: Building2 },
                { label: "CNPJ", key: "cnpj", icon: Lock },
                { label: "Endereço completo", key: "address", icon: MapPin },
                { label: "Telefone", key: "phone", icon: Phone },
                { label: "E-mail", key: "email", icon: Mail },
              ].map(({ label, key, icon: Icon }) => (
                <div key={key}>
                  <label className="block text-muted-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{label}</label>
                  <div className="flex items-center gap-3 bg-muted border border-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <input
                      value={clinicInfo[key]}
                      onChange={e => setClinicInfo(p => ({ ...p, [key]: e.target.value }))}
                      className="flex-1 bg-transparent outline-none text-foreground"
                      style={{ fontSize: "0.9375rem" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <label className="text-foreground block mb-4" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Horário de funcionamento</label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[{ label: "Abertura", key: "hoursStart" }, { label: "Fechamento", key: "hoursEnd" }].map(f => (
                  <div key={f.key}>
                    <label className="block text-muted-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{f.label}</label>
                    <input type="time" value={clinicInfo[f.key]}
                      onChange={e => setClinicInfo(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground focus:border-primary transition-colors"
                      style={{ fontSize: "0.9375rem" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-muted-foreground mb-2" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Dias de atendimento</label>
                <div className="flex gap-2 flex-wrap">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(day => {
                    const active = clinicInfo.workDays.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => setClinicInfo(p => ({ ...p, workDays: active ? p.workDays.filter(d => d !== day) : [...p.workDays, day] }))}
                        className="px-3 py-1.5 rounded-xl border transition-all"
                        style={{ border: active ? "2px solid var(--primary)" : "1px solid var(--border)", background: active ? "var(--secondary)" : "transparent", color: active ? "var(--primary)" : "var(--muted-foreground)", fontWeight: 600, fontSize: "0.875rem" }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Notifications ── */}
        {tab === "notifications" && (
          <div className="p-6 max-w-2xl space-y-5">
            <div>
              <h2 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Notificações</h2>
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Gerencie alertas e lembretes automáticos</p>
            </div>
            {[
              { title: "Canais de envio", items: [
                { key: "emailReminder", label: "E-mail", sub: "Enviar por e-mail", icon: Mail },
                { key: "smsReminder", label: "SMS", sub: "Mensagem de texto", icon: Smartphone },
                { key: "pushReminder", label: "Push notification", sub: "Notificação no app", icon: Bell },
              ]},
              { title: "Lembretes automáticos", items: [
                { key: "reminderBefore24h", label: "24 horas antes", sub: "Lembrete um dia antes da consulta", icon: Clock },
                { key: "reminderBefore1h", label: "1 hora antes", sub: "Lembrete uma hora antes da consulta", icon: Clock },
              ]},
              { title: "Alertas internos", items: [
                { key: "cancellationAlert", label: "Cancelamentos", sub: "Alerta quando uma consulta é cancelada", icon: XCircle },
                { key: "newAppointmentAlert", label: "Novos agendamentos", sub: "Alerta a cada novo agendamento", icon: CheckCircle },
                { key: "dailySummary", label: "Resumo diário", sub: "E-mail com resumo da agenda às 07:00", icon: BarChart2 },
              ]},
            ].map(group => (
              <div key={group.title} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-border bg-muted/50">
                  <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.875rem" }}>{group.title}</p>
                </div>
                {group.items.map(({ key, label, sub, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0">
                    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{label}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{sub}</p>
                    </div>
                    <Toggle value={notifs[key]} onChange={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── Doctors ── */}
        {tab === "doctors" && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Médicos cadastrados</h2>
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{doctors.filter(d => d.active).length} ativos de {doctors.length} cadastrados</p>
              </div>
              <button onClick={handleAddDocClick} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:opacity-90 transition-all cursor-pointer" style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                <Plus className="w-4 h-4" /> Adicionar médico
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 900 }}>
              {doctors.map(doc => (
                <div key={doc.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: doc.color }}>
                        <span className="text-primary" style={{ fontWeight: 800 }}>{doc.avatar}</span>
                      </div>
                      <div>
                        <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{doc.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{doc.specialty}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{doc.crm}</p>
                      </div>
                    </div>
                    <Toggle value={doc.active} onChange={() => handleDoctorToggle(doc.id)} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{doc.days}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{doc.start} – {doc.end}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEditDocClick(doc)} className="flex-1 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1.5 cursor-pointer" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                      <Edit3 className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button onClick={() => handleDoctorDelete(doc.id)} className="py-2 px-3 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {tab === "users" && (
          <div className="p-6 max-w-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Usuários do sistema</h2>
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Gerencie acessos e permissões</p>
              </div>
              <button onClick={handleAddUserClick} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:opacity-90 transition-all cursor-pointer" style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                <Plus className="w-4 h-4" /> Convidar usuário
              </button>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              {users.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: "0.9375rem" }}>Nenhum usuário cadastrado.</div>
              ) : (
                users.map((user, i) => (
                  <div key={user.id} className={`flex items-center gap-4 px-5 py-4 ${i < users.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary" style={{ fontWeight: 700, fontSize: "0.8125rem" }}>
                        {user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{user.name}</p>
                      <p className="text-muted-foreground truncate" style={{ fontSize: "0.8125rem" }}>{user.email}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-primary bg-secondary flex-shrink-0" style={{ fontSize: "0.75rem", fontWeight: 700 }}>{user.role}</span>
                    <Toggle value={user.active} onChange={() => handleUserToggle(user.id)} />
                    <button onClick={() => handleEditUserClick(user)} className="w-8 h-8 rounded-lg border border-border text-muted-foreground flex items-center justify-center hover:bg-muted transition-colors cursor-pointer" title="Editar">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleUserDelete(user.id)} className="w-8 h-8 rounded-lg border border-destructive/30 text-destructive flex items-center justify-center hover:bg-destructive/5 transition-colors cursor-pointer" title="Excluir">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-foreground mb-4" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Níveis de acesso</p>
              {[
                { role: "Administrador", desc: "Acesso total ao sistema, configurações e relatórios.", color: "#1A3A5C" },
                { role: "Secretária",   desc: "Gerenciar agendamentos, pacientes e agenda da clínica.", color: "#27AE60" },
                { role: "Médico",       desc: "Visualizar própria agenda e dados dos pacientes atendidos.", color: "#8E44AD" },
              ].map(r => (
                <div key={r.role} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: r.color }} />
                  <div>
                    <p className="text-foreground" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{r.role}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Integrations ── */}
        {tab === "integrations" && (
          <div className="p-6 max-w-2xl space-y-5">
            <div>
              <h2 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Integrações</h2>
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Conecte serviços externos ao MedAgenda</p>
            </div>
            {[
              { name: "Google Calendar", desc: "Sincronize a agenda da clínica com o Google Calendar.", logo: "📅", connected: true,  status: "Conectado" },
              { name: "WhatsApp Business", desc: "Envie lembretes e confirmações via WhatsApp.", logo: "💬", connected: true,  status: "Conectado" },
              { name: "Zoom",            desc: "Gere links automáticos para consultas por telemedicina.", logo: "📹", connected: false, status: "Desconectado" },
              { name: "Stripe",          desc: "Processe pagamentos e cobranças online.", logo: "💳", connected: false, status: "Desconectado" },
              { name: "DocuSign",        desc: "Assinatura eletrônica de termos e consentimentos.", logo: "📝", connected: false, status: "Desconectado" },
            ].map(integration => (
              <div key={integration.name} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                  {integration.logo}
                </div>
                <div className="flex-1">
                  <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{integration.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{integration.desc}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {integration.connected && (
                    <span className="flex items-center gap-1.5 text-accent" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                      <div className="w-2 h-2 rounded-full bg-accent" /> Ativo
                    </span>
                  )}
                  <button
                    className="px-4 py-2 rounded-xl border transition-all"
                    style={{
                      border: integration.connected ? "1px solid var(--border)" : "2px solid var(--primary)",
                      background: integration.connected ? "transparent" : "var(--primary)",
                      color: integration.connected ? "var(--muted-foreground)" : "white",
                      fontWeight: 600, fontSize: "0.875rem",
                    }}
                  >
                    {integration.connected ? "Desconectar" : "Conectar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Add/Edit Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
                {editingDoc ? "Editar Médico" : "Adicionar Médico"}
              </h3>
              <button
                type="button"
                onClick={() => setShowDocModal(false)}
                className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveDoctor} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/4">
                  <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Título</label>
                  <select
                    value={docForm.title}
                    onChange={e => setDocForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground focus:border-primary transition-colors"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Dra.">Dra.</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Mendes"
                    value={docForm.name}
                    onChange={e => setDocForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>CRM *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: CRM-SP 123456"
                    value={docForm.crm}
                    onChange={e => setDocForm(prev => ({ ...prev, crm: e.target.value }))}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Especialidade *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cardiologista"
                    value={docForm.specialty}
                    onChange={e => setDocForm(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Dias de Atendimento</label>
                <div className="flex gap-2 flex-wrap">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(day => {
                    const active = docForm.days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const updatedDays = active
                            ? docForm.days.filter(d => d !== day)
                            : [...docForm.days, day];
                          setDocForm(p => ({ ...p, days: updatedDays }));
                        }}
                        className="px-3 py-1.5 rounded-xl border transition-all cursor-pointer"
                        style={{
                          border: active ? "2px solid var(--primary)" : "1px solid var(--border)",
                          background: active ? "var(--secondary)" : "transparent",
                          color: active ? "var(--primary)" : "var(--muted-foreground)",
                          fontWeight: 600,
                          fontSize: "0.875rem"
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Horário de Início</label>
                  <input
                    type="time"
                    value={docForm.start}
                    onChange={e => setDocForm(p => ({ ...p, start: e.target.value }))}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground focus:border-primary transition-colors"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Horário de Término</label>
                  <input
                    type="time"
                    value={docForm.end}
                    onChange={e => setDocForm(p => ({ ...p, end: e.target.value }))}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground focus:border-primary transition-colors"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Cor do Perfil</label>
                <div className="flex gap-2.5 flex-wrap">
                  {DOCTOR_PRESET_COLORS.map(c => {
                    const active = docForm.color === c.value;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setDocForm(p => ({ ...p, color: c.value }))}
                        className="w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: c.value,
                          borderColor: active ? "var(--primary)" : "var(--border)",
                          boxShadow: active ? "0 0 0 2px rgba(26, 58, 92, 0.25)" : "none"
                        }}
                        title={c.name}
                      >
                        {active && <span className="text-primary font-extrabold text-sm">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-foreground" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Perfil Ativo</span>
                  <Toggle
                    value={docForm.active}
                    onChange={() => setDocForm(p => ({ ...p, active: !p.active }))}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowDocModal(false)}
                    className="px-5 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
                    style={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-all cursor-pointer"
                    style={{ fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    {editingDoc ? "Salvar" : "Adicionar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Invite/Edit Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
                {editingUser ? "Editar Usuário" : "Convidar Usuário"}
              </h3>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Paula Souza"
                  value={userForm.name}
                  onChange={e => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>

              <div>
                <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>E-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="Ex: ana.paula@saudetotal.com"
                  value={userForm.email}
                  onChange={e => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>

              <div>
                <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Nível de Acesso</label>
                <select
                  value={userForm.role}
                  onChange={e => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 outline-none text-foreground focus:border-primary transition-colors cursor-pointer"
                  style={{ fontSize: "0.9375rem" }}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Secretária">Secretária</option>
                  <option value="Médico">Médico</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-foreground" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Usuário Ativo</span>
                  <Toggle
                    value={userForm.active}
                    onChange={() => setUserForm(p => ({ ...p, active: !p.active }))}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="px-5 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
                    style={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-all cursor-pointer"
                    style={{ fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    {editingUser ? "Salvar" : "Convidar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
