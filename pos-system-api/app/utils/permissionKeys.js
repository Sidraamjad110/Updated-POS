/**
 * Full permission set used by the frontend (sidebar + action buttons).
 * Admins always receive all of these.
 */
const ALL_PERMISSION_KEYS = [
  // Sidebar / pages
  "can_view_dashboard",
  "can_view_menu",
  "can_view_orders",
  "create_orders",
  "can_view_rolemanagement",
  "can_view_tablemanagement",
  // Categories
  "can_add_categories",
  "can_edit_categories",
  "can_delete_categories",
  // Products
  "can_add_products",
  "can_edit_products",
  "can_delete_products",
  // Roles / users
  "can_add_roles",
  "can_edit_roles",
  "can_delete_roles",
  "can_add_users",
  "can_edit_users",
  "can_delete_users",
  "assign_roles",
  // Tables / floors
  "can_add_tables",
  "can_edit_tables",
  "can_delete_tables",
  "can_add_floors",
  "can_edit_floors",
  "can_delete_floors",
  // Orders workflow
  "manage_prepared_orders",
  "manage_ready_orders",
  "manage_served_orders",
  "manage_completed_orders",
  "manage_cancelled_orders",
  "accept_onlineorders",
  "Manage_order_delivery",
];

module.exports = { ALL_PERMISSION_KEYS };
