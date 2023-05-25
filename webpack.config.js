const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopywebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/app.ts'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.styles.scss$/,
                exclude: /node_modules/,
                use: [
                    "sass-to-string",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s?[ac]ss$/i,
                // Excluding the `.styles.scss` extension
                exclude: [/\.styles.scss$/],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.(png|gif|jpg|jpeg|svg|xml)$/,
                use: ['url-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // new CopywebpackPlugin({
        //     patterns: [
        //         {
        //             from: 'src/assets/**/*',
        //             to: 'assets/[name][ext]',

        //         },
        //     ],
        // }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        hot: true,
    }
};
