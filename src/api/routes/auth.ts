import { Router } from 'express';
import { login, logout, register } from '../../controllers/auth';
import { isAuth } from '../middlewares';
import { loginSchema, registerSchema } from '../schemas/auth';

function routes(): Router {
  const router = Router();

  router.post('/register', registerSchema(), register);
  router.post('/login', loginSchema(), login);
  router.post('/logout', isAuth, logout);

  return router;
}

export default routes;
