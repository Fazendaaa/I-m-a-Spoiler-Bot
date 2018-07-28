import { InlineKeyboardMarkup } from 'telegram-typings';
import { KeyboardContext } from './index';
const markup = require('telegraf').Markup;

export const spoilerKeyboard = ({ id, translate, isHeavy = false }: KeyboardContext): InlineKeyboardMarkup => {
    return markup.inlineKeyboard([
        markup.callbackButton(translate.t('spoilerButton'), `${id.toString()}/${isHeavy}`)
    ]);
};
