import * as mongoose from 'mongoose';

export const DesignationSchema = new mongoose.Schema({
    designationtName : {type: String},
    designationtId: {type: String},
    createdBy: {
        userId: {type: String},
        email: {type: String}
    }
},{timestamps:{createdAt:'createdOn',updatedAt:'updatedOn'}})

