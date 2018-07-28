'use strict';

import { join } from 'path';
import { toInline } from '../../../src/lib/telegram/parse';
import { readMock } from '../../readMocks';

const telegarfi18n = require('telegraf-i18n');
const i18n = new telegarfi18n({
    defaultLanguage: 'en',
    allowMissing: true,
    directory: join(__dirname, '../../../others/locales')
});

describe('Testing toInline', () => readMock('telegram', 'parse').forEach(({ locale, mocks }) =>
    describe(locale, () => mocks.forEach(({ label, input, output }) => test(label, () =>
        expect(toInline({ translate: i18n, ...input })).toEqual(output)
    )))
));
