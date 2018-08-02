import { join } from 'path';
import { BaseMock } from './readMocks';
const telegarfi18n = require('telegraf-i18n');

interface ToBeTested {
    toTest: Function;
    file: Array<BaseMock>;
    translation?: boolean;
}

interface LocaleToBeTested extends BaseMock {
    toTest: Function;
    translation?: boolean;
}

interface TheTest extends LocaleToBeTested {
    input: any;
    output: any;
    kind: string;
    label: string;
}

const i18n = new telegarfi18n({
    defaultLanguage: 'en',
    allowMissing: true,
    directory: join(__dirname, '../others/locales')
});

const doTheTest = ({ label, toTest, input, output, kind, translation }: TheTest): void => {
    const value = toTest({ translate: (true === translation) ? i18n : null, ...input });

    if ('await' === kind) {
        return test(label, async () => {
            expect.assertions(1);

            expect(await value).toEqual(output);
        });
    }

    return test(label, () => expect(value).toEqual(output));
};

const localeTesting = ({ locale, mocks, ...remaining }: LocaleToBeTested): void => {
    describe(locale, () => mocks.map(input => doTheTest({ locale, mocks, ...remaining, ...input })));
};

export const doTesting = ({ file, toTest, translation = false }: ToBeTested): void => {
    describe(`Testing ${toTest.name}`, () => file.map(input => localeTesting({ toTest, translation, ...input })));
};
