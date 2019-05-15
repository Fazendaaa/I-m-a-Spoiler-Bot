import { join } from 'path';
import I18n from 'telegraf-i18n';
import { spoilerKeyboard } from '../../../src/lib/telegram/keyboard';

const i18n = new I18n({
    useSession: true,
    allowMissing: true,
    defaultLanguage: 'en',
    directory: join(__dirname, '../../../others/locales')
});

const translate = {
    t: (resourceKey: string, templateData: object) => i18n.t('en', resourceKey, templateData)
};

describe('Testing Spoiler Keyboard', () => {
    test('#1 test', () => {
        expect(spoilerKeyboard({ id: 0, translate: <I18n> translate })).toEqual({
            inline_keyboard: [
                [
                    {
                        hide: false,
                        text: 'Spoiler here!',
                        callback_data: '0/false'
                    }
                ]
            ]
        });
    });

    test('#2 test', () => {
        expect(spoilerKeyboard({ id: 123456, translate: <I18n> translate })).toEqual({
            inline_keyboard: [
                [
                    {
                        hide: false,
                        text: 'Spoiler here!',
                        callback_data: '123456/false'
                    }
                ]
            ]
        });
    });
});
