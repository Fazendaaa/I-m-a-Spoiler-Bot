import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegram-typings';
import { KeyboardContext } from './index';

export const spoilerKeyboard = ({ id, translate, toHide = false }: KeyboardContext): InlineKeyboardMarkup => {
    return Markup.inlineKeyboard([
        Markup.callbackButton(translate.t('spoilerButton'), `${id.toString()}/${toHide}`)
    ]);
};
