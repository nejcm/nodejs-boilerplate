// TODO: split this file into separate configs (db, cache, log, auth, mail,...)

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
  port: +(process.env.PORT || '3001'),

  jwtSecret: process.env.JWT_SECRET || '',

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  mongodb: {
    url: process.env.MONGODB_URI,
    port: process.env.MONGO_PORT,
    host: process.env.MONGO_HOST,
    db: process.env.MONGO_INITDB_DATABASE,
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
  },

  redis: {
    enabled: process.env.REDIS?.toLowerCase() === 'true',
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
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
