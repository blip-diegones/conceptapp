import React from 'react';
import MetricCards from '../components/MetricCard';
import AttentionCard from '../components/AttentionCard';
import WeeklyChart from '../components/WeeklyChart';
import RecentActivity from '../components/RecentActivity';
import { Sparkles, Send } from 'lucide-react';

export default function DashboardView({ 
  stats, 
  students, 
  onOpenWhatsApp, 
  onNavigate 
}) {
  return (
    <div className="content-body fade-in">
      {/* 4 Cards Principais */}
      <MetricCards 
        stats={stats} 
        onFilterAttention={() => onNavigate('/alunos?filter=attention')} 
      />

      {/* Banner de Acesso Rápido ao Módulo de Treinos */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.12) 0%, rgba(16, 20, 27, 0.95) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e6ca65'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '0.6875rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: '#d4af37',
                background: 'rgba(212, 175, 55, 0.15)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(212, 175, 55, 0.25)'
              }}>
                NOVIDADE • CONCEPT CT
              </span>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Prescrição & Fichas de Treino
              </h3>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
              Gerencie as fichas dos seus alunos, configure séries/cargas e sincronize em tempo real com o app mobile do aluno.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/dashboard/treinos')}
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #d4af37 0%, #b38f2a 100%)',
            color: '#07080a',
            fontWeight: 700,
            border: 'none',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>Gerenciar treinos</span>
          <span>→</span>
        </button>
      </div>

      {/* Grid Principal: Seção de Atenção + Gráfico Semanal + Feed Recente */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Coluna Esquerda: O Core do Pitch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          {/* Card Destaque: Alunos que precisam de atenção */}
          <AttentionCard 
            students={students} 
            onOpenWhatsApp={onOpenWhatsApp} 
            onNavigate={onNavigate} 
          />

          {/* Gráfico de Frequência Semanal */}
          <WeeklyChart />
        </div>

        {/* Coluna Direita: Atividades em Tempo Real e Campanha Rápida */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          {/* Feed de Atividades Recentes */}
          <RecentActivity />

          {/* Mini-Card de Campanha de Retenção */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, var(--bg-card) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} color="var(--brand-primary)" />
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff' }}>
                Disparo Rápido para Evasão
              </h4>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Deseja enviar a mensagem padrão para todos os <strong>37 alunos</strong> ausentes de uma só vez?
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <button 
                onClick={() => {
                  const target = students.find(s => s.daysInactive >= 10) || students[0];
                  onOpenWhatsApp(target);
                }}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                <Send size={13} />
                <span>Simular Campanha em Massa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .content-body > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
