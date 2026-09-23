import React from 'react';
import { 
  Flame, 
  Dumbbell, 
  Play, 
  Award, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import ConceptLogo from '../../components/ConceptLogo';

const InstagramIcon = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function MobileHomeView({ 
  student, 
  checkedIn, 
  onOpenCheckin, 
  onStartWorkout, 
  onNavigate 
}) {
  return (
    <div style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      paddingBottom: '2.5rem',
      backgroundColor: 'var(--bg-app)'
    }} className="fade-in">
      
      {/* Top Branding CONCEPT */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '0.875rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <ConceptLogo size={36} textSub="São Lourenço - MG" />

        <a 
          href="https://instagram.com/concept_ct_" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.6875rem',
            color: 'var(--gold-light)',
            background: 'var(--gold-bg)',
            border: '1px solid var(--gold-border)',
            padding: '0.25rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          <InstagramIcon size={12} color="var(--gold-primary)" />
          <span>@concept_ct_</span>
        </a>
      </div>

      {/* Header do Aluno */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={student.avatar}
              alt={student.name}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--gold-primary)',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              border: '2px solid var(--bg-card)'
            }} />
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Área do Atleta
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Bom dia, {student.firstName} 👋
            </h2>
            <p style={{ fontSize: '0.6875rem', color: 'var(--gold-light)', fontWeight: 600, marginTop: '0.15rem' }}>
              {student.unit}
            </p>
          </div>
        </div>

        {/* Badge de Sequência 🔥 com acabamento metálico */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(17, 20, 27, 0.8) 100%)',
          border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-full)',
          padding: '0.35rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
        }}>
          <Flame size={15} color="#d4af37" fill="#d4af37" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--gold-light)' }}>
            {student.streakDays} dias
          </span>
        </div>
      </div>

      {/* Widget de Check-in Elegante CONCEPT */}
      <div style={{
        background: checkedIn 
          ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.12) 0%, var(--bg-card) 100%)' 
          : 'linear-gradient(135deg, #131720 0%, #0d1016 100%)',
        border: checkedIn ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.2s',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: checkedIn ? 'var(--status-active-bg)' : 'rgba(212, 175, 55, 0.1)',
            color: checkedIn ? 'var(--status-active-color)' : 'var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: checkedIn ? '1px solid var(--status-active-border)' : '1px solid var(--gold-border)'
          }}>
            {checkedIn ? <CheckCircle2 size={20} /> : <Dumbbell size={18} />}
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
              {checkedIn ? 'Check-in de Demonstração Ativo' : 'Você está na CONCEPT?'}
            </h4>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
              {checkedIn ? 'Presença simulada às 18:42 no protótipo' : 'Simule o check-in no CT em 1 toque'}
            </span>
          </div>
        </div>

        {checkedIn ? (
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 800,
            color: 'var(--status-active-color)',
            background: 'var(--status-active-bg)',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--status-active-border)'
          }}>
            Check-in ✓
          </span>
        ) : (
          <button
            onClick={onOpenCheckin}
            className="btn btn-primary btn-sm"
            id="btn-mobile-checkin"
          >
            Check-in
          </button>
        )}
      </div>

      {/* Hero Card — Treino do Dia (Estética de Centro de Treinamento) */}
      <div style={{
        background: 'radial-gradient(circle at 80% 20%, #202735 0%, #0d1117 100%)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '20px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(212, 175, 55, 0.15)'
      }}>
        {/* Glow dourado sutil de fundo */}
        <div style={{
          position: 'absolute',
          top: '-25px',
          right: '-25px',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'rgba(212, 175, 55, 0.12)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--gold-light)',
            background: 'var(--gold-bg)',
            border: '1px solid var(--gold-border)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            {student.currentWorkout.tag}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={12} color="var(--gold-primary)" /> {student.currentWorkout.estimatedMinutes} min
          </span>
        </div>

        <h3 style={{ fontSize: '1.375rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff', marginTop: '0.35rem' }}>
          {student.currentWorkout.title}
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          6 exercícios de alta sobrecarga • Foco em Peito e Tríceps
        </p>

        {/* Botão de Começar Treino */}
        <button
          onClick={onStartWorkout}
          className="btn btn-primary"
          id="btn-start-workout-hero"
          style={{
            width: '100%',
            marginTop: '1.25rem',
            padding: '0.875rem',
            fontSize: '0.9375rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Play size={18} fill="#120e03" />
          <span>COMEÇAR TREINO AGORA</span>
        </button>
      </div>

      {/* Sequência e Consistência Semanal */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Flame size={16} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#ffffff' }}>
              {student.streakDays} dias seguidos
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 700 }}>
            {student.weeklyPercent}% da meta
          </span>
        </div>

        {/* Barra de Progresso Dourada */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: `${student.weeklyPercent}%`,
            height: '100%',
            background: 'var(--gold-gradient)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)'
          }} />
        </div>

        {/* Dias da Semana (Seg a Dom) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.25rem' }}>
          {student.weeklyActivity.map((day, idx) => (
            <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                margin: '0 auto 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                background: day.done 
                  ? 'var(--gold-gradient)' 
                  : day.isToday 
                    ? 'rgba(212, 175, 55, 0.2)' 
                    : 'var(--bg-elevated)',
                color: day.done ? '#120e03' : day.isToday ? 'var(--gold-light)' : 'var(--text-faint)',
                border: day.isToday ? '1px solid var(--gold-primary)' : 'none'
              }}>
                {day.done ? '✓' : day.day.slice(0, 1)}
              </div>
              <span style={{ fontSize: '0.6875rem', color: day.isToday ? '#ffffff' : 'var(--text-faint)', fontWeight: day.isToday ? 700 : 500 }}>
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recordes Pessoais Recentes (PR's) */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Award size={16} color="var(--gold-primary)" />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
              Recordes Pessoais (PR's)
            </h4>
          </div>
          <button 
            onClick={() => onNavigate('/app/evolucao')} 
            style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Ver todos →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {student.prs.slice(0, 2).map((pr, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8125rem'
              }}
            >
              <div>
                <span style={{ fontWeight: 800, color: '#ffffff', display: 'block' }}>{pr.exercise}</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>{pr.previous} → <strong style={{ color: 'var(--gold-light)' }}>{pr.current}</strong></span>
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--gold-light)',
                background: 'var(--gold-bg)',
                border: '1px solid var(--gold-border)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {pr.diff}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
