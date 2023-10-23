import { Prisma } from '@prisma/client';

export const defaultPacks: Prisma.PacksCreateInput[] = [
  {
    type: 'borastart',
    name: 'BoraStart',
    unit_amount: 3990,
    features: [
      'Máximo valor.',
      'Acesso total.',
      'Prioridade máxima.',
      'Benefícios exclusivos.',
    ],
    phrases: 'Desbloqueie o Mundo de Oportunidades!',
    credits: 100,
  },
  {
    type: 'boragrow',
    name: 'BoraGrow',
    unit_amount: 7990,
    features: [
      'Máximo valor.',
      'Acesso total.',
      'Prioridade máxima.',
      'Benefícios exclusivos.',
    ],
    phrases: 'Expanda Seus Horizontes e Cresça!',
    credits: 300,
  },
  {
    type: 'borapremium',
    name: 'BoraPremium',
    unit_amount: 9990,
    features: [
      'Máximo valor.',
      'Acesso total.',
      'Prioridade máxima.',
      'Benefícios exclusivos.',
    ],
    phrases: 'Domine o jogo! Acesso total, prioridade e benefícios exclusivos.',
    credits: 1000,
  },
];
