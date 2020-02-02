import express from 'express';
import mongoose from 'mongoose';

import authRoute from './routes/authRoute';

const app = express();

const PORT: string = process.env.PORT || '5000';
const URI: string = process.env.MONGO_URI || '';

app.use('/api/auth', authRoute);

async function start(): Promise<void> {
  console.log('Connect to mongoDB');

  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log('Connection completed successfully');

  app.listen(PORT, (): void => {
    console.log('Server started on: ', PORT);
  });
}

start();
