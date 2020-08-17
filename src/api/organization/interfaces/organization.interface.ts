import { Document } from 'mongoose';

export interface OrganizationInterace extends Document {
  readonly orgName: string;
  readonly orgLocation: string;
  readonly orgCEO: string;
  organizationId: string;
  createdBy: {
    userId: { type: string },
    email: { type: string }
  }
}