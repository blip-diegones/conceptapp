import React from 'react';
import { AlertCircle, MessageSquare, ArrowRight, Clock, ShieldAlert } from 'lucide-react';

export default function AttentionCard({ students, onOpenWhatsApp, onNavigate }) {
  // Filtra alunos em atenção (>= 7 dias sem treinar)
  const attentionStudents = students
    .filter(s => s.daysInactive >= 7)
    .sort((a, b) => b.daysInactive - a.daysInactive)
    .slice(0, 5); // top 5 para destaque no dashboard

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid rgba(244, 63, 94, 0.25)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 30px -10px rgba(244, 63, 94, 0.15)'
    }}>
      {/* Top Banner sutil */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-alert-bg)',
            color: 'var(--status-alert-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--status-alert-border)'
          }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Alunos que precisam de atenção
              </h2>
              <span className="badge badge-attention">
                <span className="badge-dot"></span>
                Risco de Evasão
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Alunos sem treinar há mais de 7 dias • Foco em retenção imediata
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/alunos?filter=attention')}
          className="btn btn-ghost btn-sm"
          style={{
            fontSize: '0.8125rem',
            color: '#fb7185',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          <span>Ver todos os 37</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Lista de Alunos em Risco */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {attentionStudents.map((student) => (
          <div
            key={student.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.15s ease',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Info do Aluno */}
            <div 
              onClick={() => onNavigate(`/alunos/${student.id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', cursor: 'pointer' }}
            >
              <img
                src={student.avatar}
                alt={student.name}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--border-medium)'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h4 style={{ 
                    fontSize: '0.9375rem', 
                    fontWeight: 700, 
                    color: '#ffffff',
                    transition: 'color 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                  >
                    {student.name}
                  </h4>
                  <span style={{
                    fontSize: '0.6875rem',
                    color: 'var(--text-faint)',
                    background: 'var(--bg-card)',
                    padding: '0.125rem 0.375rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {student.plan}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.15rem' }}>
                  <span>Objetivo: {student.goal}</span>
                </p>
              </div>
            </div>

            {/* Dias sem treino e Botão de Contato */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  color: student.daysInactive >= 10 ? '#fda4af' : '#fcd34d',
                  background: student.daysInactive >= 10 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${student.daysInactive >= 10 ? 'rgba(244, 63, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                }}>
                  <Clock size={12} />
                  {student.daysInactive} dias sem treinar
                </span>
                <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-faint)', marginTop: '0.125rem' }}>
                  Última visita: {student.lastWorkout}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWhatsApp(student);
                }}
                className="btn btn-whatsapp btn-sm"
                style={{
                  boxShadow: '0 2px 10px rgba(37, 211, 102, 0.25)',
                  minWidth: '95px'
                }}
                title={`Enviar mensagem no WhatsApp para ${student.name}`}
              >
                <MessageSquare size={14} />
                <span>Contato</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé explicativo do Pitch */}
      <div style={{
        marginTop: '1.25rem',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>💡 Pitch de Retenção:</span>
          <span>O GymFlow identifica o padrão de desistência antes que o aluno cancele o plano.</span>
        </div>
        <button
          onClick={() => onNavigate('/alunos?filter=attention')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--brand-primary)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Ver todos os 37 alunos em risco →
        </button>
      </div>
    </div>
  );
}
