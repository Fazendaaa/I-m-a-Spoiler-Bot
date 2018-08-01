import { tiny } from 'tiny-shortener';
const emojiRegex = require('emoji-regex');

const createRegExp = emojiRegex();

interface SpoilerInfo {
    name: string;
    description: string;
}

const removeProtocol = async (input: string): Promise<string> => (await tiny(input)).replace('https://', '');

const sanitizeURL = async ({ message }: { message: string }): Promise<string> => {
    // https://stackoverflow.com/a/17773849/7092954
    const matched = message.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gm);

    if (null !== matched) {
        return await matched.reduce(async (acc, URL) => {
            return (await acc).replace(URL, await removeProtocol(URL));
        }, Promise.resolve(message));
    }

    return await message;
};

export const messageToString = ({ message }: { message: string }): string => message.replace(createRegExp, '');

export const parseSpoilerText = async ({ message }: { message: string }): Promise<SpoilerInfo> => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const sanitize = message.replace(/\s*"((?:\\.|[^"\\])*)"\s*/, '');

    return {
        name: (null === name) ? '' : name[ 1 ],
        description: await sanitizeURL({ message: sanitize })
    }
};

export const toBoolean = (value: string): boolean => ('true' === value) ? true : false;
