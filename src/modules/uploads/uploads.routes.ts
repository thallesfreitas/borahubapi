/* eslint-disable security/detect-object-injection */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { FastifyInstance } from 'fastify';

import fileUpload from 'fastify-file-upload';
import { deleteFile, getFile, uploadFile } from '../../lib/storage';

type File = {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: (path: string) => void;
};

export default async (fastify: FastifyInstance) => {
  fastify.register(require('@fastify/multipart'));

  fastify.register(fileUpload, {
    limits: { fileSize: 50 * 1024 * 1024 },
  });

  fastify.post('/:folder', async (req, reply) => {
    const { folder } = req.params as {
      folder?: string;
    };

    const reqRaw = req.raw as unknown as {
      files: {
        file: File;
      };
    };
    if (reqRaw.files) {
      const { file } = reqRaw.files;

      const fileFolder = folder || 'temp';
      const { Key } = await uploadFile(file, fileFolder);

      reply.send({
        status: 'success',
        data: {
          key: Key,
        },
      });
    } else {
      reply.send({
        status: 'error',
        data: {
          message: 'No file uploaded',
        },
      });
    }
  });

  fastify.get('/*', async (req, reply) => {
    const { '*': imageKey } = req.params as {
      '*': string;
    };

    const response = await getFile(imageKey);

    reply.send(response.Body);
  });

  fastify.delete('/*', async (req, reply) => {
    const { '*': imageKey } = req.params as {
      '*': string;
    };

    await deleteFile(imageKey);

    reply.status(204).send();
  });

  // fastify.delete('/:imageUrl', async (req, reply) => {
  //   const { imageUrl } = req.params as {
  //     imageUrl: string;
  //   };

  //   await deleteFile(imageUrl);

  //   reply.status(204).send();
  // });
};
