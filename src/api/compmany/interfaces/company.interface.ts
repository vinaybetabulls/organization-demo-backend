import { Document } from 'mongoose';

export interface CompanyInterace extends Document {
  readonly companyName: string;
  readonly companyLocation: string;
  companyId: string;
  createdBy: {
      userId: string,
      email: string
  }
}