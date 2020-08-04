import {celebrate, Joi, Segments} from 'celebrate';
import {RequestHandler} from 'express';
import {Status} from '../../interfaces/DefaultStatus';

function createFaqSchema(): RequestHandler {
  return celebrate({
    [Segments.BODY]: Joi.object({
      question: Joi.string().trim().required(),
      answer: Joi.string().trim().required(),
      user: Joi.string().required(),
      status: Joi.number()
        .integer()
        .valid(...Object.values(Status))
        .optional(),
    }),
  });
}

function updateFaqSchema(): RequestHandler {
  return celebrate({
    [Segments.BODY]: Joi.object({
      question: Joi.string().trim().optional(),
      answer: Joi.string().trim().optional(),
      status: Joi.number()
        .integer()
        .valid(...Object.values(Status))
        .optional(),
    }),
  });
}

export {updateFaqSchema, createFaqSchema};
