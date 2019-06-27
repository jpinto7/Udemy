const { NODE_ENV: env = 'development' } = process.env;

if (env === 'development' || env === 'test') {
  const config = require('../config/config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}