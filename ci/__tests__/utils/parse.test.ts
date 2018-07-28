'use strict';

import { messageToString } from '../../../src/lib/utils/parse';
import { readMock } from '../../readMocks';

describe('Testing messageToString', () => readMock('utils', 'messageToString').forEach(({ locale, mocks }) =>
    describe(locale, () => mocks.forEach(({ label, input, output }) => test(label, () =>
        expect(messageToString(input)).toMatch(output)
    )))
));
