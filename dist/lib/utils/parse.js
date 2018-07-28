"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageToString = ({ message }) => {
    return Buffer.from(message, 'ascii').toString('ascii').replace(/(?:=\(|:0|:o|: o|: 0)/, ': o');
};
exports.parseSpoilerText = ({ message, translate }) => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const description = message.replace(/"((?:\\.|[^"\\])*)"/, '');
    return {
        description,
        spoiler_name: (null === name) ? '' : translate.t('spoilerName', { name: name[1] })
    };
};
exports.toBoolean = (value) => ('true' === value) ? true : false;
