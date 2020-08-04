import {Document} from 'mongoose';
import {Status} from './DefaultStatus';
import {User} from './User';

export interface Faq extends Document {
  question: string;
  answer: string;
  status: Status;
  user: User['_id'];
}

export interface FaqUpdateDTO {
  question?: Faq['question'];
  answer?: Faq['answer'];
  status?: Faq['status'];
}
