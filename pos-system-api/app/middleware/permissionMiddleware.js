// middleware/permissionMiddleware.js
const Permission = require('../models/Permission');

module.exports = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const role_id = req.user.role_id;

      if (!role_id) {
        return res.status(400).json({ error: 'Missing role_id in token' });
      }

      const permission = await Permission.findOne({ role_id });

      if (!permission || permission[requiredPermission] !== true) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      next();
    } catch (err) {
      console.error('Permission middleware error:', err);
      res.status(500).json({ error: 'Permission check failed' });
    }
  };
};
