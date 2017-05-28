import App from './components/App';

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
  ],
};
