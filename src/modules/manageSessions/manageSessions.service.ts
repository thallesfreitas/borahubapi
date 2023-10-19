import { CreateSession } from './manageSessions.model';
import * as SessionsRepository from './manageSessions.repository';

export const getSession = async (session_id: string) =>
  SessionsRepository.getSession(session_id);

export const createSession = async (data: CreateSession) => {
  return SessionsRepository.createSession(data);
};
