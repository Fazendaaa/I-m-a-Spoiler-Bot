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
const data_1 = require("../database/data");
const keyboard_1 = require("../telegram/keyboard");
const parse_1 = require("../utils/parse");
const charactersLimit = 200;
const baseSpoiler = ({ title, reply_markup, kind, translate, thumb_url, description }) => {
    const descriptionArgs = (undefined === title) ? undefined : { title };
    const messageTextArgs = (undefined === title) ? undefined : { title };
    const titleArgs = (undefined === description) ? undefined : { length: description.length, limit: charactersLimit };
    return {
        thumb_url,
        reply_markup,
        title: translate.t(`${kind}SpoilerTitle`, titleArgs),
        description: translate.t(`${kind}SpoilerDescription`, descriptionArgs),
        message_text: translate.t(`${kind}SpoilerMessageText`, messageTextArgs)
    };
};
const tagSpoiler = ({ translate }) => {
    return baseSpoiler({ kind: 'tag', thumb_url: 'https://i.imgur.com/XkMEbd8.png', translate });
};
const counterSpoiler = ({ description, translate, name }) => {
    const title = ('' === name) ? '' : translate.t('spoilerCounterName', { name: name });
    return baseSpoiler({ kind: 'counter', thumb_url: 'https://i.imgur.com/54qirkY.png', title, description, translate });
};
const lightSpoiler = (input) => {
    return baseSpoiler(Object.assign({ kind: 'light', thumb_url: 'https://i.imgur.com/XOzZR7c.png' }, input));
};
const heavySpoiler = (input) => {
    return baseSpoiler(Object.assign({ kind: 'heavy', thumb_url: 'https://i.imgur.com/TpAVSKT.png' }, input));
};
const lewdSpoiler = (input) => {
    return baseSpoiler(Object.assign({ kind: 'lewd', thumb_url: 'https://i.imgur.com/64HsYmA.png' }, input));
};
const newSpoiler = ({ name, description, title, translate, id }) => {
    if (description.length < charactersLimit) {
        const reply_markup = keyboard_1.spoilerKeyboard({ id, translate, toHide: true });
        return [
            tagSpoiler({ translate }),
            counterSpoiler({ description, name, translate }),
            lightSpoiler({ reply_markup: keyboard_1.spoilerKeyboard({ id, translate }), title, translate }),
            heavySpoiler({ reply_markup, title, translate }),
            lewdSpoiler({ reply_markup, title, translate })
        ];
    }
    return [baseSpoiler({ kind: 'sanitize', thumb_url: 'https://i.imgur.com/GPcjNb0.png', description, translate })];
};
const sanitizeSpoiler = ({ message, translate, id }) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { description, name } = yield parse_1.parseSpoilerText({ message });
        const spoilerId = yield data_1.addNews({ message: description, id });
        const title = ('' === name) ? '' : translate.t('spoilerName', { name: name });
        return newSpoiler({ name, title, description, translate, id: spoilerId });
    }
    catch (e) {
        console.error(e);
        return [baseSpoiler({ kind: 'error', thumb_url: 'https://i.imgur.com/hw9ekg8.png', translate })];
    }
});
exports.handleSpoiler = ({ message, translate, id }) => __awaiter(this, void 0, void 0, function* () {
    if ('' !== message) {
        return yield sanitizeSpoiler({ message, translate, id });
    }
    return [baseSpoiler({ kind: 'handle', thumb_url: 'https://i.imgur.com/ByINOFv.png', translate })];
});
exports.retrieveSpoiler = ({ id, translate }) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield data_1.retrieveNews({ id });
    }
    catch (e) {
        console.error(e);
        return translate.t('errorSpoilerRetrieve');
    }
});
