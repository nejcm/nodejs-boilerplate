import mongoose, {Schema} from 'mongoose';
import {Gender, Role, User} from '../interfaces/User';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name.'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: Number,
      enum: Object.values(Role),
      default: Role.user,
    },

    gender: {type: Number, enum: Object.values(Gender)},

    address: {
      street: {type: String},
      city: {type: String},
      postCode: {type: String},
    },
  },
  {timestamps: true},
);

UserSchema.path('email').validate(async (value: string) => {
  return !(await mongoose.models.User.countDocuments({email: value}));
}, 'Email already exists.');

UserSchema.methods.getGender = function getGender(this: User) {
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
};

export default mongoose.model<User>('User', UserSchema);
