"use strict";

/********************************
 ********* All routes ***********
 ********************************/
let v1Routes = [
 
  ...require("./userRoutes"),
  ...require("./categoryRoutes"),
  ...require("./productRoutes"),
    ...require("./rolePermissionRoutes"),
      ...require("./orderRoutes"),

];
module.exports = v1Routes;
