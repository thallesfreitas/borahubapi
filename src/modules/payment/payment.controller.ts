/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply, FastifyRequest } from 'fastify';
import * as emailService from '../../lib/email';
import * as CreditsService from '../credits/credits.service';
import * as PackService from '../packs/packs.service';
import * as UserService from '../users/user.service';
import {
  CustomerModel,
  GetPaymentStatusModel,
  IpnModel,
  PaymentModel,
} from './payment.model';
import { getOrCreateCustomer } from './payment.service';
// eslint-disable-next-line import/no-cycle
import * as WhatsApi from '../../lib/whats';

const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
// mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN_TESTE);
// mercadopago.configurations.setAccessToken(
//   'TEST-1096322674221768-042314-51497efa45e4c3466c35bbefac5786d8-75364347'
// );

// export const webhookMP = async (req: WebhookModel, reply: FastifyReply) => {
export const ipnMP = async (req: IpnModel, reply: FastifyReply) => {
  // const merchant_order = null;
  console.log('ipnMP');
  let payment;
  const { topic, id } = req.query;

  switch (topic) {
  case 'payment':
    try {
      payment = await mercadopago.payment.findById(id);

      const ct = await CreditsService.getCreditsTransaction({
        mp_id_transaction: id,
      });
      const statusCT = ct?.status;

      if (payment.response.status === 'approved' && statusCT !== 'approved') {
        const credits = await CreditsService.updateCreditsTransaction({
          mp_id_transaction: id,
          status: 'approved',
        });
      }
    } catch (e) {
      reply.code(200).send(true);
    }
    break;
    // case 'merchant_order':
    //   merchant_order = await mercadopago.merchant_orders.findById(id);
    //   break;
  default:
    break;
  }

  // let paid_amount = 0;
  // for (const payment of merchant_order.payments) {
  //   if (payment.status === 'approved') {
  //     paid_amount += payment.transaction_amount;
  //   }
  // }

  // if (paid_amount >= merchant_order.total_amount) {
  //   if (merchant_order.shipments && merchant_order.shipments.length > 0) {
  //     if (merchant_order.shipments[0].status === 'ready_to_ship') {
  //       console.log('Totally paid. Print the label and release your item.');
  //       reply.send('Totally paid. Print the label and release your item.');
  //     }
  //   } else {
  //     console.log('Totally paid. Release your item.');
  //     await CreditsService.updateCreditsTransaction({
  //       mp_id_transaction: payment.body.id,
  //       status: 'approved',
  //     });
  //     reply.send('Totally paid. Release your item.');
  //   }
  // } else {
  //   console.log('Not paid yet. Do not release your item.');
  //   reply.send('Not paid yet. Do not release your item.');
  // }
  // reply.code(200).send({ mensagem: 'OK' });
  // reply.code(200).send('OK');
  reply.code(200).send(true);
};
export const webhookMP = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log('webhookMP');
  console.log('webhookMP');
  console.log('webhookMP');
  console.log('webhookMP');
  console.log('webhookMP');
  // console.log('______________________________________________________________');
  // console.log(req);
  console.log('______________________________________________________________');
  console.log(req.query);
  console.log('______________________________________________________________');
  console.log('webhookMP');
  console.log('webhookMP');
  console.log('webhookMP');
  console.log('webhookMP');
  console.log('webhookMP');
  return reply.send(true);
};

export const getPayment = async (
  req: GetPaymentStatusModel,
  reply: FastifyReply
) => {
  const { id } = req.params;

  // Verifica o status do pagamento
  await mercadopago.payment
    .get(id)
    .then((data: { body: any }) => {
      const payment = data.body;
      // if (payment.status === 'approved') {
      //   console.log('Pix aprovado!');
      // }
      // if (payment.status === 'pending') {
      //   console.log('Pix pendente');
      //   return reply.send({
      //     status: payment.status,
      //     message: 'Pix pendente!',
      //   });
      // }
      // if (payment.status === 'rejected') {
      //   console.log('Pix recusado');
      //   return reply.send({
      //     status: payment.status,
      //     message: 'Pix recusado!',
      //   });
      // }
      // console.log('Status inválido');
      // return reply.send({
      //   status: payment.status,
      //   message: 'Status inválido!',
      // });

      return reply.send({
        // payment,
        status: payment.status,
      });
    })
    .catch((err: any) => {
      // Tratamento de erro
    });
};

// 63148354974

export const getCustomer = async (req: CustomerModel, reply: FastifyReply) => {
  return reply.send(getOrCreateCustomer(req.body.email));
};

export const payment = async (req: PaymentModel, reply: FastifyReply) => {
  const { userName, paymentData, typePack, userPhone } = req.body;

  let user = await UserService.getUserByEmail(paymentData.payer.email);
  const pack = await PackService.getPack(typePack);

  if (!user) {
    user = await UserService.createUser({
      email: paymentData.payer.email,
      name: userName,
      phone: userPhone,
      indicatedBy: '',
      password: '',
      optin: true,
    });
  }
  paymentData.transaction_amount = pack?.credits as number;

  paymentData.transaction_amount = 1.1;

  console.log('+++++++++++++++++++++++++++++++');
  console.log('paymentData');
  console.log(paymentData);
  console.log('+++++++++++++++++++++++++++++++');

  // const payment_data = {
  //   transaction_amount: paymentData.transaction_amount,
  //   payment_method_id: 'pix',
  //   payer: {
  //     email: paymentData.payer.email,
  //   },
  // };

  const payment_data = {
    installments: 1,
    payer: { identification: { number: '10268064709', type: 'CPF' } },
    payment_method_id: 'pix',
    transaction_amount: 1.1,
    description:
      'BoraPremium | Domine o jogo! Acesso total, prioridade e benefícios exclusivos. - Créditos: 1000',
  };

  await mercadopago.payment
    // .save(payment_data)
    .save(paymentData)
    .then(async function (response: { id: any; body: any; status: any }) {
      if (paymentData.payment_method_id !== 'pix' && response.status === 201) {
        await CreditsService.addCredits({
          userId: user?.id as number,
          amount: pack?.credits as number,
          transactionType: 'CREDIT_PURCHASED',
          status: 'approved',
          mp_id_transaction: response.body.id,
        });

        emailService.sendEmail({
          payload: {
            name: user?.name as string,
            credits: pack?.credits.toString() as string,
            url: process.env.URL as string,
          },
          type: 'CREDIT_PURCHASED',
        });

        WhatsApi.sendMessageWithTemplate({
          to: user?.phone as string,
          message: 'CREDIT_PURCHASED',
          payload: [
            user?.name as string,
            pack?.credits.toString() as string,
            process.env.URL as string,
          ],
          payloadVar: ['|||NAME|||', '|||CREDITS|||', '|||URL|||'],
        });
      } else {
        await CreditsService.addCreditsTransaction({
          userId: user?.id as number,
          amount: pack?.credits as number,
          transactionType: 'CREDIT_PURCHASED',
          status: 'pending',
          mp_id_transaction: response.body.id,
        });
      }
      return reply.send({
        user,
        response: response.body,
        status: response.status,
      });
    })
    .catch(function (error: any) {
      console.error(error);
      reply.send(error);
    });
};
