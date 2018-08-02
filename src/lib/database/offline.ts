import { MinimumInfo } from '../../index';

export const offlineDB = ({ translate }): MinimumInfo => {
    return {
        title: translate.t('offlineTitle'),
        message_text: translate.t('offlineText'),
        thumb_url: 'https://i.imgur.com/OBsbNhO.png',
        description: translate.t('offlineDescription')
    };
};
