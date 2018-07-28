import { Schema } from 'mongoose';

export const newsSchema = new Schema({
    _id: Number,
    date: Number,
    message: String
});
