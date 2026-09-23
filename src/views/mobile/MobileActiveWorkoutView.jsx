import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Timer, 
  Flame, 
  Trophy, 
  Zap
} from 'lucide-react';

export default function MobileActiveWorkoutView({ 
  workout, 
  onFinishWorkout, 
  onCloseWorkout,
  onNavigateToEvolution
}) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercisesState, setExercisesState] = useState(workout.exercises);
  const [elapsedSeconds, setElapsedSeconds] = useState(52 * 60 - 90); // Próximo de 50 min para demonstração rápida
  const [restTimer, setRestTimer] = useState(null); // Temporizador de descanso
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = exercisesState[currentExerciseIndex];
  const totalExercises = exercisesState.length;

  // Cronômetro do Treino
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Contagem regressiva de descanso
  useEffect(() => {
    if (restTimer === null || restTimer <= 0) return;
    const interval = setInterval(() => {
      setRestTimer(prev => (prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [restTimer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Alterna status de conclusão de uma série
  const toggleSetCompleted = (setIndex) => {
    setExercisesState(prev => {
      const updated = [...prev];
      const ex = { ...updated[currentExerciseIndex] };
      const sets = [...ex.sets];
      const targetSet = { ...sets[setIndex] };

      targetSet.completed = !targetSet.completed;
      sets[setIndex] = targetSet;
      ex.sets = sets;
      updated[currentExerciseIndex] = ex;

      if (targetSet.completed) {
        setRestTimer(60);
      }

      return updated;
    });
  };

  // Atualiza carga ou reps
  const updateSetValue = (setIndex, field, value) => {
    setExercisesState(prev => {
      const updated = [...prev];
      const ex = { ...updated[currentExerciseIndex] };
      const sets = [...ex.sets];
      sets[setIndex] = { ...sets[setIndex], [field]: Number(value) || 0 };
      ex.sets = sets;
      updated[currentExerciseIndex] = ex;
      return updated;
    });
  };

  // Adiciona nova série
  const handleAddSet = () => {
    setExercisesState(prev => {
      const updated = [...prev];
      const ex = { ...updated[currentExerciseIndex] };
      const lastSet = ex.sets[ex.sets.length - 1] || { load: 20, reps: 10 };
      const newSetNumber = ex.sets.length + 1;
      ex.sets = [...ex.sets, { setNumber: newSetNumber, load: lastSet.load, reps: lastSet.reps, completed: false }];
      updated[currentExerciseIndex] = ex;
      return updated;
    });
  };

  // Próximo exercício ou finaliza
  const handleNextOrFinish = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setRestTimer(null);
    } else {
      setIsCompleted(true);
      onFinishWorkout();
    }
  };

  // Tela de Vitória / Conclusão com Destaque de PR
  if (isCompleted) {
    return (
      <div style={{
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 25%, #1c222e 0%, #07080a 100%)'
      }} className="fade-in">
        
        {/* Brasão de Vitória Dourado */}
        <div style={{
          width: '88px',
          height: '88px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(11, 14, 20, 0.9) 100%)',
          border: '2px solid var(--gold-primary)',
          boxShadow: '0 0 35px rgba(212, 175, 55, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold-light)',
          marginBottom: '1.25rem',
          animation: 'modal-zoom 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <Trophy size={46} />
        </div>

        <span style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--gold-light)',
          background: 'var(--gold-bg)',
          border: '1px solid var(--gold-border)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)'
        }}>
          CONCEPT • SESSÃO CONCLUÍDA
        </span>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          Treino Finalizado! 🔥
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Excelente performance no Centro de Treinamento, Lucas!
        </p>

        {/* Banner de NOVO RECORDE PESSOAL (PR) */}
        <div style={{
          width: '100%',
          maxWidth: '330px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(20, 24, 32, 0.9) 100%)',
          border: '1px solid var(--gold-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '0.875rem 1rem',
          margin: '1.25rem 0 0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#120e03',
            flexShrink: 0
          }}>
            <Zap size={18} fill="#120e03" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Novo Recorde Pessoal (PR)
            </span>
            <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Supino Reto: 50 kg/lado (+25%)
            </p>
          </div>
        </div>

        {/* Resumo do Treino */}
        <div style={{
          width: '100%',
          maxWidth: '330px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          margin: '1rem 0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.375rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
              52 min
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Duração Total</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.375rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
              6 exerc.
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Exercícios</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.375rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
              18 séries
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Volume Concluído</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
              <Flame size={18} color="var(--gold-primary)" fill="var(--gold-primary)" /> 5 dias
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Sequência Ativa</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{ width: '100%', maxWidth: '330px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={onNavigateToEvolution}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem' }}
          >
            <span>Ver Minha Evolução</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onCloseWorkout}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            Voltar para o Início
          </button>
        </div>
      </div>
    );
  }

  // Visualização de Execução Ativa do Treino
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      backgroundColor: '#07080a'
    }} className="fade-in">
      {/* Top Header com Timer e Fechar */}
      <div style={{
        padding: '0.875rem 1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--gold-primary)',
            boxShadow: '0 0 8px var(--gold-primary)',
            animation: 'pulse-dot 1.5s infinite'
          }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
            {workout.tag} • CONCEPT CT
          </span>
        </div>

        {/* Cronômetro */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          background: 'var(--bg-elevated)',
          padding: '0.3rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--gold-border)',
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: 'var(--gold-light)',
          fontFamily: 'var(--font-mono)'
        }}>
          <Timer size={14} color="var(--gold-primary)" />
          <span>{formatTimer(elapsedSeconds)}</span>
        </div>

        <button
          onClick={onCloseWorkout}
          className="btn-ghost"
          style={{ padding: '0.25rem', border: 'none', cursor: 'pointer', color: 'var(--text-faint)' }}
          title="Sair"
        >
          <X size={18} />
        </button>
      </div>

      {/* Barra de Progresso de Exercícios */}
      <div style={{ width: '100%', height: '3px', background: 'var(--bg-elevated)' }}>
        <div style={{
          width: `${((currentExerciseIndex + 1) / totalExercises) * 100}%`,
          height: '100%',
          background: 'var(--gold-gradient)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Área do Exercício Atual */}
      <div style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--gold-light)',
            letterSpacing: '0.06em'
          }}>
            EXERCÍCIO {String(currentExerciseIndex + 1).padStart(2, '0')} / {String(totalExercises).padStart(2, '0')}
          </span>

          <h2 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '0.15rem' }}>
            {currentExercise.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentExercise.muscle}
            </span>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 600 }}>
              Sugerido: {currentExercise.suggestedLoad}
            </span>
          </div>
        </div>

        {/* Descanso Regressivo */}
        {restTimer !== null && (
          <div style={{
            background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, rgba(20, 24, 32, 0.9) 100%)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Timer size={16} color="var(--gold-primary)" />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 700 }}>Intervalo de Descanso:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff', marginLeft: '0.375rem', fontFamily: 'var(--font-mono)' }}>
                  {restTimer}s
                </span>
              </div>
            </div>
            <button
              onClick={() => setRestTimer(null)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              Pular
            </button>
          </div>
        )}

        {/* Tabela de Séries */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '45px 1fr 1fr 50px',
            padding: '0.625rem 0.875rem',
            background: 'var(--bg-sidebar)',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--text-faint)',
            textAlign: 'center'
          }}>
            <span>SÉRIE</span>
            <span>CARGA (KG)</span>
            <span>REPS</span>
            <span>CHECK</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {currentExercise.sets.map((set, setIdx) => (
              <div
                key={setIdx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '45px 1fr 1fr 50px',
                  alignItems: 'center',
                  padding: '0.625rem 0.875rem',
                  borderBottom: setIdx < currentExercise.sets.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  background: set.completed ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                  transition: 'background-color 0.15s'
                }}
              >
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-muted)', textAlign: 'center' }}>
                  {set.setNumber}
                </span>

                <div style={{ padding: '0 0.375rem' }}>
                  <input
                    type="number"
                    value={set.load}
                    onChange={(e) => updateSetValue(setIdx, 'load', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.35rem 0.5rem',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                </div>

                <div style={{ padding: '0 0.375rem' }}>
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSetValue(setIdx, 'reps', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.35rem 0.5rem',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => toggleSetCompleted(setIdx)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: set.completed ? 'none' : '1px solid var(--border-medium)',
                      background: set.completed ? 'var(--gold-gradient)' : 'var(--bg-elevated)',
                      color: set.completed ? '#120e03' : 'var(--text-faint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Check size={16} strokeWidth={set.completed ? 3 : 2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adicionar Série */}
        <button
          onClick={handleAddSet}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', borderStyle: 'dashed' }}
        >
          <Plus size={14} />
          <span>+ Adicionar série</span>
        </button>
      </div>

      {/* Barra Inferior com Navegação de Exercício */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-sidebar)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        {currentExerciseIndex > 0 && (
          <button
            onClick={() => setCurrentExerciseIndex(prev => prev - 1)}
            className="btn btn-secondary"
            style={{ padding: '0.75rem' }}
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <button
          onClick={handleNextOrFinish}
          className="btn btn-primary"
          style={{
            flex: 1,
            padding: '0.875rem',
            fontSize: '0.9375rem',
            fontWeight: 800
          }}
          id="btn-next-exercise"
        >
          <span>
            {currentExerciseIndex === totalExercises - 1 ? 'Concluir Treino 🔥' : 'Próximo Exercício'}
          </span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
