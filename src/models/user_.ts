import {DocumentType, getModelForClass, prop} from '@typegoose/typegoose';

export enum Gender {
  male = 0,
  female = 1,
  other = 2,
  undisclosed = 3,
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
}

export class User {
  @prop({required: true, index: true})
  public name!: string;

  @prop({lowercase: true, unique: true, index: true})
  public email!: string;

  @prop({minlength: 6})
  public password!: string;

  @prop()
  public salt!: string;

  @prop({default: 'user'})
  public role?: string;

  @prop()
  public gender?: Gender;

  @prop()
  public address?: Address;

  @prop({min: 0, max: 200})
  public age?: number;

  public getGender(this: DocumentType<User>): string {
    switch (this.gender) {
      case 0:
        return 'Male';
      case 1:
        return 'Female';
      case 2:
        return 'Other';
      case 3:
        return 'Undisclosed';
      default:
        return '';
    }
  }
}

export interface UserInputDTO {
  name: User['name'];
  email: User['email'];
  password: User['password'];
}

export default getModelForClass(User, {schemaOptions: {timestamps: true}});
