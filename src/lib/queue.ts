import * as Whats from './whats';
// const amqp = require('amqplib/callback_api');
const amqp = require('amqplib');
// import amqp from 'amqplib';

export async function sendMessageToQueue(
  queueName: any,
  messageToSend: string
) {
  Whats.sendProcess(messageToSend);
  // 'amqp://user:password@localhost',
  const rabbitmqUrl = `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBIT_HOST}`;

  console.log(rabbitmqUrl);
  // `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBIT_HOST}:${process.env.RABBITMQ_PORT}`,
  // amqp.connect(rabbitmqUrl).then(conn => {
  //   console.log('CONECTOU');
  // });

  // const connection = await amqp.connect(rabbitmqUrl);
  // console.log('rabbitmqUrl');
  // const connection = await amqp
  //   .connect(rabbitmqUrl)
  //   .then((conn: any) => {
  //     console.log('Conectado!');
  //     console.log(`Conectado: ${conn}`);
  //   })
  //   .catch((err: any) => {
  //     console.error('Conexão falhou', err);
  //   });
  // console.log(connection);
  // console.log('connection');
  // console.log('CONECTOU????');

  amqp.connect(
    rabbitmqUrl,
    (
      error: { message: any },
      connection: {
        createChannel: (arg0: (error: any, channel: any) => void) => void;
        close: () => void;
      }
    ) => {
      if (error) {
        console.error(`Failed to connect to RabbitMQ: ${error.message}`);
        // process.exit(1);
      }

      connection.createChannel(
        (
          error: { message: any },
          channel: {
            assertQueue: (arg0: any, arg1: { durable: boolean }) => void;
            sendToQueue: (arg0: any, arg1: Buffer) => void;
            consume: (
              arg0: any,
              arg1: (msg: any) => void,
              arg2: { noAck: boolean }
            ) => void;
          }
        ) => {
          if (error) {
            console.error(`Failed to create a channel: ${error.message}`);
            // process.exit(1);
          }

          channel.assertQueue(queueName, { durable: true });
          channel.sendToQueue(queueName, Buffer.from(messageToSend));

          channel.consume(
            queueName,
            (msg: { content: { toString: () => any } }) => {
              const receivedMessage = msg.content.toString();
              Whats.sendProcess(receivedMessage);
            },
            {
              noAck: true,
            }
          );
          // Feche a conexão após um curto período
          setTimeout(() => {
            connection.close();
          }, 5000);
        }
      );
    }
  );
}
