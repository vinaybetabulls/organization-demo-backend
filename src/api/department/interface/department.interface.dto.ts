import { Document } from 'mongoose';

export interface DepartmentInterace extends Document {
  readonly departmentName: string;
  departmentId: string;
  createdBy: {
      userId: string,
      email: string
  }
}