/** Normalize Sequelize rows so the frontend still receives Mongo-like `_id`. */
function serialize(row) {
  if (!row) return null;
  if (Array.isArray(row)) return row.map(serialize);

  const data = typeof row.toJSON === "function" ? row.toJSON() : { ...row };

  if (data.id != null && data._id == null) {
    data._id = data.id;
  }

  // Nested associations
  for (const key of Object.keys(data)) {
    const val = data[key];
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        data[key] = val.map((item) =>
          item && typeof item === "object" && (item.id != null || item.toJSON)
            ? serialize(item)
            : item
        );
      } else if (val.id != null || typeof val.toJSON === "function") {
        data[key] = serialize(val);
      }
    }
  }

  return data;
}

function isValidId(id) {
  return typeof id === "string" ? id.length > 0 : id != null && id !== "";
}

module.exports = { serialize, isValidId };
