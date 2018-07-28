const emojiRegex = require('emoji-regex');
import { Context } from '../../index';

const createRegExp = emojiRegex();

interface SpoilerInfo {
    description: string;
    spoiler_name: string;
}

export const messageToString = ({ message }: { message: string }): string => message.replace(createRegExp, '');

export const parseSpoilerText = ({ message, translate }: Context): SpoilerInfo => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const description = message.replace(/"((?:\\.|[^"\\])*)"/, '');

    return {
        description,
        spoiler_name: (null === name) ? '' : translate.t('spoilerName', { name: name[ 1 ] })
    }
};

export const toBoolean = (value: string): boolean => ('true' === value) ? true : false;
