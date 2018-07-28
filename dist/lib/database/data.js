"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
exports.addNews = ({ message, id }) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return model_1.news.findOneAndUpdate({ _id: id }, { message, date: Date.now() }, options)
        .then(res => res._id)
        .catch(err => { throw err; });
};
exports.retrieveNews = ({ id }) => {
    return model_1.news.findOne({ _id: id }, 'message')
        .then((retrieved) => {
        if (null !== retrieved) {
            return retrieved.message;
        }
        throw new Error(`Something went wrong fetching this spoiler: ${id}`);
    })
        .catch(err => { throw err; });
};
exports.deleteOneWeekOlder = () => {
    const oneWeek = 604800000;
    const thisWeek = Date.now() - oneWeek;
    return model_1.news.deleteMany({ date: { $lte: thisWeek } })
        .then(removed => removed.length)
        .catch(err => { throw err; });
};
