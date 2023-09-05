import * as emailService from '../../lib/email';

export interface SendMessageArgs {
  name: string;
  email: string;
  companyName: string;
  comments: string;
  phone: string;
}

export const sendMessage = async (params: SendMessageArgs) => {
  try {
    await emailService.sendEmail({
      payload: {
        name: params.name,
        email: params.email,
        companyName: params.companyName,
        comments: params.comments,
        phone: params.phone,
        url: process.env.URL as string,
      },
      type: 'newContact',
    });
    return true;
  } catch (error) {
    return error;
  }
};
