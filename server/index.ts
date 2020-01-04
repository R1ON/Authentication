import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import authRoute from './routes/authRoute';

const app = express();

const PORT = config.get('port') || 5000;

app.use('/api/auth', authRoute);

async function start() {
  try {
    console.log('Connect to mongoDB');

    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connection completed successfully');

    app.listen(PORT, () => {
      console.log('server started on: ', PORT);
    });
  } catch (e) {
    console.log('ServerError:', e.message);
    throw e;
  }
}

start();
