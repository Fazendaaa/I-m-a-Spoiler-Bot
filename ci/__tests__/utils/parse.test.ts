import { messageToString, parseSpoilerText, toBoolean } from '../../../src/lib/utils/parse';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

doTesting({ file: readMock('utils', 'messageToString'), toTest: messageToString });
doTesting({ file: readMock('utils', 'parseSpoilerText'), toTest: parseSpoilerText });
doTesting({ file: readMock('utils', 'toBoolean'), toTest: toBoolean });
