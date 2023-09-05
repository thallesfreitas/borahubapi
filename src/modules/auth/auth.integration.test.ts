/* eslint-disable @typescript-eslint/no-shadow */
import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import nock from 'nock';
import { test } from 'tap';
import build from '../../app';
import { UserFactory } from '../../utils/test/factories/user.factory';
import * as AuthRepository from './auth.repository';

test('auth routes', async t => {
  const app = build();

  t.test('signup', async t => {
    t.test(
      'should return 400 if password and passwordConfirm are different',
      async t => {
        // Arrange

        // Act
        const response = await app.inject({
          method: 'POST',
          url: '/auth/signup',
          payload: {
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
            passwordConfirm: '1234567',
          },
        });

        const payload = response.json();

        // Assert
        t.equal(response.statusCode, 400, 'should return 400');
        t.equal(
          payload.data.message,
          'password and passwordConfirm must be the same'
        );
      }
    );

    t.test('should create a new user', async t => {
      // Arrange
      const email = faker.internet.email();

      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          name: 'John Doe',
          email,
          password: '123456',
          passwordConfirm: '123456',
        },
      });

      const payload = response.json();

      // Assert
      t.equal(response.statusCode, 200, 'status code should be 200');
      t.equal(payload.data.email, email, 'email should be the same');
    });

    t.test('should return 400 if email already exists', async t => {
      // Arrange
      const email = faker.internet.email();
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          name: 'John Doe',
          email,
          password: '123456',
          passwordConfirm: '123456',
        },
      });

      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          name: 'John Doe',
          email,
          password: '123456',
          passwordConfirm: '123456',
        },
      });

      const payload = response.json();

      // Assert
      t.equal(response.statusCode, 400, 'status code should be 400');
      t.equal(
        payload.data.message,
        'A new user cannot be created with this email'
      );
    });
  });

  t.test('signin', async t => {
    t.only('should return 400 if email is incorrect', async t => {
      // Arrange
      const user = await UserFactory.create(app, {
        password: '123456',
      });

      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          email: `${user.email}1`,
          password: '123456',
        },
      });

      const payload = response.json();

      // Assert
      t.equal(response.statusCode, 400, 'status code should be 400');
      t.equal(payload.data.message, 'Email or password is incorrect');
    });

    t.test('should return 400 if password is incorrect', async t => {
      // Arrange
      const user = await UserFactory.create(app);

      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          email: user.email,
          password: user.email,
        },
      });

      const payload = response.json();

      // Assert
      t.equal(response.statusCode, 400, 'status code should be 400');
      t.equal(payload.data.message, 'Email or password is incorrect');
    });

    t.test('should signin a user', async t => {
      // Arrange
      const user = await UserFactory.create(app, {
        password: '123456',
      });

      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          email: user.email,
          password: '123456',
        },
      });

      const payload = response.json();

      // Assert
      t.equal(response.statusCode, 200, 'status code should be 200');
      t.type(payload.data.token, 'string', 'token should be a string');
    });
  });

  t.test('forget password', async t => {
    t.test('should send an email', async t => {
      // Arrange
      const user = await UserFactory.create(app);
      let emailPayload: any;
      nock('https://api.sendgrid.com/')
        .post('/v3/mail/send')
        .reply(200, (uri, requestBody) => {
          emailPayload = requestBody;
        });

      // Act
      const response = await app.inject({
        method: 'POST',
        url: '/auth/forget-password',
        payload: {
          email: user.email,
        },
      });

      const payload = response.json();

      // Assert
      t.equal(response.statusCode, 200, 'status code should be 200');
      t.equal(
        payload.data.message,
        'A reset token has been sent to user email'
      );
      t.equal(
        emailPayload.from.email,
        process.env.SENDGRID_FROM,
        'from email should be the same'
      );
      t.equal(
        emailPayload.subject,
        'Reset de senha BoraAjudar.Work',
        'subject should be'
      );
      t.equal(
        emailPayload.personalizations[0].to[0].email,
        user.email,
        'to email should be the same'
      );
    });

    t.test('when user does not exists', async t => {
      t.test('should return 400', async t => {
        // Arrange
        const user = await UserFactory.create(app);
        // Act
        const response = await app.inject({
          method: 'POST',
          url: '/auth/forget-password',
          payload: {
            email: `${user.email}1`,
          },
        });

        const payload = response.json();

        // Assert
        t.equal(response.statusCode, 400, 'status code should be 400');
        t.equal(payload.data.message, 'User not found');
      });
    });
  });

  t.test('reset password', async t => {
    t.test('when token does not exists', async t => {
      t.test('should return 400', async t => {
        // Arrange
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Act
        const response = await app.inject({
          method: 'PATCH',
          url: '/auth/reset-password',
          payload: {
            token: resetToken,
            password: '123456',
            passwordConfirm: '123456',
          },
        });

        const payload = response.json();

        // Assert
        t.equal(response.statusCode, 400, 'status code should be 400');
        t.equal(payload.data.message, 'Token is invalid or has expired');
      });
    });

    t.test('when token is expired', async t => {
      t.test('should return 400', async t => {
        // Arrange
        const user = await UserFactory.create(app);
        const resetToken = crypto.randomBytes(32).toString('hex');
        AuthRepository.createResetToken(
          user.id,
          resetToken,
          new Date(Date.now() - 10 * 60 * 1000)
        );

        // Act
        const response = await app.inject({
          method: 'PATCH',
          url: '/auth/reset-password',
          payload: {
            token: 't0k3n',
            password: '123456',
            passwordConfirm: '123456',
          },
        });

        const payload = response.json();

        // Assert
        t.equal(response.statusCode, 400, 'status code should be 400');
        t.equal(payload.data.message, 'Token is invalid or has expired');
      });
    });

    t.test('when passwords do not match', async t => {
      t.test('should return 400', async t => {
        // Arrange
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Act
        const response = await app.inject({
          method: 'PATCH',
          url: '/auth/reset-password',
          payload: {
            token: resetToken,
            password: '1234567',
            passwordConfirm: '123456',
          },
        });

        const payload = response.json();

        // Assert
        t.equal(response.statusCode, 400, 'status code should be 400');
        t.equal(
          payload.data.message,
          'password and passwordConfirm must be the same'
        );
      });
    });

    t.test('when token are valid and password as well', async t => {
      t.test('should return 200', async t => {
        // Arrange
        const user = await UserFactory.create(app);
        const resetToken = crypto.randomBytes(32).toString('hex');
        await AuthRepository.createResetToken(
          user.id,
          resetToken,
          new Date(Date.now() + 10 * 60 * 1000)
        );

        // Act
        const response = await app.inject({
          method: 'PATCH',
          url: '/auth/reset-password',
          payload: {
            token: resetToken,
            password: '123456',
            passwordConfirm: '123456',
          },
        });

        const payload = response.json();

        // Assert
        t.equal(response.statusCode, 200, 'status code should be 200');
        t.equal(payload.data.message, 'Password has been updated');
      });
    });
  });

  t.teardown(() => app.close());
});
