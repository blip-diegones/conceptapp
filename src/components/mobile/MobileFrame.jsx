import React, { useState } from 'react';
import { Smartphone, Monitor, ArrowLeft, Wifi, Battery } from 'lucide-react';

export default function MobileFrame({ 
  children, 
  onNavigateBackToAdmin,
  students = [],
  activeStudentId,
  onSelectStudent
}) {
  const [deviceView, setDeviceView] = useState('phone'); // 'phone' | 'fullscreen'
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFullView = isMobileScreen || deviceView === 'fullscreen';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: deviceView === 'phone' ? '#06080b' : 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Barra de utilidades do modo Desktop (facilita apresentação comercial e troca de aluno) */}
      <div style={{
        width: '100%',
        backgroundColor: '#0c0f14',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.625rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        zIndex: 60
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onNavigateBackToAdmin}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem' }}
            id="btn-back-to-admin"
          >
            <ArrowLeft size={14} />
            <span>Voltar ao Painel da Academia</span>
          </button>

          {/* Seletor de Aluno Ativo */}
          {students.length > 0 && onSelectStudent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                Visualizando como:
              </span>
              <select
                value={activeStudentId || ''}
                onChange={(e) => onSelectStudent(Number(e.target.value))}
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--gold-light)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
                id="select-active-student"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id} style={{ background: '#12161f', color: '#fff' }}>
                    {s.name} ({s.plan || 'Aluno'})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
            Modo:
          </span>
          <button
            onClick={() => setDeviceView('phone')}
            style={{
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: deviceView === 'phone' ? 'var(--brand-primary)' : 'var(--bg-elevated)',
              color: deviceView === 'phone' ? '#032014' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Smartphone size={13} />
            <span>Smartphone (390px)</span>
          </button>

          <button
            onClick={() => setDeviceView('fullscreen')}
            style={{
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: deviceView === 'fullscreen' ? 'var(--brand-primary)' : 'var(--bg-elevated)',
              color: deviceView === 'fullscreen' ? '#032014' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Monitor size={13} />
            <span>Tela Cheia</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Mobile */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: !isFullView ? 'center' : 'stretch',
        padding: !isFullView ? '1.5rem 0.5rem' : '0'
      }}>
        <div style={{
          width: '100%',
          maxWidth: !isFullView ? '410px' : '100%',
          minHeight: !isFullView ? '820px' : '100vh',
          maxHeight: !isFullView ? '880px' : 'none',
          backgroundColor: '#090c10',
          borderRadius: !isFullView ? '44px' : '0',
          border: !isFullView ? '10px solid #1a202c' : 'none',
          boxShadow: !isFullView ? '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Status Bar Mobile nativa */}
          <div style={{
            height: '38px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.25rem',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            userSelect: 'none',
            flexShrink: 0,
            zIndex: 40
          }}>
            <span>18:42</span>
            {/* Dynamic Island simulada */}
            <div style={{
              width: '84px',
              height: '18px',
              backgroundColor: '#000000',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.05)'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Wifi size={12} />
              <Battery size={13} />
            </div>
          </div>

          {/* Área com Scroll do App */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
