import { model } from 'mongoose';
import { newsSchema } from './schema';

export const news = model('news', newsSchema);
