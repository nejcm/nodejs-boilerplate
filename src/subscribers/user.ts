import {EventSubscriber, On} from 'event-dispatch';
import {Model} from 'mongoose';
import {Container, Inject} from 'typedi';
import {Logger} from 'winston';
import {User} from '../interfaces/User';
import MailerService from '../services/mailer';
import events from './events';

@EventSubscriber()
export default class UserSubscriber {
  constructor(
    private mailer: MailerService,
    @Inject('logger') private logger: Logger,
  ) {}

  @On(events.user.login)
  public onUserLogin({_id}: Partial<User>): void {
    try {
      const UserModel = Container.get('UserModel') as Model<User>;

      UserModel.update({_id}, {$set: {lastLogin: new Date()}});
    } catch (e) {
      this.logger.error(`🔥 Error on event ${events.user.login}: %o`, e);
      // throw error
      throw e;
    }
  }
  @On(events.user.register)
  public async onUserRegister(user: Partial<User>): Promise<void> {
    try {
      // send welcome email to new user
      await this.mailer.SendWelcomeEmail(user);
    } catch (e) {
      this.logger.error(`🔥 Error on event ${events.user.register}: %o`, e);
      // throw error
      throw e;
    }
  }
}
