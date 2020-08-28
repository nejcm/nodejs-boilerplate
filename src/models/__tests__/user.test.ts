import mongoose from 'mongoose';
import { User as IUser } from '../../interfaces/User';
import User from '../user';

describe('User model', () => {
  beforeAll(async () => {
    if (!process.env.MONGODB_URI)
      throw new Error('Missing mongo db connection string!');

    await mongoose.connect(process.env.MONGODB_URI || '', {
      useNewUrlParser: true,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should throw validation errors', () => {
    const user = new User();

    expect(user.validate).toThrow();
  });

  it('should save a user', () => {
    expect.assertions(3);

    const user: IUser = new User({
      firstName: 'Test first name',
      lastName: 'Test last name',
      email: 'test@test.com',
    });
    const spy = jest.spyOn(user, 'save');

    // should await so the teardown doesn't throw an exception
    user.save();

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
    });

    expect(user.email).toBe('test@test.com');
  });
});
