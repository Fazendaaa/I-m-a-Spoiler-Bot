declare module 'typedoc-webpack-plugin' {
    interface Options {
        exclude?: string;
        excludeExternal?: boolean;
        experimentalDecorators?: boolean;
        target?: 'ES3' | 'ES5' | 'ES2015' | 'ES2016' | 'ES2017' | 'ES2018' | 'ESNEXT';
        module?: 'none' | 'commonjs' | 'amd' | 'system' | 'umd' | 'es2015' | 'ESNext';
    }

    function TypedocWebpackPlugin (options: Options, input?: string | string[]): void;

    export default TypedocWebpackPlugin;
}
