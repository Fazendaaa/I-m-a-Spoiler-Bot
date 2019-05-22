import { Range, RecurrenceRule, scheduleJob } from 'node-schedule';
import { deleteOneWeekOlder } from '../database/data';

/**
 * Set a rule to run everyday to remove all of the older spoilers -- see more at [[deleteOneWeekOlder]].
 *
 * @returns Nothing
 */
export const cleanDB = (): void => {
    const rule = new RecurrenceRule();

    rule.dayOfWeek = [new Range(0, 6)];
    rule.hour = 23;
    rule.minute = 59;
    rule.second = 59;

    scheduleJob('Cleaning DB.', rule, () =>
        deleteOneWeekOlder()
        .catch(console.error)
    );
};
