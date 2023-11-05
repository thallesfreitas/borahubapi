import { FastifyInstance } from 'fastify';
import { onSend } from '../../utils/hooks/onSend';
import { AuthController, AuthModel, AuthSchema } from './index';

export default async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: AuthModel.SignupBody;
  }>(
    '/signup',
    {
      preHandler: (request, reply, done) => {
        const { password } = request.body;
        // eslint-disable-next-line security/detect-possible-timing-attacks
        done();
      },
      schema: {
        body: AuthSchema.SignupBody,
      },
      // onRequest: fastify.authenticate,
      onSend,
    },
    AuthController.signup
  );

  fastify.post<{
    Body: AuthModel.SigninBody;
  }>(
    '/signin',
    {
      schema: {
        body: AuthSchema.SigninBody,
      },
      // onRequest: fastify.authenticate,
      onSend,
    },
    AuthController.signin
  );

  fastify.post<{
    Body: AuthModel.SigninBody;
  }>(
    '/signinemail',
    {
      schema: {
        body: AuthSchema.SigninBodyWithEmail,
      },
      // onRequest: fastify.authenticate,
      onSend,
    },
    AuthController.signinwithemail
  );

  fastify.post<{
    Body: AuthModel.SigninBody;
  }>(
    '/signinwhats',
    {
      schema: {
        body: AuthSchema.SigninBodyWithEmail,
      },
      // onRequest: fastify.authenticate,
      onSend,
    },
    AuthController.signinwithwhats
  );

  fastify.post<{
    Body: AuthModel.CreateTokenBody;
  }>(
    '/createTokenToValidation',
    {
      schema: {
        body: AuthSchema.CreateTokenToValidation,
      },
      // onRequest: fastify.authenticate,
      onSend,
    },
    AuthController.createTokenToValidation
  );

  fastify.post<{
    Body: AuthModel.SigninOauthBody;
  }>(
    '/signin-oauth',
    {
      schema: {
        body: AuthSchema.SigninOauthBody,
      },
      onSend,
    },
    AuthController.signinOauth
  );

  fastify.post<{
    Body: AuthModel.SigninOauthBody;
  }>(
    '/validation',
    {
      schema: {
        body: AuthSchema.SigninOauthBody,
      },
      onSend,
    },
    AuthController.validation
  );

  fastify.post<{
    Body: AuthModel.ForgetPasswordBody;
  }>(
    '/forget-password',
    {
      schema: {
        body: AuthSchema.forgetPasswordBody,
      },
      onSend,
    },
    AuthController.forgetPassword
  );

  fastify.patch<{
    Body: AuthModel.ResetPasswordBody;
  }>(
    '/reset-password',
    {
      preHandler: (request, reply, done) => {
        const { password } = request.body;
        // eslint-disable-next-line security/detect-possible-timing-attacks

        done();
      },
      schema: {
        body: AuthSchema.resetPasswordBody,
      },
      onSend,
    },
    AuthController.resetPassword
  );

  // Admin
  fastify.post<{
    Body: AuthModel.SigninBody;
  }>(
    '/admin/signin',
    {
      schema: {
        body: AuthSchema.SigninBody,
      },
    },
    AuthController.adminSignin
  );

  fastify.get(
    '/verify-token',
    {
      onRequest: fastify.authenticate,
      onSend,
    },
    AuthController.verifyToken
  );

  fastify.get(
    '/no-verify-token',
    {
      onSend,
    },
    AuthController.verifyToken
  );
};
