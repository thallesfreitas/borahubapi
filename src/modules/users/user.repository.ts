/* eslint-disable @typescript-eslint/naming-convention */
import { Prisma, User } from '@prisma/client';
// import { dbClient } from '../../lib';
import dbClient from '../../lib/dbClient';
import * as emailService from '../../lib/email';
// eslint-disable-next-line import/no-cycle
import * as WhatsApi from '../../lib/whats';
import { Utils } from '../../utils/functions';
import * as CreditsService from '../credits/credits.service';
import { getOrCreateCustomer } from '../payment/payment.service';
import { createUserStripe } from '../stripe/stripe.service';
import * as tokenService from '../token/token.service';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export { User } from '@prisma/client';

export interface CreateUserArgs
  extends Pick<
    User,
    'name' | 'email' | 'phone' | 'password' | 'optin' | 'indicatedBy'
  > {}

interface CreateUser {
  (param: CreateUserArgs): Promise<User>;
}

export const createUser: CreateUser = async ({
  name,
  email,
  phone,
  optin,
  indicatedBy,
}) => {
  try {
    let slug = Utils.generateSlug(name);
    let userWithSameSlug = await dbClient.user.findFirst({
      where: {
        slug,
      },
    });
    let i = 1;
    while (userWithSameSlug) {
      slug = `${Utils.generateSlug(name)}-${i}`;
      // eslint-disable-next-line no-await-in-loop
      userWithSameSlug = await dbClient.user.findFirst({
        where: {
          slug,
        },
      });
      i += 1;
    }
    let jobWithSameSlug = await dbClient.jobs.findFirst({
      where: {
        slug,
      },
    });
    while (jobWithSameSlug) {
      slug = `${Utils.generateSlug(name)}-${i}`;
      // eslint-disable-next-line no-await-in-loop
      jobWithSameSlug = await dbClient.jobs.findFirst({
        where: {
          slug,
        },
      });
      i += 1;
    }

    // const customers = await stripe.customers.list({ email });

    // let customer;

    // if (customers.data.length > 0) {
    //   customer = await stripe.customers.update(customers.data[0].id, {
    //     name,
    //   });
    // } else {
    //   customer = await stripe.customers.create({
    //     name,
    //     email,
    //   });
    // }

    // const stripe_id = customer.id;
    const stripe_id = await createUserStripe(email, name);
    const customerMP = await getOrCreateCustomer(email);
    const password = Utils.generatePassword();
    const newUser = await dbClient.user.create({
      data: {
        name,
        email,
        phone,
        indicatedBy,
        password,
        optin,
        slug,
        stripe_id,
        customerMP,
      },
    });

    await dbClient.candidate.create({
      data: {
        user: { connect: { id: newUser.id } },
      },
    });
    // await dbClient.serviceProvider.create({
    //   data: {
    //     user: { connect: { id: newUser.id } },
    //   },
    // });
    // await dbClient.freelancer.create({
    //   data: {
    //     user: { connect: { id: newUser.id } },
    //   },
    // });
    // const recruiter = await dbClient.recuiter.create({
    //   data: {
    //     createdById: { connect: { id: newUser.id } },
    //     updatedById: { connect: { id: newUser.id } },
    //   },
    // });

    await CreditsService.addCredits({
      userId: newUser.id,
      amount: 100,
      transactionType: 'WELCOME',
      status: 'approved',
    });

    const token = await tokenService.createToken(
      newUser.uuid,
      newUser.phone,
      newUser.email
    );
    emailService.sendEmail({
      payload: {
        name,
        email,
        token: token.uuid as string,
        url: process.env.URL as string,
      },
      type: 'newUser',
    });

    WhatsApi.sendMessageUltra({
      to: phone,
      message: 'newUser',
    });

    return newUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new user cannot be created with this email');
      }
    }
    throw error;
  }
};

interface UserWithProfiles extends User {
  // candidate: Candidate;
  // createdRecruiter: Recruiter[];
  // createdServiceProvider: ServiceProvider[];
  // createdFreelancer: Freelancer[];
}
interface GetUserBy {
  (variableWhere: object): Promise<UserWithProfiles | null>;
}

export const getUserBy: GetUserBy = async variableWhere => {
  const user = await dbClient.user.findFirst({
    where: variableWhere,
    include: {
      candidate: {
        include: {
          categories: {
            select: {
              category: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          tags: {
            select: {
              tags: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          areas: {
            select: {
              areas: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      serviceProvider: {
        include: {
          categories: {
            select: {
              category: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          tags: {
            select: {
              tags: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          areas: {
            select: {
              areas: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      freelancer: {
        include: {
          categories: {
            select: {
              category: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          tags: {
            select: {
              tags: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
          areas: {
            select: {
              areas: {
                select: {
                  type: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return user;
};

interface GetUserByEmail {
  (email: string): Promise<User | null>;
}
export const getUserByEmail: GetUserByEmail = async email => {
  const user = getUserBy({ email });
  return user;
};

interface GetUserBySlug {
  (slug: string): Promise<UserWithProfiles | null>;
}
export const getUserBySlug: GetUserBySlug = async slug => {
  const user = getUserBy({ slug });
  return user;
};

interface GetUserByUuid {
  (uuid: string): Promise<UserWithProfiles | null>;
}
export const getUserByUuid: GetUserByUuid = async uuid => {
  const user = getUserBy({ uuid });
  return user;
};

interface GetUserById {
  (id: number): Promise<UserWithProfiles | null>;
}
export const getUserById: GetUserById = async id => {
  const user = getUserBy({ id });
  return user;
};

interface GetUserByPhone {
  (phone: string): Promise<UserWithProfiles | null>;
}

export const getUserByPhone: GetUserByPhone = async phone => {
  const user = getUserBy({ phone });
  return user;
};

/// //////UPDATE USER

export const updateUserByMail = async (
  email: string,
  params: UpdateUserArgs
) => {
  return dbClient.user.update({
    where: {
      email,
    },
    data: {
      ...params,
    },
  });
};

export interface UpdateUserArgs extends Partial<User> {}
export const updateUser = async (id: number, params: UpdateUserArgs) => {
  return dbClient.user.update({
    where: {
      id,
    },
    data: {
      ...params,
    },
  });
};

export const updatePhoneConfirm = async (id: number) => {
  return dbClient.user.update({
    where: {
      id,
    },
    data: {
      isPhoneConfirmed: true,
    },
  });
};
export const updateEmailConfirm = async (id: number) => {
  return dbClient.user.update({
    where: {
      id,
    },
    data: {
      isEmailConfirmed: true,
    },
  });
};

interface ChangePasswordArgs {
  userId: number;
  password: string;
}
interface ChangePassword {
  (params: ChangePasswordArgs): Promise<User | null>;
}

export const changePassword: ChangePassword = async ({ userId, password }) =>
  dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
