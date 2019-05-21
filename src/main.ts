import { spawn } from 'child_process';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import { join } from 'path';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import I18n from 'telegraf-i18n';
import LocalSession from 'telegraf-session-local';
import { InlineKeyboardMarkup } from 'telegram-typings';
import { offlineDB } from './lib/database/offline';
import { cleanDB } from './lib/schedule/database';
import { handleSpoiler, retrieveSpoiler } from './lib/spoiler/spoiler';
import { toInline } from './lib/telegram/parse';
import { messageToString, toBoolean } from './lib/utils/parse';

config();

// ---------------------------------------------------------------------------------------------------------------------

export interface Context {
    id?: number;
    name?: string;
    title?: string;
    translate: I18n;
    message?: string;
    description?: string;
}

export interface MinimumInfo {
    title: string;
    thumb_url?: string;
    description: string;
    message_text: string;
    reply_markup?: InlineKeyboardMarkup;
}

interface ISession {
    user: boolean;
}

export interface IBotContext extends ContextMessageUpdate {
    readonly i18n: I18n;
    session: ISession | null;
}

// ---------------------------------------------------------------------------------------------------------------------

const bot = new Telegraf(process.env.BOT_KEY);
const i18n = new I18n({
    useSession: true,
    allowMissing: true,
    defaultLanguage: 'en',
    directory: join(__dirname, '../others/locales')
});
let botName = '';
const localStorage = new LocalSession();

bot.startPolling();
bot.use(Telegraf.log());
bot.use(i18n.middleware());
bot.use(localStorage.middleware());

bot.telegram.getMe()
.then(botInfo => {
    botName = botInfo.first_name;
})
.catch(console.error);

// ---------------------------------------------------------------------------------------------------------------------

let dbStatus = false;

connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(() => {
    cleanDB();
    console.log('DB connected.');

    dbStatus = true;
})
.catch(err => {
    console.error(err);

    dbStatus = false;
});

// ---------------------------------------------------------------------------------------------------------------------

const restart = () => spawn(process.argv.shift(), process.argv, {
    detached : true,
    stdio: 'inherit',
    cwd: process.cwd()
});

// ---------------------------------------------------------------------------------------------------------------------
bot.catch((err: Error) => {
    console.error(err);

    // https://stackoverflow.com/a/46825815/7092954
    setTimeout(() => {
        process.on('exit', () => restart);
        process.exit();
    }, 5000);
});

bot.start(({ i18n, replyWithMarkdown }: IBotContext) => replyWithMarkdown(i18n.t('start', { botName })));

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

        restart();

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
        restart();

        return await answerCbQuery(i18n.t('offlineDB'), true);
    } if (true === show && false === session.user) {
        session.user = true;

        return await answerCbQuery(i18n.t('priority'), true);
    }

    session.user = false;

    return await answerCbQuery(spoiler, true);
});

bot.on('new_chat_members', async ({ i18n, message, replyWithMarkdown }: IBotContext) => {
    const newChatMember = message.new_chat_participant.username;

    if (newChatMember === botName) {
        return await replyWithMarkdown(i18n.t('addedInAGroup', { botName }));
    }
});
