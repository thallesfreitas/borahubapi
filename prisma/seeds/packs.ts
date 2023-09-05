import { Prisma } from '@prisma/client';

export const defaultCosts: Prisma.PacksCreateInput[] = [
  {
    type: 'borastart',
    name: 'BoraStart',
    unit_amount: 39.9,
    features: [
      'Máximo valor.',
      'Acesso total.',
      'Prioridade máxima.',
      'Benefícios exclusivos.',
    ],
    phrases: 'Domine o jogo! Acesso total, prioridade e benefícios exclusivos.',
    credits: 100,
  },
  {
    type: 'boragrow',
    name: 'BoraGrow',
    unit_amount: 79.9,
    features: [
      'Máximo valor.',
      'Acesso total.',
      'Prioridade máxima.',
      'Benefícios exclusivos.',
    ],
    phrases: 'Domine o jogo! Acesso total, prioridade e benefícios exclusivos.',
    credits: 300,
  },
  {
    type: 'borapremium',
    name: 'BoraPremium',
    unit_amount: 99.9,
    features: [
      'Máximo valor.',
      'Acesso total.',
      'Prioridade máxima.',
      'Benefícios exclusivos.',
    ],
    phrases: 'Domine o jogo! Acesso total, prioridade e benefícios exclusivos.',
    credits: 8000,
  },
];
