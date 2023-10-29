/* eslint-disable no-await-in-loop */
import {
  Areas,
  Category,
  JobApplication,
  Jobs,
  Prisma,
  Tags,
} from '@prisma/client';
import dbClient from '../../lib/dbClient';
import { Utils } from '../../utils/functions';
import { updateAreasOnJobs } from '../areas/areas.service';
import { updateCategoryOnJobs } from '../category/category.service';
import { updateTagsOnJobs } from '../tags/tags.service';
// eslint-disable-next-line import/no-cycle
import { UserCandidate } from '../users/user.repository';

export interface CreateJobArgs {
  title: string;
  slug: string;
  description: string;
  descriptionCompany: string;
  modelOfWork: string[];
  city: string;
  state: string;
  experience: string;
  showSalary: boolean;
  salary: string[];
  extra: string;
  affirmative: string[];
  categories: string[];
  areas: string[];
  tags: string[];
  userId: number;
  company: string;
  phone: string;
  email: string;
}

export const createJob = async ({ userId, ...rest }: CreateJobArgs) => {
  try {
    let slug = Utils.generateSlug(`${rest.title}-${rest.company}`);
    let i = 1;
    let jobsWithSameSlug = await dbClient.jobs.findFirst({
      where: {
        slug,
      },
    });

    while (jobsWithSameSlug) {
      slug = `${Utils.generateSlug(`${rest.title}-${rest.company}`)}-${i}`;
      jobsWithSameSlug = await dbClient.jobs.findFirst({
        where: {
          slug,
        },
      });
      i += 1;
    }

    let userWithSameSlug = await dbClient.user.findFirst({
      where: {
        slug,
      },
    });

    while (userWithSameSlug) {
      slug = `${Utils.generateSlug(`${rest.title}-${rest.company}`)}-${i}`;
      userWithSameSlug = await dbClient.user.findFirst({
        where: {
          slug,
        },
      });
      i += 1;
    }
    // const data = {
    const data: Prisma.JobsUncheckedCreateInput = {
      ...rest,
      slug,
      createdBy: userId,
      updatedBy: userId,
      categories: {},
      tags: {},
      areas: {},
    };
    delete data.id;
    delete data.categories;
    delete data.tags;
    delete data.areas;

    const job = await dbClient.jobs.create({
      data,
    });

    updateCategoryOnJobs({
      data: rest.categories,
      jobsId: job.id,
    });

    updateTagsOnJobs({
      data: rest.tags,
      jobsId: job.id,
    });
    updateAreasOnJobs({
      data: rest.areas,
      jobsId: job.id,
    });

    return job;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new user cannot be created with this email');
      }
    }
    throw error;
  }
};

export interface UpdateJobArgs extends CreateJobArgs {
  id: number;
}

export const updateJob = async ({ id, userId, ...rest }: UpdateJobArgs) => {
  const data: Prisma.JobsUncheckedUpdateInput = {
    ...rest,
    createdBy: userId,
    updatedBy: userId,
    updatedAt: new Date(),
    categories: {},
    tags: {},
    areas: {},
  };
  delete data.id;
  delete data.categories;
  delete data.tags;
  delete data.areas;

  updateCategoryOnJobs({
    data: rest.categories,
    jobsId: id,
  });
  updateTagsOnJobs({
    data: rest.tags,
    jobsId: id,
  });
  updateAreasOnJobs({
    data: rest.areas,
    jobsId: id,
  });
  return dbClient.jobs.update({
    where: {
      id,
    },
    data,
  });
};

export const getJob = async (id: number) => {
  const job = await dbClient.jobs.findFirst({
    where: {
      id,
    },
  });
  return job;
};

export const deleteJob = async (id: number) => {
  return dbClient.jobs.delete({
    where: {
      id,
    },
  });
};
export interface JobApplicationWithUser extends JobApplication {
  createdById: UserCandidate;
}
export interface JobComplete extends Jobs {
  jobApplication: JobApplicationWithUser[];
  categories: Category;
  tags: Tags;
  areas: Areas;
  createdById: UserCandidate;
  updatedById: UserCandidate;
  deletedById: UserCandidate;
}

export const getJobs = async (limit: number, skip: number) => {
  return dbClient.jobs.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      createdById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
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
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getJobsCount = async () => {
  return dbClient.jobs.count({
    where: {
      deletedAt: null,
    },
  });
};

export const getJobsByUserCount = async (createdBy: number) => {
  return dbClient.jobs.count({
    where: {
      createdBy,
      deletedAt: null,
    },
  });
};

export const getJobsByUserSlugCount = async (slug: string) => {
  const user = await dbClient.user.findFirst({
    where: {
      slug,
    },
  });
  const createdBy = user?.id;

  return dbClient.jobs.count({
    where: {
      createdBy,
      deletedAt: null,
    },
  });
};

export const getJobBySlug = async (slug: string) =>
  dbClient.jobs.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      createdById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      jobApplication: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          description: true,
          createdBy: true,
          score: true,
          createdById: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              slug: true,
              candidate: {
                select: {
                  description: true,
                  avatar: true,
                  banner: true,
                  link: true,
                  salary: true,
                  contractMode: true,
                  actualRole: true,
                  affirmative: true,
                  travel: true,
                  seniority: true,
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
                  city: true,
                  state: true,
                  extra: true,
                  workMode: true,
                },
              },
            },
          },
        },
        orderBy: {
          score: 'desc',
        },
      },
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

export const getJobsByUserId = async (
  createdBy: number,
  limit: number,
  skip: number,
  isActive: boolean = true
) => {
  return dbClient.jobs.findMany({
    where: {
      createdBy,
      deletedAt: null,
      // isActive,
    },
    include: {
      createdById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
        },
      },
      jobApplication: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          description: true,
          createdBy: true,
          createdById: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              slug: true,
              candidate: {
                select: {
                  description: true,
                  avatar: true,
                  banner: true,
                  link: true,
                  salary: true,
                  contractMode: true,
                  actualRole: true,
                  affirmative: true,
                  travel: true,
                  seniority: true,
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
                  city: true,
                  state: true,
                  extra: true,
                  workMode: true,
                },
              },
            },
          },
        },
      },
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
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getJobsByUserSlug = async (
  slug: string,
  limit: number,
  skip: number,
  isActive: boolean = true
) => {
  const user = await dbClient.user.findFirst({
    where: {
      slug,
    },
  });
  const createdBy = user?.id;
  const setisActiveFinal = isActive || true;

  return getJobsByUserId(createdBy as number, limit, skip, setisActiveFinal);
};

export const cleanUp = async () => {
  await dbClient.jobs.deleteMany({});
};
