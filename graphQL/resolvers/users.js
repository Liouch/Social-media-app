const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config.js");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(_, arg, context, info) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: hash password and create an auth token
      const {
        registerInput: { username, email, password, confirmPassword },
      } = arg;
      // encrypt the password first
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });
      // Save user to database
      const res = await newUser.save();
      // Create auth token passing it a secret word stored in our config file so it's not exposed
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
