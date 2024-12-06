// const bcrypt = require('bcryptjs');
// const User = require('../models/User'); // Import the User model

// const resolvers = {
//   Query: {
//     // Fetch all users
//     users: async () => {
//       const users = await User.find();
//       return users.map(user => ({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         // Do not return password or confirmPassword
//       }));
//     },

//     // Fetch a single user by ID
//     user: async (_, { id }) => {
//       const user = await User.findById(id);
//       if (!user) {
//         throw new Error('User not found');
//       }
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         // Do not return password or confirmPassword
//       };
//     },
//   },

//   Mutation: {
//     // Create a new user
//   createUser: async (_, { input }) => {
//   // Check if the email already exists
//   const existingUser = await User.findOne({ email: input.email });
//   if (existingUser) {
//     throw new Error('Email is already in use');
//   }

//   if (input.password !== input.confirmPassword) {
//     throw new Error('Passwords do not match');
//   }

//   // Hash the password before saving it
//   const hashedPassword = await bcrypt.hash(input.password, 10);

//   const user = new User({
//     name: input.name,
//     email: input.email,
//     password: hashedPassword,
//     confirmPassword: input.confirmPassword, // Only for validation, not saved
//   });

//   await user.save();
//   return {
//     message: "User created successfully",
//     // id: user.id,
//     // name: user.name,
//     // email: user.email,
//     // Do not return confirmPassword or password
//   };
// },


//     // Update an existing user
//     updateUser: async (_, { id, input }) => {
//       const user = await User.findById(id);
//       if (!user) {
//         throw new Error('User not found');
//       }

//       if (input.password && input.password !== input.confirmPassword) {
//         throw new Error('Passwords do not match');
//       }

//       if (input.password) {
//         input.password = await bcrypt.hash(input.password, 10); // Hash the new password
//       }

//       // Update fields
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         {
//           name: input.name || user.name,
//           email: input.email || user.email,
//           password: input.password || user.password, // Only update password if provided
//         },
//         { new: true }
//       );

//       return {
//         id: updatedUser.id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         // Do not return confirmPassword or password
//       };
//     },

//     // Delete a user
//     deleteUser: async (_, { id }) => {
//       const user = await User.findByIdAndDelete(id);
//       if (!user) {
//         throw new Error('User not found');
//       }
//       return {
//         message: 'User deleted successfully',
//         id: user.id,
//       };
//     },
//   },
// };

// module.exports = resolvers;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure the User model is correctly defined

const rootValue = {
  // Create a new user
  createUser: async ({ input }) => {
    // const { name, email, password } = userInput;
    const existingUser = await User.findOne({ email:input.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = new User({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    confirmPassword: input.confirmPassword, // Only for validation, not saved
    });
    const result = await user.save();
    return {    message:"User Updated Successfully", id: result._id };
  },

  // Update an existing user's information
  updateUser: async (_, { id, input }) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (input.password && input.password !== input.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (input.password) {
      input.password = await bcrypt.hash(input.confirmPassword, 10); // Hash the new password
    }

    // Only update the fields that are provided in input
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username: input.name || user.name,
        email: input.email || user.email,
        password: input.password || user.password, // Only update password if provided
        confirmPassword: input.confirmPassword || user.confirmPassword, // Only update password if provided
      },
      { new: true } // Return the updated user
    );

    return {
      message:"User Updated Successfully",
      id: updatedUser.id,
      username: updatedUser.name,
      email: updatedUser.email,
      // Do not return confirmPassword or password
    };
  },

  // Delete a user
  deleteUser: async (_, { id }) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      message: 'User deleted successfully',
      id: user.id,
    };
  },

  // User login
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { userId: user.id, token, tokenExpiration: 1 };
  },

  users: async () => {
      const users = await User.find();
      return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        // Do not return password or confirmPassword
      }));
    },
};

module.exports = rootValue;
