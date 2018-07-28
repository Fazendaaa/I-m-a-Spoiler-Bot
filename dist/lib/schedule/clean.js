"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
const data_1 = require("../database/data");
exports.cleanDB = () => {
    const rule = new node_schedule_1.RecurrenceRule();
    rule.dayOfWeek = [new node_schedule_1.Range(0, 6)];
    rule.hour = 23;
    rule.minute = 59;
    rule.second = 59;
    node_schedule_1.scheduleJob('Cleaning DB.', rule, () => {
        try {
            data_1.deleteOneWeekOlder();
        }
        catch (e) {
            console.error(e);
        }
    });
};
