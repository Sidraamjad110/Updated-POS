const { Role, Permission } = require("../models");

module.exports = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (req.user.user_type === "isadmin") {
        return next();
      }

      const role_id = req.user.role_id;
      if (!role_id) {
        return res.status(400).json({ error: "Missing role_id in token" });
      }

      const role = await Role.findByPk(role_id, {
        include: [{ model: Permission, as: "permissions", attributes: ["key"] }],
      });

      if (!role) {
        return res.status(403).json({ error: "Permission denied" });
      }

      const permissions = role.permissions || [];
      const hasPermission = permissions.some((p) => p.key === requiredPermission);

      if (!hasPermission) {
        return res.status(403).json({ error: "Permission denied" });
      }

      next();
    } catch (err) {
      console.error("Permission middleware error:", err);
      res.status(500).json({ error: "Permission check failed" });
    }
  };
};
