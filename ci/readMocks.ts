import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface Mock {
    input: any;
    output: any;
    label: string;
}

export interface BaseMock {
    locale: string;
    mocks: Array<Mock>;
}

export const readMock = (location: string, toTest: string): Array<BaseMock> => {
    const idioms = ['en-us', 'pt-br'];
    const basePath = join(__dirname, '__mocks__/', location);

    return idioms.reduce((acc, locale) => {
        const file = `${basePath}/${locale}/${toTest}.json`;

        if (true === existsSync(file)) {
            acc.push({
                locale,
                mocks: JSON.parse(readFileSync(file, 'utf8'))
            });
        }

        return acc;
    }, []);
};
