import {Request, Response, Router} from 'express';
import config from '../../config';
import {isAuth} from '../middlewares';
import authRoutes from './auth';
import faqRoutes from './faq';
import userRoutes from './user';

function getRoutes(): Router {
  // create router
  const router = Router();

  // base route
  router.get(
    '/',
    (_req: Request, res: Response): Response => {
      return res.status(200).json('Hello!');
    },
  );

  // api scope
  router.use(config.api.prefix + config.api.version, () => {
    const apiRouter = Router();

    apiRouter.use('/auth', authRoutes());

    apiRouter.use('/user', isAuth, userRoutes());

    apiRouter.use('/faq', faqRoutes());

    // additional api routes go here

    return apiRouter;
  });
  return router;
}
export {getRoutes};
