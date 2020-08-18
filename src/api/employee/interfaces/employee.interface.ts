import { Document } from 'mongoose';

export interface EmployeeInterace extends Document {
    employeeId: string;
    readonly employeeFirstName: string;
    readonly employeeLastName: string;
    readonly employeeEmail: string;
    readonly employeeLocation: string;
    readonly phoneNumber: string;
    readonly company: {
        readonly companyName: string,
        readonly companyId: string
    };
    readonly department: {
        readonly departmentName: string,
        readonly departmentId: string
    };
    readonly designation: {
        readonly designationName: string,
        readonly designationId: string
    };
    createdBy: {
        userId: string,
        email: string
    };
}