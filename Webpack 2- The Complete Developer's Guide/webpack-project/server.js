import express from 'express';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    webpackMiddleware(webpack(webpackConfig)),
  );
} else {
  app.use(
    express.static(path.join(__dirname, 'client')),
  );
  app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => {
  console.log('Listening on port 3050');
});
