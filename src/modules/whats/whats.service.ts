import * as WhatsApi from '../../lib/whats';

export const getGroups = async () => {
  try {
    const response = await WhatsApi.getGroups();
    return response;
  } catch (error) {
    console.error(error);
  }
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
}

export interface SendMessageArgs {
  to: string;
  message: string;
}
export const sendMessageAPI = async (params: SendMessageAPIArgs) => {
  try {
    const response = await WhatsApi.sendMessageAPI(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const connectWP = async () => {
  try {
    const response = await WhatsApi.connectWP();
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const sendMessageWhats = async (params: SendMessageArgs) => {
  try {
    const response = await WhatsApi.sendMessageUltra(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const sendMessageToGroups = async (message: string) => {
  try {
    const response = await WhatsApi.sendMessageToGroups(message);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
