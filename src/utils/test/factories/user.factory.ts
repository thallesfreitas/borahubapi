// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { FastifyInstance } from 'fastify';

interface UserFactoryArgs {
  [key: string]: any;
}

export const UserFactory = {
  build: (attributes: UserFactoryArgs) => {
    const generatedPassword = faker.internet.password();
    const password = attributes.password || generatedPassword;

    return {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      ...attributes,
      password,
      passwordConfirm: password,
    };
  },
  create: async (app: FastifyInstance, attributes: UserFactoryArgs = {}) => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/signup',
        payload: UserFactory.build(attributes),
      })
      .then(res => JSON.parse(res.body).data);
  },
  createMany: async (
    app: FastifyInstance,
    count: number,
    attributes: UserFactoryArgs = {}
  ) => {
    return Promise.all(
      [...Array(count).keys()].map(async () => {
        return UserFactory.create(app, attributes);
      })
    );
  },
};
