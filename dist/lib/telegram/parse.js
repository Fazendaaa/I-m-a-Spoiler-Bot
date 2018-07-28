"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInline = (results) => {
    return results.map(({ title, description, reply_markup, thumb_url, message_text }, id) => {
        return {
            title,
            thumb_url,
            description,
            reply_markup,
            type: 'article',
            id: id.toString(),
            input_message_content: {
                message_text,
                parse_mode: 'Markdown'
            }
        };
    });
};
