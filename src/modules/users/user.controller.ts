import { FastifyReply } from 'fastify';
import {
  CreateUser,
  GetUserByEmail,
  GetUserById,
  GetUserBySlug,
  UpdateUser,
} from './user.model';
import * as UserService from './user.service';

export const getUserBySlug = async (
  req: GetUserBySlug,
  reply: FastifyReply
) => {
  const { slug } = req.params;

  const user = await UserService.getUserBySlug(slug);

  return reply.send(user);
};

export const getUserByEmail = async (
  req: GetUserByEmail,
  reply: FastifyReply
) => {
  const { email } = req.params;

  const user = await UserService.getUserByEmail(email as string);

  return reply.send(user);
};

export const getUserById = async (req: GetUserById, reply: FastifyReply) => {
  const { id } = req.params;

  const user = await UserService.getUserById(id);

  return reply.send(user);
};

export const createUser = async (req: CreateUser, reply: FastifyReply) => {
  const { email, name, phone, indicatedBy, password, optin } = req.body;
  const user = await UserService.createUser({
    email,
    name,
    phone,
    indicatedBy,
    password,
    optin,
  });

  return reply.send(user);
};

export const updateUser = async (req: UpdateUser, reply: FastifyReply) => {
  const {
    id,
    email,
    name,
    slug,
    phone,
    password,
    optin,
    isEmailConfirmed,
    isPhoneConfirmed,
    isCandidate,
    isRecruiter,
    isServiceProvider,
    isFreelancer,
  } = req.body;

  const user = await UserService.updateUser(Number(id), {
    name,
    email,
    phone,
    password,
    slug,
    optin,
    isEmailConfirmed,
    isPhoneConfirmed,
    isCandidate,
    isRecruiter,
    isServiceProvider,
    isFreelancer,
  });

  return reply.send(user);
};
