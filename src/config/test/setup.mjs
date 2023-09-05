/* eslint-disable */
import path from 'path';
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({
  path: `${path.join(__dirname, '../../../')}.env.test`,
});

import compose from 'docker-compose';

import {
  fileURLToPath
} from 'url';
import waitPort from 'wait-port';
import {
  $
} from 'zx';



const ROOT_FOLDER = path.join(__dirname, '../../');
const DATABASE_TEST_URL = process.env.DATABASE_URL;

async function runDbTest() {
  try {
    await compose.upOne('db-test', {
      cwd: ROOT_FOLDER,
      callback: chunk => {
        console.log('job in progres: ', chunk.toString());
      },
    });
    console.log('Testing database is up and running');
  } catch (error) {
    console.error(error);
  }
}

async function resetDatabase(retry = true) {
  try {
    await timeout(1000);
    await $ `DATABASE_URL=${DATABASE_TEST_URL} npm run test:reset:db`
    console.log('Database reseted');
  } catch (error) {
    await timeout(1000);
    if (retry) {
      resetDatabase(false);
    }
    console.error(error);
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


await runDbTest();
await waitPort({
  host: 'localhost',
  port: 5434,
  timeout: 5000,
})
await resetDatabase();

export const module = 'exports';