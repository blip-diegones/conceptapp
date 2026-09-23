import React, { useState } from 'react';
import { X, UserPlus, Sparkles, Check } from 'lucide-react';

export default function NewStudentModal({ isOpen, onClose, onAddStudent }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Black Anual');
  const [goal, setGoal] = useState('Hipertrofia e força');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=160&q=80`,
      phone: phone || '(11) 98000-0000',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      plan: plan,
      joinDate: new Date().toLocaleDateString('pt-BR'),
      daysInactive: 0,
      lastWorkout: 'Hoje',
      frequencyPercent: 100,
      status: 'active',
      statusLabel: 'Ativo',
      goal: goal,
      totalWorkouts: 1,
      consecutiveWeeks: 1,
      presenceRate: 100,
      activeWorkout: {
        name: 'Treino A — Adaptação Inicial',
        description: 'Circuito global de adaptação muscular',
        lastUpdated: new Date().toLocaleDateString('pt-BR'),
        exercises: [
          { name: 'Leg Press 45º', sets: 3, reps: '12', load: '80 kg', rest: '60s' },
          { name: 'Puxada Frontal Aberta', sets: 3, reps: '12', load: '30 kg', rest: '60s' },
          { name: 'Supino Reto com Halteres', sets: 3, reps: '12', load: '12 kg', rest: '60s' }
        ]
      },
      monthlyHistory: [
        { month: 'Set', count: 1, max: 22 }
      ],
      workoutLogs: [
        { date: new Date().toLocaleDateString('pt-BR'), workout: 'Treino A — Adaptação Inicial', duration: '45 min', intensity: 'Moderada' }
      ]
    };

    onAddStudent(newStudent);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(16, 185, 129, 0.25)'
            }}>
              <UserPlus size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Novo Aluno — CONCEPT
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Cadastro rápido para demonstração comercial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '0.375rem', border: 'none', cursor: 'pointer', color: 'var(--text-faint)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--status-active-bg)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: '1px solid var(--status-active-border)'
            }}>
              <Check size={28} />
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#ffffff' }}>
              Aluno Cadastrado!
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {name} foi inserido na base da CONCEPT com sucesso.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                NOME COMPLETO *
              </label>
              <input
                type="text"
                required
                className="input-text"
                placeholder="Ex: Matheus Cordeiro"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                  WHATSAPP / TELEFONE
                </label>
                <input
                  type="text"
                  className="input-text"
                  placeholder="(11) 98888-7777"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                  PLANO
                </label>
                <select
                  className="input-text"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="Black Anual">Black Anual</option>
                  <option value="Mensal Prime">Mensal Prime</option>
                  <option value="Trimestral Pro">Trimestral Pro</option>
                  <option value="Semestral Flex">Semestral Flex</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                OBJETIVO PRINCIPAL
              </label>
              <input
                type="text"
                className="input-text"
                placeholder="Ex: Hipertrofia e definição muscular"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="btn-confirm-add-student"
              >
                Salvar Aluno
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
