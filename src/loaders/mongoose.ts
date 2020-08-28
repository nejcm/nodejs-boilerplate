import {Db} from 'mongodb';
import mongoose from 'mongoose';
import config from '../config';

export default async (): Promise<Db> => {
  const {url, host, port, db, user, pass} = config.mongodb;
  let connectionString = url;
  if (!connectionString) {
    connectionString = `mongodb://${host}:${port}/${db}`;
  }
  const connection = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user,
    pass,
  });
  return connection.connection.db;
};
