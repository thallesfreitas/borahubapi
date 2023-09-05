import { FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module 'fastify' {
  interface FastifyContextConfig extends AuthContext {}
}
