import { Document } from 'mongoose';

export interface NewsInterface extends Document {
    _id: number;
    date: number;
    message: string;
}
