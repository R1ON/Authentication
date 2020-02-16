import express from 'express';
import mongoose from 'mongoose';

import authRoute from './routes/authRoute';

const app = express();

const PORT: string = process.env.PORT || '5000';

app.use('/api/auth', authRoute);

async function start(): Promise<void> {
  console.log('Connect to mongoDB');

  await mongoose.connect(process.env.MONGO_URI!, {
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
