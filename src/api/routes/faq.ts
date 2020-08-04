import {Router} from 'express';
import {create, get, getById, remove, update} from '../../controllers/faq';
import {createFaqSchema, updateFaqSchema} from '../schemas/faq';

function routes(): Router {
  const router = Router();

  router.get('/', get);
  router.get('/:id', getById);
  router.post('/', createFaqSchema(), create);
  router.post('/:id', updateFaqSchema(), update);
  router.delete('/:id', remove);

  return router;
}

export default routes;
