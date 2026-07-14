const createError = require("http-errors");
const User = require("../models/User");
const CustomerProfile = require("../models/CustomerProfile");
const WorkerProfile = require("../models/WorkerProfile");
const jwt = require("jsonwebtoken");
const COMMON_FUN = require("../utils/utils");
const CONSTANTS = require("../utils/constants");

const authService = {};

// Authenticates a user and generates a JWT token
authService.login = async (email, password) => {
  if (!email || !password) throw createError(400, "Email and password are required");

  const user = await User.findOne({ email }).select("name email password user_type role_id created_by");
  if (!user) throw createError(401, "Invalid email or password");

  const match = await COMMON_FUN.comparePassword(password, user.password);
  if (!match) throw createError(401, "Invalid email or password");

  const tokenPayload = {
    user_id: user._id,
    user_type: user.user_type,
    role_id: user.role_id,
  };

  if (user.user_type !== "isadmin") {
    if (!user.created_by) throw createError(400, "User is missing created_by field");
    tokenPayload.created_by = user.created_by;
  }

  const token = jwt.sign(
    tokenPayload,
    process.env.JWT_SECRET || CONSTANTS.SECURITY.JWT_SIGN_KEY,
    //{ expiresIn: "30d" }
  );

  let profile = null;
  if (user.user_type === "customer") {
    profile = await CustomerProfile.findOne({ user_id: user._id });
  } else if (user.user_type === "worker") {
    profile = await WorkerProfile.findOne({ user_id: user._id });
  }

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      role_id: user.role_id,
      profile: profile || null,
    },
  };
};

module.exports = authService;