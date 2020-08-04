import {Express} from 'express';
import dependencyInjectorLoader from './dependencyInjector';
import './events';
import expressLoader from './express';
import jobsLoader from './jobs';
import mongooseLoader from './mongoose';
import redisLoader from './redis';

export default async ({app}: {app: Express}): Promise<Express> => {
  // init monogdb
  const db = await mongooseLoader();

  // init redis cache
  const redis = await redisLoader();

  // init dependency injector
  // key value pairs where key is dependency name and value is the instance/value
  dependencyInjectorLoader({db, redis});

  // init jobs
  await jobsLoader();

  // init express
  await expressLoader({app});

  // put other loaders here
  // ...

  return app;
};
