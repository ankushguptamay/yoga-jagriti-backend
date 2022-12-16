const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.course = require('./admin/course.model')(sequelize, Sequelize);
db.homebanner = require('./admin/homebanner.model')(sequelize, Sequelize);
db.enquiry = require('./admin/enquiry.model')(sequelize, Sequelize);
db.shop = require('./admin/shop.model')(sequelize, Sequelize);
db.testimonial = require('./admin/testimonial.model')(sequelize, Sequelize);

module.exports = db;