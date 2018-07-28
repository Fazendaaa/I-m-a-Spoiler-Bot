'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_1 = require("../telegram/keyboard");
exports.parseSpoiler = ({ message }) => {
    return [{
            id: '0',
            title: 'SPOILER',
            type: 'article',
            input_message_content: {
                message_text: 'Click the button to see the spoiler',
                parse_mode: 'Markdown'
            },
            reply_markup: keyboard_1.spoilerKeyboard({ message }),
            description: message,
            thumb_url: 'https://i.imgur.com/0dYcnUX.png'
        }];
};
//# sourceMappingURL=parse.js.map