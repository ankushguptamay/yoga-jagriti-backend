const myEnv = require('dotenv').config();


// module.exports = {
//     host: myEnv.parsed.STAGING_HOST,
//     user: myEnv.parsed.STAGING_USER,
//     password: myEnv.parsed.STAGING_PASSWORD,
//     database: myEnv.parsed.DATABASE,
//     port: myEnv.parsed.DEV_PORT,
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   };

module.exports = {
  host: myEnv.parsed.DEV_HOST,
  user: myEnv.parsed.DEV_USER,
  password: myEnv.parsed.DEV_PASSWORD,
  database: myEnv.parsed.DATABASE,
  port: myEnv.parsed.DEV_PORT || 5000,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};