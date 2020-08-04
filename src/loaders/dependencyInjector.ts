import axios from 'axios';
import {Container} from 'typedi';
import logger from './logger';
import mailer from './mailer';

const dependencyInjector = (dependencies?: {
  [key: string]: unknown;
}): boolean => {
  try {
    // load dependencies
    if (dependencies) {
      Object.keys(dependencies).forEach((key) => {
        if (dependencies[key]) Container.set(key, dependencies[key]);
      });
    }

    Container.set('logger', logger);
    Container.set('axios', axios);
    Container.set('mailer', mailer());

    // put other services here
    // ...

    return true;
  } catch (e) {
    logger.error('Error on dependency injector loader: %o', e);
    throw e;
  }
};

export default dependencyInjector;
