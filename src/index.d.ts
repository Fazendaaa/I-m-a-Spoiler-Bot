import { InlineKeyboardMarkup } from 'telegram-typings';
import I18n from 'telegraf-i18n';
import { TelegrafContext } from 'telegraf/typings/context';

export interface Context {
    id?: number;
    name?: string;
    title?: string;
    translate: I18n;
    message?: string;
    description?: string;
}

export interface MinimumInfo {
    title: string;
    thumb_url?: string;
    description: string;
    message_text: string;
    reply_markup?: InlineKeyboardMarkup;
}

interface ISession {
    user: boolean;
}

export interface IBotContext extends TelegrafContext {
    readonly i18n: I18n;
    session: ISession | null;
}
