import { messageToString, parseSpoilerText, toBoolean } from '../../src/lib/utils/parse';

describe('Testing Message To String', () => {
    test('#1 test', () => {
        expect(messageToString({ message: '' })).toEqual('');
    });

    test('#2 test', () => {
        expect(messageToString({ message: ' ' })).toEqual(' ');
    });

    test('#3 test', () => {
        expect(messageToString({ message: 'Lorem Ipsum' })).toEqual('Lorem Ipsum');
    });

    test('#4 test', () => {
        expect(messageToString({ message: 'lowercase' })).toEqual('lowercase');
    });

    test('#5 test', () => {
        expect(messageToString({ message: 'UPPERCASE' })).toEqual('UPPERCASE');
    });
});

describe('Testing Parse Spoiler Text', () => {
    test('#1 test', () => {
        expect(parseSpoilerText({ message: 'Foo bar' })).resolves.toEqual({
            name: '',
            description: 'Foo bar'
        });
    });

    test('#2 test', () => {
        expect(parseSpoilerText({ message: '\"Foo\" bar' })).resolves.toEqual({
            name: 'Foo',
            description: 'bar'
        });
    });

    test('#3 test', () => {
        expect(parseSpoilerText({ message: 'www.test.com' })).resolves.toEqual({
            name: '',
            description: 'tinyurl.com/gyi'
        });
    });

    test('#4 test', () => {
        expect(parseSpoilerText({ message: 'Foo www.test.com' })).resolves.toEqual({
            name: '',
            description: 'Foo tinyurl.com/gyi'
        });
    });

    test('#5 test', () => {
        expect(parseSpoilerText({ message: 'Foo www.test.com www.pudim.com' })).resolves.toEqual({
            name: '',
            description: 'Foo tinyurl.com/gyi tinyurl.com/36g9z4'
        });
    });

    test('#6 test', () => {
        expect(parseSpoilerText({ message: '\"Foo\" bar www.test.com www.pudim.com' })).resolves.toEqual({
            name: 'Foo',
            description: 'bar tinyurl.com/gyi tinyurl.com/36g9z4'
        });
    });
});

describe('Testing To Boolean', () => {
    test('#1 test', () => {
        expect(toBoolean({ message: 'true' })).toEqual(true);
    });

    test('#2 test', () => {
        expect(toBoolean({ message: 'false' })).toEqual(false);
    });
});
