import mockingoose from 'mockingoose';
import { addNews, deleteOneWeekOlder, numberSpoilers, retrieveNews } from '../../../src/lib/database/data';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

const _doc = {
    _id: 0,
    message: 'Lorem Ipsum'
};

mockingoose.news.toReturn(_doc, 'findOne');
mockingoose.news.toReturn([ _doc ], 'find');

doTesting({ file: readMock('database', 'addNews'), toTest: addNews });
doTesting({ file: readMock('database', 'retrieveNews'), toTest: retrieveNews });
doTesting({ file: readMock('database', 'deleteOneWeekOlder'), toTest: deleteOneWeekOlder });
doTesting({ file: readMock('database', 'numberSpoilers'), toTest: numberSpoilers });
