import * as FreelancerRepository from './freelancers.repository';

export const getFreelancers = async (limit: number, skip: number) =>
  FreelancerRepository.getFreelancers(limit, skip);

export const getFreelancerById = async (id: number) =>
  FreelancerRepository.getFreelancerById(id);

export const getFreelancersCount = () =>
  FreelancerRepository.getFreelancersCount();

export const getFreelancerByUserId = (createdBy: number) =>
  FreelancerRepository.getFreelancerByUserId(createdBy);

export const updateFreelancer = async (
  userId: number,
  params: FreelancerRepository.UpdateFreelancerArgs
) => FreelancerRepository.updateFreelancer(userId, params);
