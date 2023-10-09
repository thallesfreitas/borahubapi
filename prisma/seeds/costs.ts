import { Prisma } from '@prisma/client';

// export const defaultUser: Prisma.UserCreateInput = {
//   email: 'john@doe.com',
//   name: 'John Doe',
//   password: '123456',
//   phone: '11945483326',
// };

export const defaultCosts: Prisma.CostsUsageCreateInput[] = [
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
    amount: 100,
  },
  {
    type: 'SEND_JOB_TO_GROUPS',
    amount: 1000,
  },
  {
    type: 'MESSAGE_BOT',
    amount: 25,
  },
];
