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

export const updateAreasOnCandidate = async (params: UpdateCandidateArgs) => {
  const { data, candidateId } = params;

  if (data) {
    await dbClient.areasOnCandidate.deleteMany({
      where: {
        candidateId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existing = await dbClient.areas.findFirst({
        where: {
          type: 'CANDIDATE',
          name: element,
        },
      });
      let areasId = null;
      if (existing) {
        areasId = existing.id;
      } else {
        const news = await dbClient.areas.create({
          data: {
            type: 'CANDIDATE',
            name: element,
          },
        });
        areasId = news.id;
      }
      await dbClient.areasOnCandidate.create({
        data: {
          candidateId,
          areasId,
        },
      });
    }
  }
};

export const updateAreasOnJobs = async (params: UpdateJobsArgs) => {
  const { data, jobsId } = params;

  if (data) {
    await dbClient.areasOnJobs.deleteMany({
      where: {
        jobsId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existing = await dbClient.areas.findFirst({
        where: {
          type: 'JOB',
          name: element,
        },
      });
      let areasId = null;
      if (existing) {
        areasId = existing.id;
      } else {
        const news = await dbClient.areas.create({
          data: {
            type: 'JOB',
            name: element,
          },
        });
        areasId = news.id;
      }
      await dbClient.areasOnJobs.create({
        data: {
          jobsId,
          areasId,
        },
      });
    }
  }
};

export const updateAreasOnServiceProvider = async (
  params: UpdateServiceProviderArgs
) => {
  const { data, serviceProviderId } = params;

  if (data) {
    await dbClient.areasOnServiceProvider.deleteMany({
      where: {
        serviceProviderId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existing = await dbClient.areas.findFirst({
        where: {
          type: 'SERVICE_PROVIDER',
          name: element,
        },
      });
      let areasId = null;
      if (existing) {
        areasId = existing.id;
      } else {
        const news = await dbClient.areas.create({
          data: {
            type: 'SERVICE_PROVIDER',
            name: element,
          },
        });
        areasId = news.id;
      }
      await dbClient.areasOnServiceProvider.create({
        data: {
          serviceProviderId,
          areasId,
        },
      });
    }
  }
};

export const updateAreasOnFreelancer = async (params: UpdateFreelancerArgs) => {
  const { data, freelancerId } = params;

  if (data) {
    await dbClient.areasOnFreelancer.deleteMany({
      where: {
        freelancerId,
      },
    });
    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      const existing = await dbClient.areas.findFirst({
        where: {
          type: 'FREELANCER',
          name: element,
        },
      });
      let areasId = null;
      if (existing) {
        areasId = existing.id;
      } else {
        const news = await dbClient.areas.create({
          data: {
            type: 'FREELANCER',
            name: element,
          },
        });
        areasId = news.id;
      }
      await dbClient.areasOnFreelancer.create({
        data: {
          freelancerId,
          areasId,
        },
      });
    }
  }
};
