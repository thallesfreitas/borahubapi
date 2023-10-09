import 'dotenv/config';
import handlebars from 'handlebars';
import { Recipient, Sender } from 'mailersend';
import { readFile } from 'node:fs/promises';
import nodemailer from 'nodemailer';
import path from 'path';
import { EmailData, EmailType, emailTemplates } from '../utils/texts/email';

interface SendEmail {
  (object: {
    payload: { [key: string]: string | {}[] };
    type: EmailType;
  }): Promise<void>;
}

export const sendEmail: SendEmail = async ({ payload, type }) => {
  try {
    const email = emailTemplates[type];
    console.log('sendEmail');
    console.log(email);
    if (email.admin.template != '') {
      send({
        payload,
        email: email.admin,
        template: email.admin.template,
        subject: email.admin.subject,
        toReceive:
          email.admin.to == process.env.NOREPLY_EMAIL_TO
            ? (process.env.ADMIN_EMAIL_TO as string)
            : (email.admin.to as string),
        nameReceive: email.admin.name as string,
      });
    }
    if (email.client.template != '') {
      send({
        payload,
        email: email.admin,
        template: email.client.template,
        subject: email.client.subject,
        toReceive: payload.email as string,
        nameReceive: payload.name as string,
      });
    }
  } catch (error) {
    console.log('error');
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
interface SendProps {
  payload: { [key: string]: string | {}[] };
  email: EmailData;
  template: string;
  subject: string;
  toReceive: string;
  nameReceive: string;
}
const send = async ({
  payload,
  email,
  template,
  subject,
  toReceive,
  nameReceive,
}: SendProps) => {
  // const mailerSend = new MailerSend({
  //   apiKey: process.env.API_KEY || '',
  // });

  const source = await readFile(path.join(__dirname, template), {
    encoding: 'utf-8',
  });
  const compiledTemplate = handlebars.compile(source);
  const sentFrom = new Sender(email.to as string, email.name as string);
  const recipients = [new Recipient(toReceive, nameReceive)];

  // const emailParams = new EmailParams()
  //   .setFrom(sentFrom)
  //   .setTo(recipients)
  //   .setReplyTo(sentFrom)
  //   .setSubject(subject)
  //   .setHtml(compiledTemplate(payload));

  // await mailerSend.email.send(emailParams);
  const mail = {
    from: `${email.name} <${email.to}>`,
    to: `${nameReceive} <${toReceive}>`,
    subject,
    html: compiledTemplate(payload),
  };
  const contactEmail = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  contactEmail.verify(error => {
    if (error) {
      console.log(error);
    } else {
      contactEmail.sendMail(mail, error => {
        if (error) {
          console.log(error);
          console.log({ status: 'ERROR' });
        } else {
          console.log({ status: 'Message Sent' });
        }
      });
    }
  });
};
