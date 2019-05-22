import I18n from 'telegraf-i18n';
import { MinimumInfo } from '../../main';

interface IOfflineDB {
    readonly translate: I18n
};

/**
 * Handles the offline database message to be sent in a query.
 *
 * @param translate - The Telegram's i18n translate object
 *
 * @returns The offline database message
 */
export const offlineDB = ({ translate }: IOfflineDB): MinimumInfo => {
    return {
        title: translate.t('offlineTitle'),
        message_text: translate.t('offlineText'),
        thumb_url: 'https://i.imgur.com/OBsbNhO.png',
        description: translate.t('offlineDescription')
    };
};
