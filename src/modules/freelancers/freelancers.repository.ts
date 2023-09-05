/* eslint-disable security/detect-object-injection */
/* eslint-disable no-await-in-loop */
import {
  Areas,
  Category,
  Freelancer,
  Prisma,
  Tags,
  User,
} from '@prisma/client';
import dbClient from '../../lib/dbClient';
import { updateAreasOnFreelancer } from '../areas/areas.service';
import { updateCategoryOnFreelancer } from '../category/category.service';
import { updateTagsOnFreelancer } from '../tags/tags.service';

export interface FreelancerComplete extends Freelancer {
  categories: Category;
  tags: Tags;
  areas: Areas;
  createdById: User;
  updatedById: User;
  deletedById: User;
}

export const getFreelancers = async (limit: number, skip: number) => {
  const data = await dbClient.freelancer.findMany({
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

export const getFreelancersCount = async () => {
  return dbClient.freelancer.count({
    where: {
      deletedAt: null,
    },
  });
};
interface GetFreelancerById {
  (id: number): Promise<Freelancer | null>;
}

export const getFreelancerById: GetFreelancerById = async id => {
  return dbClient.freelancer.findUnique({
    where: {
      id,
    },
  });
};
//

export interface UpdateFreelancerArgs extends Partial<Freelancer> {
  categories?: string[];
  tags?: string[];
  areas?: string[];
}

export const updateFreelancer = async (
  userId: number,
  params: UpdateFreelancerArgs
) => {
  let freelancer = await dbClient.freelancer.findFirst({
    where: {
      userId,
    },
  });
  if (!freelancer?.id) {
    freelancer = await dbClient.freelancer.create({
      data: {
        user: { connect: { id: userId } },
      },
    });
  }

  updateCategoryOnFreelancer({
    data: params.categories,
    freelancerId: freelancer.id,
  });
  updateTagsOnFreelancer({
    data: params.tags,
    freelancerId: freelancer.id,
  });
  updateAreasOnFreelancer({
    data: params.areas,
    freelancerId: freelancer.id,
  });

  const data: Prisma.FreelancerUncheckedUpdateInput = {
    ...params,
    categories: {},
    tags: {},
    areas: {},
  };
  delete data.categories;
  delete data.tags;
  delete data.areas;
  return dbClient.freelancer.update({
    where: {
      id: freelancer.id,
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

export const getFreelancerByUserId = async (userId: number) => {
  return dbClient.freelancer.findFirst({
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
