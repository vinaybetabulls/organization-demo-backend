import { Document } from 'mongoose';

export interface OrganizationInterace extends Document {
  orgName: string;
  readonly orgLocation: string;
  readonly orgCEO: string;
  organizationId: string;
  imageURL: string;
  createdBy: {
    userId: { type: string },
    email: { type: string }
  }
}