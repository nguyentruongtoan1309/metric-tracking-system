module.exports = {
  postgreConfig: {
    uri: process.env.POSTGRE_CONNECTION_STRING,
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
      encrypt: false,
    },
  },
  redisConfig: {
    url: process.env.REDIS_CONNECTION_STRING,
    db: process.env.REDIS_DB_STORE || 0,
  },
};
