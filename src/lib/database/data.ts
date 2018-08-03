import { NewsInterface } from './index';
import { news } from './model';

export const addNews = ({ message, id }: { message: string; id: number }): Promise<number | Error> => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    return news.findOneAndUpdate({ _id: id }, { message, date: Date.now() }, options)
        .then(res => res._id)
        .catch(err => { throw err; });
};

export const retrieveNews = ({ id }: { id: number }): Promise<string | Error> => {
    return news.findOne({ _id: id }, 'message')
        .then((retrieved: NewsInterface) => {
            if (null !== retrieved && undefined !== retrieved) {
                return retrieved.message;
            }

            throw new Error(`Something went wrong fetching this spoiler: ${id}`);
        })
        .catch(err => { throw err; });
};

export const deleteOneWeekOlder = (): Promise<number | Error> => {
    const oneWeek = 604800000;
    const thisWeek = Date.now() - oneWeek;

    return news.deleteMany({ date: { $lte: thisWeek } })
        .then(removed => removed.length)
        .catch(err => { throw err; });
};

export const numberSpoilers = (): Promise<number | Error> => {
    return news.find({})
        .then(res => res.length)
        .catch(err => { throw err; });
};
