import passport from 'passport';
import { jwtLogin } from './services/passport';

import { signup } from './controllers/authentication';

passport.use(jwtLogin);

const requireAuth = passport.authenticate('jwt', { session: false });

const router = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'hello there!' });
  });
  app.post('/signup', signup);
};

export default router;
