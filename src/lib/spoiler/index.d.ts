import { MinimumInfo, Context } from '../../index';
import { InlineKeyboardMarkup } from 'telegram-typings';

export interface Spoiler extends MinimumInfo {}

export interface SpoilerContext extends Context {
    name?: string;
    kind?: string;
    title?: string;
    thumb_url?: string;
    description?: string;
    reply_markup?: InlineKeyboardMarkup;
}
