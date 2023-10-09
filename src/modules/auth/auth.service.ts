import bcrypt from 'bcrypt';
import crypto from 'crypto';

import * as emailService from '../../lib/email';
import * as WhatsApi from '../../lib/whats';
// eslint-disable-next-line import/no-cycle
import * as tokenService from '../token/token.service';
import * as UserRepositoy from '../users/user.repository';
import * as UserService from '../users/user.service';
import { CreateTokenBody, SigninBody, SigninBodyWithEmail } from './auth.model';
import * as AuthRepository from './auth.repository';

export const createTokenToValidation = async ({
  email,
  sendEmailOrWhats,
}: CreateTokenBody) => {
  const ERROR_MESSAGE = 'Email is incorrect';

  const user = await UserService.getUserByEmail(email);
  if (!user) {
    // throw new Error(ERROR_MESSAGE);
    return false;
  }

  const { uuid } = await tokenService.createToken(
    user.uuid,
    user.phone,
    user.email
  );

  if (sendEmailOrWhats === 'w') {
    if (!user.isPhoneConfirmed)
      await WhatsApi.sendMessageWithTemplate({
        to: user.phone,
        message: 'createTokenToValidation',
      });
  } else if (sendEmailOrWhats === 'e') {
    if (!user.isEmailConfirmed)
      await emailService.sendEmail({
        payload: {
          name: user.name,
          email: user.email,
          token: uuid,
          url: process.env.URL as string,
        },
        type: 'createTokenToValidation',
      });
  } else if (sendEmailOrWhats === 'ew') {
    if (!user.isPhoneConfirmed)
      await WhatsApi.sendMessageWithTemplate({
        to: user.phone,
        message: 'createTokenToValidation',
      });
    if (!user.isEmailConfirmed)
      await emailService.sendEmail({
        payload: {
          name: user.name,
          email: user.email,
          token: uuid,
          url: process.env.URL as string,
        },
        type: 'createTokenToValidation',
      });
  }
  return true;
};

export const signinwithemail = async ({ email, page }: SigninBodyWithEmail) => {
  // const ERROR_MESSAGE = 'Email is incorrect';

  const user = await UserService.getUserByEmail(email);
  if (!user) {
    return false;
  }
  const pagepath = page ? `&page=${page}` : '';
  const { uuid } = await tokenService.createToken(
    user.uuid,
    user.phone,
    user.email,
    true,
    pagepath
  );

  emailService.sendEmail({
    payload: {
      name: user.name,
      email: user.email,
      token: uuid,
      url: process.env.URL as string,
    },
    type: 'loginUser',
  });

  return true;
};

export const signinwithWhats = async ({ email }: SigninBodyWithEmail) => {
  // const ERROR_MESSAGE = 'Whats is incorrect';

  const user = await UserService.getUserByEmail(email);
  if (!user) {
    return false;
  }

  const { token } = await tokenService.createToken(
    user.uuid,
    user.phone,
    user.email,
    true
  );

  await WhatsApi.sendMessageWithTemplate({
    to: user.phone,
    message: 'loginUser',
  });

  return true;
};
export const signin = async ({ email, password }: SigninBody) => {
  // const ERROR_MESSAGE = 'Email or password is incorrect';

  // get user from db
  const user = await UserService.getUserByEmail(email);

  if (!user) {
    // throw new Error(ERROR_MESSAGE);
    return {
      token: null,
      user: null,
    };
  }

  // compare password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordCorrect) {
    return {
      token: null,
      user: null,
    };
    // throw new Error(ERROR_MESSAGE);
  }

  // generate token

  const { token } = await tokenService.createToken(
    user.uuid,
    user.phone,
    user.email,
    true
  );
  const { password: userPassword, ...rest } = user;

  return {
    token,
    user: rest,
  };
};

export const signinOauth = async (email: string) => {
  // const ERROR_MESSAGE = 'Email or password is incorrect';

  const user = await UserService.getUserByEmail(email);

  if (!user) {
    // throw new Error(ERROR_MESSAGE);
    return null;
  }

  const { token } = await tokenService.createToken(
    user.uuid,
    user.phone,
    user.email,
    true
  );

  return token;
};

export const forgetPassword = async (email: string, clientUrl: string) => {
  const user = await UserService.getUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  await AuthRepository.deleteUserResetTokens(user.id);

  const resetToken = crypto.randomBytes(20).toString('hex');

  const { token } = await AuthRepository.createResetToken(
    user.id,
    resetToken,
    new Date(Date.now() + 10 * 60 * 1000)
  );

  await emailService.sendEmail({
    payload: {
      name: user.name,
      link: `${clientUrl}/nova-senha?token=${token}`,
      url: process.env.URL as string,
    },
    type: 'forgetPassword',
  });
};

export const resetPassword = async (token: string, password: string) => {
  const resetToken = await AuthRepository.getResetToken(token);

  if (!resetToken) {
    throw new Error('Token is invalid or has expired');
  }

  if (new Date(resetToken.expiresAt) < new Date()) {
    throw new Error('Token is invalid or has expired');
  }

  const user = await UserService.getUserById(resetToken.userId);

  const isSamePassword = await bcrypt.compare(
    password,
    user?.password as string
  );

  if (isSamePassword) {
    throw new Error('New password cannot be the same as old password');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await UserRepositoy.changePassword({
    userId: resetToken.userId,
    password: hashedPassword,
  });

  await AuthRepository.deleteUserResetTokens(resetToken.userId);
};

export const checkToken = async (token: string) => {
  return tokenService.checkToken(token);
};

// export const checkValidToken = (token: string) => {
//   return tokenService.checkValidToken(token);
// };
