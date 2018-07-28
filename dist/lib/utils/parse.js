"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojiRegex = require('emoji-regex');
const createRegExp = emojiRegex();
exports.messageToString = ({ message }) => message.replace(createRegExp, '');
exports.parseSpoilerText = ({ message, translate }) => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const description = message.replace(/"((?:\\.|[^"\\])*)"/, '');
    return {
        description,
        spoiler_name: (null === name) ? '' : translate.t('spoilerName', { name: name[1] })
    };
};
exports.toBoolean = (value) => ('true' === value) ? true : false;
