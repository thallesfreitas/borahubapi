import { FastifyRequest } from 'fastify';

export interface SignupBody {
  name: string;
  email: string;
  phone: string;
  indicatedBy: string;
  password: string;
  optin: boolean;
}

export type SignupRequest = FastifyRequest<{
  Body: SignupBody;
}>;

export interface SigninBodyWithEmail {
  email: string;
  page?: string;
}

export interface CreateTokenBody {
  email: string;
  sendEmailOrWhats: string;
}

export type CreateTokenRequest = FastifyRequest<{
  Body: CreateTokenBody;
}>;

export interface SigninBody {
  email: string;
  password: string;
}

export type SigninRequest = FastifyRequest<{
  Body: SigninBody;
}>;

export interface SigninOauthBody {
  token: string;
}

export type SigninOauthRequest = FastifyRequest<{
  Body: SigninOauthBody;
}>;

export interface ForgetPasswordBody {
  email: string;
}

export type ForgetPasswordRequest = FastifyRequest<{
  Body: ForgetPasswordBody;
}>;

export interface ResetPasswordBody {
  token: string;
  password: string;
  passwordConfirm: string;
}

export type ResetPasswordRequest = FastifyRequest<{
  Body: ResetPasswordBody;
}>;
