"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
;
;
/**
 *
 */
exports.addNews = ({ message, id }) => __awaiter(this, void 0, void 0, function* () {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return model_1.news.findOneAndUpdate({ _id: id }, { message, date: Date.now() }, options)
        .then((value) => value._id)
        .catch((err) => { throw err; });
});
/**
 *
 */
exports.retrieveNews = ({ id }) => __awaiter(this, void 0, void 0, function* () {
    return model_1.news.findOne({ _id: id }, 'message')
        .then((retrieved) => {
        if (null !== retrieved && undefined !== retrieved) {
            return retrieved.message;
        }
        throw new Error(`Something went wrong fetching this spoiler: ${id}`);
    })
        .catch(err => { throw err; });
});
/**
 *
 */
exports.deleteOneWeekOlder = () => __awaiter(this, void 0, void 0, function* () {
    const oneWeek = 604800000;
    const thisWeek = Date.now() - oneWeek;
    return model_1.news.deleteMany({ date: { $lte: thisWeek } })
        .then(removed => removed.n)
        .catch(err => { throw err; });
});
/**
 *
 */
exports.numberSpoilers = () => __awaiter(this, void 0, void 0, function* () {
    return model_1.news.find({})
        .then(res => res.length)
        .catch(err => { throw err; });
});
