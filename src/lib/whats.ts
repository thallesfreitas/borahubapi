/* eslint-disable consistent-return */
/* eslint-disable security/detect-object-injection */
/* eslint-disable global-require */
/* eslint-disable new-cap */
// eslint-disable-next-line import/no-cycle
// import * as SentToGroupsService from '../modules/senttogroups/senttogroups.service';
import * as AiService from '../modules/ai/ai.service';
import * as ApprovalSystem from '../modules/approvalSystem/approvalSystem.service';
import { checkAction } from '../modules/whats/webhook.service';
import { WhatsType, whatsTemplates } from '../utils/texts/whats';
import { sendWhatsConection } from './email';
import * as Queue from './queue';
import { uploadQr } from './storage';

const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

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
  sendImage: (
    to: string,
    content: string,
    name: string,
    options?: any
  ) => Promise<any>;
  sendFileFromBase64: (
    to: string,
    content: string,
    name: string,
    options?: any
  ) => Promise<any>;
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
  typeWhats?: string;
  image?: string;
}

let clientWP: WP;
// let borabot: WP;

function setClient(type: string) {
  if (type === 'client') {
    return clientWP;
  }
  // return borabot;
  return clientWP;
}

function config(client: WP, type = 'Bora') {
  if (type === 'Bora') {
    clientWP = client;
  } else {
    // borabot = client;
    clientWP = client;
  }
}
async function start(type = 'client') {
  const client: WP = setClient(type);

  client.onMessage(async (message: { [x: string]: string }) => {
    // console.log('client.onMessage');
    // console.log(message);
    const to = message.from;
    const idClient = message.to === '5511934984506@c.us' ? 'borabot' : 'client';
    if (to.includes('@c.us')) {
      if (message) {
        let textMessage = '';
        if (message.type === 'chat') {
          textMessage = message.body.toLowerCase();
        } else {
          textMessage = message.caption.startsWith('/imagem ')
            ? message.caption.toLowerCase()
            : `/imagem ${message.caption.toLowerCase()}`;
        }

        const imageHihg =
          message.type === 'image'
            ? await client.downloadMedia(message.id)
            : '';

        checkAction({
          to,
          message: textMessage,
          idClient,
          image: imageHihg.split(',')[1],
          typeWhats: message.type,
        });
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
  // TIMER 1 min POR ENVIO
  let groupId = 0;
  const interval: NodeJS.Timeout = setInterval(async () => {
    console.log(`SEND JOB TO GROUP: ${groupId} ${groupsWhats[groupId].name}`);
    // const groupPhone = groupsWhatsTeste[groupId].idWhats;
    const groupPhone = groupsWhats[groupId].idWhats;
    let phone = groupPhone.toString().replace('+', '');
    if (!phone.includes('@')) phone = `${phone}@g.us`;
    // clientWP.startTyping(phone);
    const messageFinal = `client#T#T${phone}&&&@@@${message}&&&@@@${approvalSystemId}#########${groupId}`;
    // await Queue.sendMessageToQueue('queueSendWhats', messageFinal);
    await Queue.sendMessageToQueue('queueSendWhats', messageFinal);
    // await sendProcess(messageFinal);

    // if (groupId === groupsWhatsTeste.length - 1) {
    if (groupId === groupsWhats.length - 1) {
      clearInterval(interval);
    }
    groupId += 1;
  }, 5000);

  // for (let groupId = 0; groupId < groupsWhats.length; groupId += 1) {
  //   const groupPhone = groupsWhats[groupId].idWhats;
  //   let phone = groupPhone.toString().replace('+', '');
  //   if (!phone.includes('@')) phone = `${phone}@g.us`;
  //   clientWP.startTyping(phone);
  //   const messageFinal = `client#T#T${phone}&&&@@@${message}&&&@@@${approvalSystemId}#########${groupId}`;
  //   Queue.sendMessageToQueue('queueSendWhats', messageFinal);
  // }

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

export async function sendImagemToWhats({
  to,
  message,
  type,
  typeWhats,
  image,
}: SendText) {
  const client: WP = setClient(type);
  let phone = to.toString().replace('+', '');
  if (!phone.includes('@')) phone = `${phone}@c.us`;

  // if (typeWhats === 'image') {
  await sendMessageWithTemplate({
    to,
    message: 'changeImage',
    // type: 'borabot',
    type: 'client',
  });
  // }
  client.startTyping(phone);
  const response = (await AiService.createImage({
    prompt: message,
    typeWhats,
    image,
  })) as string;
  const responseFinal = response;
  const t = await client
    .sendFileFromBase64(phone, responseFinal, 'image-borabot', '')
    .then(result => {
      console.log('Result: ', result); // return object success
      client.stopTyping(phone);
    })
    .catch(async erro => {
      console.error('Error when sending: ', erro); // return object error
      await sendMessageWithTemplate({
        to,
        message: 'changeImage',
        // type: 'borabot',
        type: 'client',
      });
      client.stopTyping(phone);
    });
  client.stopTyping(phone);
  // Queue.sendMessageToQueue('queueSendWhats', messageFinal);
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
        // start('borabot');
      }
    })
    .catch((error: any) => console.log(error));
};

export const getGroups = async () => {
  const client: WP = setClient('client');
  const data = (await client.listChats({ onlyGroups: true })) as any;
  // console.log('data');
  // console.log(data);
  // console.log(data[0].id._serialized);
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
    .filter((item: Item) => {
      const nameAfterHash = item.name.split('#')[1];
      return nameAfterHash && nameAfterHash.toLowerCase() === 'boraajudar.work';
    })
    // .filter(
    //   (item: Item) => item.name.toLowerCase().includes('boraajudar.work-teste')
    //   // item.name.toLowerCase().includes('boraajudar.work')
    // )
    .map(
      (item: {
        groupMetadata: { desc: string; participants: string | any[] };
        id: any;
        name: any;
      }) => {
        const linkMatch = item.groupMetadata?.desc?.match(linkRegex);
        const link = linkMatch ? linkMatch[0] : null;
        // console.log(`item.name: ${item.name} | link: ${link}`);
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
