import { FastifyRequest } from 'fastify';

export type ChatBotModelBody = {
  tokens?: number;
  model?: string;

  prompt: string;
};

export type CreateAiModel = {
  tokens?: number;
  model?: string;
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

export type TesteModel = {
  tokens?: number;
  model?: string;

  prompt: string;
  temperature?: number;
  system?: string;
  assistant?: string;
};

export type TesteBody = {
  Body: TesteModel;
};

export type TesteAI = FastifyRequest<TesteBody>;
export type CreateAI = FastifyRequest<CreateAIBody>;
// export type ChatBotModel = FastifyRequest<ChatBotModelBody>;

export type ChoiceCandidateJobAIModel = {
  promptJob: string;
  promptCandidate1: string;
  promptCandidate2: string;
};

export type ChoiceCandidateJobAIBody = {
  Body: ChoiceCandidateJobAIModel;
};

export type ChoiceCandidateJobAI = FastifyRequest<ChoiceCandidateJobAIBody>;
