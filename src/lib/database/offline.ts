import I18n from 'telegraf-i18n';
import { MinimumInfo } from '../../main';

export const offlineDB = ({ translate }: { translate: I18n }): MinimumInfo => {
    return {
        title: translate.t('offlineTitle'),
        message_text: translate.t('offlineText'),
        thumb_url: 'https://i.imgur.com/OBsbNhO.png',
        description: translate.t('offlineDescription')
    };
};
