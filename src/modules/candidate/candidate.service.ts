import * as CandidateRepository from './candidate.repository';

export const getCandidates = async (limit: number, skip: number) =>
  CandidateRepository.getCandidates(limit, skip);

export const getCandidateById = async (id: number) =>
  CandidateRepository.getCandidateById(id);

export const getCandidatesCount = () =>
  CandidateRepository.getCandidatesCount();

export const getCandidateByUserId = (createdBy: number) =>
  CandidateRepository.getCandidateByUserId(createdBy);

export const updateCandidate = async (
  userId: number,
  params: CandidateRepository.UpdateCandidateArgs
) => CandidateRepository.updateCandidate(userId, params);
