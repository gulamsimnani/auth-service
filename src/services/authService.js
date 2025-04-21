const User = require('../models/User');
const jwtUtils = require('../utils/jwt'); // <-- Add this

// ✅ REGISTER USER — plain password only
const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Create a standard error for duplicate email
    const error = new Error('User already exists with this email.');
    error.statusCode = 400;
    throw error; // Throw error with status code and message
  }

  const newUser = new User({
    name,
    email,
    password, // ✅ let Mongoose pre-save hook hash it
  });

  await newUser.save();

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

// ✅ LOGIN USER
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    // Create a standard error for invalid credentials
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error; // Throw error with status code and message
  }
  
  const isMatch = await user.matchPassword(password); // ✅ using model method
  if (!isMatch) {
    // Create a standard error for invalid credentials
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error; // Throw error with status code and message
  }

  const token = jwtUtils.generateToken(
    { userId: user._id, email: user.email,  role: user.role }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};
