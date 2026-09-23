import React from 'react';
import { Award, TrendingUp, Calendar, Dumbbell, Flame, ArrowUpRight, Zap } from 'lucide-react';
import ConceptLogo from '../../components/ConceptLogo';

export default function MobileEvolutionView({ student }) {
  return (
    <div style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      paddingBottom: '2.5rem',
      backgroundColor: 'var(--bg-app)'
    }} className="fade-in">
      
      {/* Header com Logo CONCEPT */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Minha Evolução
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Performance e progressão no Centro de Treinamento
          </p>
        </div>
        <ConceptLogo size={32} showText={false} />
      </div>

      {/* Cards de Frequência e Volume */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.875rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
            Esta Semana
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--gold-light)', marginTop: '0.25rem' }}>
            4 treinos
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
            Meta: 5 sessões
          </span>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
            Este Mês
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', marginTop: '0.25rem' }}>
            16 treinos
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--gold-light)', fontWeight: 700 }}>
            +2 vs mês anterior
          </span>
        </div>
      </div>

      {/* Gráfico Visual de Linha com Curva Dourada */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <TrendingUp size={16} color="var(--gold-primary)" />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
              Consistência Mensal
            </h4>
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
            Últimos 4 meses
          </span>
        </div>

        {/* Gráfico em SVG com gradiente dourado metálico */}
        <div style={{ height: '110px', width: '100%', position: 'relative' }}>
          <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="goldLineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Área Sombreada */}
            <path
              d="M 20,80 L 100,50 L 180,20 L 260,35 L 260,95 L 20,95 Z"
              fill="url(#goldLineGrad)"
            />

            {/* Linha Dourada */}
            <path
              d="M 20,80 L 100,50 L 180,20 L 260,35"
              fill="none"
              stroke="#d4af37"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pontos de Dados */}
            <circle cx="20" cy="80" r="4" fill="#d4af37" stroke="#07080a" strokeWidth="2" />
            <text x="20" y="70" fill="#94a3b8" fontSize="10" textAnchor="middle">12</text>

            <circle cx="100" cy="50" r="4" fill="#d4af37" stroke="#07080a" strokeWidth="2" />
            <text x="100" y="40" fill="#94a3b8" fontSize="10" textAnchor="middle">16</text>

            <circle cx="180" cy="20" r="5" fill="#f5d77f" stroke="#ffffff" strokeWidth="2" />
            <text x="180" y="12" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">20</text>

            <circle cx="260" cy="35" r="4" fill="#d4af37" stroke="#07080a" strokeWidth="2" />
            <text x="260" y="26" fill="#94a3b8" fontSize="10" textAnchor="middle">16</text>
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
          <span>Junho</span>
          <span>Julho</span>
          <span>Agosto</span>
          <span>Setembro</span>
        </div>
      </div>

      {/* Vitrine de Recordes Pessoais (PR's) CONCEPT */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Award size={18} color="var(--gold-primary)" />
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#ffffff' }}>
              Recordes Pessoais (PR's)
            </h4>
          </div>
          <span style={{
            fontSize: '0.6875rem',
            color: 'var(--gold-light)',
            fontWeight: 800,
            background: 'var(--gold-bg)',
            border: '1px solid var(--gold-border)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)'
          }}>
            Sobrecarga Progressiva
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {student.prs.map((pr, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: pr.isNew ? '1px solid var(--gold-border)' : '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
                    {pr.exercise}
                  </span>
                  {pr.isNew && (
                    <span style={{
                      fontSize: '0.625rem',
                      fontWeight: 800,
                      color: '#120e03',
                      background: 'var(--gold-gradient)',
                      padding: '0.1rem 0.35rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      NOVO PR
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {pr.previous} → <strong style={{ color: 'var(--gold-light)' }}>{pr.current}</strong>
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--gold-light)',
                  background: 'var(--gold-bg)',
                  border: '1px solid var(--gold-border)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <ArrowUpRight size={12} />
                  {pr.diff}
                </span>
                <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
                  {pr.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
