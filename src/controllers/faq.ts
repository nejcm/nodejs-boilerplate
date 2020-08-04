import {NextFunction, Request, Response} from 'express';
import {Container} from 'typedi';
import {Logger} from 'winston';
import {response} from '../api/response';
import {Faq, FaqUpdateDTO} from '../interfaces/Faq';
import faqModel from '../models/faq';

export async function get(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const faqs = await faqModel.find();
    return res.status(200).json(response({data: faqs}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const {id} = req.params;
    const faq = await faqModel.findById(id);
    return res.status(200).json(response({data: faq}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const newFaq = await faqModel.create({
      ...(req.body as Faq),
    });
    return res.status(201).json(response({data: newFaq}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const {id} = req.params;
    const faq = await faqModel.findOneAndUpdate(
      {_id: id},
      req.body as FaqUpdateDTO,
      {new: true},
    );
    return res.status(200).json(response({data: faq}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const {id} = req.params;
    await faqModel.remove({_id: id});
    return res.status(200).json(response({message: 'Faq deleted.'}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}
