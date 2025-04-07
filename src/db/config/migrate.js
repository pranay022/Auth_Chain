const config = require('../../config/config')

module.exports = {
    development: {
      username: config.sqlDB.user,
      password: config.sqlDB.password,
      database: config.sqlDB.database,
      host: config.sqlDB.host,
      dialect: 'postgres',
    },
    staging: {
      username: config.sqlDB.user,
      password: config.sqlDB.password,
      database: config.sqlDB.database,
      host: config.sqlDB.host,
      dialect: 'postgres',
    },
    production: {
      username: config.sqlDB.user,
      password: config.sqlDB.password,
      database: config.sqlDB.database,
      host: config.sqlDB.host,
      dialect: 'postgres',
    },
  };
