import { PrismaClient } from '@prisma/client';

import { defaultCosts, defaultPacks } from './seeds';

const prisma = new PrismaClient();

async function main() {
  for (const cost of defaultCosts) {
    await prisma.costsUsage.upsert({
      where: { type: cost.type },
      update: { amount: cost.amount },
      create: cost,
    });
  }

  for (const packs of defaultPacks) {
    await prisma.packs.upsert({
      where: { type: packs.type },
      update: { unit_amount: packs.unit_amount },
      create: packs,
    });
  }
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
