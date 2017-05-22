import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import router from './router';

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/auth', () => {
  console.log('Connected to mongodb');
});

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/json' }));
router(app);

const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
