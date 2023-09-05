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

export interface UpdateCandidateArgs {
  data: string[] | undefined;
  candidateId: number;
}
export interface UpdateJobsArgs {
  data: string[] | undefined;
  jobsId: number;
}

export const updateTagsOnCandidate = async (params: UpdateCandidateArgs) => {
  const { data, candidateId } = params;

  if (data) {
    await dbClient.tagsOnCandidate.deleteMany({
      where: {
        candidateId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.tags.findFirst({
        where: {
          type: 'CANDIDATE',
          name: element,
        },
      });
      let tagsId = null;
      if (existingCategory) {
        tagsId = existingCategory.id;
      } else {
        const newtags = await dbClient.tags.create({
          data: {
            type: 'CANDIDATE',
            name: element,
          },
        });
        tagsId = newtags.id;
      }
      await dbClient.tagsOnCandidate.create({
        data: {
          candidateId,
          tagsId,
        },
      });
    }
  }
};
export const updateTagsOnJobs = async (params: UpdateJobsArgs) => {
  const { data, jobsId } = params;

  if (data) {
    await dbClient.tagsOnJobs.deleteMany({
      where: {
        jobsId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.tags.findFirst({
        where: {
          type: 'JOB',
          name: element,
        },
      });
      let tagsId = null;
      if (existingCategory) {
        tagsId = existingCategory.id;
      } else {
        const newtags = await dbClient.tags.create({
          data: {
            type: 'JOB',
            name: element,
          },
        });
        tagsId = newtags.id;
      }
      await dbClient.tagsOnJobs.create({
        data: {
          jobsId,
          tagsId,
        },
      });
    }
  }
};

export const updateTagsOnServiceProvider = async (
  params: UpdateServiceProviderArgs
) => {
  const { data, serviceProviderId } = params;

  if (data) {
    await dbClient.tagsOnServiceProvider.deleteMany({
      where: {
        serviceProviderId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.tags.findFirst({
        where: {
          type: 'SERVICE_PROVIDER',
          name: element,
        },
      });
      let tagsId = null;
      if (existingCategory) {
        tagsId = existingCategory.id;
      } else {
        const newtags = await dbClient.tags.create({
          data: {
            type: 'SERVICE_PROVIDER',
            name: element,
          },
        });
        tagsId = newtags.id;
      }
      await dbClient.tagsOnServiceProvider.create({
        data: {
          serviceProviderId,
          tagsId,
        },
      });
    }
  }
};
export const updateTagsOnFreelancer = async (params: UpdateFreelancerArgs) => {
  const { data, freelancerId } = params;

  if (data) {
    await dbClient.tagsOnFreelancer.deleteMany({
      where: {
        freelancerId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existingCategory = await dbClient.tags.findFirst({
        where: {
          type: 'FREELANCER',
          name: element,
        },
      });
      let tagsId = null;
      if (existingCategory) {
        tagsId = existingCategory.id;
      } else {
        const newtags = await dbClient.tags.create({
          data: {
            type: 'FREELANCER',
            name: element,
          },
        });
        tagsId = newtags.id;
      }
      await dbClient.tagsOnFreelancer.create({
        data: {
          freelancerId,
          tagsId,
        },
      });
    }
  }
};
