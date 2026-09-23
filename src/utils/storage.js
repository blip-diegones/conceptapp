import { INITIAL_STUDENTS } from '../data/mockData';
import { INITIAL_WORKOUTS } from '../data/workoutData';
import { STUDENT_PROFILE } from '../data/studentAppData';

const KEYS = {
  STUDENTS: '@concept:students_v1',
  WORKOUTS: '@concept:workouts_v1',
  ACTIVE_STUDENT_ID: '@concept:active_mobile_student_id_v1',
  STUDENT_APP_PROFILES: '@concept:student_app_profiles_v1',
  CHECKINS: '@concept:checkins_history_v1'
};

// Histórico inicial de check-ins realistas do dia
const INITIAL_CHECKINS = [
  {
    id: 'chk-1',
    studentId: 2,
    studentName: 'Mariana Souza',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    plan: 'Prime Semestral',
    time: '14:28',
    gate: 'Catraca Principal 01',
    status: 'granted', // granted | alert | denied
    statusLabel: 'Liberado'
  },
  {
    id: 'chk-2',
    studentId: 5,
    studentName: 'Amanda Lima',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    plan: 'Black Anual',
    time: '14:15',
    gate: 'Catraca Principal 02',
    status: 'granted',
    statusLabel: 'Liberado'
  },
  {
    id: 'chk-3',
    studentId: 3,
    studentName: 'Rodrigo Silveira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    plan: 'Basic Mensal',
    time: '13:50',
    gate: 'Catraca Principal 01',
    status: 'alert',
    statusLabel: 'Exame Vencendo'
  },
  {
    id: 'chk-4',
    studentId: 6,
    studentName: 'Felipe Rocha',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    plan: 'Black Anual',
    time: '13:22',
    gate: 'Catraca Principal 01',
    status: 'granted',
    statusLabel: 'Liberado'
  },
  {
    id: 'chk-5',
    studentId: 4,
    studentName: 'Camila Torres',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80',
    plan: 'Prime Semestral',
    time: '12:40',
    gate: 'Catraca Principal 02',
    status: 'granted',
    statusLabel: 'Liberado'
  }
];

function safeParse(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`[Concept Storage] Erro ao ler ${key}:`, error);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[Concept Storage] Erro ao salvar ${key}:`, error);
  }
}

// Alunos
export function getStoredStudents() {
  return safeParse(KEYS.STUDENTS, INITIAL_STUDENTS);
}

export function saveStoredStudents(students) {
  safeSet(KEYS.STUDENTS, students);
}

// Fichas de Treino
export function getStoredWorkouts() {
  return safeParse(KEYS.WORKOUTS, INITIAL_WORKOUTS);
}

export function saveStoredWorkouts(workouts) {
  safeSet(KEYS.WORKOUTS, workouts);
}

// Check-ins
export function getStoredCheckins() {
  return safeParse(KEYS.CHECKINS, INITIAL_CHECKINS);
}

export function saveStoredCheckins(checkins) {
  safeSet(KEYS.CHECKINS, checkins);
}

export function addStoredCheckin(newCheckin) {
  const current = getStoredCheckins();
  const updated = [newCheckin, ...current];
  saveStoredCheckins(updated);
  return updated;
}

// Aluno ativo no App Mobile
export function getStoredActiveStudentId() {
  const id = safeParse(KEYS.ACTIVE_STUDENT_ID, 1);
  return Number(id) || 1;
}

export function saveStoredActiveStudentId(id) {
  safeSet(KEYS.ACTIVE_STUDENT_ID, Number(id));
}

// Constrói o perfil do app mobile sincronizado com o aluno selecionado
export function buildStudentAppProfile(student, baseProfile = STUDENT_PROFILE, currentWorkout = null) {
  if (!student) return baseProfile;

  const targetWorkout = currentWorkout || baseProfile.currentWorkout;

  return {
    ...baseProfile,
    id: student.id,
    name: student.name,
    firstName: student.name.split(' ')[0],
    avatar: student.avatar,
    plan: student.plan,
    streakDays: student.consecutiveWeeks ? student.consecutiveWeeks * 3 : (baseProfile.streakDays || 4),
    totalWorkouts: student.totalWorkouts || baseProfile.totalWorkouts || 38,
    checkedInToday: false,
    currentWorkout: targetWorkout
  };
}

// Limpa dados e restaura para o estado original (ótimo para demos)
export function resetAllStorage() {
  try {
    localStorage.removeItem(KEYS.STUDENTS);
    localStorage.removeItem(KEYS.WORKOUTS);
    localStorage.removeItem(KEYS.ACTIVE_STUDENT_ID);
    localStorage.removeItem(KEYS.STUDENT_APP_PROFILES);
    localStorage.removeItem(KEYS.CHECKINS);
  } catch (e) {
    console.error(e);
  }
}
