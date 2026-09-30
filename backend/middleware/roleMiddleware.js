const roleMiddleware = (...allowedRoles) => {
  // Normalize allowed roles once (case-insensitive comparison)
  const allowed = allowedRoles.map((role) =>
    String(role).trim().toLowerCase()
  );

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
          message: "User role is not available.",
        });
      }

      const userRole = String(req.user.role).trim().toLowerCase();

      if (!allowed.includes(userRole)) {
        return res.status(403).json({
          message:
            "You do not have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      console.error("Role Authorization Error:", error);

      return res.status(500).json({
        message: "Server error during role authorization.",
      });
    }
  };
};

module.exports = roleMiddleware;