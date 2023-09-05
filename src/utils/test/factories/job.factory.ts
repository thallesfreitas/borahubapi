// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { FastifyInstance } from 'fastify';

interface JobFactoryArgs {
  [key: string]: any;
}

export const JobFactory = {
  build: (attributes: JobFactoryArgs) => {
    const now = new Date().getTime();
    const name = `${faker.random.word()}-${now}`;
    return {
      name,
      title: name,
      imageUrl: `https://${name}.com`,
      ...attributes,
      userId: 1,
    };
  },
  create: async (app: FastifyInstance, attributes: JobFactoryArgs = {}) => {
    return app
      .inject({
        method: 'POST',
        url: '/categories',
        payload: JobFactory.build(attributes),
      })
      .then(res => JSON.parse(res.body).data);
  },
  createMany: async (
    app: FastifyInstance,
    count: number,
    attributes: JobFactoryArgs = {}
  ) => {
    return Promise.all(
      [...Array(count).keys()].map(async () => {
        return JobFactory.create(app, attributes);
      })
    );
  },
};
