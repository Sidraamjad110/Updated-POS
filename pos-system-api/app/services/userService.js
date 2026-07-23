const createError = require("http-errors");
const { Op } = require("sequelize");
const { User, Role, CustomerProfile, WorkerProfile } = require("../models");
const COMMON_FUN = require("../utils/utils");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../utils/constants");
const Joi = require("joi");
const { passwordValidation, convertErrorIntoReadableForm } = require("../utils/utils");
const { serialize, isValidId } = require("../utils/serialize");

const userService = {};

const userInclude = [
  { model: Role, as: "role", attributes: ["id", "name"] },
  { model: User, as: "creator", attributes: ["id", "name", "email"] },
];

const USER_BLOB_EXCLUDE = ["password", "logo_data", "store_logo_data"];

function publicBaseUrl() {
  return (process.env.PUBLIC_URL || process.env.SERVER_URL || "").replace(/\/$/, "");
}

function logoImageUrl(userId) {
  const path = `/users/api/v1/logo/${userId}`;
  const base = publicBaseUrl();
  return base ? `${base}${path}` : path;
}

function storeLogoImageUrl(userId) {
  const path = `/users/api/v1/store-logo/${userId}`;
  const base = publicBaseUrl();
  return base ? `${base}${path}` : path;
}

function mapUserImages(data) {
  if (!data) return data;
  const id = data.id || data._id;
  delete data.logo_data;
  delete data.store_logo_data;
  // Prefer DB-backed image endpoints when MIME (blob present) is known
  if (data.logo_mime && id) data.logoUrl = logoImageUrl(id);
  if (data.store_logo_mime && id) data.store_logo = storeLogoImageUrl(id);
  delete data.logo_mime;
  delete data.store_logo_mime;
  return data;
}

function mapPopulatedUser(user) {
  if (!user) return null;
  const data = serialize(user);
  if (data.role) data.role_id = data.role;
  if (data.creator) data.created_by = data.creator;
  return mapUserImages(data);
}

async function findUserByIdPopulated(id, excludePassword = true) {
  const options = { include: userInclude };
  options.attributes = {
    exclude: excludePassword ? USER_BLOB_EXCLUDE : ["logo_data", "store_logo_data"],
  };
  const user = await User.findByPk(id, options);
  // Need mime flags for URL mapping — fetch lightly if excluded
  if (user) {
    const flags = await User.findByPk(id, {
      attributes: ["id", "logo_mime", "store_logo_mime", "logoUrl", "store_logo"],
    });
    if (flags) {
      user.dataValues.logo_mime = flags.logo_mime;
      user.dataValues.store_logo_mime = flags.store_logo_mime;
      if (flags.logoUrl) user.dataValues.logoUrl = flags.logoUrl;
      if (flags.store_logo) user.dataValues.store_logo = flags.store_logo;
    }
  }
  return mapPopulatedUser(user);
}

userService.createAdmin = async (userData) => {
  try {
    await Joi.object({ password: passwordValidation }).validateAsync({ password: userData.password });

    const {
      name,
      email,
      password,
      store_name,
      theme,
      phone_number,
      address,
      slug: requestedSlug,
      logo_data,
      logo_mime,
      store_logo_data,
      store_logo_mime,
    } = userData;
    if (!name) throw createError(400, "Name is required");
    if (!email) throw createError(400, "Email is required");
    if (!password) throw createError(400, "Password is required");
    if (!store_name) throw createError(400, "Store name is required");

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw createError(409, "Email already exists");

    const hashedPassword = await COMMON_FUN.hashPassword(password);
    const fromName = String(store_name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const fromRequest = requestedSlug
      ? String(requestedSlug)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";
    const slug = fromRequest || fromName;

    // Frontend sends one "logo" file — use it as store logo (and admin logo) in DB
    const logoBytes = logo_data || store_logo_data || null;
    const logoMime = logo_mime || store_logo_mime || null;

    const newAdmin = await User.create({
      name,
      email,
      store_name,
      password: hashedPassword,
      user_type: "isadmin",
      role_id: null,
      created_by: null,
      theme: theme || "light",
      slug,
      phone_number: phone_number || null,
      address: address || null,
      logo_data: logoBytes,
      logo_mime: logoBytes ? logoMime || "image/jpeg" : null,
      store_logo_data: logoBytes,
      store_logo_mime: logoBytes ? logoMime || "image/jpeg" : null,
      logoUrl: null,
      store_logo: null,
    });

    if (logoBytes) {
      await newAdmin.update({
        logoUrl: logoImageUrl(newAdmin.id),
        store_logo: storeLogoImageUrl(newAdmin.id),
      });
    }

    try {
      const permissionService = require("./permissionService");
      await permissionService.ensureDefaultPermissionsForAdmin(newAdmin.id);
    } catch (seedErr) {
      console.error("Failed to seed default permissions for admin:", seedErr.message || seedErr);
    }

    return await findUserByIdPopulated(newAdmin.id);
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

  const existingAdmin = await User.findOne({ where: { user_type: "isadmin" } });

  if (!existingAdmin) {
    if (user_type !== "isadmin") throw createError(400, "The first user must be an admin");
  } else {
    if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
      throw createError(403, "Only admins can create users");
    }
    if (user_type === "isadmin") throw createError(403, "Admins cannot create other admins");
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) throw createError(409, "Email already exists");

  const hashedPassword = await COMMON_FUN.hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    user_type,
    role_id: user_type === "isadmin" ? null : role_id || null,
    created_by: loggedInUser ? loggedInUser.user_id : null,
  });

  if (user_type === "customer") {
    await CustomerProfile.create({
      user_id: newUser.id,
      phone_number,
      address,
      loyalty_points: 0,
    });
  } else if (user_type === "worker") {
    await WorkerProfile.create({ user_id: newUser.id, job_title, shift_time, salary });
  }

  return await findUserByIdPopulated(newUser.id);
};

userService.login = async (email, password) => {
  if (!email || !password) throw createError(400, "Email and password are required");

  const user = await User.findOne({ where: { email } });
  if (!user) throw createError(401, "Invalid email or password");

  const match = await COMMON_FUN.comparePassword(password, user.password);
  if (!match) throw createError(401, "Invalid email or password");

  const userDoc = await User.findByPk(user.id, {
    attributes: ["user_type", "created_by", "role_id"],
  });
  const tokenPayload = {
    user_id: user.id,
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
  const safe = serialize(user);
  delete safe.password;
  return { token, user: mapUserImages(safe) };
};

userService.getUsersByAdmin = async (loggedInUser) => {
  if (loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can access user list");
  }

  const users = await User.findAll({
    where: { created_by: loggedInUser.user_id },
    attributes: { exclude: ["password", "logo_data", "store_logo_data"] },
    include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
  });

  return users.map((u) => {
    const data = serialize(u);
    if (data.role) data.role_id = data.role;
    return mapUserImages(data);
  });
};

userService.deleteUser = async (loggedInUser, userIdToDelete) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can delete users");
  }

  if (!userIdToDelete) throw createError(400, "User ID is required");
  if (!isValidId(userIdToDelete)) throw createError(400, "Invalid user ID");

  const userToDelete = await User.findByPk(userIdToDelete);
  if (!userToDelete) throw createError(404, "User not found");

  if (userToDelete.user_type === "isadmin") {
    throw createError(403, "Cannot delete admin users");
  }

  await User.destroy({ where: { id: userIdToDelete } });
  return true;
};

userService.assignRoleToUser = async (loggedInUser, userId, roleId) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can assign roles");
  }

  if (!userId || !roleId) throw createError(400, "User ID and role ID are required");

  const user = await User.findByPk(userId);
  if (!user) throw createError(404, "User not found");

  if (user.user_type === "isadmin") {
    throw createError(403, "Cannot assign roles to admin users");
  }

  const role = await Role.findByPk(roleId);
  if (!role) throw createError(404, "Role not found");

  if (role.created_by !== loggedInUser.user_id) {
    throw createError(403, "Role does not belong to this admin");
  }

  user.role_id = roleId;
  await user.save();

  return await findUserByIdPopulated(userId);
};

userService.updateUserProfile = async (loggedInUser, userId, profileData) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can update user profiles");
  }

  if (!userId) throw createError(400, "User ID is required");

  const user = await User.findByPk(userId);
  if (!user) throw createError(404, "User not found");

  if (user.created_by !== loggedInUser.user_id) {
    throw createError(403, "You can only update users you created");
  }

  if (user.user_type === "isadmin") {
    throw createError(403, "Cannot update admin profiles with this endpoint");
  }

  const { name, email, phone_number, address, job_title, shift_time, salary, password } = profileData;

  if (email) {
    const existing = await User.findOne({ where: { email, id: { [Op.ne]: user.id } } });
    if (existing) throw createError(409, "Email already exists");
    user.email = email;
  }

  if (name) user.name = name;
  if (password) user.password = await COMMON_FUN.hashPassword(password);

  await user.save();

  let profile = null;
  if (user.user_type === "customer") {
    const customerProfile = await CustomerProfile.findOne({ where: { user_id: user.id } });
    if (customerProfile) {
      const updates = {};
      if (phone_number !== undefined) updates.phone_number = phone_number;
      if (address !== undefined) updates.address = address;
      await customerProfile.update(updates);
      profile = serialize(customerProfile);
    }
  } else if (user.user_type === "worker") {
    const workerProfile = await WorkerProfile.findOne({ where: { user_id: user.id } });
    if (workerProfile) {
      const updates = {};
      if (job_title !== undefined) updates.job_title = job_title;
      if (shift_time !== undefined) updates.shift_time = shift_time;
      if (salary !== undefined) updates.salary = salary;
      await workerProfile.update(updates);
      profile = serialize(workerProfile);
    }
  }

  const populatedUser = await findUserByIdPopulated(user.id);
  return { user: populatedUser, profile };
};

userService.updateAdminProfile = async (loggedInUser, profileData) => {
  try {
    if (profileData.password) {
      await Joi.object({ password: passwordValidation }).validateAsync({ password: profileData.password });
    }

    const {
      name,
      email,
      password,
      store_name,
      theme,
      logo_data,
      logo_mime,
      store_logo_data,
      store_logo_mime,
    } = profileData;

    const hasLogoUpload = !!(logo_data || store_logo_data);
    if (!name && !email && !password && !store_name && !theme && !hasLogoUpload) {
      throw createError(400, "At least one field (name, email, password, logo, store name, store logo, theme) is required");
    }

    const user = await User.findByPk(loggedInUser.user_id);
    if (!user) throw createError(404, "User not found");
    if (user.id !== loggedInUser.user_id) {
      throw createError(403, "You can only update your own profile");
    }

    if (user.user_type !== "isadmin") {
      throw createError(403, "Only admins can use this endpoint");
    }

    if (email) {
      const existing = await User.findOne({ where: { email, id: { [Op.ne]: user.id } } });
      if (existing) throw createError(409, "Email already exists");
      user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = await COMMON_FUN.hashPassword(password);
    if (store_name) user.store_name = store_name;
    if (theme) user.theme = theme;

    if (logo_data) {
      user.logo_data = logo_data;
      user.logo_mime = logo_mime || "image/jpeg";
      user.logoUrl = logoImageUrl(user.id);
    }
    if (store_logo_data || logo_data) {
      const bytes = store_logo_data || logo_data;
      const mime = store_logo_mime || logo_mime || "image/jpeg";
      user.store_logo_data = bytes;
      user.store_logo_mime = mime;
      user.store_logo = storeLogoImageUrl(user.id);
    }

    await user.save();

    return await findUserByIdPopulated(user.id);
  } catch (error) {
    const readable = convertErrorIntoReadableForm(error);
    throw createError(error.status || 400, readable);
  }
};

userService.getUserDetails = async (loggedInUser) => {
  const user = await User.findByPk(loggedInUser.user_id, {
    attributes: { exclude: ["password", "logo_data", "store_logo_data"] },
    include: userInclude,
  });

  if (!user) throw createError(404, "User not found");

  const flags = await User.findByPk(user.id, {
    attributes: ["logo_mime", "store_logo_mime"],
  });

  if (user.user_type === "customer") {
    await CustomerProfile.findOne({ where: { user_id: user.id } });
  } else if (user.user_type === "worker") {
    await WorkerProfile.findOne({ where: { user_id: user.id } });
  }

  const mapped = mapUserImages({
    id: user.id,
    name: user.name,
    email: user.email,
    store_name: user.store_name,
    logoUrl: user.logoUrl || null,
    store_logo: user.store_logo || null,
    logo_mime: flags?.logo_mime || null,
    store_logo_mime: flags?.store_logo_mime || null,
    theme: user.theme,
    status: user.status,
    slug: user.slug,
    currency: user.currency,
    user_type: user.user_type,
  });

  return { user: mapped };
};

userService.getLogoImage = async (userId) => {
  if (!isValidId(userId)) throw createError(400, "Invalid user ID");
  const user = await User.findByPk(userId, {
    attributes: ["id", "logo_data", "logo_mime"],
  });
  if (!user || !user.logo_data) throw createError(404, "Logo not found");
  return {
    data: user.logo_data,
    mime: user.logo_mime || "image/jpeg",
  };
};

userService.getStoreLogoImage = async (userId) => {
  if (!isValidId(userId)) throw createError(400, "Invalid user ID");
  const user = await User.findByPk(userId, {
    attributes: ["id", "store_logo_data", "store_logo_mime", "logo_data", "logo_mime"],
  });
  if (!user) throw createError(404, "Store logo not found");
  const data = user.store_logo_data || user.logo_data;
  if (!data) throw createError(404, "Store logo not found");
  return {
    data,
    mime: user.store_logo_mime || user.logo_mime || "image/jpeg",
  };
};

userService.getPublicStoreBySlug = async (slug) => {
  if (!slug || !String(slug).trim()) throw createError(400, "Store slug is required");
  const cleaned = String(slug).trim().toLowerCase();
  const user = await User.findOne({
    where: { slug: cleaned, user_type: "isadmin", status: 1 },
    attributes: {
      exclude: ["password", "logo_data", "store_logo_data"],
    },
  });
  if (!user) throw createError(404, "Store not found");

  const flags = await User.findByPk(user.id, {
    attributes: ["logo_mime", "store_logo_mime"],
  });

  const store = mapUserImages({
    id: user.id,
    name: user.store_name || user.name,
    store_name: user.store_name,
    logo: null,
    store_logo: user.store_logo,
    logoUrl: user.logoUrl,
    logo_mime: flags?.logo_mime || null,
    store_logo_mime: flags?.store_logo_mime || null,
    theme: user.theme,
    currency: user.currency,
    slug: user.slug,
    address: user.address,
    phone_number: user.phone_number,
  });
  store.logo = store.store_logo || store.logoUrl;

  return { store };
};

userService.updateUserStatus = async (loggedInUser, userId) => {
  if (!loggedInUser || loggedInUser.user_type !== "isadmin") {
    throw createError(403, "Only admins can update user status");
  }

  if (!userId) throw createError(400, "User ID is required");

  const user = await User.findByPk(userId);
  if (!user) throw createError(404, "User not found");

  if (user.user_type === "isadmin") {
    throw createError(403, "Cannot update admin status");
  }

  user.status = 0;
  await user.save();

  return await findUserByIdPopulated(userId);
};

module.exports = userService;
