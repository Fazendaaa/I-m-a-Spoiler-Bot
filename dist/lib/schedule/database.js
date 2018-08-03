"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
const data_1 = require("../database/data");
const spoiler_1 = require("../stats/spoiler");
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
exports.statsDB = () => {
    const rule = new node_schedule_1.RecurrenceRule();
    // rule.dayOfWeek = [new Range(0, 6)];
    // rule.hour = 23;
    // rule.second = 0;
    // rule.minute = 59;
    rule.second = 10;
    node_schedule_1.scheduleJob('Updating spoilers sent.', rule, () => __awaiter(this, void 0, void 0, function* () {
        try {
            spoiler_1.updateSpoilersSent({ spoilers: yield data_1.numberSpoilers() });
        }
        catch (e) {
            console.error(e);
        }
    }));
};
