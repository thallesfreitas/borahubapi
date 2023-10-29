/* eslint-disable prettier/prettier */
import app from './app';
import { connectWP } from './lib/whats';

const PORT = (process.env.PORT || 3000) as number;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
  logger: {
    transport: IS_PRODUCTION
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
  },
  maxParamLength: 200,
};

const server = app(config);

const start = async () => {
  try {
    await server.listen({ port: PORT, host: process.env.HOST || '0.0.0.0' });
    // connectWP();
    // setTimeout(() => {
    connectWP('borabot');
    // }, 10000);
  } catch (err) {
    server.log.error(err);
    start();
    // process.exit(1);
  }
};

start();
