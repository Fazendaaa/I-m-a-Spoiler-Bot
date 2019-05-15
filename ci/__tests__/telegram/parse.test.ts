import { toInline } from '../../../src/lib/telegram/parse';

describe('Testing To Inline', () => {
    test('Only test', () => {
        expect(toInline({ results: [
            {
                title: 'lorem ipsum',
                thumb_url: 'lorem ipsum',
                description: 'lorem ipsum',
                message_text: 'lorem ipsum'
            }
        ]})).toEqual([
            {
                id: '0',
                type: 'article',
                title: 'lorem ipsum',
                reply_markup: undefined,
                thumb_url: 'lorem ipsum',
                description: 'lorem ipsum',
                input_message_content: {
                    parse_mode: 'Markdown',
                    message_text: 'lorem ipsum'
                }
            }
        ]);
    });
});
