import { FastifyInstance } from 'fastify';
import dbClient from '../../lib/dbClient';
import * as tokenService from '../token/token.service';

export default async (fastify: FastifyInstance) => {
  interface requestGetLoginProps {
    email: string;
    token: string;
  }
  interface requestCreateAccountProps {
    email: string;
    token: string;
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

    const { email } = request.query as requestGetLoginProps;

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
          select: {
            id: true,
            uuid: true,
            // stripe_id: true,
            email: true,
            phone: true,
            optin: true,
            name: true,
            slug: true,
            indicatedBy: true,
            isActive: true,
            isPhoneConfirmed: true,
            isEmailConfirmed: true,
            isCandidate: true,
            isRecruiter: true,
            isServiceProvider: true,
            isFreelancer: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            candidate: true,
            // recruiter: true,

            createdJob: true,
            updatedJob: true,
            deletedJob: true,
          },
        });
        console.log('---------------------------');
        console.log('---------------------------');
        console.log('---------------------------');
        console.log('---------------------------');
        console.log(user);
        console.log('---------------------------');
        console.log('---------------------------');
        console.log('---------------------------');
        console.log('---------------------------');
        const userPhone = user?.phone;
        if (userPhone) {
          const token = await tokenService.getToken({ email });

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
            connection.socket.send(logged);
            connection.socket.close();
            tokenService.deleteUserTokens(email);
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

      const { email, token } = request.query as requestCreateAccountProps;
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
