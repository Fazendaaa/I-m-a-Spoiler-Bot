import { BaseMock, Mock } from './readMocks';

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
    label: string;
}

const doTheTest = ({ label, toTest, input, output }: TheTest): void => {
    test(label, () => expect(toTest(input)).toEqual(output));
};

const localeTesting = ({ locale, mocks, toTest }: LocaleToBeTested): void => {
    describe(locale, () => mocks.map(input => doTheTest({ locale, mocks, toTest, ...input })));
};

export const doTesting = ({ file, toTest }: ToBeTested): void => {
    describe(`Testing ${toTest.name}`, () => file.map(input => localeTesting({ toTest, ...input })));
};
