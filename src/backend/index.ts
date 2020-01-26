import router from './routes/authRoute';

// const router = require('./routes/authRoute');
// import express from 'express';
// const express = require('express');
// const auz§thRoute = require('./routes/authRoute');

// const app = express();
// import express from 'express';
// import config from 'config';
// import mongoose from 'mongoose';

// import router from './routes/authRoute';

// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');
//
// const compiler = webpack(webpackConfig);
//
// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: webpackConfig.output.publicPath,
// }));
//
// app.use(require('webpack-hot-middleware')(compiler));


console.log('TEST', router)
// const PORT = config.get('port') || 5000;

// app.use('/api/auth', router);
//
// async function start() {
//   try {
//     console.log('Connect to mongoDB');
//
//     await mongoose.connect(config.get('mongoURI'), {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//
//     console.log('Connection completed successfully');
//
//     app.listen(PORT, () => {
//       console.log('server started on: ', PORT);
//     });
//   } catch (e) {
//     console.log('ServerError:', e.message);
//     throw e;
//   }
// }
//
// start();
