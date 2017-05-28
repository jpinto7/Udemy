import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import router from './router';

const app = express();

const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200,
};

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/auth', () => {
  console.log('Connected to mongodb');
});

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/json' }));
app.use(cors(corsOptions));
router(app);

const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
