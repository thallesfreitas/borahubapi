import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-cycle
import * as UserRepository from './user.repository';

export const createUser = async (params: UserRepository.CreateUserArgs) => {
  const newParams = {
    ...params,
    password: params.password ? await bcrypt.hash(params.password, 12) : null,
  };

  return UserRepository.createUser(newParams);
};

export const getUserByEmail = async (email: string) =>
  UserRepository.getUserByEmail(email);

export const getUserBySlug = async (slug: string) =>
  UserRepository.getUserBySlug(slug);

export const getUserByPhone = async (phone: string) =>
  UserRepository.getUserByPhone(phone);

export const getUserByUuid = async (uuid: string) =>
  UserRepository.getUserByUuid(uuid);

export const getUserById = async (id: number) => UserRepository.getUserById(id);

export const updateUser = async (
  id: number,
  params: UserRepository.UpdateUserArgs
) => UserRepository.updateUser(id, params);
