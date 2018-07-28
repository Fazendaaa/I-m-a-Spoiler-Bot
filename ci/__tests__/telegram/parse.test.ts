'use strict';

import { join } from 'path';
import { toInline } from '../../../src/lib/telegram/parse';
import { readMock } from '../../readMocks';

describe('Testing toInline', () => readMock('telegram', 'parse').forEach(({ locale, mocks }) =>
    describe(locale, () => mocks.forEach(({ label, input, output }) => test(label, () =>
        expect(toInline(input)).toEqual(output)
    )))
));
