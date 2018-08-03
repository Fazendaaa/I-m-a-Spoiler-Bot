"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const file = 'stats.json';
exports.updateSpoilersSent = ({ spoilers }) => {
    if (false === fs_1.existsSync(file)) {
        fs_1.writeFileSync(file, JSON.stringify({ total: 0 }), 'utf8');
    }
    const { total } = JSON.parse(fs_1.readFileSync(file, 'utf8'));
    const updated = { total: [total.pop() + spoilers] };
    fs_1.writeFileSync(file, JSON.stringify(updated), 'utf8');
};
