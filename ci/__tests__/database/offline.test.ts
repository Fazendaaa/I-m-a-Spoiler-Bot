import { offlineDB } from '../../../src/lib/database/offline';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

doTesting({ file: readMock('database', 'offline'), toTest: offlineDB, translation: true });
