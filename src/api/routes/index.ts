import {Router} from 'express';
import {isAuth} from '../middlewares';
import authRoutes from './auth';
import faqRoutes from './faq';
import userRoutes from './user';

function getRoutes(): Router {
  // create router
  const router = Router();

  router.use('/auth', authRoutes());

  router.use('/user', isAuth, userRoutes());

  router.use('/faq', faqRoutes());

  // additional routes go here

  return router;
}
export {getRoutes};
