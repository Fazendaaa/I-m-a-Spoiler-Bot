import { config } from 'dotenv';
import { connect, connection } from 'mongoose';
import { join } from 'path';
import { offlineDB } from './lib/database/offline';
import { cleanDB } from './lib/schedule/clean';
import { handleSpoiler, retrieveSpoiler } from './lib/spoiler/spoiler';
import { toInline } from './lib/telegram/parse';
import { messageToString, toBoolean } from './lib/utils/parse';

config();

// ---------------------------------------------------------------------------------------------------------------------

const telegraf = require('telegraf');
const telegrafI18n = require('telegraf-i18n');
const localSession = require('telegraf-session-local');

const bot = new telegraf(<string> process.env.BOT_KEY);
const i18n = new telegrafI18n({
    defaultLanguage: 'en',
    allowMissing: true,
    directory: join(__dirname, '../others/locales')
});
const localStorage = new localSession({
    database: 'example_db.json'
});

bot.startPolling();
bot.use(telegraf.log());
bot.use(i18n.middleware());
bot.use(localStorage.middleware());

// ---------------------------------------------------------------------------------------------------------------------

let dbStatus: boolean;

connect(process.env.MONGODB_URI);

connection.on('open', () => {
    console.log('DB connected.');
    dbStatus = true;
    cleanDB();
});

connection.on('error', () => {
    console.error.bind(console, 'connection error:')
    dbStatus = false;
});

// ---------------------------------------------------------------------------------------------------------------------

bot.start(({ i18n, replyWithMarkdown }) => {
    replyWithMarkdown(i18n.t('start'));
});

bot.help(async ({ i18n, replyWithMarkdown, replyWithVideo }) => {
    await replyWithMarkdown(i18n.t('help1'));
    await replyWithVideo('https://media.giphy.com/media/3vvl2dunxjN9HNXjwi/giphy.gif');
    await replyWithMarkdown(i18n.t('help2'));
    await replyWithMarkdown(i18n.t('help3'));
});

bot.command('about', ({ i18n, replyWithMarkdown }) => {
    replyWithMarkdown(i18n.t('about'), { disable_web_page_preview: true });
});

bot.on('inline_query', async ({ i18n, answerInlineQuery, inlineQuery }) => {
    const message = messageToString({ message: inlineQuery.query });
    const spoiler = await handleSpoiler({ message, translate: i18n, id: parseInt(inlineQuery.id, 10) });

    if (false === dbStatus) {
        const offline = offlineDB({ translate: i18n });

        return await answerInlineQuery(toInline([ offline ]));
    }

    return await answerInlineQuery(toInline(spoiler));
});

bot.on('callback_query', async ({ i18n, update, answerCbQuery, session }) => {
    const data = update.callback_query.data.split('/');
    const spoiler = await retrieveSpoiler({ translate: i18n, id: parseInt(data[0], 10) });
    const show = toBoolean(data[1]);
    session.user = session.user || false;

    if (false === dbStatus) {
        return await answerCbQuery(i18n.t('offlineDB'), true);
    } if (true === show && false === session.user) {
        session.user = true;

        return await answerCbQuery(i18n.t('priority'));
    }

    session.user = false;

    return await answerCbQuery(spoiler, true);
});
