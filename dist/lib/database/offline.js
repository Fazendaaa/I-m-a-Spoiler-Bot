"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineDB = ({ translate }) => {
    const stain = 'https://i.imgur.com/OBsbNhO.png';
    return {
        thumb_url: stain,
        reply_markup: undefined,
        title: translate.t('offlineTitle'),
        message_text: translate.t('offlineText'),
        description: translate.t('offlineDescription')
    };
};
