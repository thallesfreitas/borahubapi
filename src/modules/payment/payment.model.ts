import { FastifyRequest } from 'fastify';

export type PaymentModelParams = {
  Body: {
    userName: string;
    userPhone: string;
    typePack: string;
    paymentData: {
      installments: number;
      payer: {
        email: string;
        first_name: string;
        identification: {
          number: number;
          type: string;
        };
      };
      notification_url?: string;
      payment_method_id: string;
      transaction_amount: number;
      description: string;
      token?: number;
    };
  };
};

export type GetPaymentModelParams = {
  Body: {
    id: number;
  };
};

export type GetPaymentStatusParams = {
  Params: {
    id: bigint;
  };
};

export type CustomerModelParams = {
  Body: {
    email: string;
  };
};

export type IpnModelParams = {
  Querystring: {
    topic: any;
    id: any;
  };
};

export type WebhookModelParams = {
  Querystring: {
    action: any;
    api_version: any;
    application_id: any;
    date_created: any;
    id: any;
    live_mode: any;
    type: any;
    user_id: any;
    data: any;
  };
};
export type IpnModel = FastifyRequest<IpnModelParams>;
export type WebhookModel = FastifyRequest<WebhookModelParams>;
export type GetPaymentModel = FastifyRequest<GetPaymentModelParams>;
export type GetPaymentStatusModel = FastifyRequest<GetPaymentStatusParams>;
export type PaymentModel = FastifyRequest<PaymentModelParams>;
export type CustomerModel = FastifyRequest<CustomerModelParams>;
