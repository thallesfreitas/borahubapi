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
    console.log('/getLogin');
    const { email } = request.query as RequestGetLoginProps;

    const queryEventListener = async (event: any) => {
      const { query, params } = event;

      const isUpdate = query.includes('UPDATE');
      const tableNameMatches = query.match(/"public"."(\w+)"/);
      const tableName = tableNameMatches ? tableNameMatches[1] : null;
      const [isValid, phoneNumber] = JSON.parse(params);

      if (tableName === 'token' && email && isUpdate) {
        console.log('/AGORA FOI');
        const user = await UserService.getUserByEmail(email); // .getUserByPhone();
        const userPhone = user?.phone;
        const userEmail = user?.email;
        if (userPhone) {
          const token = await tokenService.getToken({ email });
          const logged = JSON.stringify({
            sucess: true,
            user,
            token,
          });
          const dbPhone = `+${phoneNumber.replace(/[^0-9]/g, '')}`;
          if (isValid && email === userEmail) {
            console.log('LOG 1');
            connection.socket.send(logged);
            connection.socket.close();
            await tokenService.deleteUserTokens(email);
          }
          if (isValid && dbPhone === userPhone) {
            console.log('LOG 2');
            connection.socket.send(logged);
            connection.socket.close();
            setTimeout(() => {
              tokenService.deleteUserTokensPhone(phoneNumber);
            }, 10000);
          }
          console.log('LOG 3');
        }
      }
    };
    dbClient.$on('query', queryEventListener);
  });

  fastify.get(
    '/confirmAccount',
    { websocket: true },
    async (connection, request) => {
      const { email, token } = request.query as RequestCreateAccountProps;

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
          const userEmail = user?.email;
          if (userPhone) {
            // const token = await dbClient.token.findFirst({
            //   where: {
            //     email,
            //   },
            // });
            let tokenUser = await tokenService.getTokenConfirm({ email });
            if (!tokenUser) {
              tokenUser = await tokenService.getTokenConfirm({
                phone: phoneNumber,
              });
            }
            const logged = JSON.stringify({
              sucess: true,
              user,
              token: tokenUser?.token,
              page: tokenUser?.page,
            });

            const dbPhone = `+${phoneNumber.replace(/[^0-9]/g, '')}`;

            if (isValid && email === userEmail) {
              connection.socket.send(logged);

              await tokenService.deleteUserTokens(email);
            }
            if (isValid && dbPhone === userPhone) {
              connection.socket.send(logged);
              await tokenService.deleteUserTokensPhone(phoneNumber);
            }
          }
        }
      };
      dbClient.$on('query', queryEventListener);
    }
  );
};
