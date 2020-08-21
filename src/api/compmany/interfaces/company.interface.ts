import { Document } from 'mongoose';

export interface CompanyInterace extends Document {
  readonly companyName: string;
  readonly companyLocation: string;
  companyId: string;
  readonly organization: {
      readonly orgName: string,
      readonly orgId: string
  }
  createdBy: {
      userId: string,
      email: string
  }
}