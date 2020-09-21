require('dotenv').config();

require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
