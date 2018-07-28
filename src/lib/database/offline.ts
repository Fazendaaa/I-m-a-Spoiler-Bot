import { MinimumInfo } from '../../index';

export const offlineDB = ({ translate }): MinimumInfo => {
    const stain = 'https://i.imgur.com/OBsbNhO.png';

    return {
        thumb_url: stain,
        reply_markup: undefined,
        title: translate.t('offlineTitle'),
        message_text: translate.t('offlineText'),
        description: translate.t('offlineDescription')
    };
};
