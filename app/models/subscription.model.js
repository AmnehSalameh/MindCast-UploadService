module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("subscription", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.ENUM("free", "basic", "premium"),
      allowNull: false,
      defaultValue: "free", // Default subscription type
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Automatically set to current date
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: true, // Nullable if subscription doesn't expire
    },
    status: {
      type: Sequelize.ENUM("active", "canceled", "expired"),
      allowNull: false,
      defaultValue: "active", // Default status
    },
  });

  return Subscription;
};
