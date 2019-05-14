import { InlineKeyboardMarkup } from 'telegram-typings';
import { ContextMessageUpdate } from 'telegraf';
import I18n from 'telegraf-i18n';

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

export interface IBotContext extends ContextMessageUpdate {
    readonly i18n: I18n;
    session: ISession | null;
}
