// File: app/middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Use JPG, PNG, WEBP, or GIF."), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
});

/** Attach product image bytes onto req.body for DB BLOB storage. */
const attachImageBytes = (req, res, next) => {
  if (req.file && req.file.buffer) {
    req.body.picture_data = req.file.buffer;
    req.body.picture_mime = req.file.mimetype || "image/jpeg";
  }
  next();
};

/**
 * Attach admin logo / store logo file buffers onto req.body for MySQL BLOB storage.
 * No third-party image host.
 */
const attachAdminLogoBytes = (req, res, next) => {
  if (req.files?.logo?.[0]?.buffer) {
    req.body.logo_data = req.files.logo[0].buffer;
    req.body.logo_mime = req.files.logo[0].mimetype || "image/jpeg";
  }
  if (req.files?.store_logo?.[0]?.buffer) {
    req.body.store_logo_data = req.files.store_logo[0].buffer;
    req.body.store_logo_mime = req.files.store_logo[0].mimetype || "image/jpeg";
  }
  next();
};

module.exports = { upload, attachImageBytes, attachAdminLogoBytes };
