import * as WhatsApi from '../../lib/whats';
import * as ApprovalSystem from '../approvalSystem/approvalSystem.service';
import * as CostsUsageRepository from '../costsusage/costsusage.repository';
import * as CreditsService from '../credits/credits.service';
import * as JobService from '../jobs/jobs.service';
import * as UserService from '../users/user.service';

export const getGroups = async () => {
  try {
    const response = await WhatsApi.getGroups();
    return response;
  } catch (error) {
    console.error(error);
  }
  return false;
};

export interface WebhookAPIPostArgs {
  query: any;
  object: any;
  entry: any;
}
export interface WebhookAPIArgs {
  query: any;
}
export interface webhookArgs {
  event_type: string;
  instanceId: string;
  id: string;
  referenceId: string;
  data: {
    id: string;
    from: string;
    to: string;
    author: string;
    pushname: string;
    ack: string;
    type: string;
    body: string;
    media: string;
    fromMe: boolean;
    self: boolean;
    isForwarded: boolean;
    isMentioned: boolean;
    quotedMsg: {};
    mentionedIds: [];
    time: number;
  };
}

export interface SendMessageAPIArgs {
  to: string;
  message: string;
  idClient?: string;
  typeWhats?: string;
  image?: string;
}

export interface StartBoraBotArgs {
  to: number;
}

export interface SendMessageArgs {
  message: string;
  to: string;
  payload?: string[];
  payloadVar?: string[];
  type: string;
  typeWhats?: string;
  image?: string;
}

export interface SendMessageToGroupsArgs {
  message: string;
}
// export const sendMessageAPI = async (params: SendMessageAPIArgs) => {
//   try {
//     const response = await WhatsApi.sendMessageAPI(params);
//     return response;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };

export const connectWP = async () => {
  try {
    const response = await WhatsApi.connectWP();
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const startBoraBot = async (to: string) => {
  try {
    // const response = await WhatsApi.sendMessageWithTemplate(params);
    const response = await sendMessageWithTemplate({
      to,
      message: 'loggedUser',
      type: 'client',
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const sendImagemToWhats = async (params: SendMessageArgs) => {
  try {
    const response = await WhatsApi.sendImagemToWhats(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const sendMessageWithTemplate = async (params: SendMessageArgs) => {
  try {
    const response = await WhatsApi.sendMessageWithTemplate(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const sendMessageToGroups = async (
  message: string,
  type: string,
  userId: number,
  idMessage: number,
  typeCost: string
) => {
  try {
    let response;

    const credits = await CreditsService.verify({
      userId,
      type: typeCost,
      withRemove: false,
    });
    if (!credits) return false;

    const statusMessage = await ApprovalSystem.getMessageToApproval({
      message,
      type,
      userId,
      idMessage,
    });
    const user = await UserService.getUserById(userId);
    const job = await JobService.getJob(idMessage);

    if (statusMessage.approved === 'WAITING' && !statusMessage.finished) {
      const messageToApprove = `*#BoraHubJob*\n${message} \n*## Mensagem enviada por BoraHub.com.br ##*`;

      await WhatsApi.send({
        to: '5511945483326',
        message: `Mensagem id:${statusMessage.id}\n\n ${messageToApprove}`,
        type: 'client',
      });
      await setTimeout(() => {
        WhatsApi.send({
          to: '5511945483326',
          message: `##status091423$$$$id=${statusMessage.id}$$$$status=s ou n$$$$explain=porque do status`,
          type: 'client',
        });
      }, 15000);
      response = true;
    } else if (
      statusMessage.approved === 'APPROVED' &&
      !statusMessage.finished
    ) {
      await WhatsApi.send({
        to: '5511945483326',
        message: `Você aprovou uma vaga.`,
        type: 'client',
      });

      await setTimeout(async () => {
        WhatsApi.send({
          to: user?.phone as string,
          message: `O envio da sua vaga ${job?.title} para os grupos foi *aprovada*. \n🎉 🍾 🎊\n\nEntre em https://borahub.com.br/${job?.slug}/vagas/editar?showStatus=true e veja para quais grupos ela já foi enviada. :) .`,
          type: 'client',
        });
      }, 2000);
      if (user?.phone !== job?.phone) {
        await setTimeout(async () => {
          WhatsApi.send({
            to: job?.phone as string,
            message: `O envio da sua vaga ${job?.title} para os grupos foi *aprovada*. \n🎉 🍾 🎊\n\nEntre em https://borahub.com.br/${job?.slug}/vagas/editar?showStatus=true e veja para quais grupos ela já foi enviada. :) .`,
            type: 'client',
          });
        }, 6000);
      }

      await setTimeout(async () => {
        const messageFinal = `*#BoraHubJob* ${statusMessage.message} \n*## Mensagem enviada por BoraHub.com.br ##*`;

        const typeString = type as string;
        const costsusage = await CostsUsageRepository.getCostsUsage(
          'SEND_JOB_TO_GROUPS'
        );

        const amountCost = costsusage?.amount as number;
        await CreditsService.removeCredits({
          userId,
          amount: amountCost,
          transactionType: 'REMOVE_CREDIT',
          type: 'SEND_JOB_TO_GROUPS',
          status: 'approved',
          // type: typeString,
        });
        response = await WhatsApi.sendToGroups(messageFinal, statusMessage.id);
      }, 4000);
    } else if (
      statusMessage.approved === 'DISAPPROVED' &&
      !statusMessage.finished
    ) {
      await ApprovalSystem.finish(statusMessage.id);

      await WhatsApi.send({
        to: user?.phone as string,
        message: `Sua vaga foi *reprovada*. \n 😥 😨 🙁\n Mas não fique triste, basta rever o item abaixo e enviar novamente. \n\nMotivo: ${statusMessage.explain}. \n\nEntre em https://borahub.com.br/${job?.slug}/vagas/editar , faça as edições que achar necessárias e envie novamente para nossa aprovação. :) .`,
        type: 'client',
      });
      if (user?.phone !== job?.phone) {
        await WhatsApi.send({
          to: job?.phone as string,
          message: `Sua vaga foi *reprovada*. \n 😥 😨 🙁\n Mas não fique triste, basta rever o item abaixo e enviar novamente. \n\nMotivo: ${statusMessage.explain}. \n\nEntre em https://borahub.com.br/${job?.slug}/vagas/editar , faça as edições que achar necessárias e envie novamente para nossa aprovação. :) .`,
          type: 'client',
        });
      }
    } else if (
      statusMessage.approved === 'APPROVED' &&
      statusMessage.finished
    ) {
      await WhatsApi.send({
        to: '5511945483326',
        message: `Essa vaga já tinha sido aprovada e enviada.`,
        type: 'client',
      });
    } else if (
      statusMessage.approved === 'DISAPPROVED' &&
      statusMessage.finished
    ) {
      await WhatsApi.send({
        to: '5511945483326',
        message: `Esse descritivo de vaga foi reprovado. O usuário precisa fazer alterações e enviar novamente.`,
        type: 'client',
      });
    }

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
