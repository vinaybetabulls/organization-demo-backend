import * as mongoose from 'mongoose';

export const DesignationSchema = new mongoose.Schema({
    designationName : {type: String},
    designationId: {type: String},
    createdBy: {
        userId: {type: String},
        email: {type: String}
    }
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

