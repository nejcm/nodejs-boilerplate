import dotenv from 'dotenv';
import {isTrue} from '../helpers/boolean';

// set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// config() will read your .env file,
// parse the contents and assign it to process.env.
const envFound = dotenv.config();
if (!envFound) {
  // env file is required
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3001', 10),

  jwtSecret: process.env.JWT_SECRET || '',

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  database: {
    mongodb: {
      url: process.env.MONGODB_URI,
    },
  },

  redis: {
    enabled: process.env.REDIS?.toLowerCase() === 'true',
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },

  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY || '', 10),
  },

  api: {
    prefix: '/api',
    version: '/v1',
  },

  mail: {
    from: process.env.MAIL_FROM,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: isTrue(process.env.MAIL_SECURE),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    sender: process.env.MAILCHIMP_SENDER,
  },
};
