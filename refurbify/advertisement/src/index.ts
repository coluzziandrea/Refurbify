import mongoose from 'mongoose';
require('dotenv').config();
import { app } from './app';

const start = async () => {
  console.log('checking workflow for merge...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const serverPort = process.env.SERVER_PORT || 3000;

  app.listen(serverPort, () => {
    console.log('Listening on port ' + serverPort);
  });
};

start();
