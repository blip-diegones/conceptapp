import React, { useState, useMemo } from 'react';
import { X, Search, Check, Users, Dumbbell, Sparkles } from 'lucide-react';

export default function AssignWorkoutModal({ 
  isOpen, 
  onClose, 
  workout, 
  students = [], 
  onAssignToStudents 
}) {
  // IDs dos alunos inicialmente selecionados
  const [selectedStudentIds, setSelectedStudentIds] = useState(
    workout?.assignedStudents || [1]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sincroniza alunos atribuídos sempre que a ficha de treino selecionada mudar
  React.useEffect(() => {
    if (workout?.assignedStudents) {
      setSelectedStudentIds(workout.assignedStudents);
    }
  }, [workout]);

  const filteredStudents = useMemo(() => {
    if (!students || students.length === 0) return [];
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(s => 
      s.name.toLowerCase().includes(q) || 
      (s.plan && s.plan.toLowerCase().includes(q))
    );
  }, [students, searchQuery]);

  if (!isOpen || !workout) return null;

  const toggleStudent = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(students.map(s => s.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssignToStudents(workout.id, selectedStudentIds);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1400);
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
              background: 'var(--gold-bg)',
              color: 'var(--gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--gold-border)'
            }}>
              <Users size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>
                Atribuir Treino
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                {workout.name}
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

        {/* Corpo do Modal */}
        {isSuccess ? (
          <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--status-active-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)'
            }}>
              <Check size={30} />
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#ffffff' }}>
              Treino Atribuído com Sucesso!
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              A ficha foi vinculada a <strong>{selectedStudentIds.length} aluno(s)</strong>. Eles já podem visualizá-la no App do Aluno CONCEPT.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.25rem 1.5rem' }}>
            {/* Campo de Busca */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={15} color="var(--text-faint)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="input-text"
                placeholder="Buscar aluno por nome ou plano..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
                autoFocus
              />
            </div>

            {/* Cabeçalho da Lista com Selecionar Todos */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>{selectedStudentIds.length} selecionado(s)</span>
              <button
                type="button"
                onClick={handleSelectAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gold-light)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              >
                {selectedStudentIds.length === students.length ? 'Desmarcar todos' : 'Selecionar todos'}
              </button>
            </div>

            {/* Lista com Scroll */}
            <div style={{
              maxHeight: '260px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem',
              paddingRight: '0.25rem'
            }}>
              {filteredStudents.map((student) => {
                const isSelected = selectedStudentIds.includes(student.id);

                return (
                  <div
                    key={student.id}
                    onClick={() => toggleStudent(student.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(212, 175, 55, 0.08)' : 'var(--bg-elevated)',
                      border: isSelected ? '1px solid var(--gold-border)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={student.avatar}
                        alt={student.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
                          {student.name}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-faint)' }}>
                          {student.plan} • {student.goal}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: isSelected ? 'none' : '1.5px solid var(--border-medium)',
                      background: isSelected ? 'var(--gold-gradient)' : 'transparent',
                      color: '#120e03',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ações do Rodapé */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary btn-sm"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={selectedStudentIds.length === 0}
                style={{ opacity: selectedStudentIds.length === 0 ? 0.5 : 1 }}
                id="btn-confirm-assign-workout"
              >
                <span>Confirmar Atribuição ({selectedStudentIds.length})</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
