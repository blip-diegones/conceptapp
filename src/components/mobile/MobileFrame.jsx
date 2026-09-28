import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFullView = isMobileScreen || deviceView === 'fullscreen';

  return (
    <div className="mobile-app-wrapper">
      {/* Barra de utilidades: no desktop permite alternar modos e alunos; no mobile é super compacta */}
      {(onNavigateBackToAdmin || (students.length > 0 && onSelectStudent)) && (
        <div className="mobile-top-bar">
          <div className="mobile-top-bar-left">
            {onNavigateBackToAdmin && (
              <button
                onClick={onNavigateBackToAdmin}
                className="btn btn-secondary btn-sm"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.375rem', 
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.65rem',
                  flexShrink: 0
                }}
                id="btn-back-to-admin"
              >
                <ArrowLeft size={14} />
                <span className="btn-back-text">Voltar ao Painel</span>
                <span className="btn-back-short-text">Painel</span>
              </button>
            )}

          {/* Seletor de Aluno Ativo */}
          {students.length > 0 && onSelectStudent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', minWidth: 0, flex: 1, justifyContent: 'flex-end' }}>
              <span className="btn-back-text" style={{ fontSize: '0.75rem', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                Aluno:
              </span>
              <select
                value={activeStudentId || ''}
                onChange={(e) => onSelectStudent(Number(e.target.value))}
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--gold-light)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer',
                  maxWidth: isMobileScreen ? '180px' : '260px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
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

        {/* Seletores de modo: exibidos apenas no Desktop */}
        <div className="mobile-top-bar-modes">
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
              gap: '0.3rem',
              transition: 'all 0.2s ease'
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
              gap: '0.3rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Monitor size={13} />
            <span>Tela Cheia</span>
          </button>
        </div>
      </div>
      )}

      {/* Palco centralizador do dispositivo */}
      <div className="mobile-frame-stage">
        <div className={`mobile-frame-device ${isFullView && !isMobileScreen ? 'mobile-frame-fullscreen' : ''}`}>
          
          {/* Status Bar simulada (exibida apenas no modo mockup desktop) */}
          {!isFullView && (
            <div className="mobile-status-bar">
              <span>18:42</span>
              <div style={{
                width: '84px',
                height: '18px',
                backgroundColor: '#000000',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.06)'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Wifi size={12} />
                <Battery size={13} />
              </div>
            </div>
          )}

          {/* Área interna rolável com o App CONCEPT */}
          <div className="mobile-scroll-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

