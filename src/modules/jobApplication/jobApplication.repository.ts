/* eslint-disable no-await-in-loop */
import { Areas, Category, Jobs, Prisma, Tags, User } from '@prisma/client';
import dbClient from '../../lib/dbClient';
import * as emailService from '../../lib/email';
import * as AiService from '../ai/ai.service';
import * as WhatsService from '../whats/whats.service';
import {
  CreateAssessmentJobApplicationArgs,
  CreateFeedbackRecruiterArgs,
  CreateJobApplicationArgs,
  GetAssessmentArgs,
  UpdateJobApplicationArgs,
} from './jobApplication.model';

export const createFeedbackRecruiter = async ({
  id,
  feedbackrecruiter,
}: CreateFeedbackRecruiterArgs) => {
  try {
    const jobApplication = await dbClient.jobApplication.update({
      where: {
        id: parseInt(id.toString(), 10),
      },
      data: {
        feedbackrecruiter,
      },
    });

    const job = await dbClient.jobs.findFirst({
      where: {
        id: jobApplication.jobId,
      },
    });
    const user = await dbClient.user.findFirst({
      where: {
        id: jobApplication.createdBy as number,
      },
    });
    const scoreJobApplication = jobApplication?.score?.toString();
    await emailService.sendEmail({
      payload: {
        name: user?.name as string,
        email: user?.email as string,
        vagaName: job?.title as string,
        assessment: feedbackrecruiter as string,
        score: scoreJobApplication as string,
        url: `${process.env.URL}/${job?.slug}/feedback/${user?.slug}`,
      },
      type: 'createAssessmentCandidateRecuiter',
    });

    return jobApplication;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new user cannot be created with this email');
      }
    }
    throw error;
  }
};
export const getFeedbackAssessment = async ({
  jobslug,
  userslug,
}: GetAssessmentArgs) => {
  try {
    const jobApplication = await dbClient.jobApplication.findFirst({
      where: {
        job: {
          slug: jobslug,
        },
        createdById: {
          slug: userslug,
        },
      },
      include: {
        job: true,
        createdById: true,
      },
    });
    return jobApplication;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new user cannot be created with this email');
      }
    }
    throw error;
  }
};
export const createAssessment = async ({
  id,
  name,
  description,
  userId,
  jobId,
}: CreateAssessmentJobApplicationArgs) => {
  try {
    const job = await dbClient.jobs.findFirst({
      where: {
        id: jobId,
      },
    });
    const user = await dbClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    const result = await AiService.createAssessment(
      description,
      job?.description as string
    );

    const scoreCandidateJob = result[2] ? parseFloat(result[2] as string) : 0;
    const jobApplicationUupdated = await dbClient.jobApplication.update({
      where: {
        id: parseInt(id.toString(), 10),
      },
      data: {
        evaluation: result[0],
        feedback: result[1],
        score: scoreCandidateJob,
      },
    });

    emailService.sendEmail({
      payload: {
        name: user?.name as string,
        email: user?.email as string,
        vagaName: job?.title as string,
        assessment: result[1] as string,
        score: result[2] as string,
        url: `${process.env.URL}/${job?.slug}/feedback/${user?.slug}`,
      },
      type: 'createAssessmentCandidate',
    });
    let time = 0;
    const interval: any = setInterval(() => {
      if (time === 2) {
        emailService.sendEmail({
          payload: {
            email: job?.email as string,
            vagaName: job?.title as string,
            candidateName: user?.name as string,
            assessment: result[0] as string,
            score: result[2] as string,
            profile: `${process.env.URL}/${user?.slug}` as string,
            url: `${process.env.URL}/${job?.slug}/avaliacao/${user?.slug}`,
          },
          type: 'createAssessmentRecruiter',
        });
      }
      if (time === 4) {
        WhatsService.sendMessageWithTemplate({
          to: user?.phone as string,
          message: 'createAssessmentCandidate',
          payload: [
            user?.name as string,
            job?.title as string,
            `${process.env.URL}/${job?.slug}/feedback/${user?.slug}` as string,
          ],
          payloadVar: ['|||NAME|||', '|||JOBNAME|||', '|||URL|||'],
          type: 'client',
        });
      }
      if (time === 6) {
        WhatsService.sendMessageWithTemplate({
          to: job?.phone as string,
          message: 'createAssessmentRecruiter',
          payload: [
            user?.name as string,
            job?.title as string,
            `${process.env.URL}/${user?.slug}` as string,
            `${process.env.URL}/${job?.slug}/avaliacao/${user?.slug}` as string,
          ],
          payloadVar: [
            '|||NAME|||',
            '|||JOBNAME|||',
            '|||PROFILE|||',
            '|||URL|||',
          ],
          type: 'client',
        });
        clearInterval(interval);
      }
      time += 1;
    }, 1000);

    return jobApplicationUupdated;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A new user cannot be created with this email');
      }
    }
    throw error;
  }
};

export const createJobApplication = async ({
  userId,
  jobId,
  ...rest
}: CreateJobApplicationArgs) => {
  try {
    const data: Prisma.JobApplicationUncheckedCreateInput = {
      ...rest,
      createdBy: userId,
      jobId,
    };

    const job = await dbClient.jobApplication.create({
      data,
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

export const updateJobApplication = async ({
  id,
  userId,
  jobId,
  ...rest
}: UpdateJobApplicationArgs) => {
  const data: Prisma.JobApplicationUncheckedUpdateInput = {
    ...rest,
    createdBy: userId,
    jobId,
  };

  return dbClient.jobApplication.update({
    where: {
      id,
    },
    data,
  });
};

export const getJob = async (id: number) => {
  const job = await dbClient.jobApplication.findFirst({
    where: {
      id,
    },
  });
  return job;
};

export const deleteJob = async (id: number) => {
  return dbClient.jobApplication.delete({
    where: {
      id,
    },
  });
};

export interface JobComplete extends Jobs {
  categories: Category;
  tags: Tags;
  areas: Areas;
  createdById: User;
  updatedById: User;
  deletedById: User;
}

export const getJobs = async (limit: number, skip: number) => {
  return dbClient.jobs.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      createdById: {
        select: {
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
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
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
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
      isActive,
    },
    include: {
      createdById: {
        select: {
          uuid: true,
          name: true,
          email: true,
        },
      },
      updatedById: {
        select: {
          uuid: true,
          name: true,
          email: true,
        },
      },
      deletedById: {
        select: {
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
