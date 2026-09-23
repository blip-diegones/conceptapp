import React from 'react';
import { Activity, Dumbbell, QrCode, UserPlus, AlertTriangle, Clock } from 'lucide-react';
import { RECENT_ACTIVITIES } from '../data/mockData';

export default function RecentActivity() {
  const getIcon = (type) => {
    switch (type) {
      case 'workout':
        return <Dumbbell size={15} color="var(--brand-primary)" />;
      case 'checkin':
        return <QrCode size={15} color="#38bdf8" />;
      case 'enrollment':
        return <UserPlus size={15} color="#a855f7" />;
      case 'warning':
        return <AlertTriangle size={15} color="var(--status-alert-color)" />;
      default:
        return <Activity size={15} color="var(--text-faint)" />;
    }
  };

  const getBadgeBg = (type) => {
    switch (type) {
      case 'workout': return 'rgba(16, 185, 129, 0.12)';
      case 'checkin': return 'rgba(56, 189, 248, 0.12)';
      case 'enrollment': return 'rgba(168, 85, 247, 0.12)';
      case 'warning': return 'var(--status-alert-bg)';
      default: return 'var(--bg-elevated)';
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="var(--brand-primary)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
            Atividades em Tempo Real
          </h3>
        </div>
        <span style={{
          fontSize: '0.6875rem',
          color: 'var(--brand-primary)',
          fontWeight: 700,
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '0.2rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          ● Ao vivo
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {RECENT_ACTIVITIES.map((act) => (
          <div
            key={act.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.625rem 0',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: getBadgeBg(act.type),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '0.125rem'
            }}>
              {getIcon(act.type)}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                <strong>{act.student}</strong> {act.action}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={10} /> {act.time}
                </span>
                <span style={{ color: 'var(--border-medium)', fontSize: '0.6875rem' }}>•</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  {act.meta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
