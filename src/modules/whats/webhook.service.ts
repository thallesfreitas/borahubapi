import { FastifyReply, FastifyRequest } from 'fastify';
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
      checkActionAPI({ to: from, message });
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
}: WhatsService.SendMessageAPIArgs) => {
  let phoneNumber;
  let checkLogin;
  switch (message) {
    case 'logar':
      phoneNumber = `+${to.replace(/@c\.us/g, '')}`;
      checkLogin = await tokenService.getToken({
        phone: phoneNumber,
      });

      if (checkLogin != null) {
        const user = await UserRepository.getUserByPhone(phoneNumber);
        if (user) {
          await UserRepository.updateUser(user.id, { isPhoneConfirmed: true });

          const changeToLogin = await tokenService.changeToken({
            phone: phoneNumber,
          });
          WhatsService.sendMessageWhats({
            to,
            message: 'loggedUser',
          });
        }
      }
      break;
    case 'confirmo':
    case 'confirmar':
    case 'confimar':
    case 'confimo':
      phoneNumber = `+${to.replace(/@c\.us/g, '')}`;
      checkLogin = await tokenService.getToken({
        phone: phoneNumber,
      });

      if (checkLogin != null) {
        const user = await UserRepository.getUserByPhone(phoneNumber);
        if (user) {
          await UserRepository.updateUser(user.id, { isPhoneConfirmed: true });

          const changeToLogin = await tokenService.changeToken({
            phone: phoneNumber,
          });
          WhatsService.sendMessageWhats({
            to,
            message: 'createdUser',
          });
        }
      }

      // }
      break;

    default:
      // WhatsService.sendMessageWhats({
      //   to: to,
      //   message: 'default',
      // });
      break;
  }
  return false;
};

const checkActionAPI = async ({
  to,
  message,
}: WhatsService.SendMessageAPIArgs) => {
  //   // const msg = message.toLowerCase();
  //   // let phoneNumber;
  //   // switch (msg) {
  //   //   case 'logar':
  //   //     phoneNumber = `+${to.replace(/@c\.us/g, '')}`;
  //   //     const checkLogin = await tokenService.getToken({
  //   //       phone: phoneNumber,
  //   //     });
  //   //     if (checkLogin != null) {
  //   //       const changeToLogin = await tokenService.changeToken({
  //   //         phone: to,
  //   //       });
  //   //       WhatsService.sendMessageAPI({
  //   //         to: to,
  //   //         message: 'loggedUser',
  //   //       });
  //   //     }
  //   //     break;
  //   //   default:
  //   //     WhatsService.sendMessageAPI({
  //   //       to: to,
  //   //       message: 'default',
  //   //     });
  //   //     break;
  //   // }
};
