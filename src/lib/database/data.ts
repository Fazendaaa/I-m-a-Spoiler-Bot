import { Document } from 'mongoose';
import { news } from './model';

export interface NewsInterface extends Document {
    _id: number;
    date: number;
    message: string;
}

interface IAddNews {
    readonly message: string;
    readonly id: number
};

interface IRetrieveNews {
    readonly id: number
};

/**
 * Handles the insertion of a new spoiler.
 *
 * @param id - The query id to be used as the database id
 * @param message - The spoiler message to be hidden
 *
 * @returns The NEWS's id
 */
export const addNews = async ({ message, id }: IAddNews): Promise<number | Error> => news
    .findOneAndUpdate({
        _id: id
    }, {
        message,
        date: Date.now()
    }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
    })
    .then((value: Document): number => <number> value._id)
    .catch((err: Error): Error => { throw err; });

/**
 * Retrieves the message saved int [[addNews]].
 *
 * @param id - The spoiler message to be retrieved
 *
 * @returns The saved message
 */
export const retrieveNews = async ({ id }: IRetrieveNews): Promise<string | Error> => news
    .findOne({
        _id: id
    }, 'message')
    .then((retrieved: NewsInterface) => {
        if (null !== retrieved && undefined !== retrieved) {
            return retrieved.message;
        }

        throw new Error(`Something went wrong fetching this spoiler: ${id}`);
    })
    .catch(err => { throw err; });

/**
 * After one week, all of the spoilers stored must be removed; this is to reduce the storage cost.
 *
 * @returns The number of deleted messages
 */
export const deleteOneWeekOlder = async (): Promise<number | Error> => {
    const oneWeek = 604800000;
    const thisWeek = Date.now() - oneWeek;

    return news.deleteMany({
        date: {
            $lte: thisWeek
        }
    })
    .then(removed => removed.n)
    .catch(err => { throw err; });
};

/**
 * Due to the [[deleteOneWeekOlder]] function, the only spoiler numbers that are the ones sent in the span of a week.
 *
 * @returns How many spoilers are stored
 */
export const numberSpoilers = async (): Promise<number | Error> => news.find({})
    .then(res => res.length)
    .catch(err => { throw err; });
