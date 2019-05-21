import mockingoose from 'mockingoose';
import { join } from 'path';
import I18n from 'telegraf-i18n';
import { handleSpoiler, retrieveSpoiler } from '../../src/lib/spoiler/spoiler';

mockingoose.news.toReturn({
    _id: 0,
    message: 'Lorem Ipsum'
}, 'findOneAndUpdate');

const i18n = new I18n({
    useSession: true,
    allowMissing: true,
    defaultLanguage: 'en',
    directory: join(__dirname, '../../others/locales')
});

const translate = {
    t: (resourceKey: string, templateData: object) => i18n.t('en', resourceKey, templateData)
};

describe('Testing Handle Spoiler', () => {
    test('#1 test', () => {
        expect(handleSpoiler({ id: 0, message: '', translate: <I18n> translate })).resolves.toEqual([
            {
                reply_markup: undefined,
                title: 'Notice me, Senpai',
                description: 'Please, type something',
                thumb_url: 'https://i.imgur.com/ByINOFv.png',
                message_text: 'You have to type something and send it as spoiler.'
            }
        ]);
    });

    test('#2 test', () => {
        expect(handleSpoiler({ id: 0, message: 'Lorem Ipsum', translate: <I18n> translate })).resolves.toEqual([
            {
                title: 'Wanna name this spoiler? (optional)',
                thumb_url: 'https://i.imgur.com/XkMEbd8.png',
                message_text: 'Do not touch me, Senpai. I\'m here just to help you out.',
                description: 'Write it between quotation marks, like this: \"spoiler name here\" at the start of the text. After this, click the spoiler box.'
            },
            {
                title: 'Characters: 11/200',
                description: 'Just counting characters.',
                thumb_url: 'https://i.imgur.com/54qirkY.png',
                message_text: 'Do not touch me, Senpai. I\'m here just to help you out counting characters.'
            },
            {
                title: 'light spoiler',
                thumb_url: 'https://i.imgur.com/XOzZR7c.png',
                message_text: 'Click me to see the spoiler.',
                description: 'Click me to send as a light spoiler. User won\'t be asked to confirm to see it.',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                hide: false,
                                text: 'Spoiler here!',
                                callback_data: '0/false'
                            }
                        ]
                    ]
                }
            },
            {
                title: 'Heavy spoiler',
                thumb_url: 'https://i.imgur.com/TpAVSKT.png',
                message_text: '🚨 ⚠️ *Heavy Spoiler* ⚠️ 🚨 -- Click me to see the spoiler.',
                description: 'Click me to send as a heavy spoiler. User will be asked to confirm to see it.',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                hide: false,
                                text: 'Spoiler here!',
                                callback_data: '0/true'
                            }
                        ]
                    ]
                },
            },
            {
                title: 'Lewd spoiler',
                thumb_url: 'https://i.imgur.com/64HsYmA.png',
                message_text: '🔞 *Lewd Spoiler* 🔞 -- Click me to see the spoiler.',
                description: 'Click me to send as a lewd spoiler. User will be asked to confirm to see it.',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                hide: false,
                                text: 'Spoiler here!',
                                callback_data: '0/true'
                            }
                        ]
                    ]
                },
            }
        ]);
    });

    test('#3 test', () => {
        expect(handleSpoiler({ id: 0, message: '\"Lorem\" Ipsum', translate: <I18n> translate })).resolves.toEqual([
            {
                title: 'Wanna name this spoiler? (optional)',
                thumb_url: 'https://i.imgur.com/XkMEbd8.png',
                message_text: 'Do not touch me, Senpai. I\'m here just to help you out.',
                description: 'Write it between quotation marks, like this: \"spoiler name here\" at the start of the text. After this, click the spoiler box.'
            },
            {
                title: 'Characters: 5/200',
                thumb_url: 'https://i.imgur.com/54qirkY.png',
                description: 'Just counting characters about: Lorem.',
                message_text: 'Do not touch me, Senpai. I\'m here just to help you out counting characters.'
            },
            {
                title: 'light spoiler',
                thumb_url: 'https://i.imgur.com/XOzZR7c.png',
                message_text: 'Click me to see the spoiler about: _Lorem_.',
                description: 'Click me to send as a light spoiler. User won\'t be asked to confirm to see it.',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                hide: false,
                                text: 'Spoiler here!',
                                callback_data: '0/false'
                            }
                        ]
                    ]
                }
            },
            {
                title: 'Heavy spoiler',
                thumb_url: 'https://i.imgur.com/TpAVSKT.png',
                message_text: '🚨 ⚠️ *Heavy Spoiler* ⚠️ 🚨 -- Click me to see the spoiler about: _Lorem_.',
                description: 'Click me to send as a heavy spoiler. User will be asked to confirm to see it.',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                hide: false,
                                text: 'Spoiler here!',
                                callback_data: '0/true'
                            }
                        ]
                    ]
                },
            },
            {
                title: 'Lewd spoiler',
                thumb_url: 'https://i.imgur.com/64HsYmA.png',
                message_text: '🔞 *Lewd Spoiler* 🔞 -- Click me to see the spoiler about: _Lorem_.',
                description: 'Click me to send as a lewd spoiler. User will be asked to confirm to see it.',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                hide: false,
                                text: 'Spoiler here!',
                                callback_data: '0/true'
                            }
                        ]
                    ]
                },
            }
        ]);
    });

    test('#4 test', () => {
        expect(handleSpoiler({ id: 0, message: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', translate: <I18n> translate })).resolves.toEqual([
            {
                title: 'Limit reached! 231/200',
                thumb_url: 'https://i.imgur.com/GPcjNb0.png',
                description: 'You have typed too much, please reduce the spoiler',
                message_text: 'Do not touch me, Senpai. You are a bad boy sending more than 200 characters spoiler. Be polite to the others.'
            }
        ]);
    });

    test('#5 test', () => {
        expect(handleSpoiler({ id: 0, message: undefined, translate: <I18n> translate }))
        .resolves
        .toEqual([
            {
                title: 'Error',
                thumb_url: 'https://i.imgur.com/hw9ekg8.png',
                description: 'An error happened, please warn @farmy about it.',
                message_text: 'An error happened, please warn @farmy about it.'
            }
        ])
        .catch();
    });
});

describe('Testing Retrieve Spoiler', () => {
    test('Only test', () => {
        expect(retrieveSpoiler({ id: 0, translate: <I18n> translate }))
        .resolves
        .toEqual('I had some issues fetching this spoiler. Probably is more than one week older, that means it was deleted.')
        .catch();
    });
});
