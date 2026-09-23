import React from 'react';
import { Dumbbell, Clock, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import ConceptLogo from '../../components/ConceptLogo';

export default function MobileWorkoutListView({ student, onStartWorkout }) {
  return (
    <div style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      paddingBottom: '2.5rem',
      backgroundColor: 'var(--bg-app)'
    }} className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Meus Treinos
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Fichas de sobrecarga prescritas pelo time CONCEPT
          </p>
        </div>
        <ConceptLogo size={32} showText={false} />
      </div>

      {/* Lista de Fichas CONCEPT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {student.allWorkouts.map((w) => {
          return (
            <div
              key={w.id}
              onClick={onStartWorkout}
              style={{
                background: w.active 
                  ? 'radial-gradient(circle at 100% 0%, #1f2735 0%, var(--bg-card) 100%)' 
                  : 'var(--bg-card)',
                border: w.active ? '1.5px solid var(--gold-border)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: w.active ? '0 8px 25px -8px rgba(212, 175, 55, 0.2)' : 'none'
              }}
            >
              {w.active && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  color: 'var(--gold-light)',
                  background: 'var(--gold-bg)',
                  border: '1px solid var(--gold-border)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <CheckCircle2 size={11} color="var(--gold-primary)" />
                  <span>Sugerido hoje</span>
                </div>
              )}

              <span style={{
                fontSize: '0.6875rem',
                fontWeight: 800,
                color: w.active ? 'var(--gold-light)' : 'var(--text-faint)',
                letterSpacing: '0.08em'
              }}>
                {w.tag}
              </span>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#ffffff', marginTop: '0.25rem' }}>
                {w.name}
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '0.75rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Dumbbell size={13} color="var(--gold-primary)" />
                  {w.exercises} exercícios
                </span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={13} />
                  {w.duration}
                </span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span>Último: {w.lastDone}</span>
              </div>

              <div style={{
                marginTop: '1rem',
                paddingTop: '0.875rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.75rem', color: w.active ? 'var(--gold-light)' : 'var(--text-muted)', fontWeight: 700 }}>
                  {w.active ? 'Clique para iniciar este treino' : 'Visualizar exercícios'}
                </span>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: w.active ? 'var(--gold-gradient)' : 'var(--bg-elevated)',
                  color: w.active ? '#120e03' : 'var(--text-faint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: w.active ? '0 2px 10px rgba(212, 175, 55, 0.3)' : 'none'
                }}>
                  {w.active ? <Play size={14} fill="#120e03" /> : <ChevronRight size={14} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
