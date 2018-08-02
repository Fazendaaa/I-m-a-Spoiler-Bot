"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineDB = ({ translate }) => {
    return {
        title: translate.t('offlineTitle'),
        message_text: translate.t('offlineText'),
        thumb_url: 'https://i.imgur.com/OBsbNhO.png',
        description: translate.t('offlineDescription')
    };
};
