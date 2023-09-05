/* eslint-disable global-require */
import cors from '@fastify/cors';
// eslint-disable-next-line import/no-extraneous-dependencies
// import multipart from '@fastify/multipart';
import fastifyWebsocket from '@fastify/websocket';
import dotenv from 'dotenv';
import fastify from 'fastify';
import path from 'path';
import * as qs from 'qs';

import { jwtValidator, routesLoad } from './plugins';

const isTestEnv = process.env.NODE_ENV === 'test';

dotenv.config({
  path: `${path.join(__dirname, '../')}.${isTestEnv ? 'env.test' : 'env'}`,
});

function build(opts = {}) {
  const app = fastify(opts);

  app.register(cors, {
    origin: true,
  });

  app.register(jwtValidator);
  app.register(fastifyWebsocket);

  const io = require('socket.io')();
  app.register(require('fastify-socket.io'), {
    socketIO: io,
  });

  app.addContentTypeParser(
    'application/jsoff',
    function (request: any, payload: any) {
      console.log('linha 37');
      console.log(payload);

      // jsoffParser(payload, function (err, body) {
      //   done(err, body);
      // });
    }
  );

  // Handle multiple content types with the same function
  app.addContentTypeParser(
    ['text/xml', 'application/xml'],
    function (request: any, payload: any) {
      console.log('linha 51');
      console.log(payload);
      // xmlParser(payload, function (err, body) {

      //   done(err, body);
      // });
    }
  );

  app.addContentTypeParser(
    'application/x-www-form-urlencoded',
    { parseAs: 'string' },
    function (req, payload, done) {
      console.log(payload);
      let parsed = qs.parse(payload.toString());
      // let parsed;
      // if (isBuffer(payload)) {
      if (Buffer.isBuffer(payload)) {
        parsed = qs.parse(payload.toString());
      } else {
        parsed = qs.parse(payload);
      }
      done(null, parsed);
    }
  );
  // app.addContentTypeParser(
  //   'application/json',
  //   { parseAs: 'string' },
  //   function (req, body, done) {
  //     try {
  //       const json = JSON.parse(body as string);
  //       done(null, json);
  //     } catch (err: any) {
  //       err.statusCode = 400;
  //       done(err, undefined);
  //     }
  //   }
  // );
  app.addContentTypeParser('*', function (request, payload, done) {
    done(null, request);
  });
  app.addContentTypeParser(
    ['image/png', 'image/jpeg', 'image/jpg'],
    function (request, payload, done) {
      let data = '';
      payload.on('data', chunk => {
        data += chunk;
      });
      payload.on('end', () => {
        done(null, data);
      });
    }
  );
  app.get('/', async () => ({ hello: 'world!' }));

  app.register(routesLoad, {
    dir: path.join(__dirname, 'modules'),
    filePattern: /.*routes\.(t|j)s/,
    folderNameAsPrefix: true,
  });

  return app;
}

export default build;
