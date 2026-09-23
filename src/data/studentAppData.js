// Dados mockados específicos para o app mobile do aluno Lucas Almeida na CONCEPT
export const STUDENT_PROFILE = {
  id: 1,
  name: "Lucas Almeida",
  firstName: "Lucas",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=80",
  plan: "Black Anual",
  unit: "CONCEPT | Centro de Treinamento",
  city: "São Lourenço - MG",
  instagram: "@concept_ct_",
  enrollmentId: "CP-8842",
  streakDays: 4,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  weeklyPercent: 72,
  totalWorkouts: 38,
  checkedInToday: false,

  currentWorkout: {
    id: "treino-a",
    tag: "TREINO A",
    title: "Peito + Tríceps",
    muscleGroups: "Peitoral maior, deltoide anterior e tríceps",
    estimatedMinutes: 52,
    exerciseCount: 6,
    difficulty: "Alta Performance",
    exercises: [
      {
        id: 1,
        name: "Supino Reto",
        muscle: "Peitoral Maior",
        targetSets: 3,
        targetReps: 10,
        suggestedLoad: "30 kg cada lado",
        sets: [
          { setNumber: 1, load: 30, reps: 10, completed: false },
          { setNumber: 2, load: 30, reps: 10, completed: false },
          { setNumber: 3, load: 35, reps: 8, completed: false }
        ]
      },
      {
        id: 2,
        name: "Supino Inclinado",
        muscle: "Peitoral Superior",
        targetSets: 3,
        targetReps: 10,
        suggestedLoad: "24 kg halter",
        sets: [
          { setNumber: 1, load: 24, reps: 10, completed: false },
          { setNumber: 2, load: 24, reps: 10, completed: false },
          { setNumber: 3, load: 26, reps: 8, completed: false }
        ]
      },
      {
        id: 3,
        name: "Crucifixo",
        muscle: "Peitoral (Isolamento)",
        targetSets: 3,
        targetReps: 12,
        suggestedLoad: "18 kg halter",
        sets: [
          { setNumber: 1, load: 18, reps: 12, completed: false },
          { setNumber: 2, load: 18, reps: 12, completed: false },
          { setNumber: 3, load: 20, reps: 10, completed: false }
        ]
      },
      {
        id: 4,
        name: "Desenvolvimento",
        muscle: "Deltoide Anterior e Lateral",
        targetSets: 3,
        targetReps: 10,
        suggestedLoad: "20 kg halter",
        sets: [
          { setNumber: 1, load: 20, reps: 10, completed: false },
          { setNumber: 2, load: 20, reps: 10, completed: false },
          { setNumber: 3, load: 22, reps: 8, completed: false }
        ]
      },
      {
        id: 5,
        name: "Tríceps Pulley",
        muscle: "Tríceps Braquial",
        targetSets: 3,
        targetReps: 12,
        suggestedLoad: "30 kg",
        sets: [
          { setNumber: 1, load: 30, reps: 12, completed: false },
          { setNumber: 2, load: 30, reps: 12, completed: false },
          { setNumber: 3, load: 35, reps: 10, completed: false }
        ]
      },
      {
        id: 6,
        name: "Tríceps Francês",
        muscle: "Tríceps (Cabeça Longa)",
        targetSets: 3,
        targetReps: 10,
        suggestedLoad: "22 kg halter",
        sets: [
          { setNumber: 1, load: 22, reps: 10, completed: false },
          { setNumber: 2, load: 22, reps: 10, completed: false },
          { setNumber: 3, load: 24, reps: 8, completed: false }
        ]
      }
    ]
  },

  allWorkouts: [
    {
      id: "treino-a",
      tag: "TREINO A",
      name: "Peito + Tríceps",
      exercises: 6,
      duration: "~52 min",
      lastDone: "há 2 dias",
      active: true
    },
    {
      id: "treino-b",
      tag: "TREINO B",
      name: "Dorsal + Bíceps",
      exercises: 6,
      duration: "~55 min",
      lastDone: "há 4 dias",
      active: false
    },
    {
      id: "treino-c",
      tag: "TREINO C",
      name: "Pernas Completo (Força)",
      exercises: 7,
      duration: "~60 min",
      lastDone: "há 6 dias",
      active: false
    },
    {
      id: "treino-d",
      tag: "TREINO D",
      name: "Ombros + Trapézio",
      exercises: 5,
      duration: "~45 min",
      lastDone: "semana passada",
      active: false
    }
  ],

  prs: [
    { exercise: "Supino Reto Barra", previous: "40 kg", current: "50 kg/lado", diff: "+25%", date: "15/09", isNew: true },
    { exercise: "Agachamento Livre", previous: "70 kg", current: "90 kg/lado", diff: "+28%", date: "10/09", isNew: false },
    { exercise: "Puxada Frontal", previous: "50 kg", current: "65 kg", diff: "+30%", date: "08/09", isNew: false },
    { exercise: "Leg Press 45º", previous: "200 kg", current: "260 kg", diff: "+30%", date: "01/09", isNew: false }
  ],

  weeklyActivity: [
    { day: "Seg", done: true, label: "Treino A" },
    { day: "Ter", done: true, label: "Treino B" },
    { day: "Qua", done: false, label: "Descanso" },
    { day: "Qui", done: true, label: "Treino C" },
    { day: "Sex", done: true, label: "Treino A", isToday: true },
    { day: "Sáb", done: false, label: "Pendente" },
    { day: "Dom", done: false, label: "Descanso" }
  ]
};
