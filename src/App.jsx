import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WhatsAppModal from './components/WhatsAppModal';
import NewStudentModal from './components/NewStudentModal';
import DashboardView from './views/DashboardView';
import StudentsView from './views/StudentsView';
import StudentProfileView from './views/StudentProfileView';
import LoginView from './views/LoginView';
import WorkoutsView from './views/WorkoutsView';
import WorkoutBuilderView from './views/WorkoutBuilderView';
import CheckinsView from './views/CheckinsView';
import CampaignsView from './views/CampaignsView';

// Componentes Mobile do Aluno
import MobileFrame from './components/mobile/MobileFrame';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import CheckinModal from './components/mobile/CheckinModal';
import MobileHomeView from './views/mobile/MobileHomeView';
import MobileWorkoutListView from './views/mobile/MobileWorkoutListView';
import MobileActiveWorkoutView from './views/mobile/MobileActiveWorkoutView';
import MobileEvolutionView from './views/mobile/MobileEvolutionView';
import MobileProfileView from './views/mobile/MobileProfileView';

import { ACADEMY_DATA } from './data/mockData';
import { STUDENT_PROFILE } from './data/studentAppData';
import {
  getStoredStudents,
  saveStoredStudents,
  getStoredWorkouts,
  saveStoredWorkouts,
  getStoredCheckins,
  addStoredCheckin,
  getStoredActiveStudentId,
  saveStoredActiveStudentId,
  buildStudentAppProfile
} from './utils/storage';
import {
  getStoredCurrentUser,
  saveStoredCurrentUser,
  clearStoredCurrentUser
} from './utils/auth';

export default function App() {
  // Estado de rota
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/dashboard');
  
  // Usuário autenticado
  const [currentUser, setCurrentUser] = useState(() => getStoredCurrentUser());

  // Estados com persistência em LocalStorage
  const [students, setStudents] = useState(() => getStoredStudents());
  const [workouts, setWorkouts] = useState(() => getStoredWorkouts());
  const [checkins, setCheckins] = useState(() => getStoredCheckins());
  const [activeMobileStudentId, setActiveMobileStudentId] = useState(() => getStoredActiveStudentId());
  
  // Modais Admin
  const [activeWhatsAppStudent, setActiveWhatsAppStudent] = useState(null);
  const [isNewStudentOpen, setIsNewStudentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estados do App Mobile do Aluno
  const [isCheckinOpen, setIsCheckinOpen] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);

  // Aluno atualmente selecionado para o app mobile
  const activeStudent = useMemo(() => {
    return students.find(s => s.id === activeMobileStudentId) || students[0];
  }, [students, activeMobileStudentId]);

  // Overrides de estatísticas e treinos do aluno no app mobile
  const [studentStatsOverrides, setStudentStatsOverrides] = useState({});

  // Perfil do app mobile sincronizado dinamicamente com o aluno selecionado
  const studentData = useMemo(() => {
    const base = buildStudentAppProfile(activeStudent, STUDENT_PROFILE);
    const overrides = studentStatsOverrides[activeStudent?.id] || {};
    return {
      ...base,
      ...overrides,
      streakDays: (base.streakDays || 4) + (overrides.streakAdded || 0),
      totalWorkouts: (base.totalWorkouts || 38) + (overrides.workoutsAdded || 0),
      currentWorkout: overrides.currentWorkout || base.currentWorkout
    };
  }, [activeStudent, studentStatsOverrides]);

  // Sincroniza histórico de navegação
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persiste alterações de alunos
  useEffect(() => {
    saveStoredStudents(students);
  }, [students]);

  // Persiste alterações de treinos
  useEffect(() => {
    saveStoredWorkouts(workouts);
  }, [workouts]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Métricas calculadas dinamicamente
  const stats = useMemo(() => {
    const attentionCount = students.filter(s => s.status === 'attention').length;
    const activeCount = students.filter(s => s.status === 'active').length;
    return {
      ...ACADEMY_DATA.stats,
      totalStudents: students.length,
      activeStudents: activeCount,
      warningStudents: attentionCount
    };
  }, [students]);

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleSaveWorkout = (newWorkout) => {
    setWorkouts(prev => {
      const index = prev.findIndex(w => String(w.id) === String(newWorkout.id));
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = newWorkout;
        return copy;
      }
      return [newWorkout, ...prev];
    });
  };

  const handleAssignWorkout = (workoutId, studentIds) => {
    const targetWorkout = workouts.find(w => String(w.id) === String(workoutId));
    if (!targetWorkout) return;

    // Atualiza a ficha de treinos no estado geral
    setWorkouts(prev => prev.map(w => {
      if (String(w.id) === String(workoutId)) {
        const currentAssigned = w.assignedStudents || [];
        const merged = Array.from(new Set([...currentAssigned, ...studentIds]));
        return { ...w, assignedStudents: merged };
      }
      return w;
    }));

    // Sincronização em tempo real para os alunos atribuídos
    const currentWorkoutObj = {
      id: targetWorkout.id,
      name: targetWorkout.name,
      description: targetWorkout.description,
      duration: targetWorkout.duration,
      exercisesCount: targetWorkout.exercises?.length || 0,
      level: targetWorkout.level || 'Intermediário',
      exercises: targetWorkout.exercises || []
    };

    // Se o aluno ativo no app mobile foi contemplado, atualiza o app imediatamente
    if (studentIds.map(String).includes(String(activeMobileStudentId))) {
      setStudentStatsOverrides(prev => ({
        ...prev,
        [activeMobileStudentId]: {
          ...prev[activeMobileStudentId],
          currentWorkout: currentWorkoutObj
        }
      }));
    }

    // Atualiza também os dados de treino ativo dos alunos no cadastro do admin
    setStudents(prev => prev.map(s => {
      if (studentIds.map(String).includes(String(s.id))) {
        return {
          ...s,
          activeWorkout: {
            name: targetWorkout.name,
            description: targetWorkout.description,
            lastUpdated: 'Hoje (CONCEPT CT)',
            exercises: targetWorkout.exercises || []
          }
        };
      }
      return s;
    }));
  };

  const handleSelectMobileStudent = (newStudentId) => {
    setActiveMobileStudentId(newStudentId);
    saveStoredActiveStudentId(newStudentId);
  };

  const handleAddCheckin = (newCheckin) => {
    const updated = addStoredCheckin(newCheckin);
    setCheckins(updated);

    // Se o check-in for do aluno visualizado no momento, reflete no app
    if (Number(newCheckin.studentId) === Number(activeMobileStudentId)) {
      setCheckedInToday(true);
    }
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    saveStoredCurrentUser(user);

    // Se o usuário logado for ALUNO, direciona direto para o app com seus dados
    if (user.role === 'student') {
      if (user.studentId) {
        setActiveMobileStudentId(user.studentId);
        saveStoredActiveStudentId(user.studentId);
      }
      navigate('/app');
    } else if (user.role === 'coach') {
      // Se for Professor/Coach técnico, vai para a área de treinos e alunos
      navigate('/dashboard/treinos');
    } else {
      // Se for Admin/Gestor, vai para o painel principal da academia
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    clearStoredCurrentUser();
    setCurrentUser(null);
    navigate('/login');
  };

  // Se rota for /login, exibe LoginView conectada ao sistema de perfis
  if (currentPath === '/login') {
    return (
      <LoginView 
        students={students}
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  // ==========================================
  // ROTEAMENTO DO APP MOBILE DO ALUNO (/app*)
  // ==========================================
  if (currentPath.startsWith('/app')) {
    const renderMobileContent = () => {
      // Modo Treino Ativo (em execução)
      if (currentPath === '/app/treino/execucao') {
        return (
          <MobileActiveWorkoutView
            workout={studentData.currentWorkout}
            onFinishWorkout={() => {
              setStudentStatsOverrides(prev => {
                const cur = prev[activeStudent?.id] || {};
                return {
                  ...prev,
                  [activeStudent?.id]: {
                    ...cur,
                    streakAdded: (cur.streakAdded || 0) + 1,
                    workoutsAdded: (cur.workoutsAdded || 0) + 1
                  }
                };
              });
            }}
            onCloseWorkout={() => navigate('/app')}
            onNavigateToEvolution={() => navigate('/app/evolucao')}
          />
        );
      }

      // Lista de Fichas de Treino
      if (currentPath === '/app/treino') {
        return (
          <MobileWorkoutListView
            student={studentData}
            onStartWorkout={() => navigate('/app/treino/execucao')}
          />
        );
      }

      // Minha Evolução
      if (currentPath === '/app/evolucao') {
        return (
          <MobileEvolutionView
            student={studentData}
          />
        );
      }

      // Perfil do Aluno
      if (currentPath === '/app/perfil') {
        return (
          <MobileProfileView
            student={studentData}
            onNavigateBackToAdmin={() => navigate('/dashboard')}
          />
        );
      }

      // Default Mobile: Home do Aluno (/app)
      return (
        <MobileHomeView
          student={studentData}
          checkedIn={checkedInToday}
          onOpenCheckin={() => setIsCheckinOpen(true)}
          onStartWorkout={() => navigate('/app/treino/execucao')}
          onNavigate={navigate}
        />
      );
    };

    const isRunningWorkout = currentPath === '/app/treino/execucao';

    return (
      <>
        <MobileFrame 
          onNavigateBackToAdmin={() => navigate('/dashboard')}
          students={students}
          activeStudentId={activeMobileStudentId}
          onSelectStudent={handleSelectMobileStudent}
        >
          {renderMobileContent()}

          {/* Bottom Bar fixa (oculta apenas durante execução de treino para foco total) */}
          {!isRunningWorkout && (
            <MobileBottomNav
              currentRoute={currentPath}
              onNavigate={navigate}
            />
          )}
        </MobileFrame>

        {/* Modal de Check-in em 1-Clique */}
        <CheckinModal
          isOpen={isCheckinOpen}
          onClose={() => setIsCheckinOpen(false)}
          onStartWorkout={() => {
            setCheckedInToday(true);
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            handleAddCheckin({
              id: `chk-${Date.now()}`,
              studentId: activeStudent?.id || 1,
              studentName: activeStudent?.name || studentData.name,
              avatar: activeStudent?.avatar || studentData.avatar,
              plan: activeStudent?.plan || studentData.plan,
              time: timeStr,
              gate: 'App Mobile (1-Clique)',
              status: 'granted',
              statusLabel: 'Liberado via App'
            });
            navigate('/app/treino/execucao');
          }}
        />
      </>
    );
  }

  // ==========================================
  // ROTEAMENTO DO PAINEL DA ACADEMIA (ADMIN)
  // ==========================================
  const renderAdminView = () => {
    // Módulo de Treinos: Criar Novo Treino
    if (currentPath === '/dashboard/treinos/novo') {
      return (
        <WorkoutBuilderView
          workouts={workouts}
          onSaveWorkout={handleSaveWorkout}
          onNavigate={navigate}
          students={students}
        />
      );
    }

    // Módulo de Treinos: Editar Treino Existente
    if (currentPath.startsWith('/dashboard/treinos/editar/')) {
      const workoutId = currentPath.split('/dashboard/treinos/editar/')[1];
      return (
        <WorkoutBuilderView
          workoutId={workoutId}
          workouts={workouts}
          onSaveWorkout={handleSaveWorkout}
          onNavigate={navigate}
          students={students}
        />
      );
    }

    // Módulo de Treinos: Listagem de Fichas
    if (currentPath.startsWith('/dashboard/treinos')) {
      return (
        <WorkoutsView
          workouts={workouts}
          onNavigate={navigate}
          onAssignWorkout={handleAssignWorkout}
          students={students}
        />
      );
    }

    // Módulo de Check-ins & Controle de Acessos
    if (currentPath.startsWith('/dashboard/checkins')) {
      return (
        <CheckinsView
          students={students}
          checkins={checkins}
          onAddCheckin={handleAddCheckin}
          onNavigate={navigate}
        />
      );
    }

    // Módulo de Campanhas & Retenção
    if (currentPath.startsWith('/dashboard/campanhas')) {
      return (
        <CampaignsView
          students={students}
          onOpenWhatsApp={(student) => setActiveWhatsAppStudent(student)}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath.startsWith('/alunos/')) {
      const parts = currentPath.split('/');
      const id = parts[2];
      return (
        <StudentProfileView
          studentId={id}
          students={students}
          workouts={workouts}
          onAssignWorkout={handleAssignWorkout}
          onNavigate={navigate}
          onOpenWhatsApp={(student) => setActiveWhatsAppStudent(student)}
        />
      );
    }

    if (currentPath.startsWith('/alunos')) {
      const searchParams = new URLSearchParams(window.location.search);
      const filterParam = searchParams.get('filter') || 'all';

      return (
        <StudentsView
          students={students}
          onNavigate={navigate}
          onOpenWhatsApp={(student) => setActiveWhatsAppStudent(student)}
          onOpenNewStudent={() => setIsNewStudentOpen(true)}
          initialFilter={filterParam}
        />
      );
    }

    // Default Admin: Dashboard
    return (
      <DashboardView
        stats={stats}
        students={students}
        onOpenWhatsApp={(student) => setActiveWhatsAppStudent(student)}
        onNavigate={navigate}
      />
    );
  };

  return (
    <div className="app-layout">
      {/* Sidebar Lateral */}
      <Sidebar
        currentRoute={currentPath}
        onNavigate={navigate}
        warningCount={stats.warningStudents}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Área de Conteúdo Principal */}
      <div className="main-content">
        <Header
          onOpenNewStudent={() => setIsNewStudentOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenStudentApp={() => navigate('/app')}
        />

        {renderAdminView()}
      </div>

      {/* Modal de WhatsApp */}
      {activeWhatsAppStudent && (
        <WhatsAppModal
          student={activeWhatsAppStudent}
          onClose={() => setActiveWhatsAppStudent(null)}
        />
      )}

      {/* Modal de Novo Aluno */}
      <NewStudentModal
        isOpen={isNewStudentOpen}
        onClose={() => setIsNewStudentOpen(false)}
        onAddStudent={handleAddStudent}
      />
    </div>
  );
}
