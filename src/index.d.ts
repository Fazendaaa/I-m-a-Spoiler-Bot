import { InlineKeyboardMarkup } from 'telegram-typings';

export interface Context {
    id?: number;
    name?: string;
    title?: string;
    translate: any;
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
