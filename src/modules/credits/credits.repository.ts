/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import db from '../../lib/dbClient';
import {
  AddCreditsTransactionType,
  CreditsHistoryType,
  CreditsType,
  GetCreditsTransactionType,
  RemoveCreditsType,
  UpdateCreditsTransactionType,
  UpdateCreditsType,
} from './credits.model';

export const getCreditsById = async (userId: number) => {
  const credits = await db.credits.findFirst({
    where: {
      userId,
    },
  });
  return credits;
};

export const getCreditsHistory = async (data: CreditsHistoryType) => {
  const { creditId } = data;
  const creditTransaction = await db.creditTransaction.findMany({
    where: {
      creditId,
    },
  });
  return creditTransaction;
};

export const updateCredits = async (data: UpdateCreditsType) => {
  const { userId, amount, mp_id_transaction, status } = data;
  const userCredits = await db.credits.findFirst({
    where: {
      userId,
    },
  });
  let updatedCredits = {};
  if (userCredits) {
    updatedCredits = await db.credits.update({
      where: {
        id: userCredits.id,
      },
      data: {
        amount: userCredits.amount + amount,
        status,
      },
    });

    await db.creditTransaction.updateMany({
      where: {
        mp_id_transaction,
      },
      data: {
        amount: userCredits.amount + amount,
        status,
      },
    });
  }
  return updatedCredits;
};

export const addCreditsTransaction = async (
  data: AddCreditsTransactionType
) => {
  await db.creditTransaction.create({
    data,
  });
};

export const getCreditsTransaction = async (
  data: GetCreditsTransactionType
) => {
  const { mp_id_transaction } = data;
  return db.creditTransaction.findFirst({
    where: {
      mp_id_transaction,
    },
  });
};

export const updateCreditsTransaction = async (
  data: UpdateCreditsTransactionType
) => {
  const { mp_id_transaction, status } = data;

  await db.creditTransaction.updateMany({
    where: {
      mp_id_transaction,
    },
    data,
  });
  const creditTransaction = await db.creditTransaction.findFirst({
    where: {
      mp_id_transaction,
    },
  });
  let userCredits;
  if (creditTransaction) {
    userCredits = updateCredits({
      userId: creditTransaction.userId,
      amount: creditTransaction.amount,
      status,
      mp_id_transaction: mp_id_transaction as bigint,
    });
  }

  return {
    userCredits,
  };
};

export const addCredits = async (data: CreditsType) => {
  const {
    userId,
    amount,
    mp_id_transaction = 0,
    transactionType,
    status,
  } = data;

  let userCredits = await db.credits.findFirst({
    where: {
      userId,
    },
  });

  if (!userCredits) {
    userCredits = await db.credits.create({
      data: {
        user: { connect: { id: userId } },
        amount: 0,
        status,
      },
    });
  }

  const transaction = {
    userId,
    creditId: userCredits.id,
    amount,
    transactionType,
    mp_id_transaction: mp_id_transaction as bigint,
    status,
  };
  const newTransaction = addCreditsTransaction(transaction);

  let updatedCredits = {};

  if (status === 'approved')
    updatedCredits = await updateCredits({
      userId,
      amount,
      status,
      mp_id_transaction: mp_id_transaction as bigint,
    });

  return {
    transaction: newTransaction,
    credits: updatedCredits,
  };
};

export const removeCredits = async (data: RemoveCreditsType) => {
  const { userId, amount } = data;
  // const transactionType = 'REMOVE_CREDIT';
  const userCredits = await db.credits.findFirst({
    where: {
      userId,
    },
  });

  if (!userCredits) {
    throw new Error('Usuário não encontrado');
  }
  const amountUser = userCredits?.amount;
  // const transaction = {
  //   creditId: userCredits?.id,
  //   amount,
  //   transactionType,
  // };

  // const newTransaction = await db.creditTransaction.create({
  //   data: transaction,
  // });

  const updatedCredits = await db.credits.update({
    where: {
      id: userCredits?.id,
    },
    data: {
      amount: amountUser - amount,
    },
  });

  return {
    // transaction: newTransaction,
    credits: updatedCredits,
  };
};
