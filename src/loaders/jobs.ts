import Queue from 'bull';
import config from '../config';
import {emailSequenceJob} from '../jobs/emails';

export default async (): Promise<void> => {
  // redis is required for bull
  const {enabled} = config.redis;
  if (!enabled) return Promise.resolve();

  const emailSequenceQueue = new Queue('Email queue');
  emailSequenceQueue.process(emailSequenceJob);

  return Promise.resolve();
};
