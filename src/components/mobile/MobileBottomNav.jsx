import React from 'react';
import { Home, Dumbbell, TrendingUp, User } from 'lucide-react';

export default function MobileBottomNav({ currentRoute, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home, path: '/app' },
    { id: 'workout', label: 'Meu Treino', icon: Dumbbell, path: '/app/treino' },
    { id: 'evolution', label: 'Evolução', icon: TrendingUp, path: '/app/evolucao' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/app/perfil' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      height: '68px',
      backgroundColor: 'rgba(13, 16, 21, 0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 50,
      padding: '0 0.5rem',
      userSelect: 'none'
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentRoute === tab.path || 
          (tab.id === 'workout' && currentRoute.startsWith('/app/treino'));

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.path)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'var(--brand-primary)' : 'var(--text-faint)',
              transition: 'all 0.15s ease',
              position: 'relative'
            }}
          >
            {/* Indicador de barra ativa no topo do ícone */}
            {isActive && (
              <span style={{
                position: 'absolute',
                top: 0,
                width: '32px',
                height: '3px',
                borderRadius: '0 0 3px 3px',
                background: 'var(--brand-primary)',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)'
              }} />
            )}

            <div style={{
              transform: isActive ? 'translateY(-1px) scale(1.06)' : 'none',
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>

            <span style={{
              fontSize: '0.6875rem',
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '-0.01em'
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
