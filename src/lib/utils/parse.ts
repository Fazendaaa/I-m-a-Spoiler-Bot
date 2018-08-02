import { tiny } from 'tiny-shortener';
const emojiRegex = require('emoji-regex');

const createRegExp = emojiRegex();

interface Util {
    message: string;
}

interface SpoilerInfo {
    name: string;
    description: string;
}

const removeProtocol = async ({ message }: Util): Promise<string> => (await tiny(message)).replace('https://', '');

const sanitizeURL = async ({ message }: Util): Promise<string> => {
    // https://stackoverflow.com/a/17773849/7092954
    const matched = message.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gm);

    if (null !== matched) {
        return await matched.reduce(async (acc, URL) => {
            return (await acc).replace(URL, await removeProtocol({ message: URL }));
        }, Promise.resolve(message));
    }

    return await message;
};

export const messageToString = ({ message }: Util): string => message.replace(createRegExp, '');

export const parseSpoilerText = async ({ message }: Util): Promise<SpoilerInfo> => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const sanitize = message.replace(/\s*"((?:\\.|[^"\\])*)"\s*/, '');

    return {
        name: (null === name) ? '' : name[ 1 ],
        description: await sanitizeURL({ message: sanitize })
    }
};

export const toBoolean = ({ message }: Util): boolean => ('true' === message) ? true : false;
