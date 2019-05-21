import { join } from 'path';
import I18n from 'telegraf-i18n';
import { offlineDB } from '../../src/lib/database/offline';

const i18n = new I18n({
    useSession: true,
    allowMissing: true,
    defaultLanguage: 'en',
    directory: join(__dirname, '../../others/locales')
});

const translate = {
    t: (resourceKey: string, templateData: object) => i18n.t('en', resourceKey, templateData)
};

describe('Testing Offline DB', () => {
    test('Only test', () => {
        expect(offlineDB({ translate: <I18n> translate }))
        .toEqual({
            title: 'Something went wrong!',
            thumb_url: 'https://i.imgur.com/OBsbNhO.png',
            description: 'Please click me to see what\'s going on.',
            message_text: 'My database is currently down and this wasn\'t supposed to be happening. Please inform @farmy about it.'
        })
    });
});
