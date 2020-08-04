import {Router} from 'express';
import {create, get, getById, remove, update} from '../../controllers/user';
import {createUserSchema, updateUserSchema} from '../schemas/user';

function routes(): Router {
  const router = Router();

  router.get('/', get);
  router.get('/:id', getById);
  router.post('/', createUserSchema(), create);
  router.post('/:id', updateUserSchema(), update);
  router.delete('/:id', remove);

  return router;
}

export default routes;
