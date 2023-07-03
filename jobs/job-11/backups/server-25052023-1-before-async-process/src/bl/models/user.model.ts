import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: String;
  lastName: String;
  address: String;
  houseNumber: Number;
  city: String;
  email: String;
  phone: String;
  dateOfBirth: Date;
  isNewsLetter: Boolean;
}

const UserSchema: Schema<User> = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    isNewsLetter: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>('User', UserSchema);
