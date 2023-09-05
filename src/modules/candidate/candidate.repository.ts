/* eslint-disable security/detect-object-injection */
/* eslint-disable no-await-in-loop */
import { Areas, Candidate, Category, Prisma, Tags, User } from '@prisma/client';
import dbClient from '../../lib/dbClient';
import { updateAreasOnCandidate } from '../areas/areas.service';
import { updateCategoryOnCandidate } from '../category/category.service';
import { updateTagsOnCandidate } from '../tags/tags.service';

export interface CandidateComplete extends Candidate {
  categories: Category;
  tags: Tags;
  areas: Areas;
  createdById: User;
  updatedById: User;
  deletedById: User;
}

export const getCandidates = async (limit: number, skip: number) => {
  const data = await dbClient.candidate.findMany({
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

export const getCandidatesCount = async () => {
  return dbClient.candidate.count({
    where: {
      deletedAt: null,
    },
  });
};
interface GetCandidateById {
  (id: number): Promise<Candidate | null>;
}

export const getCandidateById: GetCandidateById = async id => {
  return dbClient.candidate.findUnique({
    where: {
      id,
    },
  });
};
//

export interface UpdateCandidateArgs extends Partial<Candidate> {
  categories?: string[];
  tags?: string[];
  areas?: string[];
}

export const updateCandidate = async (
  userId: number,
  params: UpdateCandidateArgs
) => {
  const candidate = await dbClient.candidate.findFirst({
    where: {
      userId,
    },
  });
  if (!candidate?.id) {
    throw new Error('Candidate not found');
  }

  updateCategoryOnCandidate({
    data: params.categories,
    candidateId: candidate.id,
  });
  updateTagsOnCandidate({
    data: params.tags,
    candidateId: candidate.id,
  });
  updateAreasOnCandidate({
    data: params.areas,
    candidateId: candidate.id,
  });

  const data: Prisma.CandidateUncheckedUpdateInput = {
    ...params,
    categories: {},
    tags: {},
    areas: {},
  };
  delete data.categories;
  delete data.tags;
  delete data.areas;
  return dbClient.candidate.update({
    where: {
      id: candidate.id,
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

export const getCandidateByUserId = async (userId: number) => {
  return dbClient.candidate.findFirst({
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
