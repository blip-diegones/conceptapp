import React from 'react';

export default function ConceptLogo({ size = 38, showText = true, textSub = "Centro de Treinamento" }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      {/* Brasão Circular com a letra C estilizada e elementos metálicos */}
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #2a313d 0%, #0a0c10 100%)',
        border: '1.5px solid #d4af37',
        boxShadow: '0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 8px rgba(212, 175, 55, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0
      }}>
        {/* Anel dourado interno sutil */}
        <div style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '50%',
          border: '1px solid rgba(243, 208, 120, 0.35)',
          pointerEvents: 'none'
        }} />

        {/* Letra C estilizada com corte geométrico de força / musculação */}
        <svg 
          viewBox="0 0 100 100" 
          style={{ width: `${size * 0.65}px`, height: `${size * 0.65}px`, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7dc89" />
              <stop offset="45%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#9b741d" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#d4af37" floodOpacity="0.5"/>
            </filter>
          </defs>

          {/* Letra C estilizada e atlética */}
          <path
            d="M 68,26 
               A 36,36 0 1,0 68,74 
               L 57,63 
               A 22,22 0 1,1 57,37 
               Z"
            fill="url(#goldGradient)"
            filter="url(#goldGlow)"
          />

          {/* Barra central que evoca barra de musculação / precisão */}
          <circle cx="50" cy="50" r="4.5" fill="#f7dc89" />
        </svg>
      </div>

      {showText && (
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{
              fontSize: size > 40 ? '1.25rem' : '1.0625rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              color: '#ffffff',
              textTransform: 'uppercase',
              lineHeight: 1
            }}>
              CONCEPT
            </span>
            <span style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#d4af37'
            }} />
          </div>
          <span style={{
            display: 'block',
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#c59b27',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginTop: '0.2rem',
            whiteSpace: 'nowrap'
          }}>
            {textSub}
          </span>
        </div>
      )}
    </div>
  );
}
