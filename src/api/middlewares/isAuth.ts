import {Request} from 'express';
import jwt from 'express-jwt';
import config from '../../config';

const getTokenFromHeader = (req: Request) => {
  if (!req.headers.authorization) return null;
  const split = req.headers.authorization.split(' ');
  if (split[0] === 'Token' || split[0] === 'Bearer') {
    return split[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwtSecret || '',
  userProperty: 'token',
  getToken: getTokenFromHeader,
  algorithms: ['HS256'],
});

export default isAuth;
