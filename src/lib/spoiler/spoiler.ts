import { Context } from '../../index';
import { addNews, retrieveNews } from '../database/data';
import { spoilerKeyboard } from '../telegram/keyboard';
import { parseSpoilerText } from '../utils/parse';
import { Spoiler, SpoilerContext } from './index';

const charactersLimit = 200;

const baseSpoiler = ({ title, reply_markup, kind, translate, thumb_url, description }: SpoilerContext): Spoiler => {
    const descriptionArgs = (undefined === title) ? null : { title };
    const messageTextArgs = (undefined === title) ? null : { title };
    const titleArgs = (undefined === description) ? null : { length: description.length, limit: charactersLimit };

    return {
        thumb_url,
        reply_markup,
        title: translate.t(`${kind}SpoilerTitle`, titleArgs),
        description: translate.t(`${kind}SpoilerDescription`, descriptionArgs),
        message_text: translate.t(`${kind}SpoilerMessageText`, messageTextArgs)
    };
};

const tagSpoiler = ({ translate }: SpoilerContext): Spoiler => {
    return baseSpoiler({ kind: 'tag', thumb_url: 'https://i.imgur.com/XkMEbd8.png', translate });
};

const counterSpoiler = ({ description, translate, name }: SpoilerContext): Spoiler => {
    const title = ('' === name) ? '' : translate.t('spoilerCounterName', { name: name });

    return baseSpoiler({ kind: 'counter', thumb_url: 'https://i.imgur.com/54qirkY.png', title, description, translate });
};

const lightSpoiler = (input: SpoilerContext): Spoiler  => {
    return baseSpoiler({ kind: 'light', thumb_url: 'https://i.imgur.com/XOzZR7c.png', ...input });
};

const heavySpoiler = (input: SpoilerContext): Spoiler => {
    return baseSpoiler({ kind: 'heavy', thumb_url: 'https://i.imgur.com/TpAVSKT.png', ...input });
};

const lewdSpoiler = (input: SpoilerContext): Spoiler => {
    return baseSpoiler({ kind: 'lewd', thumb_url: 'https://i.imgur.com/64HsYmA.png', ...input });
};

const newSpoiler = ({ name, description, title, translate, id }: Context): Array<Spoiler> => {
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

    return [ baseSpoiler({ kind: 'sanitize', thumb_url: 'https://i.imgur.com/GPcjNb0.png', description, translate }) ];
};

const sanitizeSpoiler = async ({ message, translate, id }: Context): Promise<Array<Spoiler>> => {
    try {
        const { description, name } = await parseSpoilerText({ message });
        const spoilerId = <number> await addNews({ message: description, id });
        const title = ('' === name) ? '' : translate.t('spoilerName', { name: name });

        return newSpoiler({ name, title, description, translate, id: spoilerId });
    } catch (e) {
        console.error(e);

        return await [ baseSpoiler({ kind: 'error', thumb_url: 'https://i.imgur.com/hw9ekg8.png', translate }) ];
    }
};

export const handleSpoiler = async ({ message, translate, id }: Context): Promise<Array<Spoiler>> => {
    if ('' !== message) {
        return await sanitizeSpoiler({ message, translate, id });
    }

    return await [ baseSpoiler({ kind: 'handle', thumb_url: 'https://i.imgur.com/ByINOFv.png', translate }) ];
};

export const retrieveSpoiler = async ({ id, translate }: Context): Promise<string> => {
    try {
        return <string> await retrieveNews({ id });
    } catch (e) {
        console.error(e);

        return await translate.t('errorSpoilerRetrieve');
    }
};
