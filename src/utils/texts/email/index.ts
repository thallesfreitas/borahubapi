// NOREPLY_EMAIL_TO = 'noreply@boraajudar.work';
// CONTACT_EMAIL_TO = 'contato@boraajudar.work';
// ADMIN_EMAIL_TO = 'admin@boraajudar.work';
// FINANCEIRO_EMAIL_TO = 'financeiro@boraajudar.work';
export interface EmailData {
  template: string;
  subject: string;
  to?: string;
  name?: string;
}
export interface Email {
  admin: EmailData;
  client: EmailData;
}

export type EmailType =
  | 'forgetPassword'
  | 'newOrder'
  | 'newContact'
  | 'newUser'
  | 'loginUser'
  | 'createTokenToValidation'
  | 'newOrderClient'
  | 'CREDIT_PURCHASED'
  | 'createAssessmentCandidate'
  | 'createAssessmentRecruiter';

export const emailTemplates: Record<EmailType, Email> = {
  forgetPassword: {
    admin: {
      template: '../../src/utils/templates/forget-password.handlebars',
      subject: 'O usuário abaixo pediu para resetar a senha',
      to: '',
      name: '',
    },
    client: {
      template: '../../src/utils/templates/forget-password.handlebars',
      subject: 'Reset de senha BoraHub',
    },
  },
  newOrder: {
    admin: {
      template: '../../src/utils/templates/new-order.handlebars',
      subject: '',
      to: '',
      name: '',
    },
    client: {
      template: '',
      subject: '',
    },
  },
  newOrderClient: {
    admin: {
      template: '../../src/utils/templates/new-order.handlebars',
      subject: '',
      to: '',
      name: '',
    },
    client: {
      template: '',
      subject: '',
    },
  },

  newContact: {
    admin: {
      template: '../../src/utils/templates/new-contact.handlebars',
      subject: 'Um cliente solicitou contato',
      to: process.env.CONTACT_EMAIL_TO || '',
      name: 'BoraHub - Contato',
    },
    client: {
      template: '../../src/utils/templates/new-contact-client.handlebars',
      subject: 'Recebemos seu contato.',
    },
  },
  newUser: {
    admin: {
      template: '../../src/utils/templates/new-user.handlebars',
      subject: 'Novo usuário adicionado',
      to: process.env.NOREPLY_EMAIL_TO || '',
      name: 'BoraHub',
    },
    client: {
      template: '../../src/utils/templates/new-user-client.handlebars',
      subject: 'Bem-vindo(a) ao #BoraHub!',
    },
  },
  loginUser: {
    admin: {
      template: '',
      subject: '',
      to: process.env.NOREPLY_EMAIL_TO || '',
      name: 'BoraHub',
    },
    client: {
      template: '../../src/utils/templates/new-loginUser-client.handlebars',
      subject: 'Que bom te ver de novo por aqui.',
    },
  },
  createTokenToValidation: {
    admin: {
      template: '',
      subject: '',
      to: process.env.NOREPLY_EMAIL_TO || '',
      name: 'BoraHub',
    },
    client: {
      template:
        '../../src/utils/templates/new-createTokenToValidation-client.handlebars',
      subject: 'Bora validar seu dados?',
    },
  },
  CREDIT_PURCHASED: {
    admin: {
      template: '../../src/utils/templates/credit_purchased.handlebars',
      subject: 'Um usuário comprou créditos',
      to: process.env.NOREPLY_EMAIL_TO || '',
      name: 'BoraHub',
    },
    client: {
      template: '../../src/utils/templates/credit_purchased-client.handlebars',
      subject: 'Parabéns!! Seus créditos foram adicionados com sucesso!',
    },
  },
  createAssessmentCandidate: {
    admin: {
      template: '',
      subject: '',
      to: process.env.NOREPLY_EMAIL_TO || '',
      name: 'BoraHub',
    },
    client: {
      template:
        '../../src/utils/templates/createAssessmentCandidate.handlebars',
      subject: 'Avaliamos sua aplicação. Boa sorte!',
    },
  },
  createAssessmentRecruiter: {
    admin: {
      template: '',
      subject: '',
      to: process.env.NOREPLY_EMAIL_TO || '',
      name: 'BoraHub',
    },
    client: {
      template:
        '../../src/utils/templates/createAssessmentRecruiter.handlebars',
      subject:
        'Sua vaga teve uma aplicação. Veja os detalhes e nossa avaliação. Boa Sorte!',
    },
  },
};
