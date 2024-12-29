module.exports = {
  HOST: "user-management.cyv1csnzwecr.us-east-1.rds.amazonaws.com",
  PORT: 3306,
  USER: "admin",
  PASSWORD: "Mypassword91",
  DB: "user-management",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
