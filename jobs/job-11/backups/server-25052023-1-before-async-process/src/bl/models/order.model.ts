import mongoose, { Schema, Document } from 'mongoose';
import STAGE from '../enums/stage.enum';

interface Order extends Document {
  _id: mongoose.Types.ObjectId;
  userId: String;
  stage: STAGE;
  previousStage: STAGE;
  status: String;
  price: Number;
  comments: String;
  toppies: String[];
}

const OrderSchema: Schema<Order> = new Schema<Order>(
  {
    userId: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      enum: STAGE,
      required: true,
    },
    previousStage: {
      type: String,
      enum: STAGE,
    },
    status: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    toppies: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Order>('Order', OrderSchema);
