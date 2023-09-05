/* eslint-disable @typescript-eslint/naming-convention */
import db from '../../lib/dbClient';
import { UsageBody } from './usage.model';

export const getUsage = async (userId: number) => {
  const usage = await db.usage.findFirst({
    where: {
      userId,
    },
  });
  return usage;
};

export const addUsage = async (data: UsageBody) => {
  const { userId, total, input, output } = data;

  let user = await db.usage.findFirst({
    where: {
      userId,
    },
  });

  if (!user) {
    user = await db.usage.create({
      data: {
        user: { connect: { id: userId } },
        total: 0,
        input: 0,
        output: 0,
      },
    });
  }

  const updated = await db.usage.update({
    where: {
      id: user.id,
    },
    data: {
      total: total ? user.total + total : user.total,
      input: input ? user.input + input : user.input,
      output: output ? user.output + output : user.output,
    },
  });

  return {
    usage: updated,
  };
};
