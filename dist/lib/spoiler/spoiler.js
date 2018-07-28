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
const counterSpoiler = ({ description, translate }) => {
    return {
        description,
        thumb_url: 'https://i.imgur.com/54qirkY.png',
        message_text: translate.t('counterSpoilerMessageText'),
        title: translate.t('counterSpoilerTitle', { length: description.length, limit: charactersLimit })
    };
};
const lowSpoiler = ({ translate, id, spoiler_name }) => {
    return {
        title: translate.t('lowSpoilerTitle'),
        thumb_url: 'https://i.imgur.com/XOzZR7c.png',
        reply_markup: keyboard_1.spoilerKeyboard({ id, translate }),
        description: translate.t('lowSpoilerDescription'),
        message_text: translate.t('lowSpoilerMessageText', { spoiler_name })
    };
};
const highSpoiler = ({ translate, id, spoiler_name }) => {
    return {
        title: translate.t('highSpoilerTitle'),
        thumb_url: 'https://i.imgur.com/TpAVSKT.png',
        description: translate.t('highSpoilerDescription'),
        reply_markup: keyboard_1.spoilerKeyboard({ id, translate, isHigh: true }),
        message_text: translate.t('highSpoilerMessageText', { spoiler_name })
    };
};
const newSpoiler = ({ message, translate, id }) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { description, spoiler_name } = parse_1.parseSpoilerText({ message, translate });
        const spoilerId = yield data_1.addNews({ message: description, id });
        return [
            counterSpoiler({ description, translate }),
            lowSpoiler({ description, spoiler_name, translate, id: spoilerId }),
            highSpoiler({ description, spoiler_name, translate, id: spoilerId })
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
const tagSpoiler = ({ translate }) => {
    return {
        title: translate.t('tagSpoilerTitle'),
        thumb_url: 'https://i.imgur.com/XkMEbd8.png',
        description: translate.t('tagSpoilerDescription'),
        message_text: translate.t('tagSpoilerMessageText')
    };
};
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
    return [
        tagSpoiler({ translate }),
        ...yield sanitizeSpoiler({ message, translate, id })
    ];
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
