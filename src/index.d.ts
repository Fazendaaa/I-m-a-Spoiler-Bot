import { InlineKeyboardMarkup } from 'telegram-typings';

export interface Context {
    id?: number;
    translate: any;
    message?: string;
}

export interface MinimumInfo {
    title: string;
    thumb_url?: string;
    description: string;
    message_text: string;
    reply_markup?: InlineKeyboardMarkup;
}
