import React from 'react';
import { Users, UserCheck, AlertTriangle, TrendingUp, Flame } from 'lucide-react';

export default function MetricCards({ stats, onFilterAttention }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.25rem',
      marginBottom: '2rem'
    }}>
      {/* Card 1: Total de Alunos */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 0.2s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Total de Alunos
          </span>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Users size={18} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1 }}>
            {stats.totalStudents}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.625rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              Matrículas ativas na CONCEPT (São Lourenço)
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Alunos Ativos */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Alunos Ativos
          </span>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-active-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--status-active-color)',
            border: '1px solid var(--status-active-border)'
          }}>
            <UserCheck size={18} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--status-active-color)', lineHeight: 1 }}>
            {stats.activeStudents}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.625rem' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              color: 'var(--status-active-color)', 
              fontWeight: 600,
              background: 'var(--status-active-bg)',
              padding: '0.125rem 0.375rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              73% da base
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              Treinando regularmente
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Alunos em Atenção (Ausentes) */}
      <div 
        onClick={onFilterAttention}
        style={{
          background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.08) 0%, var(--bg-card) 100%)',
          border: '1px solid var(--status-alert-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
        }}
        title="Clique para filtrar alunos em atenção"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fda4af' }}>
              Alunos Ausentes
            </span>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#ffffff',
              background: 'var(--status-alert-color)',
              padding: '0.125rem 0.375rem',
              borderRadius: 'var(--radius-full)'
            }}>
              CRÍTICO
            </span>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-alert-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--status-alert-color)',
            border: '1px solid var(--status-alert-border)'
          }}>
            <AlertTriangle size={18} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fb7185', lineHeight: 1 }}>
            {stats.warningStudents}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.625rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: 600 }}>
              Sem treinar há +7 dias
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              (Ver lista ↓)
            </span>
          </div>
        </div>
      </div>

      {/* Card 4: Frequência esta semana */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={16} color="var(--brand-primary)" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Frequência esta semana
            </span>
          </div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--brand-primary)',
            background: 'var(--status-active-bg)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--status-active-border)'
          }}>
            <TrendingUp size={12} />
            {stats.weeklyFrequencyDiff}
          </span>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1 }}>
            {stats.weeklyFrequency}%
          </div>
          
          {/* Barra de Progresso elegante */}
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: `${stats.weeklyFrequency}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem', fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
              <span>Meta da academia: 75%</span>
              <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>Acima da meta ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
