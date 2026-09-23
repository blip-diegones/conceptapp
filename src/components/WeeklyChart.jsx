import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { WEEKLY_CHART_DATA } from '../data/mockData';

export default function WeeklyChart() {
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Header do Gráfico */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              Frequência Semanal por Dia
            </h3>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Volume de presença registrado nas catracas do Centro de Treinamento CONCEPT
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
            78%
          </span>
          <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
            Média da semana
          </span>
        </div>
      </div>

      {/* Gráfico de Barras SVG Customizado */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '180px',
        paddingTop: '20px',
        paddingBottom: '10px',
        gap: '0.75rem'
      }}>
        {WEEKLY_CHART_DATA.map(item => {
          const isHovered = hoveredDay === item.day;
          const isPeak = item.isPeak;

          return (
            <div
              key={item.day}
              onMouseEnter={() => setHoveredDay(item.day)}
              onMouseLeave={() => setHoveredDay(null)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {/* Tooltip no hover */}
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  top: '-32px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-medium)',
                  color: '#ffffff',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  animation: 'fadeIn 0.15s ease'
                }}>
                  {item.checkins} check-ins ({item.percentage}%)
                </div>
              )}

              {/* Barra */}
              <div style={{
                width: '100%',
                maxWidth: '38px',
                height: `${item.percentage}%`,
                background: isPeak 
                  ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' 
                  : isHovered 
                    ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' 
                    : 'var(--bg-elevated)',
                border: isPeak ? '1px solid #34d399' : '1px solid var(--border-subtle)',
                borderRadius: '6px 6px 2px 2px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isPeak ? '0 0 14px rgba(16, 185, 129, 0.3)' : 'none',
                transform: isHovered ? 'scaleY(1.03)' : 'scaleY(1)',
                transformOrigin: 'bottom'
              }} />

              {/* Rótulo do dia */}
              <span style={{
                fontSize: '0.75rem',
                fontWeight: isPeak ? 800 : 600,
                color: isPeak ? 'var(--brand-primary)' : isHovered ? '#ffffff' : 'var(--text-faint)',
                marginTop: '0.5rem',
                transition: 'color 0.15s'
              }}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legenda e Insights */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '0.875rem',
        marginTop: '0.5rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-primary)', display: 'inline-block' }}></span>
          <span>Dia de pico: <strong>Terça-feira (88%)</strong></span>
        </div>
        <span style={{ color: 'var(--text-faint)' }}>Total sem.: 2.108 presenças</span>
      </div>
    </div>
  );
}
