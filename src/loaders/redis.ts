import redis, {RedisClient} from 'redis';
import config from '../config';
import logger from './logger';

export default async (): Promise<RedisClient | null> => {
  const {enabled = false, port = '6379', host = '127.0.0.1'} = config.redis;
  if (!enabled) return Promise.resolve(null);

  const client = redis.createClient(parseInt(port, 10), host);
  client.on('connect', () => {
    logger.info('Redis client connected');
  });
  client.on('error', (err) => {
    logger.error('Redis connection error: ' + err);
  });

  return client;
};
