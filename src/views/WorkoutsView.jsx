import React, { useState } from 'react';
import { 
  Dumbbell, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  Edit3, 
  UserPlus, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import AssignWorkoutModal from '../components/AssignWorkoutModal';

export default function WorkoutsView({ 
  workouts, 
  onNavigate, 
  onAssignWorkout,
  students = [] 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObjective, setSelectedObjective] = useState('Todos');
  const [assigningWorkout, setAssigningWorkout] = useState(null);
  const [previewWorkout, setPreviewWorkout] = useState(null);

  // Extrair objetivos únicos
  const objectives = ['Todos', ...new Set(workouts.map(w => w.objective))];

  // Filtragem
  const filteredWorkouts = workouts.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesObjective = selectedObjective === 'Todos' || w.objective === selectedObjective;
    return matchesSearch && matchesObjective;
  });

  const totalAssigned = workouts.reduce((acc, w) => acc + (w.assignedStudents?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner de Resumo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#10141b] via-[#151a24] to-[#0c0e14] border border-[#262c3a] p-6 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#d4af37]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#e6ca65] text-xs font-semibold tracking-wider uppercase">
              <Dumbbell className="w-3.5 h-3.5" />
              Gestão de Prescrições • CONCEPT CT
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Fichas e Prescrição de Treinos
            </h1>
            <p className="text-sm text-[#94a3b8] max-w-xl">
              Monte, padronize e acompanhe as fichas dos seus alunos. Atribua treinos em segundos e sincronize instantaneamente com o aplicativo mobile do aluno.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/dashboard/treinos/novo')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f2a] text-black font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              Criar Novo Treino
            </button>
          </div>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#262c3a]/60">
          <div>
            <span className="text-xs text-[#64748b] block font-medium">Total de Fichas</span>
            <span className="text-xl font-bold text-white tracking-tight">{workouts.length}</span>
          </div>
          <div>
            <span className="text-xs text-[#64748b] block font-medium">Alunos Vinculados</span>
            <span className="text-xl font-bold text-[#e6ca65] tracking-tight">{totalAssigned}</span>
          </div>
          <div>
            <span className="text-xs text-[#64748b] block font-medium">Exercícios no Banco</span>
            <span className="text-xl font-bold text-white tracking-tight">23 ativos</span>
          </div>
          <div>
            <span className="text-xs text-[#64748b] block font-medium">Sincronização</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Tempo Real Mobile
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#10141b] p-4 rounded-xl border border-[#262c3a]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do treino, grupamento ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-[#64748b] flex-shrink-0" />
          {objectives.map(obj => (
            <button
              key={obj}
              onClick={() => setSelectedObjective(obj)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedObjective === obj
                  ? 'bg-[#d4af37] text-black font-bold shadow-sm'
                  : 'bg-[#151a24] text-[#94a3b8] hover:text-white border border-[#262c3a]'
              }`}
            >
              {obj}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Treinos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredWorkouts.map((workout) => {
          const studentCount = workout.assignedStudents?.length || 0;

          return (
            <div
              key={workout.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#10141b] border border-[#262c3a] hover:border-[#d4af37]/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/5"
            >
              <div>
                {/* Header do Card */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] group-hover:scale-105 transition-transform">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg group-hover:text-[#e6ca65] transition-colors">
                        {workout.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#1a2130] text-[#94a3b8] border border-[#262c3a]">
                          {workout.level || 'Intermediário'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#e6ca65] border border-[#d4af37]/20 font-medium">
                          {workout.objective}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-[#64748b] flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {workout.duration}
                  </span>
                </div>

                {/* Descrição */}
                <p className="text-xs text-[#94a3b8] line-clamp-2 mb-4 leading-relaxed">
                  {workout.description}
                </p>

                {/* Lista rápida de exercícios resumidos */}
                <div className="bg-[#0a0c10] border border-[#1f2533] rounded-xl p-3 mb-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748b] font-medium pb-1 border-b border-[#1f2533]">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#d4af37]" />
                      {workout.exercises?.length || 0} exercícios prescritos
                    </span>
                    <span>Séries x Repetições</span>
                  </div>
                  <div className="space-y-1 pt-1 max-h-28 overflow-y-auto pr-1">
                    {workout.exercises?.slice(0, 4).map((ex, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-[#cbd5e1]">
                        <span className="truncate pr-2 font-mono text-[11px] text-[#94a3b8]">
                          {idx + 1}. {ex.name}
                        </span>
                        <span className="text-[11px] font-semibold text-[#e6ca65] whitespace-nowrap">
                          {ex.sets}x {ex.reps}
                        </span>
                      </div>
                    ))}
                    {(workout.exercises?.length || 0) > 4 && (
                      <div className="text-[11px] text-[#64748b] text-center pt-0.5 italic">
                        + {(workout.exercises.length - 4)} outros exercícios
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer do Card com Ações */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#94a3b8] pt-3 border-t border-[#1f2533] mb-4">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                    <strong className="text-white">{studentCount}</strong> {studentCount === 1 ? 'aluno vinculado' : 'alunos vinculados'}
                  </span>
                  {workout.assignedStudents?.includes(1) && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Ativo no app do Lucas
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPreviewWorkout(workout)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#151a24] hover:bg-[#1a2130] text-[#cbd5e1] hover:text-white border border-[#262c3a] text-xs font-medium transition-colors"
                  >
                    Visualizar
                  </button>

                  <button
                    onClick={() => onNavigate(`/dashboard/treinos/editar/${workout.id}`)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#151a24] hover:bg-[#1a2130] text-[#cbd5e1] hover:text-[#e6ca65] border border-[#262c3a] hover:border-[#d4af37]/40 text-xs font-medium transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar
                  </button>

                  <button
                    onClick={() => setAssigningWorkout(workout)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f2a] text-black font-bold text-xs shadow-md shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Atribuir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-16 bg-[#10141b] rounded-2xl border border-[#262c3a] p-8">
          <Dumbbell className="w-12 h-12 text-[#64748b] mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-white mb-1">Nenhum treino encontrado</h3>
          <p className="text-xs text-[#94a3b8] max-w-sm mx-auto mb-4">
            Tente buscar com outro termo ou crie uma nova ficha personalizada para seus alunos.
          </p>
          <button
            onClick={() => onNavigate('/dashboard/treinos/novo')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4af37] text-black text-xs font-bold hover:brightness-110"
          >
            <Plus className="w-3.5 h-3.5" />
            Criar Treino Agora
          </button>
        </div>
      )}

      {/* Modal de Pré-Visualização Completa */}
      {previewWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#10141b] border border-[#d4af37]/40 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-[#262c3a] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#e6ca65] border border-[#d4af37]/20 font-medium">
                    {previewWorkout.objective}
                  </span>
                  <span className="text-xs text-[#64748b] font-mono">
                    {previewWorkout.duration}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{previewWorkout.name}</h2>
                <p className="text-xs text-[#94a3b8] mt-1">{previewWorkout.description}</p>
              </div>
              <button
                onClick={() => setPreviewWorkout(null)}
                className="w-8 h-8 rounded-lg bg-[#151a24] text-[#94a3b8] hover:text-white flex items-center justify-center border border-[#262c3a]"
              >
                ✕
              </button>
            </div>

            {/* Lista dos Exercícios */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
                Exercícios Prescritos ({previewWorkout.exercises?.length || 0})
              </h4>
              <div className="space-y-2">
                {previewWorkout.exercises?.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0a0c10] border border-[#1f2533] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-[#151a24] text-[#d4af37] text-xs font-bold flex items-center justify-center border border-[#262c3a]">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">{ex.name}</div>
                        <div className="text-xs text-[#64748b]">
                          {ex.muscleGroup} {ex.notes && `• ${ex.notes}`}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#e6ca65]">
                        {ex.sets} séries × {ex.reps}
                      </div>
                      <div className="text-[11px] text-[#64748b] font-mono">
                        {ex.load ? `${ex.load} • ` : ''}Descanso: {ex.rest || '60s'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações do Modal */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262c3a]">
              <button
                onClick={() => {
                  const toEdit = previewWorkout.id;
                  setPreviewWorkout(null);
                  onNavigate(`/dashboard/treinos/editar/${toEdit}`);
                }}
                className="px-4 py-2 rounded-xl bg-[#151a24] text-[#cbd5e1] hover:text-white border border-[#262c3a] text-xs font-medium"
              >
                Editar Ficha
              </button>
              <button
                onClick={() => {
                  const toAssign = previewWorkout;
                  setPreviewWorkout(null);
                  setAssigningWorkout(toAssign);
                }}
                className="px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:brightness-110"
              >
                Atribuir aos Alunos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Atribuição */}
      {assigningWorkout && (
        <AssignWorkoutModal
          isOpen={!!assigningWorkout}
          onClose={() => setAssigningWorkout(null)}
          workout={assigningWorkout}
          students={students}
          onAssign={(workoutId, studentIds) => {
            onAssignWorkout(workoutId, studentIds);
            setAssigningWorkout(null);
          }}
        />
      )}
    </div>
  );
}
