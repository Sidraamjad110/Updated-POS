const createError = require("http-errors");
const User = require("../models/User");
const Role = require("../models/Role");
const CustomerProfile = require("../models/CustomerProfile");
const WorkerProfile = require("../models/WorkerProfile");
const COMMON_FUN = require("../utils/utils");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../utils/constants");
const Joi = require("joi");
const { passwordValidation, convertErrorIntoReadableForm } = require("../utils/utils");

const userService = {};

userService.createAdmin = async (userData) => {
  try {
    await Joi.object({ password: passwordValidation }).validateAsync({ password: userData.password });

    const { name, email, password, logoUrl, store_name, store_logo, theme } = userData;
    if (!name) throw createError(400, "Name is required");
    if (!email) throw createError(400, "Email is required");
    if (!password) throw createError(400, "Password is required");
    if (!store_name) throw createError(400, "Store name is required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw createError(409, "Email already exists");

    const hashedPassword = await COMMON_FUN.hashPassword(password);

    const newAdmin = new User({
      name,
      email,
      store_name,
      store_logo: store_logo || null,
      password: hashedPassword,
      user_type: "isadmin",
      role_id: null,
      created_by: null,
      logoUrl: logoUrl || null,
      theme: theme || "light",
    });

    await newAdmin.save();

    const adminSafe = newAdmin.toObject();
    delete adminSafe.password;

    return adminSafe;
  } catch (error) {
    const readable = convertErrorIntoReadableForm(error);
    throw createError(error.status || 400, readable);
  }
};

userService.createUser = async (loggedInUser, userData) => {
  const { name, email, password, user_type, role_id, phone_number, address, job_title, shift_time, salary } = userData;

  if (!name) throw createError(400, "Name is required");
  if (!email) throw createError(400, "Email is required");
  if (!password) throw createError(400, "Password is required");
  if (!user_type) throw createError(400, "User type is required");

  if (user_type === "customer") {
    if (!phone_number) throw createError(400, "Phone number is required for customers");
    if (!address) throw createError(400, "Address is required for customers");
  }

  const existingAdmin = await User.findOne({ user_type: "isadmin" });

  if (!existingAdmin) {
    if (user_type !== "isadmin") throw createError(400, "The first user must be an admin");
  } else {
    if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
      throw createError(403, "Only admins can create users");
    }
    if (user_type === "isadmin") throw createError(403, "Admins cannot create other admins");
  }

  const existing = await User.findOne({ email });
  if (existing) throw createError(409, "Email already exists");

  const hashedPassword = await COMMON_FUN.hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    user_type,
    role_id: user_type === "isadmin" ? null : role_id || null,
    created_by: loggedInUser ? loggedInUser.user_id : null,
  });

  await newUser.save();

  if (user_type === "customer") {
    await CustomerProfile.create({
      user_id: newUser._id,
      phone_number,
      address,
      loyalty_points: 0,
    });
  } else if (user_type === "worker") {
    await WorkerProfile.create({ user_id: newUser._id, job_title, shift_time, salary });
  }

  return await User.findById(newUser._id).select("-password").populate("created_by", "name email");
};

userService.login = async (email, password) => {
  if (!email || !password) throw createError(400, "Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw createError(401, "Invalid email or password");

  const match = await COMMON_FUN.comparePassword(password, user.password);
  if (!match) throw createError(401, "Invalid email or password");

  const userDoc = await User.findById(user._id).select("user_type created_by role_id");
  const tokenPayload = {
    user_id: user._id,
    user_type: user.user_type,
    role_id: user.role_id,
  };
  if (user.user_type !== "isadmin") {
    if (!userDoc.created_by) throw createError(400, "User is missing created_by field");
    tokenPayload.created_by = userDoc.created_by;
  }
  const token = jwt.sign(
    tokenPayload,
    process.env.JWT_SECRET || CONSTANTS.SECURITY.JWT_SIGN_KEY
  );
  return { token, user };
};

userService.getUsersByAdmin = async (loggedInUser) => {
  if (loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can access user list");
  }

  return await User.find({ created_by: loggedInUser.user_id })
    .select("-password")
    .populate("role_id", "name");
};

userService.deleteUser = async (loggedInUser, userIdToDelete) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can delete users");
  }

  if (!userIdToDelete) throw createError(400, "User ID is required");

  const userToDelete = await User.findById(userIdToDelete);
  if (!userToDelete) throw createError(404, "User not found");

  if (userToDelete.user_type === "isadmin") {
    throw createError(403, "Cannot delete admin users");
  }

  await User.deleteOne({ _id: userIdToDelete });
  return true;
};

userService.assignRoleToUser = async (loggedInUser, userId, roleId) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can assign roles");
  }

  if (!userId || !roleId) throw createError(400, "User ID and role ID are required");

  const user = await User.findById(userId);
  if (!user) throw createError(404, "User not found");

  if (user.user_type === "isadmin") {
    throw createError(403, "Cannot assign roles to admin users");
  }

  const role = await Role.findById(roleId);
  if (!role) throw createError(404, "Role not found");

  if (role.created_by.toString() !== loggedInUser.user_id.toString()) {
    throw createError(403, "Role does not belong to this admin");
  }

  user.role_id = roleId;
  await user.save();

  return await User.findById(userId)
    .select("-password")
    .populate("role_id", "name")
    .populate("created_by", "name email");
};

userService.updateUserProfile = async (loggedInUser, userId, profileData) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can update user profiles");
  }

  if (!userId) throw createError(400, "User ID is required");

  const user = await User.findById(userId);
  if (!user) throw createError(404, "User not found");

  if (user.created_by.toString() !== loggedInUser.user_id.toString()) {
    throw createError(403, "You can only update users you created");
  }

  if (user.user_type === "isadmin") {
    throw createError(403, "Cannot update admin profiles with this endpoint");
  }

  const { name, email, phone_number, address, job_title, shift_time, salary, password } = profileData;

  if (email) {
    const existing = await User.findOne({ email, _id: { $ne: user._id } });
    if (existing) throw createError(409, "Email already exists");
    user.email = email;
  }

  if (name) user.name = name;
  if (password) user.password = await COMMON_FUN.hashPassword(password);

  await user.save();

  let profile = null;
  if (user.user_type === "customer") {
    profile = await CustomerProfile.findOneAndUpdate(
      { user_id: user._id },
      {
        phone_number: phone_number || undefined,
        address: address || undefined,
      },
      { new: true }
    );
  } else if (user.user_type === "worker") {
    profile = await WorkerProfile.findOneAndUpdate(
      { user_id: user._id },
      { job_title: job_title || undefined, shift_time: shift_time || undefined, salary: salary || undefined },
      { new: true }
    );
  }

  const populatedUser = await User.findById(user._id)
    .select("-password")
    .populate("role_id", "name")
    .populate("created_by", "name email");

  return { user: populatedUser, profile };
};

userService.updateAdminProfile = async (loggedInUser, profileData) => {
  try {
    if (profileData.password) {
      await Joi.object({ password: passwordValidation }).validateAsync({ password: profileData.password });
    }

    const { name, email, password, logoUrl, store_name, store_logo, theme } = profileData;
    if (!name && !email && !password && !logoUrl && !store_name && !store_logo && !theme) {
      throw createError(400, "At least one field (name, email, password, logo, store name, store logo, theme) is required");
    }

    const user = await User.findById(loggedInUser.user_id);
    if (!user) throw createError(404, "User not found");
    if (user._id.toString() !== loggedInUser.user_id.toString()) {
      throw createError(403, "You can only update your own profile");
    }

    if (user.user_type !== "isadmin") {
      throw createError(403, "Only admins can use this endpoint");
    }

    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: user._id } });
      if (existing) throw createError(409, "Email already exists");
      user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = await COMMON_FUN.hashPassword(password);
    if (logoUrl) user.logoUrl = logoUrl;
    if (store_name) user.store_name = store_name;
    if (store_logo) user.store_logo = store_logo;
    if (theme) user.theme = theme;

    await user.save();

    return await User.findById(user._id).select("-password").populate("created_by", "name email");
  } catch (error) {
    const readable = convertErrorIntoReadableForm(error);
    throw createError(error.status || 400, readable);
  }
};

userService.getUserDetails = async (loggedInUser) => {
  const user = await User.findById(loggedInUser.user_id)
    .select("-password")
    .populate("role_id", "name")
    .populate("created_by", "name email");

  if (!user) throw createError(404, "User not found");

  let profile = null;
  if (user.user_type === "customer") {
    profile = await CustomerProfile.findOne({ user_id: user._id });
  } else if (user.user_type === "worker") {
    profile = await WorkerProfile.findOne({ user_id: user._id });
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      store_name: user.store_name,
      logoUrl: user.logoUrl || null,
      store_logo: user.store_logo || null,
      theme: user.theme,
      status: user.status,
    },
  };
};

userService.updateUserStatus = async (loggedInUser, userId) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can update user status");
  }

  if (!userId) throw createError(400, "User ID is required");

  const user = await User.findById(userId);
  if (!user) throw createError(404, "User not found");

  if (user.user_type === "isadmin") {
    throw createError(403, "Cannot update admin status");
  }

  user.status = 0;
  await user.save();

  return await User.findById(userId)
    .select("-password")
    .populate("role_id", "name")
    .populate("created_by", "name email");
};

module.exports = userService;