import { Document } from 'mongoose';
import { NewsInterface } from './index';
import { news } from './model';

interface IAddNews {
    readonly message: string;
    readonly id: number
};

interface IRetrieveNews {
    readonly id: number
};

/**
 *
 */
export const addNews = async ({ message, id }: IAddNews) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    return news.findOneAndUpdate({ _id: id }, { message, date: Date.now() }, options)
        .then((value: Document): number => <number> value._id)
        .catch((err: Error): Error => { throw err; });
};

/**
 *
 */
export const retrieveNews = async ({ id }: IRetrieveNews) => {
    return news.findOne({ _id: id }, 'message')
        .then((retrieved: NewsInterface) => {
            if (null !== retrieved && undefined !== retrieved) {
                return retrieved.message;
            }

            throw new Error(`Something went wrong fetching this spoiler: ${id}`);
        })
        .catch(err => { throw err; });
};

/**
 *
 */
export const deleteOneWeekOlder = async () => {
    const oneWeek = 604800000;
    const thisWeek = Date.now() - oneWeek;

    return news.deleteMany({ date: { $lte: thisWeek } })
        .then(removed => removed.n)
        .catch(err => { throw err; });
};

/**
 *
 */
export const numberSpoilers = async () => {
    return news.find({})
        .then(res => res.length)
        .catch(err => { throw err; });
};
