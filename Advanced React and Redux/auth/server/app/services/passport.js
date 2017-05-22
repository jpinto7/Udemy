import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

import User from '../models/user';
import config from '../config';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const localOptions = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

const jwtLogin = new Strategy(jwtOptions, ({ sub }, done) => {
  User.findById(sub, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(err, false);
    }
  });
});

export {
  localLogin,
  jwtLogin,
};
