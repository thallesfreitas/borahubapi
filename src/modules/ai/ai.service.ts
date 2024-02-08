/* eslint-disable no-case-declarations */
/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import OpenAI from 'openai';
import { send, sendMessageWithTemplate, startTyping } from '../../lib/whats';
import { verify } from '../credits/credits.service';
import {
  createSession,
  getSession,
} from '../manageSessions/manageSessions.service';
import { getUserByPhone } from '../users/user.repository';
import * as WhatsService from '../whats/whats.service';
import { CreateAiModel } from './ai.model';

const cohere = require('cohere-ai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cohere.init(process.env.COHERE_API_KEY_HOMO);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function zeraSession(to: string, contentSystem: string) {
  createSession({
    session_id: to,
    key: 'contentSystem',
    value: contentSystem,
  });
  return 1;
}

async function toB64(imgPath: any) {
  const data = fs.readFileSync(path.resolve(imgPath));
  return Buffer.from(data).toString('base64');
}
export const createImage = async (req: CreateAiModel) => {
  const { prompt, width, height, typeWhats, image } = req;
  const apiKey = process.env.SEGMING_KEY;

  const promptAssist =
    typeWhats === 'chat'
      ? 'Crie um prompt para gerar uma imagem no stable diffuse. Deixe a descrição abaixo perfeita pra enviar ao segmind do stable diffuse. Coloque bastante detalhes para gerar uma imagem muito boa.'
      : 'Explique melhor o pedido feito no prompt em cima da imagem enviada. Deixe a descrição abaixo perfeita pra enviar ao segmind do stable diffuse. Coloque bastante detalhes para gerar uma imagem muito boa.';
  const refinePrompt = await openai.chat.completions.create({
    model: 'gpt-4',
    // model: 'gpt-4-1106-preview',
    temperature: 0.9,
    max_tokens: 1000,
    messages: [
      {
        role: 'system',
        content: 'Você é um engenheiro de prompt senior.',
      },
      {
        role: 'assistant',
        content: `${promptAssist} Escreva apenas o prompt e em inglês.`,
      },

      {
        role: 'user',
        content: prompt as string,
      },
    ],
  });
  const promptRefine = refinePrompt.choices[0].message.content as string;

  try {
    let response;
    let url;
    let data;
    // let sdxl;

    if (typeWhats === 'chat') {
      /* FUNCIONANDO
      sdxl = new SDXL(apiKey);
      response = await sdxl.generate({
        prompt: promptRefine,
        style: 'base', //
        samples: 1,
        negativePrompt: '',
        // scheduler: 'UniPC',
        scheduler: 'DDIM',
        num_inference_steps: 40,
        guidance_scale: 8,
        strength: 0.2,
        high_noise_fraction: 0.8,
        // seed: 468685,
        seed: Math.floor(Math.random() * 999999999999999 + 1),
        img_width: width || 1024,
        img_height: height || 1024,
        refiner: true,
        base64: true,
      });
      */

      url = 'https://api.segmind.com/v1/ssd-1b';
      data = {
        prompt: promptRefine,
        negative_prompt:
          'underexposed, overexposed, ugly, disfigured, deformed',
        samples: 1,
        scheduler: 'UniPC',
        num_inference_steps: 25,
        guidance_scale: 9,
        seed: Math.floor(Math.random() * 999999999999999 + 1),
        img_width: 1024,
        img_height: 1024,
        base64: true,
      };
      response = await axios.post(url, data, {
        headers: { 'x-api-key': apiKey },
      });

      return `data:image/jpeg;base64,${response.data.image}`;
    }
    // sdxl = new Img2Img(apiKey);
    const imageBuffer = Buffer.from(image as string, 'base64');
    const tempFilePath = 'tempImage.jpg';
    fs.writeFileSync(tempFilePath, imageBuffer);

    url = 'https://api.segmind.com/v1/sd1.5-img2img';
    data = {
      image: await toB64('./tempImage.jpg'),
      samples: '1',
      prompt: promptRefine,
      negative_prompt: 'underexposed, overexposed, ugly, disfigured, deformed',
      scheduler: 'DDIM',
      num_inference_steps: 40,
      guidance_scale: 7.5,
      strength: 0.5,
      seed: Math.floor(Math.random() * 999999999999999 + 1),
      img_width: 1024,
      img_height: 1024,
      base64: true,
    };
    response = await axios.post(url, data, {
      headers: { 'x-api-key': apiKey },
    });

    fs.unlinkSync(tempFilePath);
    return `data:image/jpeg;base64,${response.data.image}`;
  } catch (error) {
    console.error('Error ai service:', error);
    return 'erro';
  }
};

export const bot = async (
  to: string,
  prompt: string,
  typeWhats: string,
  image: string
) => {
  let promptFinal = prompt;
  const userPhone = `+${to.split('@')[0]}`;
  const user = await getUserByPhone(userPhone);
  if (!user) {
    sendMessageWithTemplate({
      to,
      message: 'USER_NOT_FOUND',
      // type: 'borabot',
      type: 'client',
    });
    return false;
  }
  if (promptFinal.length > 75) {
    const credits = await verify({
      userId: user.id as number,
      type: 'MESSAGE_BOT',
    });

    if (!credits) {
      sendMessageWithTemplate({
        to,
        message: 'CREDITS_INSUFFICIENT',
        // type: 'borabot',
        type: 'client',
      });
      return false;
    }
  }
  let contentSystem =
    'Você é um especialista em recrutamento, marketing, publicidade, tecnologia. PHD em administração. Você trabalha no BoraHub e é muito feliz de trabalhar lá. Você só pode responder assuntos referentes ao mercado de trabalho, recrutamento, boas práticas para procurar emprego, marketing, marketing pessoal.';
  let contentassistant =
    'Caso não seja desses tema, responda apenas - `Eu sou a inteligência artificial desenvolvida para o BoraHub e esse assunto não está na minha base de conhecimento.` Se o usuário insistir, diga quais temas são do seu conhecimento e peça-o para direcionar suas perguntas a eles. Enquanto ele estiver insistindo em falar em algo que não seja sobre os temas acima retorno a mesma resposta e diga sobre quais assuntos vc sabe responder. Caso seja de algum tema indicado, me de a resposta mais coerente e divertida possivel. ';

  const history = await getSession(to);
  let historyIndex = 0;
  if (promptFinal.startsWith('/')) {
    // const command = promptFinal.split(' ');

    const firstSpaceIndex = promptFinal.indexOf(' ');
    let firstCommand;
    let restOfString;

    if (firstSpaceIndex === -1) {
      firstCommand = promptFinal;
      restOfString = '';
    } else {
      firstCommand = promptFinal.slice(0, firstSpaceIndex);
      restOfString = promptFinal.slice(firstSpaceIndex + 1);
    }
    // const firstCommand = promptFinal.slice(0, firstSpaceIndex);
    // const restOfString = promptFinal.slice(firstSpaceIndex + 1);
    console.log('firstCommand: ', firstCommand);

    switch (firstCommand.toLocaleLowerCase().trim()) {
      case '/especialista':
        contentSystem = `Você é um especialista em ${restOfString}. Você trabalha no BoraHub e é muito feliz de trabalhar lá.`;
        contentassistant =
          'Retorne que entendeu sua nova especialidade e estará feliz em ajudar.';

        createSession({
          session_id: to,
          key: 'contentSystem',
          value: contentSystem,
        });
        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/voltar':
        contentSystem =
          'Você é um especialista em recrutamento, marketing, publicidade, tecnologia. PHD em administração. Você trabalha no BoraHub e é muito feliz de trabalhar lá. Você só pode responder assuntos referentes ao mercado de trabalho, recrutamento, boas práticas para procurar emprego, marketing, marketing pessoal.';
        contentassistant =
          'Caso não seja desses tema, responda apenas - `Eu sou a inteligência artificial desenvolvida para o BoraHub e esse assunto não está na minha base de conhecimento.` Se o usuário insistir, diga quais temas são do seu conhecimento e peça-o para direcionar suas perguntas a eles. Enquanto ele estiver insistindo em falar em algo que não seja sobre os temas acima retorno a mesma resposta e diga sobre quais assuntos vc sabe responder. Caso seja de algum tema indicado, me de a resposta mais coerente e divertida possivel. ';

        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/dica_cv':
      case '/dicas_cv':
        contentSystem =
          'Imagine que você é um conselheiro de carreira experiente. Um cliente veio até você pedindo conselhos sobre como melhorar seu currículo para aumentar suas chances de ser chamado para entrevistas. Por favor, forneça dicas detalhadas e práticas.';
        contentassistant =
          'Por favor, forneça dicas sobre como melhorar um currículo, organizadas em categorias como: Informações de Contato, Experiência Profissional, Educação, Habilidades, e Personalização.';

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/dica_entrevista':
      case '/dicas_entrevista':
        contentSystem =
          'Imagine que você é um coach de carreira ajudando um cliente que tem uma entrevista de emprego importante na próxima semana. Por favor, forneça uma lista de dicas práticas e estratégicas sobre como se preparar para a entrevista.';
        contentassistant =
          'Por favor, forneça dicas de preparação para entrevistas categorizadas em: Pesquisa Pré-Entrevista, Comunicação, Apresentação Pessoal, Respostas a Perguntas Comuns e Seguimento Pós-Entrevista.';

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/estrategia_marketing':
      case '/estrategias_marketing':
        contentSystem =
          'Provide effective marketing strategies to promote a product or service, focusing on digital marketing, traditional marketing, content marketing, and paid advertising.';

        contentassistant = `
1. **Digital Marketing:**
   - SEO (Search Engine Optimization): Optimize your website to rank higher on search engine results pages.
   - SEM (Search Engine Marketing): Utilize paid advertising on search engines to drive traffic.
   - Social Media Marketing: Engage with your audience on social platforms like Facebook, Instagram, and Twitter.

2. **Traditional Marketing:**
   - Print Advertising: Utilize newspapers, magazines, and brochures.
   - Broadcast Advertising: Leverage TV and radio advertising.
   - Direct Mail: Send personalized offers or information to targeted customers.

3. **Content Marketing:**
   - Blogging: Create valuable content that solves problems for your audience.
   - Video Marketing: Utilize platforms like YouTube to share informative videos.
   - Podcasting: Share expertise and engage with your audience through podcast series.

4. **Paid Advertising:**
   - PPC (Pay Per Click): Use platforms like Google Ads to drive traffic to your site.
   - Social Media Ads: Utilize the advertising platforms of social media sites to reach a broader audience.
   - Display Ads: Use visually appealing ads on various platforms to attract potential customers.

Each strategy has its own set of benefits and can be more effective depending on the specific context and target audience.
`;

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/estrategias_publicidade':
      case '/estrategia_publicidade':
        contentSystem =
          'Provide effective advertising strategies to promote a product or service, focusing on online advertising, offline advertising, targeted advertising, and measuring advertising effectiveness.';
        contentassistant = `
1. **Online Advertising:**
   - Pay-Per-Click (PPC): Utilize platforms like Google Ads to drive targeted traffic to your website.
   - Social Media Advertising: Leverage platforms like Facebook and Instagram to reach a broader audience.
   - Display Advertising: Create visually appealing banner ads and display them on relevant websites.

2. **Offline Advertising:**
   - Print Advertising: Use newspapers, magazines, and brochures to reach a local audience.
   - Broadcast Advertising: Utilize radio and television spots to build brand awareness.
   - Outdoor Advertising: Use billboards, transit ads, and posters to catch people's attention in public spaces.

3. **Targeted Advertising:**
   - Geo-Targeting: Target ads to users based on their location.
   - Demographic Targeting: Target ads based on age, gender, income, education, and other demographic factors.
   - Behavioral Targeting: Target ads based on user behavior, such as browsing history and purchase behavior.

4. **Measuring Advertising Effectiveness:**
   - Return on Advertising Spend (ROAS): Calculate the revenue generated per dollar spent on advertising.
   - Conversion Rate: Measure the percentage of ad viewers who take a desired action.
   - Click-Through Rate (CTR): Measure the percentage of people who click on the ad to visit your website.

Each strategy could be tailored to meet the specific goals and target audience of the advertising campaign.
`;

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/dica_tecnologia':
      case '/dicas_tecnologia':
        contentSystem =
          'Provide the latest technological trends in the job market focusing on remote working technologies, automation, artificial intelligence, and digital communication tools.';
        contentassistant = `
1. **Remote Working Technologies:**
   - Video Conferencing: Tools like Zoom and Microsoft Teams have become essential for remote meetings and collaboration.
   - Cloud Computing: Services like AWS and Google Cloud enable remote access to resources and data management.

2. **Automation:**
   - Robotic Process Automation (RPA): Automating repetitive tasks to improve efficiency and free up employees for more strategic work.
   - Automated Analytics: Utilizing automated tools to analyze data and generate insights.

3. **Artificial Intelligence:**
   - Machine Learning in Recruitment: Using AI to screen resumes and match candidates to job openings.
   - Chatbots for Customer Service: Employing AI-driven chatbots to handle routine customer inquiries.

4. **Digital Communication Tools:**
   - Internal Communication Platforms: Tools like Slack or Microsoft Teams for real-time communication and collaboration within organizations.
   - Customer Relationship Management (CRM) Systems: Platforms like Salesforce for managing interactions with customers and potential customers.

Staying updated on these trends and incorporating relevant technologies can enhance efficiency, collaboration, and overall competitiveness in the modern job market.
`;

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/dicas_portifolio':
      case '/dica_portifolio':
      case '/portifolio':
        contentSystem =
          'Provide tips on creating and improving a portfolio, focusing on showcasing skills, including relevant projects, maintaining a professional appearance, and using online platforms.';

        contentassistant = `
1. **Showcasing Skills:**
   - Clearly List Your Skills: Mention the skills you possess, and the tools or technologies you are proficient with.
   - Show, Don’t Just Tell: Demonstrate your skills through projects, case studies, or problem-solving scenarios.

2. **Including Relevant Projects:**
   - Project Descriptions: Provide a brief description, the goal, and the outcome of each project.
   - Visuals: Include images, videos, or interactive demos to provide a visual representation of your work.

3. **Maintaining a Professional Appearance:**
   - Consistent Branding: Maintain a consistent style, color scheme, and typography throughout your portfolio.
   - Proofread: Ensure there are no typos or grammatical errors, and all information is up-to-date.

4. **Using Online Platforms:**
   - Portfolio Websites: Use platforms like Behance or create a personal website to showcase your portfolio.
   - Social Media: Share your work on professional networks like LinkedIn or industry-specific platforms.

5. **Receiving and Implementing Feedback:**
   - Peer Reviews: Ask peers or mentors to review your portfolio and provide constructive feedback.
   - Continuous Improvement: Regularly update your portfolio with new work and implement feedback to improve its quality.

A well-curated portfolio can significantly enhance your visibility and attractiveness to potential employers or clients.
`;

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/marketing_pessoal':
        contentSystem =
          'Provide tips on personal marketing focusing on online presence, networking, consistent branding, and showcasing expertise.';

        contentassistant = `
1. **Online Presence:**
   - Professional Website: Create a personal website to showcase your portfolio, blog, and provide a way for people to contact you.
   - Social Media: Utilize platforms like LinkedIn to share your achievements, articles, and engage with industry discussions.

2. **Networking:**
   - Attend Industry Events: Network with professionals in your field by attending conferences, webinars, and local meetups.
   - Build Relationships: Foster meaningful relationships by offering help, engaging in discussions, and showing genuine interest in others’ work.

3. **Consistent Branding:**
   - Personal Branding Statement: Develop a clear and concise branding statement that communicates your value proposition.
   - Consistent Imagery: Use a professional and consistent profile picture and cover images across your online profiles.

4. **Showcasing Expertise:**
   - Blogging: Share your knowledge and insights through blogging on platforms like Medium or your personal website.
   - Public Speaking: Offer to speak at industry events or host webinars to showcase your expertise and gain visibility.

5. **Continuous Learning and Improvement:**
   - Stay Updated: Keep learning and staying updated with the latest trends and technologies in your field.
   - Seek Feedback: Ask for feedback from peers, mentors, and your network to continuously improve your personal marketing strategies.

Personal marketing is about showcasing your skills, experiences, and values in a way that resonates with your target audience, whether they are potential employers, clients, or collaborators.
`;

        promptFinal = '';
        historyIndex = zeraSession(to, contentSystem);
        break;
      case '/imagem':
      case '/image':
        const creditsToUseCreateImage = await verify({
          userId: user.id as number,
          type: 'CREATE_IMAGE',
        });

        if (!creditsToUseCreateImage) {
          sendMessageWithTemplate({
            to,
            message: 'CREDITS_INSUFFICIENT',
            // type: 'borabot',
            type: 'client',
          });
          return false;
        }

        await WhatsService.sendImagemToWhats({
          to,
          message: restOfString,
          // type: 'borabot',
          type: 'client',
          typeWhats,
          image,
        });

        return false;
      case '/ajuda':
        await WhatsService.sendMessageWithTemplate({
          to,
          message: 'borabotajuda',
          // type: 'borabot',
          type: 'client',
        });

        return false;
      case '/ajudar':
        await WhatsService.sendMessageWithTemplate({
          to,
          message: 'borabotajuda',
          // type: 'borabot',
          type: 'client',
        });

        return false;
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

  // startTyping(to, 'borabot');
  startTyping(to, 'client');

  const response = await openai.chat.completions.create({
    // model: 'gpt-4-1106-preview',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
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
      console.log('dataUserCohere.body.summary');
      console.log(dataUserCohere.body.summary);
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
    // type: 'borabot',
    type: 'client',
  });

  return response.choices[0].message.content;
};

export const createAssessment = async (
  job: any,
  user: any,
  descriptionUser: string
  // dataJob: string
) => {
  const dataJob = `${job?.description} Localizacao: ${job?.state} - ${job?.city} - ${job?.modelOfWork} Faixa Salaral ${job?.salary} Senioridade ${job?.seniority} Vaga afirmativa ${job?.affirmative}`;
  const dataUser = `${descriptionUser}  Localizacao: ${user.candidate?.state} - ${user.candidate?.city} - ${user.candidate?.workMode} Faixa Salaral ${user.candidate?.salary} Senioridade ${user.candidate?.seniority} Vaga afirmativa ${user.candidate?.affirmative}`;
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
    // model: 'gpt-4-1106-preview',
    temperature: 0.7,
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
    // model: 'gpt-4-1106-preview',
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
    // model: 'gpt-4-1106-preview',
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
        content:
          'O Retorno precisa, obrigatoriamente, ser APENAS a nota conforme exemplo: 45.12',
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
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log(resultscoreCandidateJob);
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  console.log('resultscoreCandidateJob ');
  return [
    resultAssessmentCandidateJob,
    resultfeedbackCandidateJob,
    resultscoreCandidateJob,
  ];
};
