import { Document } from 'mongoose';

export interface UserInterace extends Document {
  readonly firstName: string;
  readonly lastName: string;
  email: string;
  password: string;
  userId: string;
  imageURL: string;
}