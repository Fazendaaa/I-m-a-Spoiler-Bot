import { Context } from '../../index';

interface SpoilerInfo {
    description: string;
    spoiler_name: string;
}

export const messageToString = ({ message }: { message: string }): string => {
    return Buffer.from(message, 'ascii').toString('ascii').replace(/(?:=\(|:0|:o|: o|: 0)/, ': o');
};

export const parseSpoilerText = ({ message, translate }: Context): SpoilerInfo => {
    const name = message.match(/"((?:\\.|[^"\\])*)"/);
    const description = message.replace(/"((?:\\.|[^"\\])*)"/, '');

    return {
        description,
        spoiler_name: (null === name) ? '' : translate.t('spoilerName', { name: name[ 1 ] })
    }
};

export const toBoolean = (value: string): boolean => ('true' === value) ? true : false;
