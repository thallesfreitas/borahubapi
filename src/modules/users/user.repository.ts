/* eslint-disable @typescript-eslint/naming-convention */
import { Candidate, Prisma, User } from '@prisma/client';
// import { dbClient } from '../../lib';
import dbClient from '../../lib/dbClient';
import * as emailService from '../../lib/email';
// eslint-disable-next-line import/no-cycle
import * as WhatsApi from '../../lib/whats';
import { Utils } from '../../utils/functions';
import * as CreditsService from '../credits/credits.service';
import { getOrCreateCustomer } from '../payment/payment.service';
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
interface NewUser extends User {
  token?: String;
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
    const customerMP = await getOrCreateCustomer(email);
    const password = Utils.generatePassword();

    const newUser = (await dbClient.user.create({
      data: {
        name,
        email,
        phone,
        indicatedBy,
        password,
        optin,
        slug,
        customerMP,
      },
    })) as NewUser;

    await dbClient.candidate.create({
      data: {
        user: { connect: { id: newUser.id } },
      },
    });
    let idTransactionType = 'WELCOME';
    if (indicatedBy === 'thallesfreitas@gmail.com') {
      idTransactionType = 'WELCOME_INDICATEDBY';
    }

    const credits = await CreditsService.getCostsUsage(idTransactionType);
    const welcomeCredits = credits?.amount as number;

    await CreditsService.addCredits({
      userId: newUser.id,
      amount: welcomeCredits,
      transactionType: idTransactionType,
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

    WhatsApi.sendMessageWithTemplate({
      to: phone,
      message: 'newUser',
      type: 'client',
    });

    setTimeout(() => {
      WhatsApi.sendMessageWithTemplate({
        to: phone,
        message: 'createdUserBoraBot',
        type: 'borabot',
      });
    }, 5000);

    newUser.token = token.token;
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

export interface ApplicationData {
  application: boolean;
  skip: number;
  limit: number;
}

export interface UserCandidate extends User {
  candidate: Candidate;
}
interface GetUserBy {
  (
    variableWhere: object,
    withApplication: ApplicationData
  ): Promise<User | null>;
}

export const deleteUser = async (id: number) => {
  return dbClient.user.delete({
    where: {
      id,
    },
  });
};

export const getUserBy: GetUserBy = async (
  variableWhere,
  withApplication = {
    application: false,
    skip: 0,
    limit: 0,
  }
) => {
  const user = await dbClient.user.findFirst({
    where: variableWhere,
    include: {
      createdJobApplication: {
        select: {
          id: true,
          score: withApplication.application,
          job: withApplication.application,
        },
        skip: Number(withApplication.skip),
        take: Number(withApplication.limit),
      },
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
interface UserValid {
  id: number;
  email: string;
  isActive: boolean;
  isPhoneConfirmed: boolean;
  isEmailConfirmed: boolean;
}
interface ValidUserContact {
  (email: object, slug: object, phone: object): Promise<UserValid | null>;
}
export const validUserContact: ValidUserContact = async (
  email,
  slug,
  phone
): Promise<UserValid | null> => {
  const user = await dbClient.user.findFirst({
    where: {
      email,
      slug,
      phone,
    },
    select: {
      id: true,
      email: true,
      isActive: true,
      isPhoneConfirmed: true,
      isEmailConfirmed: true,
    },
  });
  if (user) {
    return user as UserValid;
  }
  return null;
};

export const getUserByEmail: GetUserByEmail = async email => {
  const user = getUserBy(
    { email },
    {
      application: false,
      skip: 0,
      limit: 0,
    }
  );
  return user;
};

interface GetUserBySlug {
  (slug: string): Promise<User | null>;
  skip?: number;
  limit?: number;
}

interface GetUserBySlugApplication {
  (slug: string, skip: number, limit: number): Promise<User | null>;
}
export const getUserBySlugApplication: GetUserBySlugApplication = async (
  slug: string,
  skip: number,
  limit: number
) => {
  const user = getUserBy(
    { slug },
    {
      application: true,
      skip,
      limit,
    }
  );
  return user;
};
export const getUserBySlug: GetUserBySlug = async slug => {
  const user = getUserBy(
    { slug },
    {
      application: false,
      skip: 0,
      limit: 0,
    }
  );
  return user;
};

interface GetUserByUuid {
  (uuid: string): Promise<User | null>;
}
export const getUserByUuid: GetUserByUuid = async uuid => {
  const user = getUserBy(
    { uuid },
    {
      application: false,
      skip: 0,
      limit: 0,
    }
  );
  return user;
};

interface GetUserById {
  (id: number): Promise<User | null>;
}
export const getUserById: GetUserById = async id => {
  const user = getUserBy(
    { id },
    {
      application: false,
      skip: 0,
      limit: 0,
    }
  );
  return user;
};

interface GetUserByPhone {
  (phone: string): Promise<User | null>;
}

export const getUserByPhone: GetUserByPhone = async to => {
  const user = await getUserBy(
    { phone: to },
    {
      application: false,
      skip: 0,
      limit: 0,
    }
  );
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
  const userUpdate = await dbClient.user.update({
    where: {
      id,
    },
    data: {
      ...params,
    },
  });

  const user = await getUserBy(
    { id },
    {
      application: false,
      skip: 0,
      limit: 0,
    }
  );

  // const tokenUser = await tokenService.getToken({ email: params.email });
  // user.token = tokenUser;
  return { user };
  // return { user, tokenUser };
};

// export const updatePhoneConfirm = async (id: number) => {
//   return dbClient.user.update({
//     where: {
//       id,
//     },
//     data: {
//       isActive: true,
//       isPhoneConfirmed: true,
//     },
//   });
// };
// export const updateEmailConfirm = async (id: number) => {
//   return dbClient.user.update({
//     where: {
//       id,
//     },
//     data: {
//       isActive: true,
//       isEmailConfirmed: true,
//     },
//   });
// };

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
