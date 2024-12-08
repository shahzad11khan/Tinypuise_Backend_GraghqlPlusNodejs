const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    // Fetch all users (excluding passwords)
    users: async () => {
      const users = await User.find({}, '-password');
      return users;
    },
    // Fetch a specific user by ID
    user: async (_, { id }) => {
      const user = await User.findById(id, '-password');
      if (!user) throw new Error('User not found');
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email, password, confirmPassword } = input;

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      return {
        message: 'User created successfully',
        id: savedUser.id,
      };
    },


    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        userId: user.id,
        token,
        tokenExpiration: 3600,
      };
    },
    // Other mutations (updateUser, deleteUser) would go here

    updateUser: async (_, { id, input }) => {
      const { name, email, password, confirmPassword } = input;

      // Find user by ID
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Update fields
      if (name) user.name = name;
      if (email) user.email = email;

      // Handle password update
      if (password || confirmPassword) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      // Save the updated user to the database
      const updatedUser = await user.save();

      // Return the updated user (excluding sensitive fields if needed)
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      };
    },

     deleteUser: async (_, { id }) => {
      // Find and delete the user by ID
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new Error('User not found');
      }

      // Return a success message and the deleted user ID
      return {
        message: 'User deleted successfully',
        id: deletedUser.id,
      };
    },
  },
};

module.exports = resolvers;
