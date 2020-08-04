import {NextFunction, Request, Response} from 'express';
import {Container} from 'typedi';
import {Logger} from 'winston';
import {response} from '../api/response';
import {UserInputDTO, UserUpdateDTO} from '../interfaces/User';
import userModel from '../models/user';
import AuthService from '../services/auth';

export async function get(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const users = await userModel.find();
    return res.status(200).json(response({data: users}));
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
    const user = await userModel.findById(id);
    return res.status(200).json(response({data: user}));
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
    const authService = Container.get(AuthService);
    const {user} = await authService.register(req.body as UserInputDTO);
    return res.status(201).json(response({data: user}));
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
    const user = await userModel.findOneAndUpdate(
      {_id: id},
      req.body as UserUpdateDTO,
      {new: true},
    );
    return res.status(200).json(response({data: user}));
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
    await userModel.remove({_id: id});
    return res.status(200).json(response({message: 'User deleted.'}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}
