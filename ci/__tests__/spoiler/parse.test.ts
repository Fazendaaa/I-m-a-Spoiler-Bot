/**
 * @jest-environment node
 */

'use strict';

import { join } from 'path';
import { handleSpoiler, retrieveSpoiler } from '../../../src/lib/spoiler/spoiler';
import { readMock } from '../../readMocks';

const telegarfi18n = require('telegraf-i18n');
const i18n = new telegarfi18n({
    defaultLanguage: 'en',
    allowMissing: true,
    directory: join(__dirname, '../../../others/locales')
});

describe.skip('Testing handleSpoiler', () => readMock('spoiler', 'handleSpoiler').forEach(({ locale, mocks }) =>
    describe(locale, () => mocks.forEach(({ label, input, output }) => test(label, async () => {
        handleSpoiler({ translate: i18n, ...input }).then(console.log);

        return await expect(handleSpoiler({ translate: i18n, ...input })).resolves.toEqual(output)
    })))
));

describe.skip('Testing retrieveSpoiler', () => readMock('spoiler', 'retrieveSpoiler').forEach(({ locale, mocks }) =>
    describe(locale, () => mocks.forEach(({ label, input, output }) => test(label, async () => {
        return await expect(retrieveSpoiler({ translate: i18n, ...input })).resolves.toEqual(output)
    })))
));
