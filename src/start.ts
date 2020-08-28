import express from 'express';
import {Server as HttpServer} from 'http';
import 'reflect-metadata';
import loaders from './loaders';
import logger from './loaders/logger';

export interface Server extends Omit<HttpServer, 'close'> {
  close: () => Promise<unknown>;
}

async function startServer({port = process.env.PORT} = {}): Promise<Server> {
  const app = express();

  await loaders({app});

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${port}`);
      // this block of code turns `server.close` into a promise API
      const originalClose = server.close.bind(server);
      const customServer = (server as unknown) as Server;
      customServer.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      // this ensures that we properly close the server when the program exists
      setupCloseOnExit(customServer);
      // resolve the whole promise with the express server
      resolve(customServer);
    });
  });
}
export {startServer};

// ensures we close the server in the event of an error.
function setupCloseOnExit(server: Server) {
  // thank you stack overflow
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options: {exit?: boolean} = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed');
      })
      .catch((e: Error) => {
        logger.warn('Something went wrong closing the server', e.stack);
      });
    // eslint-disable-next-line no-process-exit
    if (options.exit) process.exit();
  }
  // do something when app is closing
  process.on('exit', exitHandler);
  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit: true}));
  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, {exit: true}));
  process.on('SIGUSR2', exitHandler.bind(null, {exit: true}));
  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit: true}));
}
