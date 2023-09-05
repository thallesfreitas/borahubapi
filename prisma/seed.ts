import { PrismaClient } from '@prisma/client';

import { defaultCosts } from './seeds';

const prisma = new PrismaClient();

async function main() {
  // create default user
  // await prisma.user.create({
  //   data: defaultUser,
  // });

  await prisma.costsUsage.createMany({
    data: defaultCosts,
  });

  // await prisma.plans.create({
  //   data: defaultPlans,
  // });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
