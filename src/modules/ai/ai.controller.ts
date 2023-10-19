// import { cohere } from 'cohere-ai';
import { FastifyReply } from 'fastify';
import OpenAI from 'openai';
import { addUsage } from '../usage/usage.service';
import { ChoiceCandidateJobAI, CreateAI } from './ai.model';

const cohere = require('cohere-ai');

cohere.init(process.env.COHERE_API_KEY_HOMO);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

enum CreateImageRequestSizeEnum {
  '256x256' = '256x256',
  '512x512' = '512x512',
  '1024x1024' = '1024x1024',
}
export const createImage = async (req: CreateAI, reply: FastifyReply) => {
  const request = {
    prompt: req.body.prompt,
    n: 1,
    size: '1024x1024' as CreateImageRequestSizeEnum,
  };

  const response = await (await openai.images.generate(request)).data;
  return reply.send(response);
};

export const completion = async (req: CreateAI, reply: FastifyReply) => {
  const response = await openai.completions.create({
    model: 'gpt-3.5',
    prompt: req.body.prompt,
    temperature: req.body.temperature ? req.body.temperature : 0.8,
    max_tokens: 3000,
  });
  console.log(response);
  return reply.send({ text: `${response.choices[0].text}` });
  // return reply.send(response.choices[0].text);
};

export const chat = async (req: CreateAI, reply: FastifyReply) => {
  const {
    tokens,
    model,
    userId,
    type,
    prompt,
    system,
    assistant,
    temperature,
  } = req.body;
  console.log('req.body');
  console.log(req.body);
  // let responseCohere = prompt;
  // if (prompt.length > 250) {
  //   responseCohere = await cohere.summarize({
  //     text: prompt,
  //     format: 'bullets',
  //     model: 'command-light',
  //   });
  // }
  // const finalPrompt = `Instruções: - Responda apenas com o texto do descritivo profissional; - Escreva o texto que o usuário possa usar em seu curriculum ou linkedin; - Incluia uma listas de qualificações, habilidades, pontos fortes; - use como base as informações enviadas; - O texto deverá ter no máximo 1500 caracteres: ${prompt}`;
  console.log(`model: ${model}`);

  const responseAi = await openai.chat.completions.create({
    // model: 'gpt-4',
    // model: 'gpt-3.5-turbo',
    // model: 'gpt-3.5-turbo-16k-0613',
    model: model || 'gpt-3.5-turbo-16k-0613',
    temperature: temperature || 0.6,
    max_tokens: tokens || 1500,
    messages: [
      {
        role: 'assistant',
        content: 'Responda em português do Brasil.',
      },
      // {
      //   role: 'system',
      //   content:
      //     (system as string) ||
      //     'Você é um especialista de alto nível em recrutamento, publicidade e marketing.',
      // },
      // {
      //   role: 'assistant',
      //   content:
      //     (assistant as string) ||
      //     'Não diga que você é um especialista. Não faça nenhuma introdução ao seu respeito.',
      // },
      {
        role: 'user',
        content: prompt as string,
        // content: finalPrompt as string,
      },
    ],
  });

  if (responseAi.usage && userId) {
    const dataUsage = {
      userId,
      total: responseAi.usage.total_tokens,
      input: responseAi.usage.prompt_tokens,
      output: responseAi.usage.completion_tokens,
    };
    await addUsage(dataUsage);
  }

  return reply.send({ text: `${responseAi.choices[0].message.content}` });
};

export const OLDchat = async (req: CreateAI, reply: FastifyReply) => {
  const { userId, type, prompt, system, assistant, temperature } = req.body;

  // const credit = await getCreditsByCreditsId(userId);
  // const amountCredit = credit?.amount as number;
  // const costsusage = await getCostsUsage(type as string);
  // const amountCost = costsusage?.amount as number;
  // if (amountCredit < amountCost) {
  //   return reply.status(400).send({ error: `Sem créditos suficientes` });
  // }

  const response = await openai.chat.completions.create({
    // model: 'gpt-4',
    // model: 'gpt-3.5-turbo',
    model: 'gpt-3.5-turbo-16k-0613',
    temperature: temperature || 0.6,
    max_tokens: 1500,
    messages: [
      {
        role: 'system',
        content:
          (system as string) ||
          'Você é um especialista de alto nível em recrutamento, publicidade e marketing.',
      },
      {
        role: 'assistant',
        content:
          (assistant as string) ||
          'Não diga que você é um especialista. Não faça nenhuma introdução ao seu respeito.',
      },
      {
        role: 'assistant',
        content: 'Responda em português do Brasil.',
      },
      {
        role: 'user',
        content: prompt as string,
      },
    ],
  });

  if (response.usage) {
    const dataUsage = {
      userId,
      total: response.usage.total_tokens,
      input: response.usage.prompt_tokens,
      output: response.usage.completion_tokens,
    };
    await addUsage(dataUsage);
  }

  return reply.send({ text: `${response.choices[0].message.content}` });
  // return reply.send({ text: `${response}` });
};

export const ChoiceCandidateJob = async (
  req: ChoiceCandidateJobAI,
  reply: FastifyReply
) => {
  const { promptJob, promptCandidate1, promptCandidate2 } = req.body;
  const response = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'Você é um recrutador de alto nível. PHD em psicologia, RH, administração. ',
      },
      {
        role: 'assistant',
        content:
          'Estou contratando um candidato para uma grande empresa e quero que me indique qual candidato devo contratar.\nPreciso que me retorne:\n1 - Qual candidato é o escolhido. \n2 - Porque?\n3 - Uma nota de 0 a 100 para cada candidato com valores em decimais como um termometro candidato x vaga. \n4 - qual seria a remuneração adequada para o candidato pensando sua experiencia, cv e posição oferecida.\n',
      },

      { role: 'user', content: `Vaga: ${promptJob}` },
      { role: 'user', content: `Candidato 1: ${promptCandidate1}` },
      { role: 'user', content: `Candidato 2: ${promptCandidate2}` },
    ],
  });
  return reply.send(response.choices[0].message);
};
