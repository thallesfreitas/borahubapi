export interface WhatsData {
  message: string;
}

export type WhatsType =
  | 'default'
  | 'newUser'
  | 'sendJob'
  | 'loginUser'
  | 'createTokenToValidation'
  | 'createdUser'
  | 'loggedUser'
  | 'CREDIT_PURCHASED';

export const whatsTemplates: Record<WhatsType, WhatsData> = {
  default: {
    message:
      'Ixi... não entendi muito bem seu pedido. Escreve pra mim sobre o que você gostaria de falar. Escreva alguma das opções abaixo: \nQuero Trabalhar \nQuero Contratar \nSou Prestador de serviço \nSou Freelancer',
  },
  sendJob: {
    message: '',
  },
  newUser: {
    message: `Olá, É ótimo tê-lo conosco no #BoraAjudar.Work!! 🤗 \nEstamos animados em ter você como parte da nossa comunidade e queremos ajudá-lo a mudar sua vida! 😎 \nPara oficializar o seu cadastro, por favor, responda com a palavra "*CONFIRMO*" e assim confirmar seu número do WhatsApp. \nJuntos, vamos alcançar nossos objetivos! #BoraAjudar.Work! 💪🏽`,
  },
  loginUser: {
    message: `Olá, você quer se logar no #BoraAjudar.Work? Responda apenas *logar* ou *nao logar*`,
  },
  createTokenToValidation: {
    message: `Para validar seus dados agora envie: *CONFIRMO*`,
  },
  createdUser: {
    message: `Boa!! Agora você já confirmou seu WhatsApp. \nPode clicar aqui https://boraajudar.work ou voltar para o browser que você estava. \nSe você não tinha validado seu email antes irá receber outro e-mail para poder validar. Não adiantará clicar no 1o enviado pois o token é único para sua segurança. :) 📩📱`,
  },
  loggedUser: {
    message: `Show! Agora você já tá logado. \nPode clicar aqui https://boraajudar.work ou voltar para o browser que você estava.`,
  },
  CREDIT_PURCHASED: {
    message: `Olá *|||NAME|||*! Você acabou de adicionar *|||CREDITS|||* no BoraHub!! Aproveite para usar todas nossas ferramentas.`,
  },
};
