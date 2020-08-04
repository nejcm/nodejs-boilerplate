import {celebrate, Joi, Segments} from 'celebrate';
import {RequestHandler} from 'express';
import {Gender, Role} from '../../interfaces/User';

function createUserSchema(): RequestHandler {
  return celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.number()
        .integer()
        .valid(...Object.values(Role))
        .default(Role.user),
      gender: Joi.number()
        .integer()
        .valid(...Object.values(Gender))
        .optional(),
      address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        postCode: Joi.string(),
      }).optional(),
    }),
  });
}

function updateUserSchema(): RequestHandler {
  return celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      role: Joi.number()
        .integer()
        .valid(...Object.values(Role))
        .default(Role.user),
      gender: Joi.number()
        .integer()
        .valid(...Object.values(Gender))
        .optional(),
      address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        postCode: Joi.string(),
      }).optional(),
    }),
  });
}

export {updateUserSchema, createUserSchema};
