/* eslint-disable import/no-cycle */
import OpenAI from 'openai';
import { send, sendMessageWithTemplate, startTyping } from '../../lib/whats';
import { verify } from '../credits/credits.service';
import {
  createSession,
  getSession,
} from '../manageSessions/manageSessions.service';
import { getUserByPhone } from '../users/user.repository';

const cohere = require('cohere-ai');

cohere.init(process.env.COHERE_API_KEY_HOMO);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const botTESTE = async (to: string, prompt: string) => {
  send({
    to,
    message: `teste: ${prompt}`,
    type: 'borabot',
  });
};

export const bot = async (to: string, prompt: string) => {
  const userPhone = `+${to.split('@')[0]}`;
  const user = await getUserByPhone(userPhone);
  if (!user) {
    sendMessageWithTemplate({
      to,
      message: 'USER_NOT_FOUND',
      type: 'borabot',
    });
    return false;
  }

  const credits = verify({ userId: user.id as number, type: 'MESSAGE_BOT' });
  console.log('credits');
  console.log(credits);

  if (!credits) {
    sendMessageWithTemplate({
      to,
      message: 'CREDITS_INSUFFICIENT',
      type: 'borabot',
    });
    return false;
  }
  let contentSystem =
    'Você é um especialista em recrutamento, marketing, publicidade, tecnologia. PHD em administração. Você trabalha no BoraHub e é muito feliz de trabalhar lá. Você só pode responder assuntos referentes ao mercado de trabalho, recrutamento, boas práticas para procurar emprego, marketing, marketing pessoal.';
  let contentassistant =
    'Caso não seja desses tema, responda apenas - `Eu sou a inteligência artificial desenvolvida para o BoraHub e esse assunto não está na minha base de conhecimento.` Se o usuário insistir, diga quais temas são do seu conhecimento e peça-o para direcionar suas perguntas a eles. Enquanto ele estiver insistindo em falar em algo que não seja sobre os temas acima retorno a mesma resposta e diga sobre quais assuntos vc sabe responder. Caso seja de algum tema indicado, me de a resposta mais coerente e divertida possivel. ';

  const history = await getSession(to);
  let historyIndex = 0;
  if (prompt.startsWith('/')) {
    const command = prompt.split(' ')[0];
    switch (command) {
      case '/especialista':
        contentSystem = `Você é um especialista em ${
          prompt.split(' ')[1]
        }. Você trabalha no BoraHub e é muito feliz de trabalhar lá.`;
        contentassistant =
          'Retorne que entendeu sua nova especialidade e estará feliz em ajudar.';

        createSession({
          session_id: to,
          key: 'contentSystem',
          value: contentSystem,
        });

        historyIndex = 1;
        break;
      case '/voltarborabot':
        contentSystem =
          'Você é um especialista em recrutamento, marketing, publicidade, tecnologia. PHD em administração. Você trabalha no BoraHub e é muito feliz de trabalhar lá. Você só pode responder assuntos referentes ao mercado de trabalho, recrutamento, boas práticas para procurar emprego, marketing, marketing pessoal.';
        contentassistant =
          'Caso não seja desses tema, responda apenas - `Eu sou a inteligência artificial desenvolvida para o BoraHub e esse assunto não está na minha base de conhecimento.` Se o usuário insistir, diga quais temas são do seu conhecimento e peça-o para direcionar suas perguntas a eles. Enquanto ele estiver insistindo em falar em algo que não seja sobre os temas acima retorno a mesma resposta e diga sobre quais assuntos vc sabe responder. Caso seja de algum tema indicado, me de a resposta mais coerente e divertida possivel. ';

        createSession({
          session_id: to,
          key: 'contentSystem',
          value: contentSystem,
        });
        break;

      default:
        break;
    }
  }

  if (history) {
    contentassistant = 'HISTORICO: ';
    history.session.forEach(element => {
      if (element.key === 'contentSystem') contentSystem = element.value;
      if (element.key === 'history') contentassistant += element.value;
      contentassistant +=
        'Se o usuário nao pedir em outra língua, RESPONDA EM PORTUGUÊS! ';
    });
  }

  startTyping(to, 'borabot');

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    // model: 'gpt-3.5-turbo',
    temperature: 0.6,
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content: contentSystem,
      },
      {
        role: 'assistant',
        content: contentassistant,
      },

      {
        role: 'user',
        content: prompt as string,
      },
    ],
  });

  // if (response.usage) {
  //   const dataUsage = {
  //     userId: user?.id as number,
  //     total: response.usage.total_tokens,
  //     input: response.usage.prompt_tokens,
  //     output: response.usage.completion_tokens,
  //   };
  //   await addUsage(dataUsage);
  // }

  // let dataUserCohere = response.choices[0].message.content as string;
  if ((response.choices[0].message.content as string).length > 250) {
    const dataUserCohere = await cohere.summarize({
      text: `resuma o texto: ${response.choices[0].message.content as string}`,
      format: 'bullets',
      model: 'command-light',
    });
    if (historyIndex === 0) {
      createSession({
        session_id: to,
        key: 'history',
        value: dataUserCohere.body.summary,
      });
    }
  }
  send({
    to,
    message: response.choices[0].message.content as string,
    type: 'borabot',
  });

  return response.choices[0].message.content;
};

export const createAssessment = async (dataUser: string, dataJob: string) => {
  // let dataUserCohere = dataUser;
  // if (dataUser.length > 250) {
  //   dataUserCohere = await cohere.summarize({
  //     text: `resuma o texto: ${dataUser}`,
  //     format: 'bullets',
  //     model: 'command-light',
  //   });
  // }

  const AssessmentCandidateJob = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.6,
    max_tokens: 1000,
    messages: [
      {
        role: 'system',
        content:
          'Você é um recrutador de alto nível. PHD em psicologia, RH, administração. ',
      },
      {
        role: 'assistant',
        content:
          'Estou contratando um candidato e quero que faça uma analise de seu descritivo para a vaga.\nPreciso que me retorne um texto dizendo se o candidato é recomendado para a vaga ou não. Qual seria a remuneração adequada para o candidato pensando sua experiencia, cv e posição oferecida. Diga também 3 perguntas que devo fazer a ele para entrevista-lo. Retorne o texto formatado com tags HTML. A parte do que ele pode melhorar em bullets <ul><li>.',
      },
      {
        role: 'assistant',
        content: 'Retorne no máximo 750 palavras',
      },
      { role: 'user', content: `Vaga: ${dataJob}` },
      { role: 'user', content: `Candidato: ${dataUser}` },
    ],
  });

  const feedbackCandidateJob = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.6,
    max_tokens: 1000,
    messages: [
      {
        role: 'system',
        content:
          'Você é um recrutador de alto nível. PHD em psicologia, RH, administração. ',
      },
      {
        role: 'assistant',
        content:
          'Um candidato aplicou para uma vaga e gostaria de dar um feedback sobre a estar apto ou não para a vaga e o que ele pode melhorar para ter maiores chances. Deixe claro que esse feedback é da plataforma BoraHub e não o feedback oficial do recrutador. Retorne o texto formatado com tags HTML. A parte do que ele pode melhorar em bullets <ul><li>.',
      },
      {
        role: 'assistant',
        content:
          'Importante. Nao pode conter tags <html> e <body> ou [Seu Nome].',
      },
      {
        role: 'assistant',
        content: 'Retorne no máximo 750 palavras',
      },
      { role: 'user', content: `Vaga: ${dataJob}` },
      { role: 'user', content: `Candidato: ${dataUser}` },
    ],
  });

  const scoreCandidateJob = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.6,
    max_tokens: 6,
    messages: [
      {
        role: 'system',
        content:
          'Você é um recrutador de alto nível. PHD em psicologia, RH, administração. ',
      },
      {
        role: 'assistant',
        content: 'Importante. Nao pode conter tags <html> e <body>.',
      },
      {
        role: 'assistant',
        content:
          'Estou contratando um candidato e quero me retorne uma nota de 0 a 100 para cada candidato com valores em decimais como um termometro candidato x vaga.',
      },
      {
        role: 'assistant',
        content: 'Retorne apenas a nota com o exemplo a seguir',
      },
      {
        role: 'assistant',
        content: '45.12',
      },
      { role: 'user', content: `Vaga: ${dataJob}` },
      { role: 'user', content: `Candidato: ${dataUser}` },
    ],
  });

  const resultAssessmentCandidateJob =
    AssessmentCandidateJob.choices[0].message.content;

  const resultfeedbackCandidateJob =
    feedbackCandidateJob.choices[0].message.content;

  const resultscoreCandidateJob = scoreCandidateJob.choices[0].message.content;
  return [
    resultAssessmentCandidateJob,
    resultfeedbackCandidateJob,
    resultscoreCandidateJob,
  ];
};
