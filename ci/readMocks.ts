'use strict';

import { readFileSync } from 'fs';
import { join } from 'path';

interface Mock {
    input: any;
    output: any;
    label: string;
}

interface BaseMock {
    locale: string;
    mocks: Array<Mock>;
}

export const readMock = (location: string, toTest: string): Array<BaseMock> => {
    const idioms = ['en-us', 'pt-br'];
    const basePath = join(__dirname, '__mocks__/', location);

    return idioms.reduce((acc, locale) =>
        acc.concat({
            locale,
            mocks: JSON.parse(readFileSync(`${basePath}/${locale}/${toTest}.json`, 'utf8'))
        })
    , []);
};
