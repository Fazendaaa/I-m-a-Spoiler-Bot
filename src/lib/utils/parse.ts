const emojiRegex = require('emoji-regex');

const createRegExp = emojiRegex();

interface SpoilerInfo {
    name: string;
    description: string;
}

export const messageToString = ({ message }: { message: string }): string => message.replace(createRegExp, '');

export const parseSpoilerText = ({ message }: { message: string }): SpoilerInfo => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const description = message.replace(/"((?:\\.|[^"\\])*)"/, '');

    return {
        description,
        name: (null === name) ? '' : name[ 1 ]
    }
};

export const toBoolean = (value: string): boolean => ('true' === value) ? true : false;
