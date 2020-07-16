const webpack = require('webpack')

module.exports = {
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                  loader: 'url-loader'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            limit: 20000,
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        }
                    }
                ]
                // loader: 'file-loader',
                // options: {
                //     name: 'fonts/[name].[ext]'
                // }
            },
            {
                test: /\.css$/,
                exclude: /\.min\.css$/,
                loader: ['style-loader','css-loader'],
            },
            {
                test: /\.min\.css$/,
                loader: ['style-loader','css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};