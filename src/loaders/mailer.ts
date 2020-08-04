import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import config from '../config';

export default async (): Promise<Mail | undefined> => {
  const {host, port = '', user = '', pass = '', secure} = config.mail;
  if (!host) return undefined;

  // nodemailer
  // examples: https://github.com/accimeesterlin/nodemailer-examples
  const transport = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure,
    auth: {
      user,
      pass,
    },
  });
  return transport;
};
