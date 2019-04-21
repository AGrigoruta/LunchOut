const path= require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');


module.exports = {
    entry: './index.js',
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'my-first-webpack.bundle.js'
    //   },
      plugins: [
        new ServiceWorkerWebpackPlugin({
           entry: path.join(__dirname, './firebase-messaging-sw.js'),
        })
     ]
  };