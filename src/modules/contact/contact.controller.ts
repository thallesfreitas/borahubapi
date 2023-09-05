import { FastifyReply } from 'fastify';
import * as ContactModel from './contact.model';
import * as ContactService from './contact.service';

export const sendMessage = async (
  request: ContactModel.SendMessageRequest,
  reply: FastifyReply
) => {
  try {
    await ContactService.sendMessage(request.body);
    return await reply.send({
      message: 'Message sent successfully',
    });
  } catch (error) {
    return await reply.status(400).send(error);
  }
};
