import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

const app = express();

// db and authUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

app.use(express.json()); // makes json data available to us in controllers

app.get('/', (req, res) => {
  res.send('hello!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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
