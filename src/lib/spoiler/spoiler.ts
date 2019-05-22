import { InlineKeyboardMarkup } from 'telegram-typings';
import { Context, MinimumInfo } from '../../main';
import { addNews, retrieveNews } from '../database/data';
import { spoilerKeyboard } from '../telegram/keyboard';
import { parseSpoilerText } from '../utils/parse';

export interface SpoilerContext extends Context {
    name?: string;
    title?: string;
    thumb_url?: string;
    description?: string;
    reply_markup?: InlineKeyboardMarkup;
    kind?: 'tag' | 'lewd' | 'error' | 'sanitize' | 'handle' | 'counter' | 'heavy' | 'light';
}

/**
 * The  maximum characters limit allowed to a user to sent as spoiler, this is due to is not the "maximum characters" to
 * sent per se, but to be displayed after.
 */
const charactersLimit = 200;

/**
 * Injects all the data need to create a spoiler.
 *
 * @param kind - The kind of the spoiler
 * @param title -
 * @param thumb_url - The image of the spoiler kind
 * @param translate - The translation object
 * @param description - The spoiler description
 * @param reply_markup - The keyboard to be attached to the spoiler kind itself
 *
 * @returns The spoiler data
 */
const baseSpoiler = ({ title, reply_markup, kind, translate, thumb_url, description }: SpoilerContext): MinimumInfo => {
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

const tagSpoiler = ({ translate }: SpoilerContext): MinimumInfo => baseSpoiler({ translate, kind: 'tag', thumb_url: 'https://i.imgur.com/XkMEbd8.png' });

const counterSpoiler = ({ description, translate, name }: SpoilerContext): MinimumInfo => {
    const title = ('' === name) ? '' : translate.t('spoilerCounterName', { name: name });

    return baseSpoiler({ kind: 'counter', thumb_url: 'https://i.imgur.com/54qirkY.png', title, description, translate });
};

const lewdSpoiler = (input: SpoilerContext): MinimumInfo => baseSpoiler({ ...input, kind: 'lewd', thumb_url: 'https://i.imgur.com/64HsYmA.png' });

const heavySpoiler = (input: SpoilerContext): MinimumInfo => baseSpoiler({ ...input, kind: 'heavy', thumb_url: 'https://i.imgur.com/TpAVSKT.png' });

const lightSpoiler = (input: SpoilerContext): MinimumInfo  => baseSpoiler({ ...input, kind: 'light', thumb_url: 'https://i.imgur.com/XOzZR7c.png' });

const newSpoiler = ({ name, description, title, translate, id }: Context): Array<MinimumInfo> => {
    if (description.length < charactersLimit) {
        const reply_markup = spoilerKeyboard({ id, translate, toHide: true });

        return [
            tagSpoiler({ translate }),
            counterSpoiler({ description, name, translate }),
            lightSpoiler({ reply_markup: spoilerKeyboard({ id, translate }), title, translate }),
            heavySpoiler({ reply_markup, title, translate }),
            lewdSpoiler({ reply_markup, title, translate })
        ];
    }

    return [
        baseSpoiler({ translate, description, kind: 'sanitize', thumb_url: 'https://i.imgur.com/GPcjNb0.png' })
    ];
};

const sanitizeSpoiler = async ({ message, translate, id }: Context): Promise<Array<MinimumInfo>> => {
    try {
        const { description, name } = await parseSpoilerText({ message });
        const spoilerId = <number> await addNews({ message: description, id });
        const title = ('' === name) ? '' : translate.t('spoilerName', { name: name });

        return newSpoiler({ name, title, description, translate, id: spoilerId });
    } catch (e) {
        console.error(e);

        return [
            baseSpoiler({ kind: 'error', thumb_url: 'https://i.imgur.com/hw9ekg8.png', translate })
        ];
    }
};

export const handleSpoiler = async ({ message, translate, id }: Context): Promise<Array<MinimumInfo>> => {
    if ('' !== message) {
        return await sanitizeSpoiler({ message, translate, id });
    }

    return [
        baseSpoiler({ kind: 'handle', thumb_url: 'https://i.imgur.com/ByINOFv.png', translate })
    ];
};

export const retrieveSpoiler = async ({ id, translate }: Context): Promise<string | Error> => {
    try {
        return await retrieveNews({ id });
    } catch (e) {
        console.error(e);

        return translate.t('errorSpoilerRetrieve');
    }
};
