import { join } from 'path';
import { spoilerKeyboard } from '../../../src/lib/telegram/keyboard';
import { readMock } from '../../readMocks';

const telegarfi18n = require('telegraf-i18n');
const i18n = new telegarfi18n({
    defaultLanguage: 'en',
    allowMissing: true,
    directory: join(__dirname, '../../../others/locales')
});

describe.skip('nothing', () => test('', () => expect(true).toBeTruthy()));

// describe.skip('Testing spoilerKeyboard', () => readMock('telegram', 'keyboard').forEach(({ locale, mocks }) =>
//     describe(locale, () => mocks.forEach(({ label, input, output }) => test(label, () =>
//         expect(spoilerKeyboard({ translate: i18n, ...input })).toEqual(output)
//     )))
// ));
