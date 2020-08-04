import {Document} from 'mongoose';
import {Address} from './Address';

export enum Gender {
  male = 0,
  female = 1,
  other = 2,
  undisclosed = 3,
}

export enum Role {
  user = 0,
  admin = 1,
}

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  role?: Role;
  gender?: Gender;
  address?: Address;
}

export interface UserInputDTO {
  name: User['name'];
  email: User['email'];
  password: User['password'];
}

export interface UserUpdateDTO {
  name?: User['name'];
  email?: User['email'];
  role?: User['role'];
  gender?: User['gender'];
  address?: User['address'];
}
