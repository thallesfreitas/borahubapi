import sgMail from '@sendgrid/mail';
import handlebars from 'handlebars';
import { readFile } from 'node:fs/promises';
import path from 'path';

enum EmailTemplates {
  forgetPassword = '../../src/utils/templates/forget-password.handlebars',
  newOrder = '../../src/utils/templates/new-order.handlebars',
  newContact = '../../src/utils/templates/new-contact.handlebars',
  newOrderClient = '../../src/utils/templates/new-order-client.handlebars',
}

interface SendEmail {
  (object: {
    to: string;
    subject: string;
    payload: { [key: string]: string | {}[] };
    template: keyof typeof EmailTemplates;
  }): Promise<void>;
}

export const sendEmail: SendEmail = async ({
  to,
  subject,
  payload,
  template,
}) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const source = await readFile(
      // eslint-disable-next-line security/detect-object-injection
      path.join(__dirname, EmailTemplates[template]),
      {
        encoding: 'utf-8',
      }
    );
    const compiledTemplate = handlebars.compile(source);

    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM as string,
      subject,
      html: compiledTemplate(payload),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
