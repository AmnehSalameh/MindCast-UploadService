module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true, // Ensures the value is a valid email address
      },
    },
    password: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Automatically set on creation
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Automatically update on save
    },
    roles: {
      //Values are: user,admin
      type: Sequelize.JSON,
      allowNull: true, // Can be null if roles are optional
      defaultValue: ["user"], // Default is an user.
      validate: {
        isArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("Roles must be an array.");
          }
        },
      },
    },
  });

  return User;
};
