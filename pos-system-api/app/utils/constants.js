"use strict";

let CONSTANTS = {};

CONSTANTS.SECURITY = {
  JWT_SIGN_KEY: "resturent _SECRET_KEYlfadsfkads",  // Used as default JWT secret fallback
   
  
};

CONSTANTS.ERROR_TYPES = {
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDEN",       
  UNAUTHORIZED: "UNAUTHORIZED", 
  
};

CONSTANTS.AVAILABLE_AUTHS = {
  AUTH_TOKEN: "AUTH_TOKEN",  // Used in route utils to control auth middleware
};

module.exports = CONSTANTS;
