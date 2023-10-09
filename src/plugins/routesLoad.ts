import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { readdir } from 'fs/promises';

interface Options extends FastifyPluginOptions {
  dir: string;
  filePattern: RegExp;
  folderNameAsPrefix: boolean;
}

interface FileToRegister {
  filePath: string;
  prefix: string;
}

function register(files: FileToRegister[], fastify: FastifyInstance) {
  return Promise.all(
    files.map(async ({ filePath, prefix }) => {
      const module = await import(filePath);
      fastify.register(module.default, { prefix });
    })
  );
}

async function getFiles(
  folders: string[],
  options: Options
): Promise<FileToRegister[]> {
  return (await Promise.all(
    folders.map(async folder => {
      const folderPath = `${options.dir}/${folder}`;
      const files = await readdir(folderPath);

      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        if (file.match(options.filePattern)) {
          const filePath = `${folderPath}/${file}`;
          const prefix = options.folderNameAsPrefix ? `/${folder}` : '';
          return { filePath, prefix };
        }
      }
      return null;
    })
  ).then(files => files.filter(Boolean))) as FileToRegister[];
}

export const routesLoad = async (
  fastify: FastifyInstance,
  options: Options,
  done: (err?: Error | undefined) => void
) => {
  const folders = await readdir(options.dir);
  const foldersToRead = folders.filter(folder => !folder.includes('.'));
  const filesToRegister = await getFiles(foldersToRead, options);

  await register(filesToRegister, fastify);

  done();
};
