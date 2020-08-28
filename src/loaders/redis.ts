import Redis from 'ioredis';
import config from '../config';
import logger from './logger';

export default (): Promise<Redis.Redis | null> => {
  const {
    enabled = false,
    port = 6379,
    host = '127.0.0.1',
    password,
  } = config.redis;
  if (!enabled) return Promise.resolve(null);

  const client = new Redis({port: +port, host, password});
  client.on('connect', () => {
    logger.info('Redis client connected');
  });
  client.on('error', (err) => {
    logger.error(`Redis connection error: ${err}`);
  });

  return Promise.resolve(client);
};
