// import { dbClient } from '../../lib';
import dbClient from '../../lib/dbClient';

export const deleteUserResetTokens = async (userId: number) =>
  dbClient.resetPasswordToken.deleteMany({
    where: {
      userId,
    },
  });

export const createResetToken = async (
  userId: number,
  token: string,
  expiresAt: Date
) =>
  dbClient.resetPasswordToken.create({
    data: {
      token,
      user: {
        connect: {
          id: userId,
        },
      },
      expiresAt,
    },
  });

export const getResetToken = async (token: string) =>
  dbClient.resetPasswordToken.findFirst({
    where: {
      token,
    },
  });
