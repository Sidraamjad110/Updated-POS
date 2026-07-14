const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: 'Token required' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_default_secret");
    req.user = decoded; // decoded should contain user_id, role_id, user_type, etc.
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
