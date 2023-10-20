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
  | 'START_BORABOT'
  | 'CREDITS_INSUFFICIENT'
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
    message: `Olá, É ótimo tê-lo conosco no BoraHub!! 🤗 \nEstamos animados em ter você como parte da nossa comunidade e queremos ajudá-lo a mudar sua vida! 😎 \nPara oficializar o seu cadastro, por favor, responda com a palavra "*CONFIRMO*" e assim confirmar seu número do WhatsApp. \nJuntos, vamos alcançar nossos objetivos! BoraHub! 💪🏽`,
  },
  loginUser: {
    message: `Olá, você quer se logar no BoraHub? Responda apenas *logar* ou *nao logar*`,
  },
  createTokenToValidation: {
    message: `Para validar seus dados agora envie: *CONFIRMO*`,
  },
  createdUser: {
    message: `Boa!! Agora você já confirmou seu WhatsApp. \nPode clicar aqui https://borahub.com.br ou voltar para o browser que você estava. \nSe você não tinha validado seu email antes irá receber outro e-mail para poder validar. Não adiantará clicar no 1o enviado pois o token é único para sua segurança. :) 📩📱`,
  },
  loggedUser: {
    message: `Show! Agora você já tá logado. \nPode clicar aqui https://borahub.com.br ou voltar para o browser que você estava.`,
  },
  START_BORABOT: {
    message: `🚀 Olá! Bem-vindo ao BoraBot, seu assistente virtual especializado.

Estou aqui para ajudar com informações sobre recrutamento, marketing, publicidade, tecnologia e muito mais. E o melhor? Você pode me transformar em um especialista em qualquer área de seu interesse! 🧠

Como usar:

Digite sua pergunta ou tópico de interesse e eu farei o meu melhor para fornecer uma resposta precisa.
Deseja que eu me especialize em uma área específica? Use o comando /especialista [área]. Por exemplo: /especialista direito.
Para uma lista completa de comandos ou se precisar de ajuda adicional, digite /ajuda.

Vamos começar? 🌟`,
  },
  CREDITS_INSUFFICIENT: {
    message: `🚫 Atenção! Créditos Insuficientes. 🚫

Parece que você não tem créditos suficientes para continuar a interação. Para aproveitar ao máximo o BoraBot e receber respostas precisas e especializadas, é necessário ter créditos em sua conta.

Como adquirir mais créditos?

1 - Entre em https://borahub.com.br/creditos 
2 - Escolha o pacote que melhor atende às suas necessidades e siga as instruções de pagamento.
3 - Selecione a forma que prefere efetuar o pagamento - Pix ou Cartão de Crédito.
Uma vez que os créditos estejam em sua conta, estarei aqui, pronto para ajudar! Se tiver alguma dúvida sobre como adicionar créditos ou qualquer outro assunto, não hesite em perguntar.

Lembre-se, com o *BoraBot*, o conhecimento está sempre ao alcance de suas mãos. Certifique-se de ter créditos suficientes para aproveitar ao máximo!`,
  },
  CREDIT_PURCHASED: {
    message: `Olá *|||NAME|||*! Você acabou de adicionar *|||CREDITS|||* no BoraHub!! Aproveite para usar todas nossas ferramentas.`,
  },
};
