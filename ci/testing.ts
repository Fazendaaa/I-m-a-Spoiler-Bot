import { BaseMock } from './readMocks';

interface ToBeTested {
    file: Array<BaseMock>
    toTest: Function
}

interface LocaleToBeTested extends BaseMock {
    toTest: Function
}

interface TheTest extends LocaleToBeTested {
    input: any;
    output: any;
    kind: string;
    label: string;
}

const doTheTest = ({ label, toTest, input, output, kind }: TheTest): void => {
    if ('await' === kind) {
        return test(label, async () => {
            const value = await toTest(input);

            expect.assertions(1);

            expect(value).toEqual(output);
        });
    }

    return test(label, () => expect(toTest(input)).toEqual(output));
};

const localeTesting = ({ locale, mocks, toTest }: LocaleToBeTested): void => {
    describe(locale, () => mocks.map(input => doTheTest({ locale, mocks, toTest, ...input })));
};

export const doTesting = ({ file, toTest }: ToBeTested): void => {
    describe(`Testing ${toTest.name}`, () => file.map(input => localeTesting({ toTest, ...input })));
};
