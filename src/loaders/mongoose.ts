import {Db} from 'mongodb';
import mongoose from 'mongoose';
import config from '../config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(
    config.database.mongodb.url as string,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  );
  return connection.connection.db;
};
