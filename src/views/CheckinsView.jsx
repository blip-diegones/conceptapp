import React, { useState } from 'react';
import { 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Search, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function CheckinsView({ 
  students = [], 
  checkins = [], 
  onAddCheckin,
  onNavigate 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'granted' | 'alert'
  const [selectedStudentForSim, setSelectedStudentForSim] = useState(students[0]?.id || 1);
  const [scanFeedback, setScanFeedback] = useState(null); // { type: 'success' | 'alert', message: string, studentName: string }

  // Filtragem dos check-ins
  const filteredCheckins = checkins.filter(c => {
    const matchesSearch = c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.plan && c.plan.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSimulateScan = (e) => {
    e.preventDefault();
    const student = students.find(s => s.id === Number(selectedStudentForSim));
    if (!student) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const isAttention = student.status === 'attention';

    const newCheckin = {
      id: `chk-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      avatar: student.avatar,
      plan: student.plan,
      time: timeStr,
      gate: 'Catraca Principal 01',
      status: isAttention ? 'alert' : 'granted',
      statusLabel: isAttention ? 'Alerta: Ausência recente' : 'Liberado'
    };

    onAddCheckin(newCheckin);

    setScanFeedback({
      type: isAttention ? 'alert' : 'success',
      studentName: student.name,
      message: isAttention 
        ? `Acesso concedido com aviso: aluno retornando após período ausente!` 
        : `Acesso Liberado! Bom treino no CONCEPT CT.`
    });

    setTimeout(() => {
      setScanFeedback(null);
    }, 3500);
  };

  const peakHours = [
    { hour: '06h - 08h', level: 68 },
    { hour: '08h - 11h', level: 45 },
    { hour: '11h - 14h', level: 32 },
    { hour: '14h - 17h', level: 54 },
    { hour: '17h - 20h', level: 96, isPeak: true },
    { hour: '20h - 22h', level: 72 }
  ];

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
              Controle de Acessos & Check-ins
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#4ade80',
              fontSize: '0.6875rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e'
              }} />
              Catracas Online
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Monitoramento de fluxo em tempo real, validação biométrica/QR Code e registro de presenças.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => onNavigate('/app')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Sparkles size={14} color="var(--gold-primary)" />
            <span>Ver App do Aluno</span>
          </button>
        </div>
      </div>

      {/* Grid de Métricas Principais */}
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
              Check-ins Hoje
            </span>
            <QrCode size={18} color="var(--gold-primary)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#ffffff' }}>
              {checkins.length + 180}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80' }}>
              +12% vs ontem
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            {checkins.length} registrados nesta sessão
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
              Alunos no CT Agora
            </span>
            <Activity size={18} color="#4ade80" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#ffffff' }}>
              42
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              ocupação moderada (48%)
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Capacidade máxima: 85 simultâneos
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
              Horário de Pico
            </span>
            <Clock size={18} color="var(--gold-primary)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#ffffff' }}>
              18h — 20h
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Próximo pico estimado em 3h
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
              Alertas de Catraca
            </span>
            <AlertTriangle size={18} color="#eab308" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#ffffff' }}>
              1
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#eab308' }}>
              Exame / Inadimplência
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>
            Liberação assistida na recepção
          </p>
        </div>
      </div>

      {/* Linha Central: Feed ao Vivo + Simulador de Catraca */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Coluna 1: Feed Cronológico de Check-ins */}
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
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Feed em Tempo Real da Recepção
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Últimos acessos autorizados nas catracas do CT
              </p>
            </div>

            {/* Filtros de Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setFilterStatus('all')}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  border: '1px solid',
                  borderColor: filterStatus === 'all' ? 'var(--gold-border)' : 'var(--border-subtle)',
                  background: filterStatus === 'all' ? 'var(--gold-glow)' : 'var(--bg-elevated)',
                  color: filterStatus === 'all' ? 'var(--gold-primary)' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Todos ({checkins.length})
              </button>
              <button
                onClick={() => setFilterStatus('granted')}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  border: '1px solid',
                  borderColor: filterStatus === 'granted' ? 'rgba(34, 197, 94, 0.4)' : 'var(--border-subtle)',
                  background: filterStatus === 'granted' ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-elevated)',
                  color: filterStatus === 'granted' ? '#4ade80' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Liberados
              </button>
              <button
                onClick={() => setFilterStatus('alert')}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  border: '1px solid',
                  borderColor: filterStatus === 'alert' ? 'rgba(234, 179, 8, 0.4)' : 'var(--border-subtle)',
                  background: filterStatus === 'alert' ? 'rgba(234, 179, 8, 0.1)' : 'var(--bg-elevated)',
                  color: filterStatus === 'alert' ? '#eab308' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Com Alerta
              </button>
            </div>
          </div>

          {/* Busca Rápida */}
          <div style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
              <input
                type="text"
                placeholder="Buscar por aluno ou plano..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.45rem 0.75rem 0.45rem 2.25rem',
                  fontSize: '0.8125rem',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Lista de Check-ins */}
          <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
            {filteredCheckins.length === 0 ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <QrCode size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.3 }} />
                <p style={{ fontWeight: 600 }}>Nenhum check-in encontrado com estes filtros.</p>
              </div>
            ) : (
              filteredCheckins.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '0.875rem 1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <img
                      src={item.avatar}
                      alt={item.studentName}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `2px solid ${item.status === 'alert' ? '#eab308' : 'var(--gold-border)'}`
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.15rem' }}>
                        {item.studentName}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
                        <span>{item.plan}</span>
                        <span>•</span>
                        <span>{item.gate}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.375rem', marginBottom: '0.2rem' }}>
                      <Clock size={12} color="var(--text-faint)" />
                      <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#ffffff' }}>
                        {item.time}
                      </span>
                    </div>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      background: item.status === 'alert' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.12)',
                      color: item.status === 'alert' ? '#eab308' : '#4ade80',
                      border: `1px solid ${item.status === 'alert' ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                    }}>
                      {item.status === 'alert' ? <AlertTriangle size={10} /> : <CheckCircle2 size={10} />}
                      {item.statusLabel}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Coluna 2: Terminal Simulador & Fluxo por Horário */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Simulador de Leitura de Catraca / QR Code */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--gold-gradient)',
                color: '#120e03',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <QrCode size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff' }}>
                  Simulador de Catraca (QR Code / Bio)
                </h3>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Teste a entrada de qualquer aluno na recepção da academia
                </p>
              </div>
            </div>

            {/* Feedback animado de Scan */}
            {scanFeedback && (
              <div style={{
                background: scanFeedback.type === 'alert' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                border: `1px solid ${scanFeedback.type === 'alert' ? '#eab308' : '#22c55e'}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                animation: 'fade-in 0.25s ease'
              }}>
                {scanFeedback.type === 'alert' ? (
                  <AlertTriangle size={20} color="#eab308" />
                ) : (
                  <CheckCircle2 size={20} color="#22c55e" />
                )}
                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#ffffff' }}>
                    {scanFeedback.studentName}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: scanFeedback.type === 'alert' ? '#fde047' : '#86efac' }}>
                    {scanFeedback.message}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSimulateScan}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                  Selecione o Aluno para Simular Entrada:
                </label>
                <select
                  value={selectedStudentForSim}
                  onChange={(e) => setSelectedStudentForSim(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.625rem 0.75rem',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                  id="select-simulate-checkin-student"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id} style={{ background: '#12161f' }}>
                      {s.name} ({s.plan}) {s.status === 'attention' ? '⚠️ Em Alerta' : '✅ Regular'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                id="btn-trigger-checkin-scan"
              >
                <Zap size={16} />
                <span>Simular Leitura na Catraca 01</span>
              </button>
            </form>
          </div>

          {/* Gráfico de Ocupação por Faixa de Horário */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff' }}>
                  Fluxo Médio por Horário
                </h3>
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Frequência média registrada no CONCEPT CT
                </p>
              </div>
              <Clock size={16} color="var(--gold-primary)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {peakHours.map(item => (
                <div key={item.hour}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: item.isPeak ? 'var(--gold-light)' : 'var(--text-muted)', fontWeight: item.isPeak ? 800 : 600 }}>
                      {item.hour} {item.isPeak && '🔥 (Pico Máximo)'}
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>
                      {item.level}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${item.level}%`,
                      height: '100%',
                      background: item.isPeak ? 'var(--gold-gradient)' : 'var(--brand-primary)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
