import { SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer';
import { Inject, Service } from 'typedi';
import config from '../config';
import { User } from '../interfaces/User';

export interface Response {
  success: boolean;
  status: number;
  message?: string;
  errors?: unknown;
  [key: string]: unknown;
}

@Service()
export default class EmailService {
  constructor(@Inject('mailer') private mailer: Transporter | undefined) {}

  public SendWelcomeEmail(user: Partial<User>): Promise<Response> {
    if (!user.email) {
      throw new Error('No email provided');
    }

    const data = {
      from: config.mail.from,
      replyTo: config.mail.from,
      to: user.email,
      subject: 'Hello',
      text: 'Welcome new user. Nice to see you here.',
      html: '<h1>Welcome new user. Nice to see you here.</h1>',
    };

    return this.Send(data);
  }

  public StartEmailSequence(
    _sequence: string,
    user: Partial<User>,
  ): Promise<Response> {
    if (!user.email) {
      throw new Error('No email provided');
    }
    
    return Promise.resolve({success: true, status: 200});
  }

  protected async Send(data: SendMailOptions): Promise<Response> {
    if (!this.mailer) {
      return {
        success: false,
        status: 500,
        message: 'Mailer service is undefined.',
      };
    }
    const response: SentMessageInfo = await this.mailer.sendMail(data);
    return {success: true, status: 200, ...response};
  }
}
