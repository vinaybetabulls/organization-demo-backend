import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
    orgName : {type: String},
    orgLocation: {type: String},
    orgCEO: {type: String},
    orgId: {type: String},
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

