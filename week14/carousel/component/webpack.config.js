module.exports = {
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma:"createElement"}]]
                    }
                }
            }
        ]
    },
    devServer: {
        // contentBase: path.resolve('./'),
        open: true,
        hot: true, // 开启了热更新
    },
    mode: "development",
    optimization: {
        minimize: false
    }

}