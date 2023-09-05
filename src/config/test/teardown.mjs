/* eslint-disable */

import compose from 'docker-compose';
import path from 'path';
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_FOLDER = path.join(__dirname, '../../');

async function stopDbTest() {
  try {
    await compose.stopOne('db-test', {
      cwd: ROOT_FOLDER,
      callback: chunk => {
        console.log('job in progres: ', chunk.toString());
      },
    });
    console.log('Testing database is stopped');
  } catch (error) {
    console.error(error);
  }
}

await stopDbTest();
export const module = 'exports';