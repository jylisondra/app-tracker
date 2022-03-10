import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

import connectDB from './db/connect.js';

// middleware
import notFoundMiddleware from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

app.get('/', (req, res) => {
  res.send('hello!');
});

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 8000;

// mongoose connect() returns promise
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Serving on post ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
