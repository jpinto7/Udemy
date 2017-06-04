import App from './components/App';
import requireAuth from './components/auth/requireAuth';

export default {
  component: App,
  name: 'app',
  path: '/',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], () => {
        cb(null, require('./components/Home').default);
      });
    },
  },
  childRoutes: [
    {
      path: 'signin',
      name: 'signin',
      getComponent(location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/auth/SignIn').default);
        });
      },
    },
    {
      path: 'signup',
      name: 'signup',
      getComponent(location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/auth/SignUp').default);
        });
      },
    },
    {
      path: 'feature',
      name: 'feature',
      getComponent(location, cb) {
        require.ensure([], () => {
          cb(null, requireAuth(require('./components/Feature').default));
        });
      },
    },
    {
      path: 'signout',
      name: 'signout',
      getComponent(location, cb) {
        require.ensure([], () => {
          cb(null, require('./components/auth/SignOut').default);
        });
      },
    },
  ],
};
