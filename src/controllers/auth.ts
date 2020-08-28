import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { response } from '../api/response';
import { UserInputDTO } from '../interfaces/User';
import AuthService from '../services/auth';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const authService = Container.get(AuthService);
    const {user, token} = await authService.register(req.body as UserInputDTO);
    return res.status(201).json(response({data: {user, token}}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const logger = Container.get<Logger>('logger');
  try {
    const {email, password} = req.body;
    const authService = Container.get(AuthService);
    const {user, token} = await authService.login(email, password);
    return res.status(200).json(response({data: {user, token}}));
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export function logout(
  _req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  const logger = Container.get<Logger>('logger');
  try {
    // TODO: authService.Logout(req.user)
    return res
      .status(200)
      .json(response({message: 'Successfully logged out.'}));
  } catch (e) {
    logger.error('🔥 error %o', e);
    return next(e);
  }
}
