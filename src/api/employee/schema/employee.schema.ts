import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
    employeeFirstName : {type: String},
    employeeLastName: {type: String},
    employeeEmail: {type: String},
    employeeLocation: {type: String},
    phoneNumber: {type: String},
    employeeId: {type: String},
    company: {
        companyName: {type: String},
        companyId: {type: String}
    },    
    department: {
        departmentName: {type: String},
        departmentId: {type: String}
    },    
    designation: {
        designationName: {type: String},
        designationId: {type: String}
    },    
    createdBy: {
        userId: {type: String},
        email: {type: String}
    },
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

