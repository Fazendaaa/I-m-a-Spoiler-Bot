import { Range, RecurrenceRule, scheduleJob } from 'node-schedule';
import { deleteOneWeekOlder, numberSpoilers } from '../database/data';
import { updateSpoilersSent } from '../stats/spoiler';

export const cleanDB = (): void => {
    const rule = new RecurrenceRule();

    rule.dayOfWeek = [new Range(0, 6)];
    rule.hour = 23;
    rule.minute = 59;
    rule.second = 59;

    scheduleJob('Cleaning DB.', rule, () => {
        try {
            deleteOneWeekOlder();
        } catch (e) {
            console.error(e);
        }
    });
};

export const statsDB = (): void => {
    const rule = new RecurrenceRule();

    rule.dayOfWeek = [new Range(0, 6)];
    rule.hour = 23;
    rule.second = 0;
    rule.minute = 59;

    scheduleJob('Updating spoilers sent.', rule, async () => {
        try {
            updateSpoilersSent({ spoilers: <number> await numberSpoilers() });
        } catch (e) {
            console.error(e);
        }
    });
};
