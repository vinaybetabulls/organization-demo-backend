import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
    companyName : {type: String},
    companyLocation: {type: String},
    companyId: {type: String},
    createdBy: {
        userId: {type: String},
        email: {type: String}
    },
    organization: {
        orgName: {type: String},
        organizationId: {type: String}
    }
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

