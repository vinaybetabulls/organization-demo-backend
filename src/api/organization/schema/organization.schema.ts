import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
    orgName : {type: String},
    orgLocation: {type: String},
    orgCEO: {type: String},
    orgId: {type: String},
    imageURL: {type: String, default: ''},
    createdBy: {
        userId: {type:  String},
        email: {type: String}
    }
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

