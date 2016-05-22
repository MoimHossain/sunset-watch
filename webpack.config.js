var path = require('path'),
    webpack = require('webpack');

var config = {
    //devtool: 'source-map',
    entry: path.join(__dirname, 'src/index.js'),

    output: {
        filename: 'sunset-watch.js',
        //path: path.resolve(__dirname, 'public'),
        devtoolModuleFilenameTemplate: function (info) {
            var resourcePath = info.absoluteResourcePath;
            if (resourcePath.indexOf(__dirname) !== 0) {
                resourcePath = path.join.apply(path, [__dirname].concat(resourcePath));
            }
            if (resourcePath.charAt(0) === '/') {
                return 'file://' + resourcePath;
            } else {
                return 'file:///' + resourcePath;
            }
        }
    },

    module: {
        loaders: [
            {
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src')],
                loaders: ['babel']
            }
        ]
    }
};

module.exports = config;
