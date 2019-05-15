"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
exports.spoilerKeyboard = ({ id, translate, toHide = false }) => {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.callbackButton(translate.t('spoilerButton'), `${id.toString()}/${toHide}`)
    ]);
};
