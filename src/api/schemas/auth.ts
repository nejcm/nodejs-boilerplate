import {celebrate, Joi, Segments} from 'celebrate';
import {RequestHandler} from 'express';

function registerSchema(): RequestHandler {
  return celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  });
}

function loginSchema(): RequestHandler {
  return celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  });
}

export {registerSchema, loginSchema};
