/* eslint-disable no-await-in-loop */
import dbClient from '../../lib/dbClient';

export interface UpdateFreelancerArgs {
  data: string[] | undefined;
  freelancerId: number;
}

export interface UpdateServiceProviderArgs {
  data: string[] | undefined;
  serviceProviderId: number;
}

export interface UpdateCategoryCandidateArgs {
  data: string[] | undefined;
  candidateId: number;
}
export interface UpdateCategoryJobArgs {
  data: string[] | undefined;
  jobsId: number;
}

export const updateCategoryOnCandidate = async (
  params: UpdateCategoryCandidateArgs
) => {
  const { data, candidateId } = params;

  if (data) {
    await dbClient.categoriesOnCandidate.deleteMany({
      where: {
        candidateId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.category.findFirst({
        where: {
          type: 'CANDIDATE',
          name: element,
        },
      });
      let categoryId = null;
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newcategory = await dbClient.category.create({
          data: {
            type: 'CANDIDATE',
            name: element,
          },
        });
        categoryId = newcategory.id;
      }
      await dbClient.categoriesOnCandidate.create({
        data: {
          candidateId,
          categoryId,
        },
      });
    }
  }
};

export const updateCategoryOnJobs = async (params: UpdateCategoryJobArgs) => {
  const { data, jobsId } = params;

  if (data) {
    await dbClient.categoriesOnJobs.deleteMany({
      where: {
        jobsId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.category.findFirst({
        where: {
          type: 'JOB',
          name: element,
        },
      });
      let categoryId = null;
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newcategory = await dbClient.category.create({
          data: {
            type: 'JOB',
            name: element,
          },
        });
        categoryId = newcategory.id;
      }
      await dbClient.categoriesOnJobs.create({
        data: {
          jobsId,
          categoryId,
        },
      });
    }
  }
};

export const updateCategoryOnServiceProvider = async (
  params: UpdateServiceProviderArgs
) => {
  const { data, serviceProviderId } = params;

  if (data) {
    await dbClient.categoriesOnServiceProvider.deleteMany({
      where: {
        serviceProviderId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.category.findFirst({
        where: {
          type: 'SERVICE_PROVIDER',
          name: element,
        },
      });
      let categoryId = null;
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newcategory = await dbClient.category.create({
          data: {
            type: 'SERVICE_PROVIDER',
            name: element,
          },
        });
        categoryId = newcategory.id;
      }
      await dbClient.categoriesOnServiceProvider.create({
        data: {
          serviceProviderId,
          categoryId,
        },
      });
    }
  }
};
export const updateCategoryOnFreelancer = async (
  params: UpdateFreelancerArgs
) => {
  const { data, freelancerId } = params;

  if (data) {
    await dbClient.categoriesOnFreelancer.deleteMany({
      where: {
        freelancerId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.category.findFirst({
        where: {
          type: 'FREELANCER',
          name: element,
        },
      });
      let categoryId = null;
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newcategory = await dbClient.category.create({
          data: {
            type: 'FREELANCER',
            name: element,
          },
        });
        categoryId = newcategory.id;
      }
      await dbClient.categoriesOnFreelancer.create({
        data: {
          freelancerId,
          categoryId,
        },
      });
    }
  }
};
