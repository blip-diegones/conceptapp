import React from 'react';
import { QrCode, ShieldCheck, MapPin, Calendar, Award, ArrowLeft } from 'lucide-react';
import ConceptLogo from '../../components/ConceptLogo';

const InstagramIcon = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function MobileProfileView({ student, onNavigateBackToAdmin }) {
  return (
    <div style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      paddingBottom: '2.5rem',
      backgroundColor: 'var(--bg-app)'
    }} className="fade-in">
      <div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Meu Perfil
        </h2>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Carteirinha digital e dados de atleta CONCEPT
        </p>
      </div>

      {/* Carteirinha Digital com Brasão CONCEPT */}
      <div style={{
        background: 'radial-gradient(circle at 100% 0%, #1f2735 0%, #0a0c10 100%)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: '24px',
        padding: '1.5rem',
        boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.9), 0 0 20px -5px rgba(212, 175, 55, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Marca d'água CONCEPT */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '-15px',
          fontSize: '3.5rem',
          fontWeight: 900,
          color: 'rgba(212, 175, 55, 0.04)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          CONCEPT
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <ConceptLogo size={36} textSub="Centro de Treinamento" />
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 800,
            background: 'var(--gold-gradient)',
            color: '#120e03',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-full)'
          }}>
            {student.plan}
          </span>
        </div>

        {/* QR Code e Dados do Aluno */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          background: 'var(--bg-app)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          {/* QR Code em container com borda dourada sutil */}
          <div style={{
            width: '82px',
            height: '82px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#000000">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h4v4h-4v-4zm-4 2h2v2h-2v-2zm8-2h2v4h-2v-4zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
            </svg>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>
              {student.name}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', display: 'block', marginTop: '0.15rem' }}>
              Matrícula: <strong style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>{student.enrollmentId}</strong>
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--gold-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.35rem' }}>
              <ShieldCheck size={12} color="var(--gold-primary)" /> QR Code de demonstração • Protótipo CONCEPT
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>São Lourenço - MG</span>
          <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>@concept_ct_</span>
        </div>
      </div>

      {/* Resumo de Conquistas */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        textAlign: 'center'
      }}>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', display: 'block' }}>
            38
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>Treinos Totais</span>
        </div>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--gold-light)', display: 'block' }}>
            92%
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>Presença</span>
        </div>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--gold-primary)', display: 'block' }}>
            4 sem.
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>Sequência</span>
        </div>
      </div>

      {/* Alternador de Modo Demo: Voltar para Admin */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
          Demonstração Comercial CONCEPT
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Você está navegando como o atleta <strong>Lucas Almeida</strong>. Deseja retornar ao painel da gestão da CONCEPT?
        </p>
        <button
          onClick={onNavigateBackToAdmin}
          className="btn btn-secondary"
          style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
          id="btn-return-admin-profile"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Painel da Academia</span>
        </button>
      </div>
    </div>
  );
}
