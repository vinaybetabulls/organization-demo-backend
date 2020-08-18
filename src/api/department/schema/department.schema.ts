import * as mongoose from 'mongoose';

export const DepartmentSchema = new mongoose.Schema({
    departmentName : {type: String},
    departmentId: {type: String},
    createdBy: {
        userId: {type: String},
        email: {type: String}
    }
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

