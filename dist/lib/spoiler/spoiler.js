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
const tagSpoiler = ({ translate }) => {
    return {
        title: translate.t('tagSpoilerTitle'),
        thumb_url: 'https://i.imgur.com/XkMEbd8.png',
        description: translate.t('tagSpoilerDescription'),
        message_text: translate.t('tagSpoilerMessageText')
    };
};
const counterSpoiler = ({ description, translate, name }) => {
    const title = ('' === name) ? '' : translate.t('spoilerCounterName', { name: name });
    return {
        thumb_url: 'https://i.imgur.com/54qirkY.png',
        description: translate.t('counterDescription', { title }),
        message_text: translate.t('counterSpoilerMessageText'),
        title: translate.t('counterSpoilerTitle', { length: description.length, limit: charactersLimit })
    };
};
const lightSpoiler = ({ translate, id, title }) => {
    return {
        title: translate.t('lightSpoilerTitle'),
        thumb_url: 'https://i.imgur.com/XOzZR7c.png',
        reply_markup: keyboard_1.spoilerKeyboard({ id, translate }),
        description: translate.t('lightSpoilerDescription'),
        message_text: translate.t('lightSpoilerMessageText', { title })
    };
};
const heavySpoiler = ({ translate, id, title }) => {
    return {
        title: translate.t('heavySpoilerTitle'),
        thumb_url: 'https://i.imgur.com/TpAVSKT.png',
        description: translate.t('heavySpoilerDescription'),
        reply_markup: keyboard_1.spoilerKeyboard({ id, translate, toHide: true }),
        message_text: translate.t('heavySpoilerMessageText', { title })
    };
};
const lewdSpoiler = ({ translate, id, title }) => {
    return {
        title: translate.t('lewdSpoilerTitle'),
        thumb_url: 'https://i.imgur.com/64HsYmA.png',
        description: translate.t('lewdSpoilerDescription'),
        reply_markup: keyboard_1.spoilerKeyboard({ id, translate, toHide: true }),
        message_text: translate.t('lewdSpoilerMessageText', { title })
    };
};
const newSpoiler = ({ message, translate, id }) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { description, name } = yield parse_1.parseSpoilerText({ message });
        const spoilerId = yield data_1.addNews({ message: description, id });
        const title = ('' === name) ? '' : translate.t('spoilerName', { name: name });
        return [
            tagSpoiler({ translate }),
            counterSpoiler({ description, name, translate }),
            lightSpoiler({ description, title, translate, id: spoilerId }),
            heavySpoiler({ description, title, translate, id: spoilerId }),
            lewdSpoiler({ description, title, translate, id: spoilerId })
        ];
    }
    catch (e) {
        console.error(e);
        return [{
                title: translate.t('errorTitle'),
                thumb_url: 'https://i.imgur.com/hw9ekg8.png',
                description: translate.t('errorDescription'),
                message_text: translate.t('errorMessageText')
            }];
    }
});
const sanitizeSpoiler = ({ message, translate, id }) => __awaiter(this, void 0, void 0, function* () {
    if (message.length > charactersLimit) {
        return [{
                thumb_url: 'https://i.imgur.com/GPcjNb0.png',
                description: translate.t('sanitizeSpoilerDescription'),
                message_text: translate.t('sanitizeSpoilerMessageText'),
                title: translate.t('sanitizeSpoilerTitle', { length: message.length, limit: charactersLimit })
            }];
    }
    return newSpoiler({ message, translate, id });
});
exports.handleSpoiler = ({ message, translate, id }) => __awaiter(this, void 0, void 0, function* () {
    if ('' === message) {
        return [{
                title: translate.t('handleSpoilerTitle'),
                thumb_url: 'https://i.imgur.com/ByINOFv.png',
                description: translate.t('handleSpoilerDescription'),
                message_text: translate.t('handleSpoilerMessageText')
            }];
    }
    return yield sanitizeSpoiler({ message, translate, id });
});
exports.retrieveSpoiler = ({ id, translate }) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield data_1.retrieveNews({ id });
    }
    catch (e) {
        console.error(e);
        return translate.t('errorRetrieve');
    }
});
