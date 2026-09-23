// Biblioteca de exercícios e fichas base para CONCEPT | Centro de Treinamento

export const MUSCLE_GROUPS = ['Peito', 'Ombros', 'Costas', 'Bíceps', 'Tríceps', 'Pernas'];

export const EXERCISE_LIBRARY = [
  // Peito
  { id: 'ex-1', name: 'Supino Reto com Barra', muscleGroup: 'Peito', defaultSets: 3, defaultReps: 10, defaultLoad: '30 kg/lado', defaultRest: 90, notes: 'Descer com cadência controlada até o peito.' },
  { id: 'ex-2', name: 'Supino Inclinado com Halteres', muscleGroup: 'Peito', defaultSets: 3, defaultReps: 10, defaultLoad: '24 kg/halter', defaultRest: 75, notes: 'Foco na porção clavicular (superior).' },
  { id: 'ex-3', name: 'Crucifixo Reto com Halteres', muscleGroup: 'Peito', defaultSets: 3, defaultReps: 12, defaultLoad: '18 kg/halter', defaultRest: 60, notes: 'Manter cotovelos levemente flexionados.' },
  { id: 'ex-4', name: 'Crossover Polia Média', muscleGroup: 'Peito', defaultSets: 3, defaultReps: 12, defaultLoad: '20 kg', defaultRest: 60, notes: 'Pico de contração de 1s no centro.' },
  
  // Ombros
  { id: 'ex-5', name: 'Desenvolvimento com Halteres', muscleGroup: 'Ombros', defaultSets: 3, defaultReps: 10, defaultLoad: '20 kg/halter', defaultRest: 75, notes: 'Escápulas travadas e coluna neutra.' },
  { id: 'ex-6', name: 'Elevação Lateral', muscleGroup: 'Ombros', defaultSets: 4, defaultReps: 12, defaultLoad: '12 kg/halter', defaultRest: 45, notes: 'Movimento estrito sem impulso lombar.' },
  { id: 'ex-7', name: 'Desenvolvimento Militar Barra', muscleGroup: 'Ombros', defaultSets: 4, defaultReps: 8, defaultLoad: '20 kg/lado', defaultRest: 90, notes: 'Pegada um pouco além da largura dos ombros.' },
  
  // Costas
  { id: 'ex-8', name: 'Puxada Frontal Barra Aberta', muscleGroup: 'Costas', defaultSets: 4, defaultReps: 10, defaultLoad: '60 kg', defaultRest: 60, notes: 'Puxar em direção à clavícula expandindo o peito.' },
  { id: 'ex-9', name: 'Remada Baixa Triângulo', muscleGroup: 'Costas', defaultSets: 3, defaultReps: 12, defaultLoad: '55 kg', defaultRest: 60, notes: 'Contrair bem os dorsais na fase concêntrica.' },
  { id: 'ex-10', name: 'Remada Curvada com Barra', muscleGroup: 'Costas', defaultSets: 4, defaultReps: 8, defaultLoad: '35 kg/lado', defaultRest: 90, notes: 'Tronco estabilizado a 45 graus.' },
  { id: 'ex-11', name: 'Barra Fixa Pronada', muscleGroup: 'Costas', defaultSets: 3, defaultReps: 8, defaultLoad: 'Peso Corporal', defaultRest: 90, notes: 'Amplitude completa do movimento.' },
  
  // Bíceps
  { id: 'ex-12', name: 'Rosca Direta Barra W', muscleGroup: 'Bíceps', defaultSets: 3, defaultReps: 10, defaultLoad: '14 kg/lado', defaultRest: 60, notes: 'Cotovelos alinhados junto ao tronco.' },
  { id: 'ex-13', name: 'Rosca Alternada com Halteres', muscleGroup: 'Bíceps', defaultSets: 3, defaultReps: 12, defaultLoad: '14 kg/halter', defaultRest: 60, notes: 'Supinação completa no pico da contração.' },
  { id: 'ex-14', name: 'Rosca Martelo na Corda', muscleGroup: 'Bíceps', defaultSets: 3, defaultReps: 12, defaultLoad: '25 kg', defaultRest: 45, notes: 'Foco em braquial e antebraço.' },
  
  // Tríceps
  { id: 'ex-15', name: 'Tríceps Pulley com Corda', muscleGroup: 'Tríceps', defaultSets: 3, defaultReps: 12, defaultLoad: '30 kg', defaultRest: 45, notes: 'Abrir a corda no final da extensão.' },
  { id: 'ex-16', name: 'Tríceps Francês com Halter', muscleGroup: 'Tríceps', defaultSets: 3, defaultReps: 10, defaultLoad: '22 kg', defaultRest: 60, notes: 'Manter os cotovelos fechados apontando para cima.' },
  { id: 'ex-17', name: 'Tríceps Testa com Barra W', muscleGroup: 'Tríceps', defaultSets: 3, defaultReps: 10, defaultLoad: '12 kg/lado', defaultRest: 60, notes: 'Barra em direção à testa/alto da cabeça.' },
  
  // Pernas
  { id: 'ex-18', name: 'Agachamento Livre', muscleGroup: 'Pernas', defaultSets: 4, defaultReps: 8, defaultLoad: '45 kg/lado', defaultRest: 120, notes: 'Profundidade paralela ou além com core ativo.' },
  { id: 'ex-19', name: 'Leg Press 45º', muscleGroup: 'Pernas', defaultSets: 4, defaultReps: 10, defaultLoad: '240 kg', defaultRest: 90, notes: 'Pés na largura dos ombros sem travar joelhos.' },
  { id: 'ex-20', name: 'Cadeira Extensora', muscleGroup: 'Pernas', defaultSets: 3, defaultReps: 12, defaultLoad: '60 kg', defaultRest: 60, notes: 'Pico de contração de 1s no topo.' },
  { id: 'ex-21', name: 'Mesa Flexora', muscleGroup: 'Pernas', defaultSets: 3, defaultReps: 12, defaultLoad: '45 kg', defaultRest: 60, notes: 'Quadril pressionado contra o banco.' },
  { id: 'ex-22', name: 'Elevação Pélvica com Barra', muscleGroup: 'Pernas', defaultSets: 4, defaultReps: 10, defaultLoad: '70 kg', defaultRest: 90, notes: 'Foco em glúteo máximo.' },
  { id: 'ex-23', name: 'Panturrilha no Leg Press', muscleGroup: 'Pernas', defaultSets: 4, defaultReps: 15, defaultLoad: '120 kg', defaultRest: 45, notes: 'Alongamento máximo na descida.' }
];

export const INITIAL_WORKOUTS = [
  {
    id: 'treino-a',
    name: 'Treino A — Peito + Tríceps',
    tag: 'TREINO A',
    description: 'Ficha principal de sobrecarga peitoral e tríceps com foco em densidade e força.',
    objective: 'Hipertrofia & Força',
    durationMinutes: 52,
    assignedStudentsCount: 28,
    assignedStudents: [1, 2, 4, 5], // IDs dos alunos atribuídos (ex: 1 = Lucas Almeida)
    lastUpdated: '22/09/2026',
    exercises: [
      {
        id: 1,
        name: 'Supino Reto com Barra',
        muscleGroup: 'Peito',
        sets: 3,
        reps: '10',
        load: '30 kg/lado',
        rest: 90,
        notes: 'Descer com cadência controlada até o peito.'
      },
      {
        id: 2,
        name: 'Supino Inclinado com Halteres',
        muscleGroup: 'Peito',
        sets: 3,
        reps: '10',
        load: '24 kg/halter',
        rest: 75,
        notes: 'Foco na porção superior do peitoral.'
      },
      {
        id: 3,
        name: 'Crucifixo Reto com Halteres',
        muscleGroup: 'Peito',
        sets: 3,
        reps: '12',
        load: '18 kg/halter',
        rest: 60,
        notes: 'Alongar bem as fibras peitorais.'
      },
      {
        id: 4,
        name: 'Desenvolvimento com Halteres',
        muscleGroup: 'Ombros',
        sets: 3,
        reps: '10',
        load: '20 kg/halter',
        rest: 75,
        notes: 'Estabilizar o core sem hiperextensão lombar.'
      },
      {
        id: 5,
        name: 'Tríceps Pulley com Corda',
        muscleGroup: 'Tríceps',
        sets: 3,
        reps: '12',
        load: '30 kg',
        rest: 45,
        notes: 'Extensão máxima abrindo a corda no final.'
      },
      {
        id: 6,
        name: 'Tríceps Francês com Halter',
        muscleGroup: 'Tríceps',
        sets: 3,
        reps: '10',
        load: '22 kg',
        rest: 60,
        notes: 'Cotovelos alinhados e apontados para o teto.'
      }
    ]
  },
  {
    id: 'treino-b',
    name: 'Treino B — Costas + Bíceps',
    tag: 'TREINO B',
    description: 'Estímulo de puxadas pesadas, densidade dorsal e flexores de cotovelo.',
    objective: 'Hipertrofia',
    durationMinutes: 55,
    assignedStudentsCount: 22,
    assignedStudents: [2, 3],
    lastUpdated: '18/09/2026',
    exercises: [
      {
        id: 1,
        name: 'Puxada Frontal Barra Aberta',
        muscleGroup: 'Costas',
        sets: 4,
        reps: '10',
        load: '60 kg',
        rest: 60,
        notes: 'Deprimir as escápulas antes de puxar.'
      },
      {
        id: 2,
        name: 'Remada Curvada com Barra',
        muscleGroup: 'Costas',
        sets: 4,
        reps: '8',
        load: '35 kg/lado',
        rest: 90,
        notes: 'Tronco fixo e pegada pronada.'
      },
      {
        id: 3,
        name: 'Remada Baixa Triângulo',
        muscleGroup: 'Costas',
        sets: 3,
        reps: '12',
        load: '55 kg',
        rest: 60,
        notes: 'Contrair bem os dorsais.'
      },
      {
        id: 4,
        name: 'Rosca Direta Barra W',
        muscleGroup: 'Bíceps',
        sets: 3,
        reps: '10',
        load: '14 kg/lado',
        rest: 60,
        notes: 'Não usar balanço do tronco.'
      },
      {
        id: 5,
        name: 'Rosca Alternada com Halteres',
        muscleGroup: 'Bíceps',
        sets: 3,
        reps: '12',
        load: '14 kg/halter',
        rest: 60,
        notes: 'Supinação completa.'
      }
    ]
  },
  {
    id: 'treino-c',
    name: 'Treino C — Pernas (Força)',
    tag: 'TREINO C',
    description: 'Volume e intensidade para membros inferiores com agachamento pesado.',
    objective: 'Força & Potência',
    durationMinutes: 60,
    assignedStudentsCount: 31,
    assignedStudents: [3, 5],
    lastUpdated: '15/09/2026',
    exercises: [
      {
        id: 1,
        name: 'Agachamento Livre',
        muscleGroup: 'Pernas',
        sets: 4,
        reps: '8',
        load: '45 kg/lado',
        rest: 120,
        notes: 'Profundidade máxima segura.'
      },
      {
        id: 2,
        name: 'Leg Press 45º',
        muscleGroup: 'Pernas',
        sets: 4,
        reps: '10',
        load: '240 kg',
        rest: 90,
        notes: 'Amplitude completa com pés firmes.'
      },
      {
        id: 3,
        name: 'Cadeira Extensora',
        muscleGroup: 'Pernas',
        sets: 3,
        reps: '12',
        load: '60 kg',
        rest: 60,
        notes: 'Pico de contração de 1s.'
      },
      {
        id: 4,
        name: 'Mesa Flexora',
        muscleGroup: 'Pernas',
        sets: 4,
        reps: '10',
        load: '45 kg',
        rest: 60,
        notes: 'Controle na descida.'
      },
      {
        id: 5,
        name: 'Panturrilha no Leg Press',
        muscleGroup: 'Pernas',
        sets: 4,
        reps: '15',
        load: '120 kg',
        rest: 45,
        notes: 'Alongamento completo.'
      }
    ]
  },
  {
    id: 'treino-d',
    name: 'Treino D — Ombros + Abdômen',
    tag: 'TREINO D',
    description: 'Isolamento de deltoides com foco em largura clavicular e estabilização de core.',
    objective: 'Definição & Detalhe',
    durationMinutes: 45,
    assignedStudentsCount: 16,
    assignedStudents: [1, 4],
    lastUpdated: '10/09/2026',
    exercises: [
      {
        id: 1,
        name: 'Desenvolvimento Militar Barra',
        muscleGroup: 'Ombros',
        sets: 4,
        reps: '8',
        load: '20 kg/lado',
        rest: 90,
        notes: 'Força estrita sem impulsão com pernas.'
      },
      {
        id: 2,
        name: 'Elevação Lateral',
        muscleGroup: 'Ombros',
        sets: 4,
        reps: '12',
        load: '12 kg/halter',
        rest: 45,
        notes: 'Movimento controlado.'
      },
      {
        id: 3,
        name: 'Crossover Polia Média',
        muscleGroup: 'Peito',
        sets: 3,
        reps: '12',
        load: '20 kg',
        rest: 60,
        notes: 'Estabilidade torácica.'
      }
    ]
  }
];
