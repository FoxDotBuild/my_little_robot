var path = require("path");
var webpack = require('webpack');
// var generateConfig = require("./webpack.config.base");
var exec = require("child_process").execSync;
var path = require("path");
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
global.WEBPACK_ENV = "production";
module.exports = {
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: "ts"
            }
        ]
    }, plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.REVISION': JSON.stringify(
                exec('git log --pretty=format:"%h%n%ad%n%f" -1').toString()),
        })
    ]
    , entry: {
        "js/main": "./src/index.tsx"
    }, output: {
        filename: "[name].bundle.js",
        path: __dirname + "/public"
        // publicPath: PUBLIC_PATH
    }
    , resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.hbs'],
        fallback: path.join(__dirname, 'node_modules')
    }
    , devServer: {
        historyApiFallback: {
            index: '/index.html',
            rewrites: [
                { from: /\/app\//, to: '/app/index.html' }
            ]
        },
    }
};
