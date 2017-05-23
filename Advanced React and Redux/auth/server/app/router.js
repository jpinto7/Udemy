import passport from 'passport';
import { jwtLogin, localLogin } from './services/passport';
import { signup, signin } from './controllers/authentication';

passport.use(jwtLogin);
passport.use(localLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'hello there!' });
  });
  app.post('/signin', requireSignin, signin);
  app.post('/signup', signup);
};

export default router;
