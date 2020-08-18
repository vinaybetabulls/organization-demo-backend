import { Document } from 'mongoose';

export interface DesignationInterace extends Document {
  readonly designationName: string;
  designationId: string;
  createdBy: {
      userId: string,
      email: string
  }
}