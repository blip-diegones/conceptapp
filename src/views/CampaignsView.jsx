import React, { useState } from 'react';
import { 
  BellRing, 
  Send, 
  CheckCircle2, 
  Clock, 
  Users, 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  Flame, 
  Calendar,
  Gift,
  ShieldCheck,
  Check,
  AlertTriangle
} from 'lucide-react';
import ConceptLogo from '../components/ConceptLogo';

export default function CampaignsView({ 
  students = [], 
  onOpenWhatsApp, 
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('automations'); // 'automations' | 'broadcast'
  const [selectedStudentIds, setSelectedStudentIds] = useState([1]);
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Alunos em atenção (ausentes)
  const attentionStudents = students.filter(s => s.status === 'attention');

  const [automations, setAutomations] = useState([
    {
      id: 'auto-1',
      title: 'Resgate de Alunos Ausentes (7+ dias)',
      description: 'Dispara mensagem de incentivo para alunos que não treinam há mais de uma semana.',
      trigger: 'Ausência > 7 dias',
      channel: 'WhatsApp',
      active: true,
      recoveredCount: 14,
      icon: Flame,
      color: '#f43f5e'
    },
    {
      id: 'auto-2',
      title: 'Gamificação & Foco (Streak 4+ Semanas)',
      description: 'Celebra a consistência do aluno com um badge de Alta Performance.',
      trigger: 'Frequência > 85%',
      channel: 'Push + WhatsApp',
      active: true,
      recoveredCount: 32,
      icon: Sparkles,
      color: 'var(--gold-primary)'
    },
    {
      id: 'auto-3',
      title: 'Aniversariante CONCEPT CT',
      description: 'Mensagem de parabéns personalizada com convite para trazer 1 acompanhante para treinar.',
      trigger: 'Dia do aniversário',
      channel: 'WhatsApp',
      active: true,
      recoveredCount: 8,
      icon: Gift,
      color: '#a855f7'
    },
    {
      id: 'auto-4',
      title: 'Renovação de Plano Anual / Black',
      description: 'Notifica o aluno 5 dias antes do vencimento com link de renovação antecipada.',
      trigger: 'Vencimento em 5 dias',
      channel: 'WhatsApp + E-mail',
      active: false,
      recoveredCount: 19,
      icon: Calendar,
      color: '#10b981'
    }
  ]);

  const toggleAutomation = (id) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const toggleSelectStudent = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === attentionStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(attentionStudents.map(s => s.id));
    }
  };

  const handleSendBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setSelectedStudentIds([]);
    }, 3000);
  };

  return (
    <div className="content-body fade-in">
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Campanhas & Retenção Ativa
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--gold-border)',
              color: 'var(--gold-light)',
              fontSize: '0.6875rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Sparkles size={11} color="var(--gold-primary)" />
              Automação CONCEPT
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Régua de comunicação inteligente via WhatsApp para combater o cancelamento de matrículas e engajar seus alunos.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => setActiveTab(activeTab === 'automations' ? 'broadcast' : 'automations')}
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {activeTab === 'automations' ? (
              <>
                <Send size={14} />
                <span>Disparo Rápido em Lote</span>
              </>
            ) : (
              <>
                <BellRing size={14} />
                <span>Ver Réguas de Automação</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid de Métricas de Retenção */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Alunos Recuperados
            </span>
            <CheckCircle2 size={18} color="#10b981" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#ffffff' }}>
              18
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
              +28% este mês
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Voltaram a treinar após mensagem
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Taxa de Resposta WhatsApp
            </span>
            <MessageSquare size={18} color="var(--wa-brand)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#ffffff' }}>
              74.5%
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--wa-brand)' }}>
              Alta taxa
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Comunicação humanizada CT
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Alunos em Risco (Ausentes)
            </span>
            <AlertTriangle size={18} color="#f43f5e" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#f43f5e' }}>
              {attentionStudents.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              alunos
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Sem check-in há 7+ dias
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Receita Protegida
            </span>
            <TrendingUp size={18} color="var(--gold-primary)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: 'var(--gold-light)' }}>
              R$ 4.280
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Mensalidades preservadas
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('automations')}
          style={{
            padding: '0.75rem 1.25rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'automations' ? '2px solid var(--gold-primary)' : '2px solid transparent',
            color: activeTab === 'automations' ? 'var(--gold-light)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Réguas de Automação ({automations.filter(a => a.active).length} Ativas)
        </button>
        <button
          onClick={() => setActiveTab('broadcast')}
          style={{
            padding: '0.75rem 1.25rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'broadcast' ? '2px solid var(--gold-primary)' : '2px solid transparent',
            color: activeTab === 'broadcast' ? 'var(--gold-light)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Disparo Rápido em Lote ({attentionStudents.length} Alunos Ausentes)
        </button>
      </div>

      {/* Conteúdo da Tab: Réguas de Automação */}
      {activeTab === 'automations' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {automations.map(auto => {
            const Icon = auto.icon;
            return (
              <div 
                key={auto.id}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${auto.active ? 'var(--border-medium)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  opacity: auto.active ? 1 : 0.6,
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: auto.color
                    }}>
                      <Icon size={20} />
                    </div>

                    <button
                      onClick={() => toggleAutomation(auto.id)}
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        border: 'none',
                        background: auto.active ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-elevated)',
                        color: auto.active ? '#4ade80' : 'var(--text-faint)',
                        cursor: 'pointer'
                      }}
                    >
                      {auto.active ? '● Ativa' : '○ Pausada'}
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.375rem' }}>
                    {auto.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1rem' }}>
                    {auto.description}
                  </p>
                </div>

                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: 'var(--text-faint)'
                }}>
                  <span>Gatilho: <strong style={{ color: '#fff' }}>{auto.trigger}</strong></span>
                  <span>Canal: <strong style={{ color: 'var(--wa-brand)' }}>{auto.channel}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Conteúdo da Tab: Disparo em Lote */}
      {activeTab === 'broadcast' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Lista de Alunos Ausentes para Disparo */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                  Alunos Elegíveis para Resgate
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Selecione quem receberá a mensagem personalizada no WhatsApp
                </p>
              </div>

              <button
                type="button"
                onClick={handleSelectAll}
                className="btn btn-secondary btn-sm"
              >
                {selectedStudentIds.length === attentionStudents.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </button>
            </div>

            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {attentionStudents.map(student => {
                const isSelected = selectedStudentIds.includes(student.id);
                return (
                  <div
                    key={student.id}
                    onClick={() => toggleSelectStudent(student.id)}
                    style={{
                      padding: '0.875rem 1.5rem',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <img
                        src={student.avatar}
                        alt={student.name}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>
                          {student.name}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {student.phone} • {student.plan}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="badge badge-attention">
                        {student.daysInactive || 12} dias ausente
                      </span>

                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: isSelected ? 'none' : '1.5px solid var(--border-medium)',
                        background: isSelected ? 'var(--gold-gradient)' : 'transparent',
                        color: '#120e03',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Painel de Disparo e Prévia */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
              Prévia do Modelo CONCEPT
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              O nome do aluno será inserido dinamicamente na saudação.
            </p>

            <div style={{
              background: '#0b141a',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: '#005c4b',
                color: '#e9edef',
                padding: '0.75rem 1rem',
                borderRadius: '12px 12px 2px 12px',
                fontSize: '0.8125rem',
                lineHeight: '1.5'
              }}>
                Fala, <strong>[Nome do Aluno]</strong>! Sentimos sua falta aqui no <strong>CONCEPT Centro de Treinamento</strong> 💪
                <br /><br />
                Vimos que você não vem treinar há alguns dias. Bora retomar o ritmo? O time preparou uma progressão especial para você esta semana!
              </div>
            </div>

            {broadcastSent && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid #22c55e',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                color: '#86efac',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle2 size={16} />
                <span>Disparo em lote concluído com sucesso para os alunos selecionados!</span>
              </div>
            )}

            <button
              onClick={handleSendBroadcast}
              disabled={selectedStudentIds.length === 0}
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Send size={16} />
              <span>Enviar via WhatsApp ({selectedStudentIds.length} Alunos)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
