"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
const path_1 = require("path");
const offline_1 = require("./lib/database/offline");
const database_1 = require("./lib/schedule/database");
const spoiler_1 = require("./lib/spoiler/spoiler");
const parse_1 = require("./lib/telegram/parse");
const parse_2 = require("./lib/utils/parse");
const telegraf_i18n_1 = __importDefault(require("telegraf-i18n"));
dotenv_1.config();
// ---------------------------------------------------------------------------------------------------------------------
const Telegraf = require('telegraf');
const Session = require('telegraf-session-local');
const bot = new Telegraf(process.env.BOT_KEY);
const i18n = new telegraf_i18n_1.default({
    useSession: true,
    allowMissing: true,
    defaultLanguage: 'en',
    directory: path_1.join(__dirname, '../others/locales')
});
let botName = '';
const localStorage = new Session();
bot.startPolling();
bot.use(Telegraf.log());
bot.use(i18n.middleware());
bot.use(localStorage.middleware());
bot.telegram.getMe().then(botInfo => {
    botName = botInfo.first_name;
});
// ---------------------------------------------------------------------------------------------------------------------
let dbStatus = false;
mongoose_1.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose_1.connection.on('open', () => {
    console.log('DB connected.');
    dbStatus = true;
    database_1.statsDB();
    database_1.cleanDB();
});
mongoose_1.connection.on('error', () => {
    console.error.bind(console, 'connection error:');
    dbStatus = false;
});
// ---------------------------------------------------------------------------------------------------------------------
bot.catch(console.error);
bot.start(({ i18n, replyWithMarkdown }) => replyWithMarkdown(i18n.t('start', { botName })));
bot.command('about', ({ i18n, replyWithMarkdown }) => replyWithMarkdown(i18n.t('about')));
bot.help(({ i18n, replyWithMarkdown, replyWithVideo }) => __awaiter(this, void 0, void 0, function* () {
    yield replyWithMarkdown(i18n.t('help1'));
    yield replyWithVideo('https://raw.githubusercontent.com/Fazendaaa/I-m-a-Spoiler-Bot/master/others/gif/help.1.gif');
    yield replyWithMarkdown(i18n.t('help2'));
    yield replyWithMarkdown(i18n.t('help3'));
}));
bot.on('inline_query', ({ i18n, answerInlineQuery, inlineQuery }) => __awaiter(this, void 0, void 0, function* () {
    const message = parse_2.messageToString({ message: inlineQuery.query });
    const results = yield spoiler_1.handleSpoiler({ message, translate: i18n, id: parseInt(inlineQuery.id, 10) });
    if (false === dbStatus) {
        const offline = offline_1.offlineDB({ translate: i18n });
        return yield answerInlineQuery(parse_1.toInline({ results: [offline] }));
    }
    return yield answerInlineQuery(parse_1.toInline({ results }));
}));
bot.on('callback_query', ({ i18n, update, answerCbQuery, session }) => __awaiter(this, void 0, void 0, function* () {
    const data = update.callback_query.data.split('/');
    const spoiler = yield spoiler_1.retrieveSpoiler({ translate: i18n, id: parseInt(data[0], 10) });
    const show = parse_2.toBoolean({ message: data[1] });
    session.user = session.user || false;
    if (false === dbStatus) {
        return yield answerCbQuery(i18n.t('offlineDB'), true);
    }
    if (true === show && false === session.user) {
        session.user = true;
        return yield answerCbQuery(i18n.t('priority'), true);
    }
    session.user = false;
    return yield answerCbQuery(spoiler, true);
}));
bot.on('new_chat_members', ({ i18n, message, replyWithMarkdown }) => __awaiter(this, void 0, void 0, function* () {
    const newChatMember = message.new_chat_participant.username;
    if (newChatMember === botName) {
        return yield replyWithMarkdown(i18n.t('addedInAGroup', { botName }));
    }
}));
