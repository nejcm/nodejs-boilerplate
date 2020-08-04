import mongoose, {Schema} from 'mongoose';
import {Status} from '../interfaces/DefaultStatus';
import {Faq} from '../interfaces/Faq';

const FaqSchema = new Schema(
  {
    question: {
      type: String,
      maxlength: 180,
      required: [true, 'Please enter a question'],
      index: true,
    },

    answer: {
      type: String,
      required: [true, 'Please enter an answer'],
      index: true,
    },

    status: {
      type: Number,
      enum: Object.values(Status),
      default: Status.disabled,
    },

    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  },
  {timestamps: true},
);

export default mongoose.model<Faq>('Faq', FaqSchema);
