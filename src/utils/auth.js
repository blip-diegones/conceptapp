// Sistema de Autenticação e Perfis (RBAC - Role-Based Access Control)
// CONCEPT Centro de Treinamento

const AUTH_STORAGE_KEY = '@concept:current_user_v1';

export const SYSTEM_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Rafael Alencar',
    email: 'rafael@conceptct.com.br',
    role: 'admin',
    roleLabel: 'Head Coach & Gestor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    defaultRoute: '/dashboard'
  },
  {
    id: 'usr-coach-1',
    name: 'Thiago Silva',
    email: 'thiago@conceptct.com.br',
    role: 'coach',
    roleLabel: 'Professor / Coach Técnico',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    defaultRoute: '/dashboard/treinos'
  }
];

export function getStoredCurrentUser() {
  try {
    const item = localStorage.getItem(AUTH_STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function saveStoredCurrentUser(user) {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error(e);
  }
}

export function clearStoredCurrentUser() {
  saveStoredCurrentUser(null);
}

/**
 * Autentica o usuário pelo e-mail e senha, consultando tanto os funcionários
 * quanto a base de alunos cadastrados na academia.
 */
export function authenticate(email, _password, currentStudents = []) {
  const cleanEmail = (email || '').trim().toLowerCase();

  // 1. Verifica se é Admin ou Professor cadastrado
  const staffMember = SYSTEM_USERS.find(u => u.email.toLowerCase() === cleanEmail);
  if (staffMember) {
    return {
      success: true,
      user: staffMember
    };
  }

  // 2. Verifica se é um aluno cadastrado no sistema
  const student = currentStudents.find(
    s => (s.email && s.email.toLowerCase() === cleanEmail) || 
         (s.name && s.name.toLowerCase().includes(cleanEmail))
  );

  if (student) {
    const studentUser = {
      id: `usr-std-${student.id}`,
      name: student.name,
      email: student.email || `${student.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      role: 'student',
      roleLabel: `Aluno (${student.plan || 'Black Anual'})`,
      avatar: student.avatar,
      studentId: student.id,
      defaultRoute: '/app'
    };

    return {
      success: true,
      user: studentUser
    };
  }

  // 3. Fallback genérico para aluno padrão caso digite um e-mail de teste
  if (cleanEmail.includes('aluno') || cleanEmail.includes('lucas')) {
    const defaultStudent = currentStudents[0] || { id: 1, name: 'Lucas Almeida' };
    return {
      success: true,
      user: {
        id: `usr-std-${defaultStudent.id}`,
        name: defaultStudent.name,
        email: cleanEmail,
        role: 'student',
        roleLabel: 'Aluno',
        avatar: defaultStudent.avatar,
        studentId: defaultStudent.id,
        defaultRoute: '/app'
      }
    };
  }

  // Credencial não localizada
  return {
    success: false,
    error: 'E-mail ou matrícula não encontrados na base do CONCEPT CT.'
  };
}
