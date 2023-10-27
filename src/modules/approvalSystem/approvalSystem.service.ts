/* eslint-disable import/no-cycle */
import db from '../../lib/dbClient';
import { groupsWhatsStatus } from '../../lib/whats';
// import { groupsWhatsStatusTeste } from '../../lib/whats';
import { UpdateType } from './approvalSystem.model';

export interface MessageToApprovalArgs {
  message: string;
  type: string;
  userId: number;
  idMessage: number;
}

export const getApprovalSystemById = async (id: number) => {
  const messageToApproval = await db.messageApprovalSystem.findMany({
    where: {
      idMessage: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return messageToApproval;
};

const createMessageToApproval = async (params: MessageToApprovalArgs) => {
  const { message, type, userId, idMessage } = params;
  const messageToApproval = await db.messageApprovalSystem.create({
    data: {
      message,
      type,
      userId,
      idMessage,
      status: groupsWhatsStatus,
      // status: groupsWhatsStatusTeste,
    },
  });

  return messageToApproval;
};

export const getMessageToApproval = async (params: MessageToApprovalArgs) => {
  const { type, userId, idMessage } = params;
  let messageToApproval = await db.messageApprovalSystem.findFirst({
    where: {
      type,
      userId,
      idMessage,
      finished: false,
    },
  });
  if (!messageToApproval) {
    messageToApproval = await createMessageToApproval(params);
  }
  // if (messageToApproval.finished) {
  //   messageToApproval = await createMessageToApproval(params);
  // }
  return messageToApproval;
};

export const approve = async (id: number, explain: string = '') => {
  let messageToApproval = await db.messageApprovalSystem.findFirst({
    where: {
      id,
    },
  });
  if (messageToApproval) {
    messageToApproval = await db.messageApprovalSystem.update({
      where: {
        id,
      },
      data: {
        approved: 'APPROVED',
        explain,
      },
    });
  }
  return messageToApproval;
};

export const disapprove = async (id: number, explain: string = '') => {
  let messageToApproval = await db.messageApprovalSystem.findFirst({
    where: {
      id,
    },
  });
  if (messageToApproval) {
    messageToApproval = await db.messageApprovalSystem.update({
      where: {
        id,
      },
      data: {
        approved: 'DISAPPROVED',
        explain,
      },
    });
  }
  return messageToApproval;
};

export const finish = async (id: number) => {
  let messageToApproval = await db.messageApprovalSystem.findFirst({
    where: {
      id,
    },
  });
  if (messageToApproval) {
    messageToApproval = await db.messageApprovalSystem.update({
      where: {
        id,
      },
      data: {
        finished: true,
      },
    });
  }
  return messageToApproval;
};

export const update = async ({ id, groupId, status }: UpdateType) => {
  const messageApprovalSystem = await db.messageApprovalSystem.findFirst({
    where: {
      id,
    },
  });
  const statusAtual = messageApprovalSystem?.status as boolean[];

  if (statusAtual) statusAtual[groupId] = status;

  const messageApprovalSystemUpdate = await db.messageApprovalSystem.update({
    where: {
      id,
    },
    data: {
      status: statusAtual,
    },
  });

  const finished = messageApprovalSystemUpdate?.status.every(
    value => value === true
  );
  if (finished) {
    finish(id);
  }
  return messageApprovalSystemUpdate;
};
