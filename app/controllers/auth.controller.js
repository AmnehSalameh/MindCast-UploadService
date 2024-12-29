const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserProfile = db.userProfile;
const Subscription = db.subscription;
const { Sequelize } = require("sequelize");

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: req.body.roles || ["user"],
    });

    if (user) {
      const userProfile = await UserProfile.create({
        user_id: user.id,
        country: req.body.country,
      });

      const subscription = await Subscription.create({
        type: "premium",
        //   startDate: Sequelize.fn("NOW"),
        // endDate: Sequelize.literal("DATE_ADD(NOW(), INTERVAL 1 MONTH)"),
        startDate: new Date(), // Default to now
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month from now
        user_id: user.id, // Associate the user_id
      });

      if (userProfile && subscription)
        res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.roles;
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
