import jwt from 'jwt-simple';

import User from '../models/user';
import config from '../config';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
};

const signup = (req, res, next) => {
  const { body: { email, password } } = req;
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).json({ success: false, error: 'Email already exists' });
    }
    const user = new User({
      email,
      password,
    });
    user.save((err) => {
      if (err) {
        return res.status(422).json({ success: false, ...err });
      }
      console.log(user.id);
      res.json({ success: true, token: tokenForUser(user) });
    });
  });
};

export {
  signup,
};
