module.exports = (sequelize, Sequelize) => {
  const UserProfile = sequelize.define("user_profile", {
    user_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    country: {
      type: Sequelize.STRING,
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: true, // URL or file path to the profile picture
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true, // Timestamp of the user's last login
    },
  });

  return UserProfile;
};
