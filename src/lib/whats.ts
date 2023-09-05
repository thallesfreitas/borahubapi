/* eslint-disable global-require */
/* eslint-disable new-cap */
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { checkAction } from '../modules/whats/webhook.service';
import { WhatsType, whatsTemplates } from '../utils/texts/whats';

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

const groupsWhatsTeste = '5511945483326-1593553509@g.us';
const groupsWhats =
  '5511945483326-1597956259@g.us ,' +
  '5521996164999-1487957874@g.us ,' +
  '5511945483326-1594043289@g.us ,' +
  '5511945483326-1594239437@g.us ,' +
  '5511945483326-1596121854@g.us ,' +
  '5511945483326-1592758441@g.us ,' +
  '5511945483326-1595020621@g.us ,' +
  '5511945483326-1557146656@g.us ,' +
  '5511945483326-1610655401@g.us ,' +
  '5511945483326-1597086022@g.us ,' +
  '5511945483326-1615038466@g.us ,' +
  '5511945483326-1588441584@g.us ,' +
  '5511945483326-1621859631@g.us ,' +
  '5511945483326-1611927899@g.us ,' +
  '5511945483326-1580909099@g.us ,' +
  '5511945483326-1593553509@g.us ,' +
  '5511945483326-1591718176@g.us ,' +
  '120363045581553829@g.us ,' +
  '5511945483326-1596633225@g.us ,' +
  '5511945483326-1591185970@g.us ,' +
  '5511945483326-1598451853@g.us ,' +
  '120363045425946745@g.us';

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
}

interface WP {
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
}

let clientWP: WP;
let bot: WP;

function config(client: WP) {
  clientWP = client;

  console.log(clientWP);
}
function configBot(client: WP) {
  bot = client;

  console.log(bot);
}

// function start(client: {
//   onMessage: (arg0: (message: any) => void) => void;
//   sendText: (arg0: string, arg1: string) => Promise<any>;
// }) {
//   console.log('start');
//   console.log(clientWP);
//   clientWP = client;
function start() {
  console.log(
    '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
  );
  console.log('start');
  console.log(
    '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
  );
  clientWP.onMessage((message: { [x: string]: string; body: string }) => {
    console.log('onMessage');

    const to = message.from;
    console.log('to');
    console.log(to);
    // const message = message.body;
    const textMessage = message.body.toLowerCase();
    if (to.includes('@c.us')) {
      if (message) {
        checkAction({ to, message: textMessage });
      }
    }

    // if (message.body === 'Hello') {
    //   // .sendText('5511945483326-1593553509@g.us', 'teste 1233')

    //   clientWP
    //     .sendText(message.from, 'teste 4')
    //     .then((result: any) => {
    //       console.log('Result: ', result); // return object success
    //     })
    //     .catch((erro: any) => {
    //       console.error('Error when sending: ', erro); // return object error
    //     });
    // }
  });
}
function startBOT() {
  console.log('startBOT');
  bot.onMessage((message: { [x: string]: string; body: string }) => {
    console.log('onMessage');

    const to = message.from;
    console.log('to');
    console.log(to);
    // const message = message.body;
    bot.sendText('5511945483326-1593553509@g.us', 'teste 1233');
    const textMessage = message.body.toLowerCase();
    if (to.includes('@c.us')) {
      if (message) {
        checkAction({ to, message: textMessage });
      }
    }

    // if (message.body === 'Hello') {
    //   // .sendText('5511945483326-1593553509@g.us', 'teste 1233')

    //   clientWP
    //     .sendText(message.from, 'teste 4')
    //     .then((result: any) => {
    //       console.log('Result: ', result); // return object success
    //     })
    //     .catch((erro: any) => {
    //       console.error('Error when sending: ', erro); // return object error
    //     });
    // }
  });
}
async function send({ to, message }: SendText) {
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');
  console.log('+++++++++++++++++++++++++++++++++++++');

  let phone = to.toString().replace('+', '');
  if (!phone.includes('@')) phone = `${phone}@c.us`;

  clientWP.startTyping(phone);

  // clientWP
  //   .sendText(phone, message)
  // const buttons = {
  //   title: 'Title',
  //   footer: 'Footer',
  //   isDynamicReplyButtonsMsg: true,
  //   dynamicReplyButtons: [
  //     {
  //       buttonId: '1',
  //       buttonText: {
  //         displayText: 'Lorem ipsum',
  //       },
  //       type: 1,
  //     },
  //   ],
  // };
  console.log('ENVIOU ');

  clientWP
    .sendText(phone, message, {})
    .then((result: any) => {
      console.log('Result: ', result); // return object success
      clientWP.stopTyping(phone);
    })
    .catch((erro: any) => {
      console.error('Error when sending: ', erro); // return object error
      clientWP.stopTyping(phone);
    });
}
// clientWP.sendText('5511945483326@c.us', 'WPPConnect message with buttons', );
export const connectWP = async () => {
  wppconnect
    .create({
      session: 'Bora', // Pass the name of the client you want to start the bot
      catchQR: (
        base64Qrimg: any,
        asciiQR: any,
        attempts: any,
        urlCode: any
      ) => {
        console.log('Number of attempts to read the qrcode: ', attempts);
        console.log('Terminal qrcode: ', asciiQR);
        console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);
      },
      statusFind: (statusSession: any, session: any) => {
        // return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        console.log('Status Session: ', statusSession);
        // Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
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
        // Extras
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
      ], // Parameters to be added into the chrome browser instance
      // puppeteerOptions: {}, // Will be passed to puppeteer.launch
      puppeteerOptions: {
        headless: 'false',
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
      autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      tokenStore: 'file', // Define how work with tokens, that can be a custom interface
      createPathFileToken: true,
      waitForLogin: true,
      folderNameToken: './tokens/Bora', // folder name when saving tokens
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
      config(client);
      start();
    })
    .catch((error: any) => console.log(error));

  // wppconnect.create({ session: 'BOT' }).then(() => startBOT());

  // wppconnect
  //   .create({
  //     session: 'bora3',
  //     puppeteerOptions: {
  //       userDataDir: './tokens/bora3',
  //     },
  //     statusFind: (statusSession: any, session: any) => {
  //       // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
  //       console.log('Status Session: ', statusSession);
  //       // create session wss return "serverClose" case server for close
  //       console.log('Session name: ', session);
  //     },

  //     catchQR: (base64Qr: string, asciiQR: any) => {
  //       console.log(asciiQR); // Optional to log the QR in the terminal
  //       const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  //       const response = {
  //         type: '',
  //         data: Buffer.from('', 'base64') as Buffer,
  //       };

  //       if (matches?.length !== 3) {
  //         return new Error('Invalid input string');
  //       }
  //       // eslint-disable-next-line prefer-destructuring
  //       response.type = matches[1];
  //       // response.data = new Buffer.from(matches[2], 'base64') as Buffer;
  //       response.data = Buffer.from(matches[2], 'base64') as Buffer;

  //       const imageBuffer = response;
  //       require('fs').writeFile(
  //         'out.png',
  //         imageBuffer.data,
  //         'binary',
  //         function (err: null) {
  //           if (err != null) {
  //             console.log(err);
  //           }
  //         }
  //       );
  //     },
  //     logQR: false,
  //   })
  //   .then((client: any) => {
  //     console.log('client');

  //     config(client);
  //     start();
  //   })
  //   .catch((error: any) => console.log(error));
};

export const getGroups = async () => {
  const data = await clientWP.listChats({ onlyGroups: true });

  // console.log(chats);
  // return chats;
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
    .filter((item: Item) => item.name.toLowerCase().includes('boraajudar.work'))
    .map(
      (item: {
        groupMetadata: { desc: string; participants: string | any[] };
        id: any;
        name: any;
      }) => {
        const linkMatch = item.groupMetadata.desc.match(linkRegex);
        const link = linkMatch ? linkMatch[0] : null;

        return {
          id: item.id,
          name: item.name,
          totalParticipants: item.groupMetadata.participants.length,
          link,
        };
      }
    );

  return filteredData;
};

export const sendMessageToGroups = async (message: string) => {
  const dataSetting = JSON.stringify({
    token: WHATS_API_TOKEN,
    sendDelay: DELAY_MESSAGE_GROUPS,
    webhook_url: ULTRA_END_POINT,
    webhook_message_received: true,
    webhook_message_create: true,
    webhook_message_ack: '',
    webhook_message_download_media: '',
  });

  const configSetting = {
    method: 'post',
    url: `${WHATS_API_URL}/${WHATS_INSTANCE_ID}/instance/settings`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: dataSetting,
  };
  const responseSetting = await axios(configSetting);

  const url = `${WHATS_API_URL}/${WHATS_INSTANCE_ID}/messages/chat`;
  const data = JSON.stringify({
    token: WHATS_API_TOKEN,
    to: groupsWhats,
    body: message,
    referenceId: 'sentFromSite',
  });

  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  const response = await axios(config);

  return response.data;
};

export const sendMessageUltra = async ({
  message,
  to,
  payload,
  payloadVar,
}: SendMessageArgs) => {
  console.log('______________________________________________');
  console.log('clientWP');
  console.log(clientWP);
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
      console.log('payload.length');
      console.log(payload.length);
      for (let i = 0; i < payload.length; i += 1) {
        console.log('payloadVar[i], payload[i]');
        console.log(payloadVar[i], payload[i]);
        messageFinal = messageFinal.replace(payloadVar[i], payload[i]);
      }
    }
    if (!to.startsWith('+')) {
      toFinal = `+${to}`;
    } else {
      toFinal = to;
    }

    const url = `${WHATS_API_URL}/${WHATS_INSTANCE_ID}/messages/chat`;
    const data = JSON.stringify({
      token: WHATS_API_TOKEN,
      to: toFinal,
      body: messageFinal,
      referenceId: 'sentFromSite',
      sendDelay: DELAY_MESSAGE_GROUPS,
      webhook_url: ULTRA_END_POINT,
      webhook_message_received: true,
      webhook_message_create: true,
      webhook_message_ack: '',
      webhook_message_download_media: '',
    });

    const config = {
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    console.log('toFinal');
    console.log(toFinal);
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // VERIFICAR PQ NAO TA ENVINADO A RESPOSTA DPS DE LOGAA
    // clientWP
    //   // .sendText(toFinal, 'teste 5')
    //   .sendText('5511945483326-1593553509@g.us', 'teste 5')
    //   .then((result: any) => {
    //     console.log('Result: ', result); // return object success
    //   })
    //   .catch((erro: any) => {
    //     console.error('Error when sending: ', erro); // return object error
    //   });

    send({ to: toFinal, message: messageFinal });

    axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  } catch (e) {
    return e;
  }
};
export const sendMessageAPI = async ({ to, message }: SendMessageAPIArgs) => {
  try {
    const token = TOKEN_FB_TEST;

    let messageFinal = '';
    if (
      (typeof message === 'string' && message in whatsTemplates) ||
      typeof message !== 'string'
    ) {
      const messagePre = whatsTemplates[message as WhatsType];
      messageFinal = messagePre.message;
    } else {
      messageFinal = message;
    }
    console.log('VAI ENVIAR');
    const response = await axios({
      method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
      url: `https://graph.facebook.com/v12.0/${process.env.PHONE_ID_FB}/messages?access_token=${token}`,
      data: {
        messaging_product: 'whatsapp',
        to,
        text: { body: messageFinal },
      },
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('ENVIADO');
    return response.data;
  } catch (e) {
    return false;
  }
};
