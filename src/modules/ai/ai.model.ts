import { FastifyRequest } from 'fastify';

export type CreateAiModel = {
  userId: number;
  type?: string;
  prompt: string;
  temperature?: number;
  system?: string;
  assistant?: string;
};

export type CreateAIBody = {
  Body: CreateAiModel;
};

export type CreateAI = FastifyRequest<CreateAIBody>;

export type ChoiceCandidateJobAIModel = {
  promptJob: string;
  promptCandidate1: string;
  promptCandidate2: string;
};

export type ChoiceCandidateJobAIBody = {
  Body: ChoiceCandidateJobAIModel;
};

export type ChoiceCandidateJobAI = FastifyRequest<ChoiceCandidateJobAIBody>;
