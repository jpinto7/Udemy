import jwt from 'jwt-simple';

import User from '../models/user';
import config from '../config';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
};

const signin = (req, res, next) => {
  const { user } = req;
  res.send({ success: true, token: tokenForUser(user) });
};

const signup = (req, res, next) => {
  const { body: { email, password } } = req;
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send({ success: false, error: 'Email already exists' });
    }
    const user = new User({
      email,
      password,
    });
    user.save((err) => {
      if (err) {
        return res.status(422).send({ success: false, ...err });
      }
      res.send({ success: true, token: tokenForUser(user) });
    });
  });
};

export {
  signup,
  signin,
};
