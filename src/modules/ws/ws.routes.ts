import { FastifyInstance } from 'fastify';
import dbClient from '../../lib/dbClient';
import * as tokenService from '../token/token.service';
import * as UserService from '../users/user.service';

export default async (fastify: FastifyInstance) => {
  interface RequestGetLoginProps {
    email: string;
    token: string;
  }
  interface RequestCreateAccountProps {
    email: string;
    token?: string;
  }

  fastify.get('/getLogin', { websocket: true }, async (connection, request) => {
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('++++++++++++++++WS getLogin');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');

    const { email } = request.query as RequestGetLoginProps;
    console.log('request.query');
    console.log(request.query);
    console.log(email);

    const queryEventListener = async (event: any) => {
      const { query, params } = event;

      const isUpdate = query.includes('UPDATE');
      const tableNameMatches = query.match(/"public"."(\w+)"/);
      const tableName = tableNameMatches ? tableNameMatches[1] : null;
      const [isValid, phoneNumber] = JSON.parse(params);

      if (tableName === 'token' && email && isUpdate) {
        // const user = await dbClient.user.findFirst({
        //   where: {
        //     email,
        //   },
        //   select: {
        //     id: true,
        //     uuid: true,
        //     // stripe_id: true,
        //     email: true,
        //     phone: true,
        //     optin: true,
        //     name: true,
        //     slug: true,
        //     indicatedBy: true,
        //     isActive: true,
        //     isPhoneConfirmed: true,
        //     isEmailConfirmed: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     deletedAt: true,
        //     candidate: true,
        //     // recruiter: true,
        //     createdJob: true,
        //     updatedJob: true,
        //     deletedJob: true,
        //   },
        // });
        const user = await UserService.getUserByEmail(email); // .getUserByPhone();
        console.log('user');
        console.log(user);
        const userPhone = user?.phone;
        if (userPhone) {
          const token = await tokenService.getToken({ email });
          console.log('token');
          console.log('token');
          console.log('token');
          console.log('token');
          console.log('token');
          console.log('token');
          console.log('token');
          console.log(token);
          const logged = JSON.stringify({
            sucess: true,
            user,
            token,
          });
          console.log('---------------------------');
          console.log('---------------------------');
          console.log('---------------------------');
          console.log('---------------------------');
          console.log(logged);
          console.log('---------------------------');
          console.log('---------------------------');
          console.log('---------------------------');
          console.log('---------------------------');
          const dbPhone = `+${phoneNumber.replace(/[^0-9]/g, '')}`;

          if (isValid && dbPhone === userPhone) {
            console.log('WS');
            console.log('logged');
            console.log(logged);
            connection.socket.send(logged);
            connection.socket.close();
            setTimeout(() => {
              tokenService.deleteUserTokens(email);
            }, 10000);
          }
        }
      }
    };
    dbClient.$on('query', queryEventListener);
  });

  fastify.get(
    '/confirmAccount',
    { websocket: true },
    async (connection, request) => {
      console.log('---------------------------');
      console.log('---------------------------');
      console.log('---------------------------');
      console.log('---------------------------');

      console.log('++++++++++++++++ | WS confirmAccount');
      console.log('---------------------------');
      console.log('---------------------------');
      console.log('---------------------------');
      console.log('---------------------------');

      const { email, token } = request.query as RequestCreateAccountProps;
      console.log('email');
      console.log(email);
      const queryEventListener = async (event: any) => {
        const { query, params, target } = event;
        const isUpdate = query.includes('UPDATE');
        const tableNameMatches = query.match(/"public"."(\w+)"/);
        const tableName = tableNameMatches ? tableNameMatches[1] : null;
        const [isValid, phoneNumber] = JSON.parse(params);
        if (tableName === 'token' && email && isUpdate) {
          const user = await dbClient.user.findFirst({
            where: {
              email,
            },
          });

          const userPhone = user?.phone;
          if (userPhone) {
            // const token = await dbClient.token.findFirst({
            //   where: {
            //     email,
            //   },
            // });
            const tokenUser = await tokenService.getToken({ email });
            console.log(
              '_______________________tokenUser______________________'
            );
            console.log(tokenUser);
            const logged = JSON.stringify({
              sucess: true,
              user,
              token: tokenUser?.token,
              page: tokenUser?.page,
            });
            console.log(logged);
            const dbPhone = `+${phoneNumber.replace(/[^0-9]/g, '')}`;

            if (isValid && dbPhone === userPhone) {
              console.log('++++++++++++++++ | WS confirmAccount- VALIDADO');
              connection.socket.send(logged);
              connection.socket.close();
              tokenService.deleteUserTokens(email);
            }
          }
        }
      };
      dbClient.$on('query', queryEventListener);
    }
  );
};
