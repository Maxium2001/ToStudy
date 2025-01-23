const path = require('path');

module.exports = {
    mode: 'development', // Imposta la modalità su 'development' o 'production'
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "zlib": require.resolve("browserify-zlib")
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
        open: true // Aggiungi questa linea per aprire automaticamente il browser
    }
};