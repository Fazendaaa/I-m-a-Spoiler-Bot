import { MinimumInfo, Context } from '../../index';

export interface Spoiler extends MinimumInfo {}

export interface SpoilerContext extends Context {
    name?: string;
    title?: string;
    description: string;
}
