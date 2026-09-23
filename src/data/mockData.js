// Dados mockados realistas para CONCEPT | Centro de Treinamento (São Lourenço - MG • @concept_ct_)
export const ACADEMY_DATA = {
  name: "CONCEPT | Centro de Treinamento",
  unit: "São Lourenço - MG",
  instagram: "@concept_ct_",
  manager: {
    name: "Rafael Alencar",
    role: "Head Coach & Gestor",
    email: "rafael@conceptct.com.br",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  stats: {
    totalStudents: 428,
    activeStudents: 312,
    warningStudents: 37,
    monitoringStudents: 45,
    weeklyFrequency: 78,
    weeklyFrequencyDiff: "+4,2%",
    monthRetention: 94.6,
    activeCheckinsToday: 184
  }
};

export const WEEKLY_CHART_DATA = [
  { day: "Seg", percentage: 84, checkins: 360, isPeak: false },
  { day: "Ter", percentage: 88, checkins: 376, isPeak: true },
  { day: "Qua", percentage: 82, checkins: 351, isPeak: false },
  { day: "Qui", percentage: 76, checkins: 325, isPeak: false },
  { day: "Sex", percentage: 71, checkins: 304, isPeak: false },
  { day: "Sáb", percentage: 58, checkins: 248, isPeak: false },
  { day: "Dom", percentage: 34, checkins: 145, isPeak: false }
];

export const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Lucas Almeida",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80",
    phone: "(35) 98765-4321",
    email: "lucas.almeida@gmail.com",
    plan: "Black Anual",
    joinDate: "12/03/2026",
    daysInactive: 12,
    lastWorkout: "12 dias atrás",
    frequencyPercent: 62,
    status: "attention",
    statusLabel: "Atenção",
    goal: "Hipertrofia e força máxima",
    totalWorkouts: 38,
    consecutiveWeeks: 4,
    presenceRate: 92,
    activeWorkout: {
      name: "Treino A — Peito + Tríceps",
      description: "Prescrição de força e densidade peitoral pelo time CONCEPT",
      lastUpdated: "08/09/2026",
      exercises: [
        { name: "1. Supino Reto com Barra", sets: 3, reps: "10", load: "30 kg/lado", rest: "90s" },
        { name: "2. Supino Inclinado com Halteres", sets: 3, reps: "10", load: "24 kg/halter", rest: "75s" },
        { name: "3. Crucifixo Reto", sets: 3, reps: "12", load: "18 kg/halter", rest: "60s" },
        { name: "4. Desenvolvimento com Halteres", sets: 3, reps: "10", load: "20 kg/halter", rest: "75s" },
        { name: "5. Tríceps Pulley", sets: 3, reps: "12", load: "30 kg", rest: "45s" },
        { name: "6. Tríceps Francês", sets: 3, reps: "10", load: "22 kg halter", rest: "60s" }
      ]
    },
    monthlyHistory: [
      { month: "Abr", count: 18, max: 22 },
      { month: "Mai", count: 16, max: 22 },
      { month: "Jun", count: 20, max: 22 },
      { month: "Jul", count: 14, max: 22 },
      { month: "Ago", count: 19, max: 22 },
      { month: "Set", count: 6, max: 22, alert: true }
    ],
    workoutLogs: [
      { date: "10/09/2026", workout: "Treino A — Peito + Tríceps", duration: "58 min", intensity: "Alta" },
      { date: "08/09/2026", workout: "Treino B — Costas + Bíceps", duration: "61 min", intensity: "Moderada" },
      { date: "06/09/2026", workout: "Treino C — Pernas Completo", duration: "64 min", intensity: "Alta" },
      { date: "03/09/2026", workout: "Treino A — Peito + Tríceps", duration: "54 min", intensity: "Alta" },
      { date: "01/09/2026", workout: "Treino B — Costas + Bíceps", duration: "59 min", intensity: "Moderada" }
    ]
  },
  {
    id: 2,
    name: "Mariana Souza",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    phone: "(35) 99123-4567",
    email: "mariana.souza@outlook.com",
    plan: "Mensal Prime",
    joinDate: "05/01/2026",
    daysInactive: 9,
    lastWorkout: "9 dias atrás",
    frequencyPercent: 71,
    status: "attention",
    statusLabel: "Atenção",
    goal: "Definição muscular e mobilidade",
    totalWorkouts: 54,
    consecutiveWeeks: 6,
    presenceRate: 88,
    activeWorkout: {
      name: "Treino B — Glúteos + Posteriores",
      description: "Foco em cadeia posterior e estabilização de core",
      lastUpdated: "12/09/2026",
      exercises: [
        { name: "Elevação Pélvica com Barra", sets: 4, reps: "10-12", load: "70 kg", rest: "90s" },
        { name: "Stiff com Halteres", sets: 3, reps: "10", load: "22 kg", rest: "60s" },
        { name: "Cadeira Flexora", sets: 3, reps: "12", load: "45 kg", rest: "45s" }
      ]
    },
    monthlyHistory: [
      { month: "Abr", count: 17, max: 22 },
      { month: "Mai", count: 18, max: 22 },
      { month: "Jun", count: 19, max: 22 },
      { month: "Jul", count: 16, max: 22 },
      { month: "Ago", count: 17, max: 22 },
      { month: "Set", count: 7, max: 22, alert: true }
    ],
    workoutLogs: [
      { date: "13/09/2026", workout: "Treino B — Glúteos + Posteriores", duration: "52 min", intensity: "Moderada" }
    ]
  },
  {
    id: 3,
    name: "Pedro Henrique",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    phone: "(35) 97654-3210",
    email: "pedro.henrique@tech.io",
    plan: "Black Anual",
    joinDate: "18/04/2026",
    daysInactive: 8,
    lastWorkout: "8 dias atrás",
    frequencyPercent: 68,
    status: "attention",
    statusLabel: "Atenção",
    goal: "Força bruta e condicionamento metabólico",
    totalWorkouts: 42,
    consecutiveWeeks: 3,
    presenceRate: 85,
    activeWorkout: {
      name: "Treino C — Força & Pernas",
      description: "Agachamento pesado e exercícios multiarticulares",
      lastUpdated: "10/09/2026",
      exercises: [
        { name: "Agachamento Livre", sets: 4, reps: "6-8", load: "100 kg", rest: "120s" },
        { name: "Leg Press 45º", sets: 3, reps: "10", load: "240 kg", rest: "90s" }
      ]
    },
    monthlyHistory: [
      { month: "Mai", count: 15, max: 22 },
      { month: "Jun", count: 17, max: 22 },
      { month: "Jul", count: 18, max: 22 },
      { month: "Ago", count: 16, max: 22 },
      { month: "Set", count: 8, max: 22, alert: true }
    ],
    workoutLogs: [
      { date: "14/09/2026", workout: "Treino C — Força & Pernas", duration: "63 min", intensity: "Alta" }
    ]
  },
  {
    id: 4,
    name: "Ana Clara Silva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    phone: "(35) 98456-7890",
    email: "anaclara.design@gmail.com",
    plan: "Mensal",
    joinDate: "20/06/2026",
    daysInactive: 7,
    lastWorkout: "7 dias atrás",
    frequencyPercent: 74,
    status: "monitoring",
    statusLabel: "Monitorar",
    goal: "Perda de gordura e resistência",
    totalWorkouts: 29,
    consecutiveWeeks: 5,
    presenceRate: 80,
    activeWorkout: {
      name: "Treino Funcional + Força",
      description: "Circuito metabólico e fortalecimento global",
      lastUpdated: "14/09/2026",
      exercises: [
        { name: "Kettlebell Swing", sets: 4, reps: "15", load: "16 kg", rest: "45s" }
      ]
    },
    monthlyHistory: [
      { month: "Jul", count: 14, max: 22 },
      { month: "Ago", count: 16, max: 22 },
      { month: "Set", count: 9, max: 22 }
    ],
    workoutLogs: [
      { date: "15/09/2026", workout: "Treino Funcional + Força", duration: "45 min", intensity: "Alta" }
    ]
  },
  {
    id: 5,
    name: "Rodrigo Vasconcelos",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    phone: "(35) 97001-2233",
    email: "rodrigo.vasc@gmail.com",
    plan: "Black Anual",
    joinDate: "10/01/2026",
    daysInactive: 0,
    lastWorkout: "Hoje",
    frequencyPercent: 96,
    status: "active",
    statusLabel: "Ativo",
    goal: "Hipertrofia máxima",
    totalWorkouts: 112,
    consecutiveWeeks: 18,
    presenceRate: 98,
    activeWorkout: {
      name: "Treino A — Peito & Ombros",
      description: "Progressão de sobrecarga no Centro de Treinamento CONCEPT",
      lastUpdated: "20/09/2026",
      exercises: [
        { name: "Supino Inclinado", sets: 4, reps: "8-10", load: "40 kg/lado", rest: "90s" }
      ]
    },
    monthlyHistory: [
      { month: "Abr", count: 21, max: 22 },
      { month: "Mai", count: 22, max: 22 },
      { month: "Jun", count: 20, max: 22 },
      { month: "Jul", count: 21, max: 22 },
      { month: "Ago", count: 22, max: 22 },
      { month: "Set", count: 17, max: 22 }
    ],
    workoutLogs: [
      { date: "22/09/2026", workout: "Treino A — Peito & Ombros", duration: "68 min", intensity: "Alta" }
    ]
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "workout",
    student: "Rodrigo Vasconcelos",
    action: "concluiu o Treino A na CONCEPT",
    time: "há 14 minutos",
    status: "success",
    meta: "68 min • 18 séries"
  },
  {
    id: 2,
    type: "checkin",
    student: "Larissa Rezende",
    action: "fez check-in na recepção",
    time: "há 32 minutos",
    status: "info",
    meta: "Catraca 01 • São Lourenço"
  },
  {
    id: 3,
    type: "workout",
    student: "Mariana Souza",
    action: "concluiu o Treino B (Glúteos)",
    time: "há 1 hora",
    status: "success",
    meta: "55 min • 16 séries"
  },
  {
    id: 4,
    type: "enrollment",
    student: "Matheus Cordeiro",
    action: "matrícula confirmada no Plano Black CONCEPT",
    time: "há 2 horas",
    status: "new",
    meta: "Avaliação física agendada"
  },
  {
    id: 5,
    type: "warning",
    student: "Lucas Almeida",
    action: "atingiu 12 dias sem presença registrada",
    time: "hoje às 08:00",
    status: "alert",
    meta: "Sugerido envio de WhatsApp"
  }
];
