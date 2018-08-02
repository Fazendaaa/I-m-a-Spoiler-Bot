import mockingoose from 'mockingoose';
import { addNews, deleteOneWeekOlder, retrieveNews } from '../../../src/lib/database/data';
import { readMock } from '../../readMocks';
import { doTesting } from '../../testing';

mockingoose.news.toReturn({
    _id: 0,
    message: 'Lorem Ipsum'
}, 'findOne');

doTesting({ file: readMock('database', 'addNews'), toTest: addNews });
doTesting({ file: readMock('database', 'retrieveNews'), toTest: retrieveNews });
doTesting({ file: readMock('database', 'deleteOneWeekOlder'), toTest: deleteOneWeekOlder });
