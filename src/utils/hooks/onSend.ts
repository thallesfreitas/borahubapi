import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';

export const onSend = (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown,
  done: DoneFuncWithErrOrRes
) => {
  if (reply.statusCode >= 200 && reply.statusCode < 300) {
    console.log('payload as string');
    console.log(payload as string);
    done(
      null,
      JSON.stringify({
        status: 'success',
        data: JSON.parse(payload as string),
      })
    );
  }

  if (reply.statusCode >= 400 && reply.statusCode < 500) {
    const sourcePayload = JSON.parse(payload as string) as {
      [key: string]: string;
    };
    const newPayload = {
      status: 'fail',
      data: {
        message: sourcePayload?.message || sourcePayload,
      },
    };
    done(null, JSON.stringify(newPayload));
  }

  if (reply.statusCode >= 500) {
    const sourcePayload = JSON.parse(payload as string) as {
      [key: string]: string;
    };
    const newPayload = {
      status: 'error',
      message: sourcePayload?.message || sourcePayload,
    };
    done(null, JSON.stringify(newPayload));
  }
};
