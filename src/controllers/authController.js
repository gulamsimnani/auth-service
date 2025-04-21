const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err); // Forward the error to the global error handler
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err); // Forward the error to the global error handler
  }
};

const getMe = (req, res) => {
    const { _id, name, email, role } = req.user;
    res.status(200).json({
      success: true,
      user: { id: _id, name, email, role },
    });
  }; 
  
  const getAdmin = (req, res) => {
    console.log("res");
    res.status(200).json({ success: true, message: 'Admin access granted' });
}; 

module.exports = {
  register,
  login,
  getMe,
  getAdmin,
};
