import mockingoose from 'mockingoose';
import { handleSpoiler, retrieveSpoiler } from '../../../src/lib/spoiler/spoiler';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

mockingoose.news.toReturn({
    _id: 0,
    message: 'Lorem Ipsum'
}, 'findOneAndUpdate');

doTesting({ file: readMock('spoiler', 'handleSpoiler'), toTest: handleSpoiler, translation: true });
doTesting({ file: readMock('spoiler', 'retrieveSpoiler'), toTest: retrieveSpoiler, translation: true });
