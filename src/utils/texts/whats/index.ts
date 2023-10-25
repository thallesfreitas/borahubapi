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
  | 'createdUserBoraBot'
  | 'loggedUser'
  | 'START_BORABOT'
  | 'CREDITS_INSUFFICIENT'
  | 'USER_NOT_FOUND'
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
    message: `Olá, É ótimo tê-lo conosco no BoraHub!! 🤗 \nEstamos animados em ter você como parte da nossa comunidade e queremos ajudá-lo a mudar sua vida! 😎 \nPara oficializar o seu cadastro, por favor, responda com a palavra "*CONFIRMO*" e assim confirmar seu número do WhatsApp.\nAgora você também pode interagir com o nosso BoraBot para dicas e assistência em sua jornada. 🤖 \nJuntos, vamos alcançar nossos objetivos! BoraHub! 💪🏽`,
  },
  loginUser: {
    message: `Olá, você quer se logar no BoraHub? Responda apenas *logar* ou *nao logar*`,
  },
  createTokenToValidation: {
    message: `Para validar seus dados agora envie: *CONFIRMO*`,
  },
  createdUser: {
    message: `Boa!! Agora você já confirmou seu WhatsApp. \n Se você validou seu email ainda, fique de olho na sua caixa para confirmar esse importante contato também.. :) 📩📱`,
  },
  createdUserBoraBot: {
    message: `Olá! Parabéns por dar um passo empolgante ao se cadastrar no BoraHub! Sou o *BoraBot*, seu assistente virtual especializado, e estou aqui para enriquecer sua experiência na nossa plataforma. Tenho grande paixão pelo ambiente inovador do BoraHub, estou muito feliz em trabalhar aqui e ajudá-lo em sua jornada profissional. 🎓🌟 \n \n Agora que você é um membro da nossa comunidade, tem à sua disposição uma ferramenta valiosa para obter insights sobre recrutamento, marketing, publicidade, tecnologia, e boas práticas para a busca de emprego. Além disso, posso oferecer dicas sobre como aprimorar seu marketing pessoal no competitivo mercado de trabalho! 🚀 \n \n  Como utilizar meus serviços: \n \n  Simplesmente digite sua pergunta ou tópico de interesse, e eu estarei aqui para fornecer respostas precisas e orientações baseadas nas áreas mencionadas.\n *Por exemplo*, você pode perguntar sobre como elaborar um CV envolvente ou estratégias eficazes de marketing pessoal.  \n \nExemplos de perguntas:\n "Como posso me preparar para uma entrevista?" \n"Quais são as estratégias eficazes de marketing digital?"\n"Como posso criar um portfólio atraente?" \n Seja Criativo!! \n \n Estou aqui para ajudá-lo a navegar pelo mundo do trabalho e a aproveitar ao máximo as oportunidades disponíveis no BoraHub. \n \n Vamos começar?? 🌟`,
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
  USER_NOT_FOUND: {
    message: `🔍 Usuário Não Encontrado 🔍

Olá! Parece que você ainda não está cadastrado em nosso sistema. Para interagir e aproveitar todos os benefícios do BoraBot, é essencial que você tenha uma conta no BoraHub.

Dê o primeiro passo agora!
👉 Crie sua conta no BoraHub e tenha acesso instantâneo ao universo de conhecimento do BoraBot.

Uma vez cadastrado, você poderá explorar todos os recursos, obter respostas especializadas e muito mais. Estou ansioso para ajudá-lo assim que estiver tudo pronto. Espero vê-lo em breve no BoraHub!

Clique aqui https://www.borahub.com.br/crie-sua-conta`,
  },
  CREDIT_PURCHASED: {
    message: `Olá *|||NAME|||*! Você acabou de adicionar *|||CREDITS|||* no BoraHub!! Aproveite para usar todas nossas ferramentas.`,
  },
};
