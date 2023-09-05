import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { checkToken } from '../modules/auth/auth.service';
import { UserService } from '../modules/users';

export const jwtValidator = fp(async (fastify: FastifyInstance) => {
  fastify.decorate(
    'authenticate',
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = _request.headers.authorization?.split(' ')[1];
        if (!token) {
          throw new Error('Invalid token');
        }
        const { uuid, email } = (await checkToken(token)) as {
          uuid: string;
          email: string;
        };

        const user = await UserService.getUserByUuid(uuid);

        if (!user) {
          throw new Error('Invalid token');
        }

        const userIsActive = user.isActive;
        const hasSameEmail = user.email === email;
        const userIsDeleted = user.deletedAt !== null;

        if (!userIsActive || !hasSameEmail || userIsDeleted) {
          throw new Error('Invalid token');
        }

        _request.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        reply.status(200);
      } catch (err) {
        reply.status(401).send(err);
      }
    }
  );

  // fastify.decorate('authenticateRoute', {
  //   getter() {
  //     return true;
  //   },
  // });

  // fastify.addHook('onRequest', async (request, reply) => {
  //   console.log('onRequest');
  // console.log(fastify.authenticateRoute); // 'a getter'

  // const context = request.context as unknown as AuthContext;
  // if (context && context.requiresAuth) {
  //   console.log('CHAMOU AUTENTICACAO');
  // await request.authenticate(request, reply);
  // }
  // });

  /*
  fastify.decorate('authenticate', async function authenticate() {
    console.log("decorate('authenticate'");
  });
  fastify.decorateRequest(
    'authenticate',
    async function authenticate(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void> {
      console.log('decorateRequest - authenticate');
      try {
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
          throw new Error('Invalid token');
        }

        const { uuid, email } = checkToken(token) as {
          uuid: string;
          email: string;
        };

        const user = await UserService.getUserByUuid(uuid);

        if (!user) {
          throw new Error('Invalid token');
        }

        const userIsActive = user.isActive;
        const hasSameEmail = user.email === email;
        const userIsDeleted = user.deletedAt !== null;

        if (!userIsActive || !hasSameEmail || userIsDeleted) {
          throw new Error('Invalid token');
        }

        request.user = {
          id: user.id,
          name: user.name,
          email,
        };
        reply.status(200);
      } catch (err) {
        reply.status(401).send(err);
      }
    }
  );
  */
  // fastify.addHook(
  //   'preHandler',
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     console.log('onRequest authenticate');
  //     try {
  //       const token = request.headers.authorization?.split(' ')[1];

  //       if (!token) {
  //         throw new Error('Invalid token');
  //       }

  //       const { uuid, email } = checkToken(token) as {
  //         uuid: string;
  //         email: string;
  //       };

  //       const user = await UserService.getUserByUuid(uuid);

  //       if (!user) {
  //         throw new Error('Invalid token');
  //       }

  //       const userIsActive = user.isActive;
  //       const hasSameEmail = user.email === email;
  //       const userIsDeleted = user.deletedAt !== null;

  //       if (!userIsActive || !hasSameEmail || userIsDeleted) {
  //         throw new Error('Invalid token');
  //       }

  //       request.user = {
  //         id: user.id,
  //         name: user.name,
  //         email,
  //       };
  //       reply.status(200);
  //     } catch (err) {
  //       reply.status(401).send(err);
  //     }
  //   }
  // );

  // fastify.decorate('userInformation', async (request: FastifyRequest) => {
  fastify.decorate('userInformation', function () {});
  fastify.addHook('onRequest', async (request: FastifyRequest) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      if (!token || token === 'undefined') {
        // done();
        return;
      }
      const { uuid, email } = (await checkToken(token)) as {
        uuid: string;
        email: string;
      };

      const user = await UserService.getUserByUuid(uuid);

      if (!user) {
        // done();
        return;
      }

      request.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // done();
  });
});
