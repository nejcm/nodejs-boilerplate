import bodyParser from 'body-parser';
import {errors} from 'celebrate';
import compression from 'compression';
//import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {Express, NextFunction, Request, Response} from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import morgan from 'morgan';
import path from 'path';
import {response} from '../api/response';
import {getRoutes} from '../api/routes';
import logger from './logger';
//import multer from 'multer';

interface ResponseError extends Error {
  status: number;
}

export default ({app}: {app: Express}): Express => {
  // health check endpoints
  app.get('/status', (_req, res) => res.status(200).end());
  app.head('/status', (_req, res) => res.status(200).end());

  // gzip compressing
  app.use(compression());

  // useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // it shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // adding Helmet to enhance your API's security
  app.use(helmet());
  app.disable('x-powered-by');

  // enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(methodOverride());

  // csrf protection
  // app.use(csrf({cookie: true}));

  // middleware that transforms the raw string of req.body into json
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  // cookie parser
  app.use(cookieParser());

  // HTTP request logger middleware for node.js
  app.use(morgan('combined'));

  // load API routes

  app.use(getRoutes());

  // validation errors
  app.use(errors());

  /// catch 404 and forward to error handler
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    const err = new Error('Not Found') as ResponseError;
    err.status = 404;
    next(err);
  });

  // jwt error handler
  app.use(jwtMiddleware);
  // add the generic error handler just in case errors are missed by middleware
  app.use(errorMiddleware);

  // static files paths
  app.use(express.static(path.join(__dirname, 'public')));

  // this is where other middleware goes
  // ...

  // return the express app
  return app;
};

function jwtMiddleware(
  err: ResponseError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  // handle 401 thrown by express-jwt library
  if (err.name === 'UnauthorizedError') {
    return res
      .status(err.status)
      .send(
        response({
          success: false,
          message: err.message,
        }),
      )
      .end();
  }
  return next(err);
}

// here's our generic error handler for situations where we didn't handle
// errors properly
function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(err);
  } else {
    logger.error(err);
    res.status(500).json(
      response({
        success: false,
        message: err.message,
        errors: {
          ...(process.env.NODE_ENV === 'production'
            ? null
            : {stack: err.stack}),
        },
      }),
    );
  }
}
