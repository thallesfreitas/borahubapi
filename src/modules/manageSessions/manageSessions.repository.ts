import db from '../../lib/dbClient';
import { CreateSession } from './manageSessions.model';

export const createSession = async (data: CreateSession) => {
  const { session_id, key, value } = data;
  if (key === 'contentSystem') {
    await db.manage_sessions.deleteMany({
      where: {
        session_id,
      },
    });
  }
  const session = await db.manage_sessions.create({
    data: {
      session_id,
      key,
      value,
    },
  });

  return {
    session,
  };
};

export const getSession = async (session_id: string) => {
  const session = await db.manage_sessions.findMany({
    where: {
      session_id,
    },
  });

  return {
    session,
  };
};
