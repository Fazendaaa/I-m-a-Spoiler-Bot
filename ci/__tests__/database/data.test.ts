import mockingoose from 'mockingoose';
import { addNews, deleteOneWeekOlder, numberSpoilers, retrieveNews } from '../../../src/lib/database/data';

const _doc = {
    _id: 0,
    message: 'Lorem Ipsum'
};

mockingoose.news.toReturn(_doc, 'findOne');
mockingoose.news.toReturn([ _doc ], 'find');

describe('Testing Add News', () => {
    test('First test', () => {
        expect(addNews({ id: 0, message: '' })).rejects.toThrow();
    });
});

describe('Testing Retrieve News', () => {
    test('First test', async () => {
        expect.assertions(1);

        expect(await retrieveNews({ id: 0 }))
        .toEqual('Lorem Ipsum');
    });
});

describe('Testing Delete One Week Older', () => {
    test('First test', async () => {
        expect(deleteOneWeekOlder()).rejects.toThrow();
    });
})

describe('Testing numberSpoilers.', () => {
    test('Retrieving one.', () => {
        expect(numberSpoilers()).resolves.toEqual(1);
    });

    test('Throwing error.', () => {
        mockingoose.news.reset('find');

        expect(numberSpoilers()).rejects.toThrow();
    });
});
