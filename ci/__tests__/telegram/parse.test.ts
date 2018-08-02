import { toInline } from '../../../src/lib/telegram/parse';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

doTesting({ file: readMock('telegram', 'toInline'), toTest: toInline });
