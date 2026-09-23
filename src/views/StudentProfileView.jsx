import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Calendar, 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  AlertTriangle,
  Award,
  Edit3,
  UserPlus,
  CheckCircle2
} from 'lucide-react';
import ConceptLogo from '../components/ConceptLogo';

export default function StudentProfileView({ 
  studentId, 
  students, 
  workouts = [],
  onAssignWorkout,
  onNavigate, 
  onOpenWhatsApp 
}) {
  const [isSelectWorkoutModalOpen, setIsSelectWorkoutModalOpen] = useState(false);
  const [selectedWorkoutToAssign, setSelectedWorkoutToAssign] = useState('');
  const student = students.find(s => s.id === Number(studentId)) || students[0];

  if (!student) {
    return (
      <div className="content-body">
        <button onClick={() => onNavigate('/alunos')} className="btn btn-secondary">
          <ArrowLeft size={16} /> Voltar para lista de alunos
        </button>
        <p style={{ marginTop: '2rem' }}>Aluno não encontrado.</p>
      </div>
    );
  }

  const isAttention = student.status === 'attention';

  return (
    <div className="content-body fade-in">
      {/* Botão de Voltar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => onNavigate('/alunos')}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <ArrowLeft size={16} />
          <span>Voltar para Alunos</span>
        </button>

        <ConceptLogo size={32} showText={false} />
      </div>

      {/* Header do Perfil do Aluno */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {isAttention && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'var(--status-alert-color)'
          }} />
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Foto e Informações Principais */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={student.avatar}
                alt={student.name}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${isAttention ? 'var(--status-alert-color)' : 'var(--gold-primary)'}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}
              />
              <span style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: isAttention ? 'var(--status-alert-color)' : 'var(--status-active-color)',
                border: '3px solid var(--bg-card)'
              }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.625rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff' }}>
                  {student.name}
                </h2>
                <span className={`badge badge-${student.status}`}>
                  <span className="badge-dot"></span>
                  {student.statusLabel}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--gold-light)',
                  background: 'var(--gold-bg)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--gold-border)'
                }}>
                  {student.plan}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Calendar size={14} color="var(--text-faint)" />
                  Matrícula: {student.joinDate}
                </span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Telefone: <strong>{student.phone}</strong>
                </span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                  CONCEPT • São Lourenço - MG
                </span>
              </div>
            </div>
          </div>

          {/* Botão de Contato WhatsApp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => onOpenWhatsApp(student)}
              className="btn btn-whatsapp"
              id="btn-profile-whatsapp"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <MessageSquare size={16} />
              <span>Enviar WhatsApp de Retenção</span>
            </button>
          </div>
        </div>

        {/* Alerta de Retenção */}
        {isAttention && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-alert-bg)',
            border: '1px solid var(--status-alert-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertTriangle size={20} color="var(--status-alert-color)" />
              <div>
                <strong style={{ color: '#fda4af', fontSize: '0.875rem' }}>
                  Atenção: {student.name.split(' ')[0]} está há {student.daysInactive} dias sem treinar!
                </strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  A frequência caiu em setembro. Contate o atleta para reengajar no CT antes da desistência.
                </p>
              </div>
            </div>
            <button 
              onClick={() => onOpenWhatsApp(student)}
              className="btn btn-whatsapp btn-sm"
            >
              Abrir WhatsApp Agora
            </button>
          </div>
        )}
      </div>

      {/* Grid com os 3 Cards de Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-primary)',
            border: '1px solid var(--gold-border)'
          }}>
            <Dumbbell size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
              {student.totalWorkouts}
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              treinos no CT
            </span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b',
            border: '1px solid var(--border-subtle)'
          }}>
            <Flame size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
              {student.consecutiveWeeks}
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              semanas registradas
            </span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-active-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--status-active-color)',
            border: '1px solid var(--status-active-border)'
          }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--status-active-color)', lineHeight: 1 }}>
              {student.presenceRate}%
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              presença histórica
            </span>
          </div>
        </div>
      </div>

      {/* Ficha de Treino Atual (Os 6 Exercícios CONCEPT) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem'
        }}>
          {/* Header da Seção de Treino com Ações */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-primary)',
                  background: 'var(--gold-bg)',
                  border: '1px solid var(--gold-border)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  TREINO ATUAL • FICHA VIGENTE
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                  Atualizado em {student.activeWorkout?.lastUpdated}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginTop: '0.35rem' }}>
                {student.activeWorkout?.name || 'Treino A — Peito + Tríceps'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {student.activeWorkout?.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  const targetWorkout = workouts.find(w => w.name.includes('Treino A')) || workouts[0];
                  if (targetWorkout) {
                    onNavigate(`/dashboard/treinos/editar/${targetWorkout.id}`);
                  } else {
                    onNavigate('/dashboard/treinos');
                  }
                }}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                <Edit3 size={13} />
                <span>Editar treino</span>
              </button>

              <button
                onClick={() => setIsSelectWorkoutModalOpen(true)}
                className="btn btn-primary btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #b38f2a 100%)',
                  color: '#07080a',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(212, 175, 55, 0.25)'
                }}
              >
                <UserPlus size={13} />
                <span>Atribuir novo treino</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {student.activeWorkout?.exercises?.map((ex, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    color: 'var(--gold-light)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--gold-border)'
                  }}>
                    {idx + 1}
                  </span>
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>{ex.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                      Descanso: {ex.rest}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'right' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
                      {ex.sets} × {ex.reps}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--gold-light)', fontWeight: 700 }}>
                      {ex.load}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequência Mensal e Histórico */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
              Frequência nos Últimos Meses
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Presença no CT CONCEPT (dias treinados vs. meta de 22 dias)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {student.monthlyHistory?.map((m) => {
                const percent = Math.round((m.count / m.max) * 100);
                return (
                  <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ width: '32px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {m.month}
                    </span>
                    <div style={{
                      flex: 1,
                      height: '10px',
                      background: 'var(--bg-elevated)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: m.alert 
                          ? 'var(--status-alert-color)' 
                          : percent >= 80 
                            ? 'var(--gold-gradient)' 
                            : '#3b82f6',
                        borderRadius: 'var(--radius-full)'
                      }} />
                    </div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      color: m.alert ? 'var(--status-alert-color)' : 'var(--text-main)', 
                      minWidth: '55px', 
                      textAlign: 'right' 
                    }}>
                      {m.count} dias {m.alert && '⚠️'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
              Sessões Recentes no CT
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Registro de intensidade nas catracas CONCEPT
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {student.workoutLogs?.map((log, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    fontSize: '0.8125rem'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
                      {log.workout}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
                      {log.date} • {log.intensity}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--gold-light)',
                    background: 'var(--gold-bg)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {log.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Atribuição Direta para este Aluno */}
      {isSelectWorkoutModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Atribuir Ficha a {student.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                  A ficha selecionada será enviada e sincronizada instantaneamente no app mobile.
                </p>
              </div>
              <button
                onClick={() => setIsSelectWorkoutModalOpen(false)}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  borderRadius: '6px',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {workouts.map(w => {
                const isSelected = selectedWorkoutToAssign === w.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWorkoutToAssign(w.id)}
                    style={{
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--gold-bg)' : 'var(--bg-elevated)',
                      border: `1px solid ${isSelected ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                        {w.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {w.objective} • {w.duration} • {w.exercises?.length || 0} exercícios
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 size={18} color="var(--gold-primary)" />
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setIsSelectWorkoutModalOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedWorkoutToAssign}
                onClick={() => {
                  if (selectedWorkoutToAssign && onAssignWorkout) {
                    onAssignWorkout(selectedWorkoutToAssign, [student.id]);
                    setIsSelectWorkoutModalOpen(false);
                  }
                }}
                className="btn btn-primary btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #b38f2a 100%)',
                  color: '#07080a',
                  fontWeight: 800,
                  border: 'none',
                  opacity: selectedWorkoutToAssign ? 1 : 0.5,
                  cursor: selectedWorkoutToAssign ? 'pointer' : 'not-allowed'
                }}
              >
                Confirmar Atribuição
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .content-body > div[style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          .content-body > div[style*="gridTemplateColumns: 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
