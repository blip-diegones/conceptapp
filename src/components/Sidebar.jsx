import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  QrCode, 
  BellRing, 
  Sparkles,
  LogOut, 
  ChevronRight,
  ShieldAlert,
  Flame
} from 'lucide-react';
import ConceptLogo from './ConceptLogo';

export default function Sidebar({ currentRoute, onNavigate, warningCount, isOpen, onClose }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
    { id: 'alunos', label: 'Alunos', icon: Users, route: '/alunos', badge: warningCount ? `${warningCount}` : null, badgeType: 'alert' },
    { id: 'treinos', label: 'Treinos', icon: Dumbbell, route: '/dashboard/treinos', badge: 'Fichas' },
    { id: 'checkins', label: 'Check-ins', icon: QrCode, route: '/dashboard/checkins', badge: 'Ao vivo' },
    { id: 'campanhas', label: 'Campanhas', icon: BellRing, route: '/dashboard/campanhas', badge: 'Retenção' },
    { id: 'app-aluno', label: '📱 App do Aluno', icon: Sparkles, route: '/app', badge: 'CONCEPT' },
  ];

  return (
    <>
      {/* Backdrop mobile */}
      {isOpen && (
        <div 
          onClick={onClose} 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 40,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <aside style={{
        width: '260px',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...(window.innerWidth <= 1024 ? {
          position: 'fixed',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: isOpen ? '0 0 40px rgba(0,0,0,0.8)' : 'none'
        } : {})
      }}>
        {/* Branding CONCEPT */}
        <div style={{
          padding: '1.5rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ConceptLogo size={38} textSub="Centro de Treinamento" />
          </div>

          {/* Seletor da Unidade CONCEPT */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '0.625rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'var(--gold-gradient)',
                color: '#120e03',
                fontSize: '0.6875rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                CT
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ 
                  fontSize: '0.8125rem', 
                  fontWeight: 800, 
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  São Lourenço - MG
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--gold-light)' }}>@concept_ct_</p>
              </div>
            </div>
            <ChevronRight size={14} color="var(--text-faint)" />
          </div>
        </div>

        {/* Menu Principal */}
        <nav style={{ padding: '1.25rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ 
            fontSize: '0.6875rem', 
            fontWeight: 800, 
            color: 'var(--text-faint)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em',
            padding: '0.5rem 0.75rem 0.25rem'
          }}>
            Gestão & Retenção
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route || (item.id === 'alunos' && currentRoute.startsWith('/alunos'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.route);
                  if (onClose) onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6875rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? 'var(--gold-primary)' : 'var(--text-faint)'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: item.badgeType === 'alert' ? 'var(--status-alert-bg)' : 'var(--gold-bg)',
                    color: item.badgeType === 'alert' ? 'var(--status-alert-color)' : 'var(--gold-light)',
                    border: item.badgeType === 'alert' ? '1px solid var(--status-alert-border)' : '1px solid var(--gold-border)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Destaque de Evasão */}
          <div style={{
            marginTop: 'auto',
            background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.08) 0%, rgba(20, 24, 33, 0.4) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-alert-color)' }}>
              <ShieldAlert size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Alerta de Evasão
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              <strong>37 alunos</strong> ausentes há mais de 7 dias. Recupere com mensagens automáticas.
            </p>
            <button 
              onClick={() => {
                onNavigate('/alunos?filter=attention');
                if (onClose) onClose();
              }}
              style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fca5a5',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: '0.25rem'
              }}
            >
              Ver alunos em risco →
            </button>
          </div>
        </nav>

        {/* Rodapé / Rafael Alencar */}
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Rafael Alencar"
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--gold-border)' }}
            />
            <div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
                Rafael Alencar
              </p>
              <p style={{ fontSize: '0.6875rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                Head Coach & Gestor
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/login')}
            title="Sair / Trocar Acesso"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-faint)',
              cursor: 'pointer',
              padding: '0.375rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
