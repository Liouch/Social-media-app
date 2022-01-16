const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput } = require("../../utils/validators");
const { SECRET_KEY } = require("../../config.js");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(_, arg, context, info) {
      const {
        registerInput: { username, email, password, confirmPassword },
      } = arg;
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesn't already exist
      console.log(username);
      const user = await User.findOne({ username: username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
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
