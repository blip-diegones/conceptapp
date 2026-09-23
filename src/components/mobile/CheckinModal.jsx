import React from 'react';
import { CheckCircle2, Dumbbell, MapPin, X } from 'lucide-react';
import ConceptLogo from '../ConceptLogo';

export default function CheckinModal({ isOpen, onClose, onStartWorkout }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ padding: '1rem' }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '360px',
          borderRadius: '24px',
          background: 'linear-gradient(180deg, #131722 0%, #07090d 100%)',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          border: '1.5px solid var(--gold-border)',
          boxShadow: 'var(--shadow-modal)'
        }}
      >
        {/* Brasão CONCEPT no topo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <ConceptLogo size={52} showText={false} />
        </div>

        <span style={{
          fontSize: '0.6875rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--gold-light)',
          background: 'var(--gold-bg)',
          border: '1px solid var(--gold-border)',
          padding: '0.2rem 0.65rem',
          borderRadius: 'var(--radius-full)'
        }}>
          Check-in de Demonstração
        </span>

        <h3 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ffffff', marginTop: '0.75rem', letterSpacing: '-0.02em' }}>
          Presença Simulada com Sucesso!
        </h3>

        <div style={{
          marginTop: '0.75rem',
          padding: '0.875rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8125rem'
        }}>
          <p style={{ fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
            <MapPin size={14} color="var(--gold-primary)" />
            CONCEPT | Centro de Treinamento
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', display: 'block', marginTop: '0.25rem', fontWeight: 600 }}>
            São Lourenço - MG • Protótipo CONCEPT
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)', display: 'block', marginTop: '0.2rem' }}>
            23 de Setembro • 18:42
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, marginTop: '1.25rem' }}>
          Bom treino, Lucas! Força e foco. 💪
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => {
              onClose();
              onStartWorkout();
            }}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem' }}
          >
            <Dumbbell size={16} />
            <span>Abrir Treino A de Hoje</span>
          </button>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
