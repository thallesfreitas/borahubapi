import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import * as tokenService from '../token/token.service';
import { UserService } from '../users';
import * as UserRepository from '../users/user.repository';
import * as AuthModel from './auth.model';
import * as AuthService from './auth.service';

interface JwtPayload {
  email: string;
  exp: Date;
}

export const signup = async (
  request: AuthModel.SignupRequest,
  reply: FastifyReply
) => {
  try {
    const user = await UserService.createUser({
      ...request.body,
    });
    // return await reply.send({ user, authenticated: true });
    return await reply.send({ user });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};

export const signinwithemail = async (
  request: AuthModel.SigninRequest,
  reply: FastifyReply
) => {
  try {
    AuthService.signinwithemail(request.body);

    return await reply.status(200).send({ status: true });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};
export const signinwithwhats = async (
  request: AuthModel.SigninRequest,
  reply: FastifyReply
) => {
  try {
    AuthService.signinwithWhats(request.body);

    return await reply.status(200).send({ status: true });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};

export const createTokenToValidation = async (
  request: AuthModel.CreateTokenRequest,
  reply: FastifyReply
) => {
  try {
    AuthService.createTokenToValidation(request.body);

    return await reply.status(200).send({ status: true });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};
export const signin = async (
  request: AuthModel.SigninRequest,
  reply: FastifyReply
) => {
  try {
    const { token, user } = await AuthService.signin(request.body);
    return await reply.send({ token, user });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};

export const signinOauth = async (
  request: AuthModel.SigninOauthRequest,
  reply: FastifyReply
) => {
  console.log(
    '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
  );
  console.log('signinOauth');
  console.log(
    '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
  );
  try {
    const { token } = request.body;
    const tokenWS = await tokenService.getToken({ uuid: token });
    const invalid = JSON.stringify({
      sucess: false,
      message: 'invalid token',
    });
    if (tokenWS) {
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      console.log('decoded jwt.verify');
      const decoded = jwt.verify(
        tokenWS.token,
        process.env.JWT_SECRET as string
      );

      if (!decoded) {
        console.log('1');
        console.log('1');
        console.log('1');
        console.log('1');
        console.log('1');
        return await reply.status(403).send(invalid);
      }

      if (!decoded.hasOwnProperty('email') || !decoded.hasOwnProperty('exp')) {
        console.log('2');
        console.log('2');
        console.log('2');
        console.log('2');
        console.log('2');
        console.log('2');
        console.log('2');
        return await reply.status(403).send(invalid);
      }
      const { exp } = decoded as unknown as JwtPayload;

      if (exp instanceof Date && exp < new Date()) {
        console.log('3');
        console.log('3');
        console.log('3');
        console.log('3');
        console.log('3');
        console.log('3');
        return await reply.status(403).send(invalid);
      }

      const { email } = decoded as {
        email: string | undefined;
      };

      if (!email) {
        console.log('4');
        console.log('4');
        console.log('4');
        console.log('4');
        console.log('4');
        console.log('4');
        return await reply.status(403).send(invalid);
      }
      await UserRepository.updateUserByMail(email, {
        isActive: true,
        isEmailConfirmed: true,
      });
      const user = await UserService.getUserByEmail(email);
      if (user) {
        const logged = JSON.stringify({
          sucess: true,
          user,
          token: tokenWS.token,
          page: tokenWS.page,
        });
        // tokenService.deleteUserTokens(email);
        return await reply.send(logged);
      }
    } else {
      console.log('5');
      console.log('5');
      console.log('5');
      console.log('5');
      console.log('5');
      console.log('5');
      console.log('5');
      return await reply.status(400).send(invalid);
    }
  } catch (error) {
    console.log('6');
    console.log('6');
    console.log('6');
    console.log('6');
    console.log('6');
    return await reply.status(400).send(error);
  }
};

export const forgetPassword = async (
  request: AuthModel.ForgetPasswordRequest,
  reply: FastifyReply
) => {
  try {
    const clientUrl = request.headers.origin;

    await AuthService.forgetPassword(request.body.email, clientUrl as string);
    return await reply.send({
      message: 'A reset token has been sent to user email',
    });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};

export const resetPassword = async (
  request: AuthModel.ResetPasswordRequest,
  reply: FastifyReply
) => {
  try {
    await AuthService.resetPassword(request.body.token, request.body.password);
    return await reply.send({
      message: 'Password has been updated',
    });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};

// Admin
type Users = {
  [key: string]: {
    name: string;
    password: string;
    id: number;
  };
};

const USERS: Users = {
  'thallesfreitas@yahoo.com.br': {
    name: 'Thalles Freitas',
    password: 'Gh0st@123',
    id: 1,
  },
};

export const adminSignin = async (
  request: AuthModel.SigninRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;

    // eslint-disable-next-line security/detect-object-injection
    if (!USERS[email]) {
      throw new Error('User not found');
    }

    // eslint-disable-next-line security/detect-object-injection, security/detect-possible-timing-attacks
    if (USERS[email].password !== password) {
      throw new Error('User not found');
    }

    // eslint-disable-next-line security/detect-object-injection
    return await reply.send({
      // eslint-disable-next-line security/detect-object-injection
      id: USERS[email].id,
      // eslint-disable-next-line security/detect-object-injection
      name: USERS[email].name,
      email,
    });
  } catch (error) {
    return reply.status(400).send(error);
  }
};

export const verifyToken = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send(true);
};
