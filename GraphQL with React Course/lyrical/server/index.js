import express from 'express';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';

import webpackConfig from '../webpack.config';
import './models';
import schema from './schema';

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://localhost/lyrical';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;
