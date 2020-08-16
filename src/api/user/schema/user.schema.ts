import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName : {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    phoneNumber: {type: Number},
    userId: {type: String}
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

