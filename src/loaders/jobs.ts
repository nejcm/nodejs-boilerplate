// TODO: optimize redis dep
import Queue from 'bull';
import config from '../config';
import {emailSequenceJob} from '../jobs/emails';

export default (): Promise<void> => {
  // redis is required for bull
  const {enabled, port = 6379, host = '127.0.0.1', password} = config.redis;
  if (!enabled) return Promise.resolve();

  const emailSequenceQueue = new Queue('Email queue', {
    redis: {port: +port, host, password},
  });
  emailSequenceQueue.process(emailSequenceJob);

  return Promise.resolve();
};
