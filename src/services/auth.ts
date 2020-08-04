import argon2 from 'argon2';
import {randomBytes} from 'crypto';
import jwt from 'jsonwebtoken';
import {Inject, Service} from 'typedi';
import {Logger} from 'winston';
import config from '../config';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../decorators/eventDispatcher';
import {User, UserInputDTO} from '../interfaces/User';
import userModel from '../models/user';
import events from '../subscribers/events';

@Service()
export default class AuthService {
  constructor(
    @Inject('logger') private logger: Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async register(
    userInputDTO: UserInputDTO,
  ): Promise<{user: User; token: string}> {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, {salt});
      const newUser = await userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      const token = this.generateToken(newUser);

      if (!newUser) {
        throw new Error('User cannot be created.');
      }

      this.eventDispatcher.dispatch(events.user.register, {user: newUser});

      const user = newUser.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return {user, token};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{user: User; token: string}> {
    const foundUser = await userModel.findOne({email});
    if (!foundUser) {
      throw new Error('User does not exist.');
    }

    const validPassword = await argon2.verify(foundUser.password, password);
    if (validPassword) {
      const token = this.generateToken(foundUser);

      const user = foundUser.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return {user, token};
    } else {
      throw new Error('Invalid password!');
    }
  }

  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: user._id, // used in auth middleware
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
