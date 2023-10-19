import dbClient from '../../lib/dbClient';
import { Utils } from '../../utils/functions';
import * as JobsService from '../jobs/jobs.service';
import * as UserService from '../users/user.service';

export const getBySlugApplication = async (
  slug: string,
  skip: number,
  limit: number
) => {
  const user = await UserService.getUserBySlugApplication(slug, skip, limit);
  let response = null;

  if (user) {
    response = {
      type: 'user',
      data: user,
    };
  }

  return response;
};

export const getBySlug = async (slug: string, userID: number) => {
  const user = await UserService.getUserBySlug(slug);
  let response = null;

  if (user) {
    response = {
      type: 'user',
      data: user,
    };
  } else {
    const job = await JobsService.getJobBySlug(slug);
    response = {
      type: 'job',
      data: job,
      userID,
    };
  }

  return response;
};

export const verify = async (slug: string) => {
  const user = await UserService.getUserBySlug(slug);
  let response = false;

  if (user) {
    response = true;
  } else {
    const job = await JobsService.getJobBySlug(slug);
    if (job) response = true;
  }

  return response;
};

export const generate = async (slugSuggest: string) => {
  let slug = Utils.generateSlug(slugSuggest);
  let userWithSameSlug = await dbClient.user.findFirst({
    where: {
      slug,
    },
  });
  let i = 1;
  while (userWithSameSlug) {
    slug = `${Utils.generateSlug(slugSuggest)}-${i}`;
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
    slug = `${Utils.generateSlug(slugSuggest)}-${i}`;
    // eslint-disable-next-line no-await-in-loop
    jobWithSameSlug = await dbClient.jobs.findFirst({
      where: {
        slug,
      },
    });
    i += 1;
  }

  return slug;
};
