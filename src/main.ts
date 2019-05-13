import { config } from 'dotenv';
import { connect, connection } from 'mongoose';
import { join } from 'path';
import { offlineDB } from './lib/database/offline';
import { cleanDB, statsDB } from './lib/schedule/database';
import { handleSpoiler, retrieveSpoiler } from './lib/spoiler/spoiler';
import { toInline } from './lib/telegram/parse';
import { messageToString, toBoolean } from './lib/utils/parse';
import Telegraf from 'telegraf';
import I18n from 'telegraf-i18n';
import Session from 'telegraf/session';
import { IBotContext } from '.';

config();

// ---------------------------------------------------------------------------------------------------------------------

const bot = new Telegraf(<string> process.env.BOT_KEY);
const i18n = new I18n({
    useSession: true,
    allowMissing: true,
    defaultLanguage: 'en',
    directory: join(__dirname, '../others/locales')
});
const localStorage = new Session();

bot.startPolling();
bot.use(Telegraf.log());
bot.use(i18n.middleware());
bot.use(localStorage.middleware());

// ---------------------------------------------------------------------------------------------------------------------

let dbStatus = false;

connect(process.env.MONGODB_URI);

connection.on('open', () => {
    console.log('DB connected.');
    dbStatus = true;
    statsDB();
    cleanDB();
});

connection.on('error', () => {
    console.error.bind(console, 'connection error:');
    dbStatus = false;
});

// ---------------------------------------------------------------------------------------------------------------------

bot.catch(console.error);

bot.start(({ i18n, replyWithMarkdown }: IBotContext) => replyWithMarkdown(i18n.t('start')));

bot.command('about', ({ i18n, replyWithMarkdown }: IBotContext) => replyWithMarkdown(i18n.t('about')));

bot.help(async ({ i18n, replyWithMarkdown, replyWithVideo }: IBotContext) => {
    await replyWithMarkdown(i18n.t('help1'));
    await replyWithVideo('https://raw.githubusercontent.com/Fazendaaa/I-m-a-Spoiler-Bot/master/others/gif/help.1.gif');
    await replyWithMarkdown(i18n.t('help2'));
    await replyWithMarkdown(i18n.t('help3'));
});

bot.on('inline_query', async ({ i18n, answerInlineQuery, inlineQuery }: IBotContext) => {
    const message = messageToString({ message: inlineQuery.query });
    const results = await handleSpoiler({ message, translate: i18n, id: parseInt(inlineQuery.id, 10) });

    if (false === dbStatus) {
        const offline = offlineDB({ translate: i18n });

        return await answerInlineQuery(toInline({ results: [ offline ]}));
    }

    return await answerInlineQuery(toInline({ results}));
});

bot.on('callback_query', async ({ i18n, update, answerCbQuery, session }: IBotContext) => {
    const data = update.callback_query.data.split('/');
    const spoiler = await retrieveSpoiler({ translate: i18n, id: parseInt(data[0], 10) });
    const show = toBoolean({ message: data[ 1 ] });
    session.user = session.user || false;

    if (false === dbStatus) {
        return await answerCbQuery(i18n.t('offlineDB'), true);
    } if (true === show && false === session.user) {
        session.user = true;

        return await answerCbQuery(i18n.t('priority'), true);
    }

    session.user = false;

    return await answerCbQuery(spoiler, true);
});
