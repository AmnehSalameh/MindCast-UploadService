const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.userProfile = require("./userProfile.model.js")(sequelize, Sequelize);
db.subscription = require("./subscription.model.js")(sequelize, Sequelize);

db.userProfile.belongsTo(db.user, { foreignKey: "user_id" });

db.user.hasOne(db.subscription, {
  foreignKey: "user_id", // Foreign key in the Subscription table
  as: "subscription", // Alias for easier querying
  onDelete: "CASCADE", // Delete the subscription if the user is deleted
});

db.subscription.belongsTo(db.user, {
  foreignKey: "user_id", // Foreign key in the Subscription table
  as: "user", // Alias for easier querying
});

db.ROLES = ["user", "admin"];

module.exports = db;
