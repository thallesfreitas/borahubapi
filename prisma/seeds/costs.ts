import { Prisma } from '@prisma/client';

export const defaultCosts: Prisma.CostsUsageCreateInput[] = [
  {
    type: 'INDICATEDBY',
    amount: 50,
  },
  {
    type: 'WELCOME_INDICATEDBY',
    amount: 1500,
  },
  {
    type: 'WELCOME',
    amount: 500,
  },
  {
    type: 'CREATE_PROFILE_CANDIDATE',
    amount: 50,
  },
  {
    type: 'CREATE_PROFILE_RECRUITER',
    amount: 50,
  },
  {
    type: 'CREATE_PROFILE_SERVICEPROVIDER',
    amount: 50,
  },
  {
    type: 'CREATE_PROFILE_FREELANCER',
    amount: 50,
  },
  {
    type: 'CREATE_JOB',
    amount: 75,
  },
  {
    type: 'SEND_JOB_TO_GROUPS',
    amount: 1000,
  },
  {
    type: 'MESSAGE_BOT',
    amount: 2,
  },
  {
    type: 'COMPARE_JOB_CANDIDATE',
    amount: 50,
  },
  {
    type: 'CREATE_MINIBIO',
    amount: 50,
  },
  {
    type: 'CREATE_DESCRIPTION_CANDIDATE',
    amount: 50,
  },
  {
    type: 'FREELA_CALCULATOR',
    amount: 50,
  },
  {
    type: 'DEFAULT_AI',
    amount: 50,
  },
];
