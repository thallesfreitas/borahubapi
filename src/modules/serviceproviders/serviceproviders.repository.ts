/* eslint-disable security/detect-object-injection */
/* eslint-disable no-await-in-loop */
import {
  Areas,
  Category,
  Prisma,
  ServiceProvider,
  Tags,
  User,
} from '@prisma/client';
import dbClient from '../../lib/dbClient';
import { updateAreasOnServiceProvider } from '../areas/areas.service';
import { updateCategoryOnServiceProvider } from '../category/category.service';
import { updateTagsOnServiceProvider } from '../tags/tags.service';

export interface ServiceProviderComplete extends ServiceProvider {
  categories: Category;
  tags: Tags;
  areas: Areas;
  createdById: User;
  updatedById: User;
  deletedById: User;
}

export const getServiceProviders = async (limit: number, skip: number) => {
  const data = await dbClient.serviceProvider.findMany({
    where: {
      deletedAt: null,
    },
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
    skip,
    take: limit as number,
  });
  return data;
};

export const getServiceProvidersCount = async () => {
  return dbClient.serviceProvider.count({
    where: {
      deletedAt: null,
    },
  });
};
interface GetServiceProviderById {
  (id: number): Promise<ServiceProvider | null>;
}

export const getServiceProviderById: GetServiceProviderById = async id => {
  return dbClient.serviceProvider.findUnique({
    where: {
      id,
    },
  });
};
//

export interface UpdateServiceProviderArgs extends Partial<ServiceProvider> {
  categories?: string[];
  tags?: string[];
  areas?: string[];
}

export const updateServiceProvider = async (
  userId: number,
  params: UpdateServiceProviderArgs
) => {
  let serviceProvider = await dbClient.serviceProvider.findFirst({
    where: {
      userId,
    },
  });
  if (!serviceProvider?.id) {
    serviceProvider = await dbClient.serviceProvider.create({
      data: {
        user: { connect: { id: userId } },
      },
    });
  }

  updateCategoryOnServiceProvider({
    data: params.categories,
    serviceProviderId: serviceProvider.id,
  });
  updateTagsOnServiceProvider({
    data: params.tags,
    serviceProviderId: serviceProvider.id,
  });
  updateAreasOnServiceProvider({
    data: params.areas,
    serviceProviderId: serviceProvider.id,
  });

  const data: Prisma.ServiceProviderUncheckedUpdateInput = {
    ...params,
    categories: {},
    tags: {},
    areas: {},
  };
  delete data.categories;
  delete data.tags;
  delete data.areas;
  return dbClient.serviceProvider.update({
    where: {
      id: serviceProvider.id,
    },
    data,
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
  });
};

export const getServiceProviderByUserId = async (userId: number) => {
  return dbClient.serviceProvider.findFirst({
    where: {
      userId,
      deletedAt: null,
    },
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
  });
};
