import { handleSpoiler, retrieveSpoiler } from '../../../src/lib/spoiler/spoiler';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

jest.setTimeout(10000);

describe.skip('nothing', () => test('', () => expect(true).toBeTruthy()));

// Needed mongoose mocking.
// doTesting({ file: readMock('spoiler', 'handleSpoiler'), toTest: handleSpoiler, translation: true });
// doTesting({ file: readMock('spoiler', 'retrieveSpoiler'), toTest: retrieveSpoiler, translation: true });
