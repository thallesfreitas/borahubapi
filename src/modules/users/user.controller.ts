import { FastifyReply } from 'fastify';
import {
  CreateUser,
  DeleteUserRequest,
  GetUserByEmail,
  GetUserById,
  GetUserBySlug,
  UpdateUser,
  ValidUserContact,
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

export const validUserContact = async (
  req: ValidUserContact,
  reply: FastifyReply
) => {
  // const { email, phone, slug } = req.body;
  const email = req.body.email ? req.body.email : {};
  const slug = req.body.slug ? req.body.slug : {};
  const phone = req.body.phone ? req.body.phone : {};
  const user = await UserService.validUserContact(email, slug, phone);

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
    isActive,
    isEmailConfirmed,
    isPhoneConfirmed,
  } = req.body;

  const user = await UserService.updateUser(Number(id), {
    name,
    email,
    phone,
    password,
    slug,
    optin,
    isActive,
    isEmailConfirmed,
    isPhoneConfirmed,
  });

  return reply.send(user);
};

export const deleteUser = async (
  request: DeleteUserRequest,
  reply: FastifyReply
) => {
  const { id } = request.params;

  await UserService.deleteUser(Number(id));

  return reply.status(204).send({ status: true });
};
