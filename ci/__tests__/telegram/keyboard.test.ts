import { spoilerKeyboard } from '../../../src/lib/telegram/keyboard';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

doTesting({ file: readMock('telegram', 'keyboard'), toTest: spoilerKeyboard, translation: true });
