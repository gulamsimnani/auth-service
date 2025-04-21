const jwtUtils = require('../utils/jwt');  // Correct import statement

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token

  try {
    const decoded = jwtUtils.verifyToken(token);  // Ensure you're calling jwtUtils correctly
    req.user = decoded;  // Attach user data
    next();  // Proceed to the next middleware
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

// ✅ Add this for role-based access
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
      }
      next();
    };
  };

  module.exports = {
    authenticate,
    authorizeRoles
  };
