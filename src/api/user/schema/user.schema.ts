import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName : {type: String, default: ''},
    lastName: {type: String, default: ''},
    email: {type: String},
    password: {type: String},
    phoneNumber: {type: Number},
    userId: {type: String},
    imageURL: {type: String, default: ''}
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

