const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true',
    },
  },

  test: {
    server: {
      port: process.env.PORT || 3100,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true',
    },
  },

  production: {
    server: {
      port: process.env.PORT || 3200,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true',
    },
  },
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'test';
config[env].isProd = env === 'production';

module.exports = config[env];
