const authorize = (roles = []) => {
    return (req, res, next) => {
        console.log("role", req.user.role);
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      next();
    };
  };
  
  module.exports = authorize;  