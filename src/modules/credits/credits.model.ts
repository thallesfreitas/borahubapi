import { FastifyRequest } from 'fastify';

export type CreditsHistoryType = {
  creditId: number;
};

export type CreditsHistoryParams = {
  Body: CreditsHistoryType;
};
export type GetCreditsHistory = FastifyRequest<CreditsHistoryParams>;

export type VerifyCreditsType = {
  userId: number;
  type: string;
  withRemove?: boolean;
};
export type VerifyCreditsParams = {
  Body: VerifyCreditsType;
};
export type VerifyCredits = FastifyRequest<VerifyCreditsParams>;

export type CreditsParams = {
  Body: {
    userId: number;
  };
};
export type GetCredits = FastifyRequest<CreditsParams>;

export type UpdateCreditsType = {
  userId: number;
  amount: number;
  mp_id_transaction: bigint;
  status: string;
};

export type CreditsType = {
  userId: number;
  amount: number;
  mp_id_transaction?: bigint;
  transactionType?: string;
  status: string;
  type?: string;
};

export type AddCreditsTransactionType = {
  userId: number;
  creditId?: number;
  amount: number;
  mp_id_transaction?: bigint;
  transactionType?: string;
  status: string;
  type?: string;
};

export type UpdateCreditsTransactionType = {
  creditId?: number;
  mp_id_transaction?: bigint;
  status: string;
  type?: string;
};
export type GetCreditsTransactionType = {
  userId?: number;
  creditId?: number;
  mp_id_transaction?: bigint;
};

export type CreditsTransactionType = {
  userId: number;
  creditId?: number;
  amount: number;
  transactionType: string;
  mp_id_transaction?: bigint;
  status: string;
};

export type CreditsBody = {
  Body: CreditsType;
};

export type AddCredits = FastifyRequest<CreditsBody>;

export type RemoveCreditsType = {
  userId: number;
  amount: number;
  type?: string;
};

export type RemoveCreditsBody = {
  Body: RemoveCreditsType;
};
export type RemoveCredits = FastifyRequest<RemoveCreditsBody>;
