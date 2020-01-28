// import express from 'express';
// import config from 'config';
// import mongoose from 'mongoose';
//
// import authRoute from './routes/authRoute';
//
// const app = express();
//
// const PORT = config.get('port') || 5000;
//
// app.use('/api/auth', authRoute);
//
// async function start(): Promise<void> {
//   console.log('Connect to mongoDB');
//
//   await mongoose.connect(config.get('mongoURI'), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   });
//
//   console.log('Connection completed successfully');
//
//   app.listen(PORT, (): void => {
//     console.log('Server started on: ', PORT);
//   });
// }
//
// start();

console.log('TEST');
