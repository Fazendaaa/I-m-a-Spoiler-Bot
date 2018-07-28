import { MinimumInfo, Context } from '../../index';

export interface Spoiler extends MinimumInfo {}

export interface SpoilerContext extends Context {
    description: string;
    spoiler_name?: string;
}
