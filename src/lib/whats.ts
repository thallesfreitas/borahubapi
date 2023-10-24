/* eslint-disable consistent-return */
/* eslint-disable security/detect-object-injection */
/* eslint-disable global-require */
/* eslint-disable new-cap */
// eslint-disable-next-line import/no-cycle
// import * as SentToGroupsService from '../modules/senttogroups/senttogroups.service';
import * as ApprovalSystem from '../modules/approvalSystem/approvalSystem.service';
import { checkAction } from '../modules/whats/webhook.service';
import { WhatsType, whatsTemplates } from '../utils/texts/whats';
import { sendWhatsConection } from './email';
import * as Queue from './queue';
import { uploadQr } from './storage';

const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

const {
  WHATS_API_URL,
  WHATS_API_TOKEN,
  DELAY_MESSAGE_GROUPS,
  WHATS_INSTANCE_ID,
  ULTRA_END_POINT,
  TOKEN_FB_TEST,
} = process.env;

const jobsample = `
ATENDIMENTO OFFLINE - PLENO OU SÊNIOR

EMPRESA
Agência Doc.Sync

DATA E LOCAL
06/09, São Paulo 

ATIVIDADES
- Fluxo entre a agência e as incorporadoras.
- Acompanhamento de fornecedores.
- Auxílio no desenvolvimento de campanhas offline.
- Acompanhamento da produção de materiais gráficos.
- Acompanhamento da comunicação visual de stands e terrenos.
- Verificação in loco da instalação de placas, adesivos, e painéis.
- Compra e verificação de mídia offline.
- Ativações, eventos e promoção de rua.
- Prestação de contas e controle de budget do job.
- Serviço de produção (cotações de fornecedores e serviços).

REQUISITOS
- Experiência no mercado imobiliário (agências, incorporadoras, construtoras e/ou grandes imobiliárias).
- Experiência comprovada em fluxo de aprovação de KV, montagem de stand e campanhas offline.
- Perfil analítico, pró ativo e curioso. Bom relacionamento interpessoal e facilidade em trabalhar no regime home office.

DETALHES DA POSIÇÃO
- Contratação PJ.
- Home office (com exceção de reuniões pontuais com o cliente e visitas técnicas).
- Nossos clientes estão em São Paulo e é preciso ter fácil acesso.

CV COM PRETENSÃO SALARIAL
Enviar para Marcela Matos (Head de Atendimento) no e-mail m.matos@docsync.com.br
`;

// const groupsWhatsTeste = '5511945483326-1593553509@g.us';
// const groupsWhatsTeste = '120363047748135271@g.us';
export const groupsWhatsStatusTeste = [false, false, false, false, false];
const groupsWhatsTeste = [
  { name: '#1BoraAjudar.work-teste', idWhats: '120363047748135271@g.us' },
  { name: '#2BoraAjudar.work-teste', idWhats: '120363170446337370@g.us' },
  { name: '#3BoraAjudar.work-teste', idWhats: '120363170098349977@g.us' },
  { name: '#4BoraAjudar.work-teste', idWhats: '120363170837080195@g.us' },
  { name: '#5BoraAjudar.work-teste', idWhats: '120363152796875195@g.us' },
];
export const groupsWhatsStatus = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
const groupsWhats = [
  { name: '1#BoraAjudar.Work', idWhats: '5521996164999-1487957874@g.us' },
  { name: '2#BoraAjudar.Work', idWhats: '120363045425946745@g.us' },
  { name: '3#BoraAjudar.Work', idWhats: '5511945483326-1580909099@g.us' },
  { name: '4#BoraAjudar.Work', idWhats: '5511945483326-1557146656@g.us' },
  { name: '5#BoraAjudar.Work', idWhats: '5511945483326-1588441584@g.us' },
  { name: '6#BoraAjudar.Work', idWhats: '5511945483326-1591185970@g.us' },
  { name: '7#BoraAjudar.Work', idWhats: '5511945483326-1611927899@g.us' },
  { name: '8#BoraAjudar.Work', idWhats: '5511945483326-1592758441@g.us' },
  { name: '9#BoraAjudar.Work', idWhats: '5511945483326-1593553509@g.us' },
  { name: '10#BoraAjudar.Work', idWhats: '5511945483326-1594043289@g.us' },
  { name: '11#BoraAjudar.Work', idWhats: '5511945483326-1594239437@g.us' },
  { name: '12#BoraAjudar.Work', idWhats: '5511945483326-1595020621@g.us' },
  { name: '13#BoraAjudar.Work', idWhats: '5511945483326-1596121854@g.us' },
  { name: '14#BoraAjudar.Work', idWhats: '5511945483326-1596633225@g.us' },
  { name: '15#BoraAjudar.Work', idWhats: '5511945483326-1597086022@g.us' },
  { name: '16#BoraAjudar.Work', idWhats: '5511945483326-1597956259@g.us' },
  { name: '17#BoraAjudar.Work', idWhats: '5511945483326-1598451853@g.us' },
  { name: '18#BoraAjudar.work', idWhats: '5511945483326-1610655401@g.us' },
  { name: '19#BoraAjudar.Work', idWhats: '5511945483326-1591718176@g.us' },
  { name: '20#BoraAjudar.Work', idWhats: '5511945483326-1615038466@g.us' },
  { name: '21#BoraAjudar.work', idWhats: '5511945483326-1621859631@g.us' },
  { name: '22#BoraAjudar.work', idWhats: '120363045581553829@g.us' },
];

interface Participant {
  id: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}
interface Item {
  name: string;
  id: string;
  groupMetadata: {
    description: string;
    participants: Participant[];
  };
  link: string;
}
interface SendMessageAPIArgs {
  message: string;
  to: string;
  payload?: { [key: string]: string | {}[] };
}
interface SendMessageArgs {
  message: string;
  to: string;
  payload?: string[];
  payloadVar?: string[];
  type: string;
}

interface WP {
  [x: string]: any;
  onMessage: (arg0: (message: any) => void) => void;
  sendText: (to: string, content: string, options?: any) => Promise<any>;
  sendLinkPreview: (to: string, content: string, options?: any) => Promise<any>;
  sendMessageOptions: (
    to: string,
    content: string,
    options?: any
  ) => Promise<any>;
  startTyping: (arg0: string) => Promise<any>;
  stopTyping: (arg0: string) => Promise<any>;
  listChats(options?: any): Promise<any>;
}

interface SendText {
  to: string;
  message: string;
  type: string;
}

let clientWP: WP;
let borabot: WP;

function setClient(type: string) {
  if (type === 'client') {
    return clientWP;
  }
  return borabot;
}

function config(client: WP, type = 'Bora') {
  if (type === 'Bora') {
    clientWP = client;
  } else {
    borabot = client;
  }
}

async function start(type = 'client') {
  const client: WP = setClient(type);

  client.onMessage((message: { [x: string]: string; body: string }) => {
    const to = message.from;
    if (to.includes('@c.us')) {
      if (message) {
        const textMessage = message.body.toLowerCase();
        checkAction({ to, message: textMessage });
      }
    }
  });

  client.onStateChange((state: any) => {
    console.log('state');
    console.log(state);
    // if (state == 'UNPAIRED') {
    // }
  });
}

export async function startTyping(to: string, type: string) {
  const client: WP = setClient(type);
  const phone = to.toString().replace('+', '');
  client.startTyping(phone);
}

export async function sendProcess(action: string) {
  const type = action.split('#T#T')[0];
  const data = action.split('#T#T')[1].split('&&&@@@');
  const phone = data[0];
  const message = data[1];
  const client: WP = setClient(type);
  client.startTyping(phone);
  const t = await client.sendText(phone, message, {});
  client.stopTyping(phone);
  try {
    if (data.length === 3) {
      const group = data[2].split('#########');
      const id = parseInt(group[0], 10);
      const groupId = parseInt(group[1], 10);
      ApprovalSystem.update({
        id,
        groupId,
        status: true,
      });
    }
    return true;
  } catch (e) {
    console.error('Error when sending: ', e); // return object error
    client.stopTyping(phone);
    if (data.length === 3) {
      console.log('MENSAGEM ENVIADA PARA GRUPO DEU ERRO!');
      const group = data[2].split('#########');
      const id = parseInt(group[0], 10);
      const groupId = parseInt(group[1], 10);
      ApprovalSystem.update({
        id,
        groupId,
        status: false,
      });
    }
    return false;
  }
}

export async function sendToGroups(message: string, approvalSystemId: number) {
  let groupId = 0;
  const interval: NodeJS.Timeout = setInterval(async () => {
    // const groupPhone = groupsWhatsTeste[groupId].idWhats;
    const groupPhone = groupsWhats[groupId].idWhats;
    let phone = groupPhone.toString().replace('+', '');
    if (!phone.includes('@')) phone = `${phone}@g.us`;
    clientWP.startTyping(phone);
    const messageFinal = `client#T#T${phone}&&&@@@${message}&&&@@@${approvalSystemId}#########${groupId}`;
    Queue.sendMessageToQueue('queueSendWhats', messageFinal);

    // if (groupId === groupsWhatsTeste.length - 1) {
    if (groupId === groupsWhats.length - 1) {
      clearInterval(interval);
    }
    groupId += 1;
  }, 5000);

  return true;
}
async function sendQR(fileQR: any, type: string) {
  await sendWhatsConection(type);
  const { Key } = await uploadQr(fileQR, 'tempqr');
}
export async function send({ to, message, type }: SendText) {
  const client: WP = setClient(type);
  let phone = to.toString().replace('+', '');
  if (!phone.includes('@')) phone = `${phone}@c.us`;
  client.startTyping(phone);
  const messageFinal = `${type}#T#T${phone}&&&@@@${message}`;

  Queue.sendMessageToQueue('queueSendWhats', messageFinal);
}

export const connectWP = async (_session = 'Bora') => {
  wppconnect
    .create({
      session: _session,
      catchQR: (
        base64Qrimg: any,
        asciiQR: any,
        attempts: any,
        urlCode: any
      ) => {
        console.log('Number of attempts to read the qrcode: ', attempts);
        // console.log('Terminal qrcode: ', asciiQR);
        // console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);

        const matches = base64Qrimg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        const response = {
          type: matches[1],
          data: Buffer.from(matches[2], 'base64'),
        };

        const imageBuffer = response;
        require('fs').writeFile(
          'out.png',
          imageBuffer.data,
          'binary',
          function writeFileCallback(err: any) {
            if (err != null) {
              console.log(err);
            }
          }
        );

        sendQR(imageBuffer, _session);
      },
      statusFind: (statusSession: any, session: any) => {
        // return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        console.log('Status Session: ', statusSession);
        if (statusSession === 'desconnectedMobile') {
          // connectWP();
        }
        // Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
        // connectWP(session);
      },
      onLoadingScreen: (percent: any, message: any) => {
        console.log('LOADING_SCREEN', percent, message);
      },
      headless: true, // Headless chrome
      devtools: false, // Open devtools by default
      useChrome: false, // If false will use Chromium instance
      debug: false, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserWS: '', // If u want to use browserWSEndpoint
      browserArgs: [
        '--log-level=3',
        '--no-default-browser-check',
        '--disable-site-isolation-trials',
        '--no-experiments',
        '--ignore-gpu-blacklist',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-spki-list',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-default-apps',
        '--enable-features=NetworkService',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-webgl',
        '--disable-threaded-animation',
        '--disable-threaded-scrolling',
        '--disable-in-process-stack-traces',
        '--disable-histogram-customizer',
        '--disable-gl-extensions',
        '--disable-composited-antialiasing',
        '--disable-canvas-aa',
        '--disable-3d-apis',
        '--disable-accelerated-2d-canvas',
        '--disable-accelerated-jpeg-decoding',
        '--disable-accelerated-mjpeg-decode',
        '--disable-app-list-dismiss-on-blur',
        '--disable-accelerated-video-decode',
      ],
      puppeteerOptions: {
        headless: 'false',
        userDataDir: `./datadir/${_session}`,
        args: [
          '--disable-gpu',
          '--disable-setuid-sandbox',
          '--no-sandbox',
          '--disable-features-site-per-process',
        ],
      },
      disableSpins: true,
      disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 600000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      tokenStore: 'file', // Define how work with tokens, that can be a custom interface
      createPathFileToken: true,
      waitForLogin: true,
      folderNameToken: `./tokens/${_session}`, // folder name when saving tokens
      // BrowserSessionToken
      // To receive the client's token use the function await clinet.getSessionTokenBrowser()
      // sessionToken: {
      //   WABrowserId: '"UnXjH....."',
      //   WASecretBundle:
      //     '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
      //   WAToken1: '"0i8...."',
      //   WAToken2: '"1@lPpzwC...."',
      // },
    })
    .then((client: any) => {
      console.log('START');
      console.log(_session);
      config(client, _session);
      if (_session === 'Bora') {
        start('client');
      } else {
        start('borabot');
      }
    })
    .catch((error: any) => console.log(error));
};

export const getGroups = async () => {
  const data = await clientWP.listChats({ onlyGroups: true });

  const linkRegex = /https:\/\/chat\.whatsapp\.com\/[^\s]+/;
  // ULTRA
  // const url = `${WHATS_API_URL}/${WHATS_INSTANCE_ID}/groups?token=${WHATS_API_TOKEN}`;
  // const response = await axios.get<Item[]>(url, {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  // });
  // const { data } = response;
  const filteredData = data
    // .filter(
    //   (item: Item) => !item.name.toLowerCase().includes('boraajudar.work')
    // )
    .filter(
      (item: Item) => item.name.toLowerCase().includes('boraajudar.work-teste')
      // item.name.toLowerCase().includes('boraajudar.work')
    )
    .map(
      (item: {
        groupMetadata: { desc: string; participants: string | any[] };
        id: any;
        name: any;
      }) => {
        const linkMatch = item.groupMetadata?.desc?.match(linkRegex);
        const link = linkMatch ? linkMatch[0] : null;
        return {
          id: item.id,
          name: item.name,
          totalParticipants: item.groupMetadata.participants.length,
          link,
        };
      }
    )
    .sort((a: { name: string }, b: { name: string }) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      const getNameParts = (name: string) => {
        const num = name.match(/\d+/)?.[0];
        const text = num ? name.replace(num, '') : '';
        return [num, text];
      };

      const [aNum, aText] = getNameParts(a.name);
      const [bNum, bText] = getNameParts(b.name);
      if (aNum && bNum && aText && bText) {
        if (aNum > bNum) return 1;
        if (aNum < bNum) return -1;

        if (aText > bText) return 1;
        if (aText < bText) return -1;
      }

      return 0;
    });

  return filteredData;
};

export const sendMessageWithTemplate = async ({
  message,
  to,
  payload,
  payloadVar,
  type,
}: SendMessageArgs) => {
  try {
    let messageFinal = '';
    let toFinal = '';
    if (
      (typeof message === 'string' && message in whatsTemplates) ||
      typeof message !== 'string'
    ) {
      const messagePre = whatsTemplates[message as WhatsType];
      messageFinal = messagePre.message;
    } else {
      messageFinal = message;
    }
    if (payload && payloadVar) {
      for (let i = 0; i < payload.length; i += 1) {
        messageFinal = messageFinal.replace(payloadVar[i], payload[i]);
      }
    }
    if (!to.startsWith('+')) {
      toFinal = `+${to}`;
    } else {
      toFinal = to;
    }

    send({ to: toFinal, message: messageFinal, type });
  } catch (e) {
    return e;
  }
};
