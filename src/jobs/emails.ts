import {DoneCallback, Job} from 'bull';
import {Container} from 'typedi';
import {Logger} from 'winston';
import MailerService from '../services/mailer';

export const emailSequenceJob = async (
  job: Job,
  done: DoneCallback,
): Promise<void> => {
  const logger = Container.get<Logger>('logger');
  try {
    logger.debug('✌️ Email Sequence Job triggered!');
    const mailerServiceInstance = Container.get(MailerService);
    await mailerServiceInstance.SendWelcomeEmail(job.data);
    done();
  } catch (e) {
    logger.error('🔥 Error with Email Sequence Job: %o', e);
    done(e);
  }
};
