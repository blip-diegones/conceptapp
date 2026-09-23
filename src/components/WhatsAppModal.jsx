import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Phone, Sparkles } from 'lucide-react';

export default function WhatsAppModal({ student, onClose }) {
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    if (student) {
      const firstName = student.name.split(' ')[0];
      setMessage(
        `Fala, ${firstName}! Sentimos sua falta aqui na CONCEPT | Centro de Treinamento 💪\n\nFaz alguns dias que você não aparece no CT em São Lourenço. Bora voltar aos treinos? O time preparou uma progressão especial para você esta semana!`
      );
    }
  }, [student]);

  if (!student) return null;

  const handleSendWhatsApp = (isSimulationOnly = false) => {
    setSentSuccess(true);

    if (!isSimulationOnly) {
      const cleanPhone = student.phone.replace(/\D/g, '');
      const encodedMsg = encodeURIComponent(message);
      const url = `https://wa.me/55${cleanPhone}?text=${encodedMsg}`;
      window.open(url, '_blank');
    }

    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        {/* Header do Modal */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(37, 211, 102, 0.08) 0%, var(--bg-card) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--wa-bg)',
              color: 'var(--wa-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(37, 211, 102, 0.3)'
            }}>
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Enviar mensagem para {firstName}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Recuperação de aluno ausente há {student.daysInactive} dias • CONCEPT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{
              padding: '0.375rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-faint)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div style={{ padding: '1.5rem' }}>
          {sentSuccess ? (
            <div style={{
              padding: '2.5rem 1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#ffffff' }}>
                  WhatsApp Aberto com Sucesso!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                  A mensagem foi direcionada para <strong>{student.name}</strong> ({student.phone}). O contato foi registrado no sistema.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Card Resumo do Aluno */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={student.avatar}
                    alt={student.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>{student.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Phone size={11} /> {student.phone}
                    </span>
                  </div>
                </div>
                <span className="badge badge-attention">
                  {student.daysInactive} dias sem treinar
                </span>
              </div>

              {/* Pré-visualização da Mensagem */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span>MENSAGEM CONCEPT:</span>
                  <span style={{ color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Sparkles size={12} color="var(--gold-primary)" /> Retenção empática
                  </span>
                </label>
                
                <div style={{
                  background: '#0b141a',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  position: 'relative'
                }}>
                  <div style={{
                    background: '#005c4b',
                    color: '#e9edef',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px 12px 2px 12px',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        color: '#e9edef',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Escreva a mensagem..."
                    />
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '0.25rem',
                      fontSize: '0.6875rem',
                      color: 'rgba(255,255,255,0.6)',
                      marginTop: '0.5rem'
                    }}>
                      <span>18:42</span>
                      <span>✓✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <button
                  onClick={() => handleSendWhatsApp(false)}
                  className="btn btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    fontSize: '0.9375rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  id="btn-open-whatsapp"
                >
                  <Send size={18} />
                  <span>Abrir WhatsApp com Mensagem Pronta</span>
                </button>

                <button
                  onClick={() => handleSendWhatsApp(true)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', color: 'var(--text-muted)' }}
                >
                  Simular envio sem abrir WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
