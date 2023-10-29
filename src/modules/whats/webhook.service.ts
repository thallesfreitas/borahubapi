/* eslint-disable import/no-cycle */
import { FastifyReply, FastifyRequest } from 'fastify';
// import { bot } from '../ai/ai.service";';
import * as AiService from '../ai/ai.service';
import { approve, disapprove } from '../approvalSystem/approvalSystem.service';
import * as tokenService from '../token/token.service';
import * as UserRepository from '../users/user.repository';
import * as WhatsService from './whats.service';

export const webhookAPIpost = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = request.body as WhatsService.WebhookAPIPostArgs;

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      // let to = body.entry[0].changes[0].value.metadata.to;
      const { from } = body.entry[0].changes[0].value.messages[0];
      const message = body.entry[0].changes[0].value.messages[0].text.body;
      // checkActionAPI({ to: from, message });
    }
    reply.send(200);
  } else {
    reply.send(404);
  }
};
export const webhookAPIGet = async (request: FastifyRequest, reply: any) => {
  const body = request as WhatsService.WebhookAPIArgs;
  const verify_token = process.env.TOKEN_WB;
  const mode = body.query['hub.mode'];
  const token = body.query['hub.verify_token'];
  const challenge = body.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      reply.raw.writeHead(200, { 'Content-Type': 'text/plain' });
      reply.raw.write(challenge);
      reply.raw.end();
    } else {
      reply.send(403);
    }
  }
};
export const webhook = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log('+++++++++++WEBHOOK WHATS');
  const body = request.body as WhatsService.webhookArgs;

  const to = body.data.from;
  if (to.includes('@c.us')) {
    if (body) {
      const message = body.data.body.toLowerCase();
      checkAction({ to, message });
    }
    return reply.send({ status: true });
  }
  return reply.send({ status: false });

  // return reply.send({ status: true });
};

export const checkAction = async ({
  to,
  message,
  idClient,
}: WhatsService.SendMessageAPIArgs) => {
  const phoneNumber = `+${to.replace(/@c\.us/g, '')}`;
  let checkLogin;
  console.log(message);
  console.log(message.startsWith('##status091423'));

  if (message.startsWith('##status091423')) {
    const match = message.split('$$$$');
    if (match) {
      const id = parseInt(match[1].split('=')[1], 10);
      const status = match[2].split('=')[1].trim();
      const explain = match[3].split('=')[1];
      let messageToAprove;
      switch (status) {
        case 's':
          messageToAprove = await approve(id as unknown as number, explain);
          break;
        case 'n':
          messageToAprove = await disapprove(id as unknown as number, explain);
          break;

        default:
          break;
      }
      WhatsService.sendMessageToGroups(
        messageToAprove?.message as string,
        messageToAprove?.type as string,
        messageToAprove?.userId as number,
        messageToAprove?.idMessage as number,
        'SEND_JOB_TO_GROUPS'
      );
    }
    return false;
  }

  switch (message) {
    case 'logar':
      checkLogin = await tokenService.getToken({ phone: phoneNumber });
      if (checkLogin != null) {
        const user = await UserRepository.getUserByPhone(phoneNumber);
        if (user) {
          await UserRepository.updateUser(user.id, {
            isActive: true,
            isPhoneConfirmed: true,
          });
          await tokenService.changeToken({ phone: phoneNumber });
          WhatsService.sendMessageWithTemplate({
            to,
            message: 'loggedUser',
            type: 'client',
          });
        }
      }
      break;
    case 'confirmo':
    case 'confirmar':
    case 'confimar':
    case 'confimo':
      checkLogin = await tokenService.getToken({ phone: phoneNumber });

      if (checkLogin != null) {
        const user = await UserRepository.getUserByPhone(phoneNumber);
        if (user) {
          await UserRepository.updateUser(user.id, {
            isActive: true,
            isPhoneConfirmed: true,
          });
          await tokenService.changeToken({ phone: phoneNumber });
          WhatsService.sendMessageWithTemplate({
            to,
            message: 'createdUser',
            type: 'client',
          });
        }
      }

      // }
      break;

    default:
      // WhatsService.sendMessageWithTemplate({
      //   to: to,
      //   message: 'default',
      // });
      if (idClient === 'borabot') AiService.bot(to, message);
      break;
  }
  return false;
};
