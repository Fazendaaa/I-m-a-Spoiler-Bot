import { existsSync, readFileSync, writeFileSync } from 'fs';

interface SpoilerCounter {
    spoilers: number;
}

const file = 'stats.json';

export const updateSpoilersSent = ({ spoilers }: SpoilerCounter): void => {
    if (false === existsSync(file)) {
        writeFileSync(file, JSON.stringify({ total: 0 }), 'utf8');
    }

    const { total } = JSON.parse(readFileSync(file, 'utf8'));
    const updated = { total: total + spoilers };

    writeFileSync(file, JSON.stringify(updated), 'utf8');
};
