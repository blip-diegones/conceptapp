import React from 'react';
import { Plus, Menu, Calendar, Building2, Smartphone } from 'lucide-react';

export default function Header({ onOpenNewStudent, onToggleMobileMenu, onOpenStudentApp }) {
  const todayFormatted = "Quarta-feira, 23 de setembro";

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 2.5rem',
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-app)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleMobileMenu}
          className="btn-ghost"
          style={{
            display: 'none',
            padding: '0.5rem',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            '@media (max-width: 1024px)': { display: 'flex' }
          }}
          id="btn-mobile-menu"
        >
          <Menu size={20} color="var(--text-main)" />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff' }}>
              Bom dia, Rafael 👋
            </h1>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--gold-bg)',
              color: 'var(--gold-light)',
              border: '1px solid var(--gold-border)'
            }}>
              CT Aberto
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Calendar size={13} color="var(--text-faint)" />
              {todayFormatted}
            </p>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600 }}>
              <Building2 size={13} color="var(--gold-primary)" />
              CONCEPT • São Lourenço - MG
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onOpenStudentApp}
          className="btn btn-secondary"
          id="btn-open-student-app"
          style={{
            borderColor: 'var(--gold-border)',
            background: 'var(--gold-bg)',
            color: 'var(--gold-light)',
            fontSize: '0.8125rem',
            fontWeight: 700
          }}
          title="Ver o app mobile como o aluno"
        >
          <Smartphone size={14} color="var(--gold-primary)" />
          <span>📱 App do Aluno</span>
        </button>

        <button 
          onClick={onOpenNewStudent}
          className="btn btn-primary"
          id="btn-add-student-header"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.125rem',
            fontSize: '0.875rem',
            fontWeight: 800
          }}
        >
          <Plus size={16} strokeWidth={3} />
          <span>+ Adicionar aluno</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #btn-mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
