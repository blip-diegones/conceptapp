import React, { useState, useMemo } from 'react';
import { 
  Search, 
  UserPlus, 
  MessageSquare, 
  ChevronRight, 
  Clock, 
  AlertCircle
} from 'lucide-react';

export default function StudentsView({ 
  students, 
  onNavigate, 
  onOpenWhatsApp, 
  onOpenNewStudent,
  initialFilter = 'all' 
}) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  // Contadores para os filtros
  const counts = useMemo(() => {
    return {
      all: students.length,
      active: students.filter(s => s.status === 'active').length,
      monitoring: students.filter(s => s.status === 'monitoring').length,
      attention: students.filter(s => s.status === 'attention').length,
    };
  }, [students]);

  // Alunos filtrados e buscados
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Filtro de status
      if (activeFilter !== 'all' && student.status !== activeFilter) {
        return false;
      }
      // Busca
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesPlan = student.plan.toLowerCase().includes(query);
        const matchesEmail = student.email.toLowerCase().includes(query);
        return matchesName || matchesPlan || matchesEmail;
      }
      return true;
    });
  }, [students, activeFilter, searchQuery]);

  return (
    <div className="content-body fade-in">
      {/* Header da Tela */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#ffffff' }}>
            Gestão de Alunos
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Base de dados CONCEPT | Centro de Treinamento • São Lourenço - MG ({students.length} atletas)
          </p>
        </div>

        <button
          onClick={onOpenNewStudent}
          className="btn btn-primary"
          id="btn-add-student-table"
        >
          <UserPlus size={16} strokeWidth={2.5} />
          <span>+ Novo aluno</span>
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        {/* Filtros em Abas */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          background: 'var(--bg-card)',
          padding: '0.375rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: activeFilter === 'all' ? 700 : 500,
              background: activeFilter === 'all' ? 'var(--bg-elevated)' : 'transparent',
              color: activeFilter === 'all' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Todos</span>
            <span style={{ fontSize: '0.6875rem', opacity: 0.7 }}>({counts.all})</span>
          </button>

          <button
            onClick={() => setActiveFilter('active')}
            style={{
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: activeFilter === 'active' ? 700 : 500,
              background: activeFilter === 'active' ? 'var(--status-active-bg)' : 'transparent',
              color: activeFilter === 'active' ? 'var(--status-active-color)' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span className="badge-dot" style={{ background: 'var(--status-active-color)' }}></span>
            <span>Ativos</span>
            <span style={{ fontSize: '0.6875rem' }}>({counts.active})</span>
          </button>

          <button
            onClick={() => setActiveFilter('monitoring')}
            style={{
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: activeFilter === 'monitoring' ? 700 : 500,
              background: activeFilter === 'monitoring' ? 'var(--status-monitor-bg)' : 'transparent',
              color: activeFilter === 'monitoring' ? 'var(--status-monitor-color)' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span className="badge-dot" style={{ background: 'var(--status-monitor-color)' }}></span>
            <span>Monitorar</span>
            <span style={{ fontSize: '0.6875rem' }}>({counts.monitoring})</span>
          </button>

          <button
            onClick={() => setActiveFilter('attention')}
            style={{
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: activeFilter === 'attention' ? 700 : 500,
              background: activeFilter === 'attention' ? 'var(--status-alert-bg)' : 'transparent',
              color: activeFilter === 'attention' ? 'var(--status-alert-color)' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span className="badge-dot" style={{ background: 'var(--status-alert-color)' }}></span>
            <span>Atenção</span>
            <span style={{ 
              fontSize: '0.6875rem',
              background: 'var(--status-alert-color)',
              color: '#ffffff',
              padding: '0.05rem 0.35rem',
              borderRadius: 'var(--radius-full)'
            }}>
              {counts.attention}
            </span>
          </button>
        </div>

        {/* Input de Busca */}
        <div style={{ position: 'relative', minWidth: '280px' }}>
          <Search 
            size={16} 
            color="var(--text-faint)" 
            style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            className="input-text"
            placeholder="Buscar por nome, plano ou e-mail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      {/* Tabela de Alunos */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{
                background: 'var(--bg-sidebar)',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-faint)'
              }}>
                <th style={{ padding: '0.875rem 1.5rem' }}>Aluno</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Plano</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Último Treino</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Frequência</th>
                <th style={{ padding: '0.875rem 1.25rem' }}>Status</th>
                <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={28} color="var(--text-faint)" />
                      <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Nenhum aluno encontrado
                      </p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                        Tente ajustar os filtros ou os termos de busca.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isAttention = student.status === 'attention';
                  const isMonitoring = student.status === 'monitoring';

                  return (
                    <tr
                      key={student.id}
                      onClick={() => onNavigate(`/alunos/${student.id}`)}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Aluno & Avatar */}
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                          <img
                            src={student.avatar}
                            alt={student.name}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1px solid var(--border-medium)'
                            }}
                          />
                          <div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                              {student.name}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Plano */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          background: 'var(--bg-elevated)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          {student.plan}
                        </span>
                      </td>

                      {/* Último Treino */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.8125rem',
                            fontWeight: isAttention ? 700 : 500,
                            color: isAttention ? '#fb7185' : isMonitoring ? '#fbbf24' : 'var(--text-muted)'
                          }}>
                            {student.daysInactive > 0 && <Clock size={12} />}
                            {student.lastWorkout}
                          </span>
                          {student.daysInactive >= 7 && (
                            <span style={{ display: 'block', fontSize: '0.6875rem', color: '#f87171' }}>
                              ({student.daysInactive} dias sem check-in)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Frequência */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', width: '120px' }}>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', minWidth: '32px' }}>
                            {student.frequencyPercent}%
                          </span>
                          <div style={{
                            flex: 1,
                            height: '6px',
                            background: 'var(--bg-elevated)',
                            borderRadius: 'var(--radius-full)',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${student.frequencyPercent}%`,
                              height: '100%',
                              background: student.frequencyPercent >= 80 
                                ? 'var(--brand-primary)' 
                                : student.frequencyPercent >= 65 
                                  ? '#f59e0b' 
                                  : '#f43f5e'
                            }} />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span className={`badge badge-${student.status}`}>
                          <span className="badge-dot"></span>
                          {student.statusLabel}
                        </span>
                      </td>

                      {/* Ações */}
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                          {(isAttention || isMonitoring) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenWhatsApp(student);
                              }}
                              className="btn btn-whatsapp btn-sm"
                              title="Enviar WhatsApp de retenção"
                            >
                              <MessageSquare size={13} />
                              <span>Contato</span>
                            </button>
                          )}

                          <button
                            onClick={() => onNavigate(`/alunos/${student.id}`)}
                            className="btn btn-ghost btn-sm"
                            style={{ color: 'var(--text-muted)' }}
                            title="Ver perfil completo"
                          >
                            <span>Perfil</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé da tabela */}
        <div style={{
          padding: '0.875rem 1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-faint)',
          background: 'var(--bg-sidebar)'
        }}>
          <span>Exibindo <strong>{filteredStudents.length}</strong> de <strong>{students.length}</strong> alunos</span>
          <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>CONCEPT | Centro de Treinamento</span>
        </div>
      </div>
    </div>
  );
}
