const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message:
            "Authentication is required before checking user role.",
        });
      }

      if (!req.user.role) {
        return res.status(403).json({
          message:
            "User role is not available.",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message:
            "You do not have permission to access this resource.",
        });
      }

      next();

    } catch (error) {
      console.error(
        "Role Authorization Error:",
        error
      );

      return res.status(500).json({
        message:
          "Server error during role authorization.",
      });
    }
  };
};

module.exports = roleMiddleware;