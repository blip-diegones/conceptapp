import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  Dumbbell, 
  Target, 
  Save, 
  Search, 
  Check, 
  UserPlus
} from 'lucide-react';
import { EXERCISE_LIBRARY, MUSCLE_GROUPS } from '../data/workoutData';
import AssignWorkoutModal from '../components/AssignWorkoutModal';

export default function WorkoutBuilderView({
  workoutId,
  workouts,
  onSaveWorkout,
  onNavigate,
  students = []
}) {
  const isEditing = Boolean(workoutId);
  const existingWorkout = workouts.find(w => String(w.id) === String(workoutId));

  // Estados do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('Hipertrofia');
  const [duration, setDuration] = useState('50 min');
  const [level, setLevel] = useState('Intermediário');
  const [exercises, setExercises] = useState([]);

  // Estados do Modal da Biblioteca de Exercícios
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('Todos');
  const [customExerciseName, setCustomExerciseName] = useState('');

  // Modal de Atribuição pós-salvamento
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [savedWorkoutForAssign, setSavedWorkoutForAssign] = useState(null);

  // Notificação de sucesso rápida
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  useEffect(() => {
    if (isEditing && existingWorkout) {
      setName(existingWorkout.name);
      setDescription(existingWorkout.description || '');
      setObjective(existingWorkout.objective || 'Hipertrofia');
      setDuration(existingWorkout.duration || '50 min');
      setLevel(existingWorkout.level || 'Intermediário');
      setExercises(existingWorkout.exercises ? JSON.parse(JSON.stringify(existingWorkout.exercises)) : []);
    } else if (!isEditing) {
      // Padrão novo treino
      setName('Treino Personalizado');
      setDescription('Ficha de treino periodizada para alta performance e hipertrofia.');
      setObjective('Hipertrofia');
      setDuration('55 min');
      setLevel('Intermediário');
      setExercises([
        {
          id: 'ex-init-1',
          name: 'Supino Reto com Barra',
          muscleGroup: 'Peitoral',
          sets: 4,
          reps: '8 a 10',
          load: '40 kg/lado',
          rest: '75s',
          notes: 'Cadência 3010, amplitude máxima e controle de descida.'
        },
        {
          id: 'ex-init-2',
          name: 'Supino Inclinado com Halteres',
          muscleGroup: 'Peitoral',
          sets: 4,
          reps: '10 a 12',
          load: '28 kg cada haltere',
          rest: '60s',
          notes: 'Banco a 30 graus, focar na porção clavicular.'
        }
      ]);
    }
  }, [workoutId, existingWorkout, isEditing]);

  // Manipulação de exercícios
  const handleAddFromLibrary = (libExercise) => {
    const newEx = {
      id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: libExercise.name,
      muscleGroup: libExercise.muscleGroup,
      sets: libExercise.defaultSets || 3,
      reps: libExercise.defaultReps || '10 a 12',
      load: '',
      rest: libExercise.defaultRest || '60s',
      notes: libExercise.notes || ''
    };
    setExercises(prev => [...prev, newEx]);
    setIsLibraryOpen(false);
  };

  const handleAddCustomExercise = (e) => {
    e.preventDefault();
    if (!customExerciseName.trim()) return;
    const newEx = {
      id: `ex-custom-${Date.now()}`,
      name: customExerciseName.trim(),
      muscleGroup: selectedMuscle === 'Todos' ? 'Geral' : selectedMuscle,
      sets: 3,
      reps: '10 a 12',
      load: '',
      rest: '60s',
      notes: ''
    };
    setExercises(prev => [...prev, newEx]);
    setCustomExerciseName('');
    setIsLibraryOpen(false);
  };

  const handleUpdateExercise = (index, field, value) => {
    setExercises(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleMoveExercise = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === exercises.length - 1) return;

    setExercises(prev => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleDuplicateExercise = (index) => {
    const source = exercises[index];
    const duplicated = {
      ...source,
      id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: `${source.name} (Cópia)`
    };
    setExercises(prev => {
      const copy = [...prev];
      copy.splice(index + 1, 0, duplicated);
      return copy;
    });
  };

  const handleRemoveExercise = (index) => {
    setExercises(prev => prev.filter((_, i) => i !== index));
  };

  // Salvar
  const handleSave = (shouldAssign = false) => {
    if (!name.trim()) {
      alert('Por favor, defina um nome para o treino.');
      return;
    }

    if (exercises.length === 0) {
      alert('Adicione pelo menos um exercício na ficha antes de salvar.');
      return;
    }

    const newWorkoutData = {
      id: isEditing ? existingWorkout.id : `w-custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      objective,
      duration,
      level,
      exercises,
      assignedStudents: existingWorkout?.assignedStudents || []
    };

    onSaveWorkout(newWorkoutData);
    setShowSavedFeedback(true);

    if (shouldAssign) {
      setSavedWorkoutForAssign(newWorkoutData);
      setIsAssignModalOpen(true);
    } else {
      setTimeout(() => {
        onNavigate('/dashboard/treinos');
      }, 700);
    }
  };

  // Filtros da Biblioteca
  const filteredLibrary = EXERCISE_LIBRARY.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
                          item.muscleGroup.toLowerCase().includes(librarySearch.toLowerCase());
    const matchesMuscle = selectedMuscle === 'Todos' || item.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header com Navegação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262c3a] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/dashboard/treinos')}
            className="w-9 h-9 rounded-xl bg-[#10141b] border border-[#262c3a] hover:border-[#d4af37]/50 text-[#94a3b8] hover:text-white flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#e6ca65] border border-[#d4af37]/20 font-semibold uppercase tracking-wider">
                {isEditing ? 'Edição de Ficha' : 'Nova Ficha'}
              </span>
              <span className="text-xs text-[#64748b]">• Prescrição CONCEPT CT</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? `Editar: ${name}` : 'Montador de Treino'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/dashboard/treinos')}
            className="px-4 py-2.5 rounded-xl bg-[#10141b] text-[#94a3b8] hover:text-white border border-[#262c3a] text-xs font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-4 py-2.5 rounded-xl bg-[#1a2130] text-[#e6ca65] hover:bg-[#20293d] border border-[#d4af37]/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Salvar e Atribuir
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f2a] text-black font-bold text-xs shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            Salvar Ficha
          </button>
        </div>
      </div>

      {/* Alerta de Feedback de Sucesso */}
      {showSavedFeedback && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm animate-in fade-in">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>Ficha de treino salva com sucesso! Sincronização pronta para o app mobile do aluno.</span>
        </div>
      )}

      {/* Informações Gerais do Treino */}
      <div className="bg-[#10141b] border border-[#262c3a] rounded-2xl p-6 shadow-xl space-y-5">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#262c3a] pb-3">
          <Target className="w-4 h-4 text-[#d4af37]" />
          Informações da Ficha
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-medium text-[#94a3b8] flex items-center gap-1">
              Nome do Treino <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Treino A - Peitoral e Tríceps Pesado"
              className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-medium text-[#94a3b8]">Descrição / Orientações Gerais</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Foco na contração de pico e controle excêntrico. Aquecimento prévio manguito 2x15."
              className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#94a3b8]">Objetivo Principal</label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
            >
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Força Máxima">Força Máxima</option>
              <option value="Definição & Resistência">Definição & Resistência</option>
              <option value="Adaptação">Adaptação</option>
              <option value="Condicionamento">Condicionamento</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94a3b8]">Duração Média</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ex: 50 min"
                className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94a3b8]">Nível</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
                <option value="Atleta">Atleta</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Exercícios Prescritos */}
      <div className="bg-[#10141b] border border-[#262c3a] rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262c3a] pb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#d4af37]" />
              Exercícios Prescritos ({exercises.length})
            </h2>
            <p className="text-xs text-[#64748b] mt-0.5">
              Defina a ordem de execução, cargas de referência, séries, repetições e intervalos de descanso.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsLibraryOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 border border-[#d4af37]/40 text-[#e6ca65] hover:bg-[#d4af37]/30 text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4" />
            Adicionar da Biblioteca
          </button>
        </div>

        {/* Listagem */}
        {exercises.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-[#262c3a] rounded-2xl p-6">
            <Dumbbell className="w-10 h-10 text-[#64748b] mx-auto mb-2 opacity-40" />
            <h4 className="text-sm font-semibold text-white">Nenhum exercício na ficha</h4>
            <p className="text-xs text-[#94a3b8] max-w-sm mx-auto mt-1 mb-4">
              Escolha exercícios pré-cadastrados da biblioteca CONCEPT ou adicione movimentos personalizados.
            </p>
            <button
              type="button"
              onClick={() => setIsLibraryOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4af37] text-black text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              Explorar Biblioteca de Exercícios
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id || index}
                className="bg-[#0a0c10] border border-[#1f2533] hover:border-[#262c3a] rounded-xl p-4 transition-all"
              >
                {/* Cabeçalho do Exercício com Controles de Posição */}
                <div className="flex items-center justify-between gap-3 border-b border-[#1f2533] pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#151a24] text-[#d4af37] text-xs font-bold flex items-center justify-center border border-[#262c3a]">
                      {index + 1}
                    </span>
                    <span className="font-bold text-white text-sm tracking-tight">
                      {exercise.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#1a2130] text-[#94a3b8] border border-[#262c3a]">
                      {exercise.muscleGroup}
                    </span>
                  </div>

                  {/* Ações de Reordenação e Edição */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Mover para cima"
                      disabled={index === 0}
                      onClick={() => handleMoveExercise(index, 'up')}
                      className="p-1 rounded bg-[#151a24] text-[#94a3b8] hover:text-white disabled:opacity-30 disabled:hover:text-[#94a3b8] transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Mover para baixo"
                      disabled={index === exercises.length - 1}
                      onClick={() => handleMoveExercise(index, 'down')}
                      className="p-1 rounded bg-[#151a24] text-[#94a3b8] hover:text-white disabled:opacity-30 disabled:hover:text-[#94a3b8] transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Duplicar exercício"
                      onClick={() => handleDuplicateExercise(index)}
                      className="p-1 rounded bg-[#151a24] text-[#94a3b8] hover:text-[#d4af37] transition-colors ml-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Remover exercício"
                      onClick={() => handleRemoveExercise(index)}
                      className="p-1 rounded bg-[#151a24] text-[#94a3b8] hover:text-rose-400 transition-colors ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Campos de Ajuste do Exercício */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#64748b] block mb-1">Séries</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={exercise.sets}
                      onChange={(e) => handleUpdateExercise(index, 'sets', parseInt(e.target.value) || 1)}
                      className="w-full bg-[#151a24] border border-[#262c3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-semibold focus:border-[#d4af37] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#64748b] block mb-1">Repetições</label>
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => handleUpdateExercise(index, 'reps', e.target.value)}
                      placeholder="Ex: 8 a 10"
                      className="w-full bg-[#151a24] border border-[#262c3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-semibold focus:border-[#d4af37] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#64748b] block mb-1">Carga Ref.</label>
                    <input
                      type="text"
                      value={exercise.load || ''}
                      onChange={(e) => handleUpdateExercise(index, 'load', e.target.value)}
                      placeholder="Ex: 40 kg/lado"
                      className="w-full bg-[#151a24] border border-[#262c3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-semibold focus:border-[#d4af37] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#64748b] block mb-1">Descanso</label>
                    <input
                      type="text"
                      value={exercise.rest || '60s'}
                      onChange={(e) => handleUpdateExercise(index, 'rest', e.target.value)}
                      placeholder="Ex: 60s"
                      className="w-full bg-[#151a24] border border-[#262c3a] rounded-lg px-2.5 py-1.5 text-white text-xs font-semibold focus:border-[#d4af37] outline-none"
                    />
                  </div>
                </div>

                {/* Observações de Execução / Técnica */}
                <div>
                  <label className="text-[11px] font-medium text-[#64748b] block mb-1">
                    Instrução Técnica ou Cadência para o Aluno (Exibido no App Mobile)
                  </label>
                  <input
                    type="text"
                    value={exercise.notes || ''}
                    onChange={(e) => handleUpdateExercise(index, 'notes', e.target.value)}
                    placeholder="Ex: Amplitude máxima, focar na descida lenta (3 segundos), não bater os halteres."
                    className="w-full bg-[#151a24] border border-[#262c3a] rounded-lg px-3 py-1.5 text-xs text-[#cbd5e1] placeholder-[#475569] focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rodapé do Builder com Botão Adicionar */}
        {exercises.length > 0 && (
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setIsLibraryOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151a24] hover:bg-[#1a2130] border border-[#262c3a] hover:border-[#d4af37]/40 text-[#cbd5e1] hover:text-white text-xs font-semibold transition-all"
            >
              <Plus className="w-4 h-4 text-[#d4af37]" />
              Adicionar Outro Exercício
            </button>
          </div>
        )}
      </div>

      {/* MODAL DA BIBLIOTECA DE EXERCÍCIOS */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#10141b] border border-[#d4af37]/40 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#262c3a] pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#d4af37]" />
                  Biblioteca de Exercícios CONCEPT CT
                </h3>
                <p className="text-xs text-[#94a3b8]">
                  Selecione da lista ou crie um movimento específico para a ficha.
                </p>
              </div>
              <button
                onClick={() => setIsLibraryOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#151a24] text-[#94a3b8] hover:text-white flex items-center justify-center border border-[#262c3a]"
              >
                ✕
              </button>
            </div>

            {/* Barra de Busca e Filtros */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar exercício por nome ou grupamento..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full bg-[#0a0c10] border border-[#262c3a] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] outline-none"
                />
              </div>

              {/* Botões de Grupamentos */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['Todos', ...MUSCLE_GROUPS].map(group => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setSelectedMuscle(group)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                      selectedMuscle === group
                        ? 'bg-[#d4af37] text-black font-bold'
                        : 'bg-[#151a24] text-[#94a3b8] hover:text-white border border-[#262c3a]'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Listagem com Scroll */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {filteredLibrary.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleAddFromLibrary(item)}
                  className="p-3 rounded-xl bg-[#0a0c10] hover:bg-[#151a24] border border-[#1f2533] hover:border-[#d4af37]/50 flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#e6ca65] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#64748b] block mt-0.5">
                      {item.muscleGroup} • Sugestão: {item.defaultSets}x {item.defaultReps} ({item.defaultRest})
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-lg bg-[#151a24] group-hover:bg-[#d4af37] text-[#94a3b8] group-hover:text-black text-xs font-semibold border border-[#262c3a] group-hover:border-transparent transition-all flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    Adicionar
                  </span>
                </div>
              ))}

              {filteredLibrary.length === 0 && (
                <div className="text-center py-8 text-xs text-[#64748b]">
                  Nenhum exercício encontrado para "{librarySearch}".
                </div>
              )}
            </div>

            {/* Criar Exercício Personalizado */}
            <form onSubmit={handleAddCustomExercise} className="pt-3 border-t border-[#262c3a] flex items-center gap-2">
              <input
                type="text"
                placeholder="Ou digite o nome de um exercício novo..."
                value={customExerciseName}
                onChange={(e) => setCustomExerciseName(e.target.value)}
                className="flex-1 bg-[#0a0c10] border border-[#262c3a] rounded-lg px-3 py-2 text-xs text-white placeholder-[#64748b] focus:border-[#d4af37] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#151a24] hover:bg-[#d4af37] text-[#cbd5e1] hover:text-black border border-[#262c3a] text-xs font-bold transition-all"
              >
                Criar e Incluir
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Atribuição Pós-Save */}
      {isAssignModalOpen && savedWorkoutForAssign && (
        <AssignWorkoutModal
          isOpen={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            onNavigate('/dashboard/treinos');
          }}
          workout={savedWorkoutForAssign}
          students={students}
          onAssignToStudents={(_workoutId, _studentIds) => {
            // Callback é delegado via App.jsx
            setIsAssignModalOpen(false);
            onNavigate('/dashboard/treinos');
          }}
        />
      )}
    </div>
  );
}
