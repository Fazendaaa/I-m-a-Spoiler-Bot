declare module 'telegraf-session-local' {
    import { LowdbAsync, LowdbSync } from 'lowdb';

    /**
     * Kinda copy and paste from Telegraf typings, but removing some of its data
    */
    interface Middleware<TContext extends object> {
        (ctx: TContext, next?: () => any): any
    }

    class LocalSession {
        constructor(options?: object);

        getSessionKey (ctx: object): string;

        getSession (ctx: object): object;

        saveSession (key: string, data: object): Promise<Function>;

        middleware (property?: string): Middleware<object>;

        static storagefileSync(): LowdbSync<LocalSession>;

        static storageFileSync(): LowdbSync<LocalSession>;

        static storagefileAsync(): LowdbAsync<LocalSession>;

        static storageFileAsync(): LowdbAsync<LocalSession>;

        static storageMemory(): unknown;

        static storageBase(): unknown;
    }

    export function isPromise (obj: object): boolean;

    export default LocalSession;
}
