const path  = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode : "development",

    entry: "./main.js",

    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: "bundle.js"
    // },

    // resolve: {
    //     extensions: [".js", ".json"]
    // },

    // optimization: {
    //     minimize: false
    // },

    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { 
                test: /\.html?$/, 
                use: ["html-loader"], 
                exclude: /node_modules/ 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename : path.resolve(__dirname, 'index.html'),
            title : 'Webpack Config Json'
        })
    ]
}