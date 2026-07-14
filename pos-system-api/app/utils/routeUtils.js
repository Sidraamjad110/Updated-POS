const CONFIG = require("../../config");
const HELPERS = require("../helpers");
const { ERROR_TYPES, AVAILABLE_AUTHS } = require("./constants");
const utils = require("./utils");
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

let routeUtils = {};

/**
 * Registers routes with Express app,
 * applies validator, auth and permission middleware as per route config.
 */
routeUtils.route = async (app, routes = []) => {
  routes.forEach((route) => {
    let middlewares = [];

    // ✅ First: apply any route-specific middleware like multer
    if (route.middleware && Array.isArray(route.middleware)) {
      middlewares.push(...route.middleware);
    }

    // ✅ Then: add validation AFTER multer runs
    middlewares.push(getValidatorMiddleware(route));

    // ✅ Auth and permission
    if (route.auth === AVAILABLE_AUTHS.AUTH_TOKEN) {
      middlewares.push(authMiddleware);
    }

    if (route.permission) {
      middlewares.push(permissionMiddleware(route.permission));
    }

    app[route.method.toLowerCase()](route.path, ...middlewares, getHandlerMethod(route));
  });
};

/**
 * Joi validation middleware for request validation
 */
let joiValidatorMethod = async (request, route) => {
  if (!route.joiSchemaForSwagger) {
    // No schema defined for route, skip validation
    return {};
  }

  if (route.joiSchemaForSwagger.params && Object.keys(route.joiSchemaForSwagger.params).length) {
    return route.joiSchemaForSwagger.params.validate(request.params);
  }
  if (route.joiSchemaForSwagger.body && Object.keys(route.joiSchemaForSwagger.body).length) {
    return route.joiSchemaForSwagger.body.validate(request.body);
  }
  if (route.joiSchemaForSwagger.query && Object.keys(route.joiSchemaForSwagger.query).length) {
    return route.joiSchemaForSwagger.query.validate(request.query);
  }
  if (route.joiSchemaForSwagger.headers && Object.keys(route.joiSchemaForSwagger.headers).length) {
    let headersObject = route.joiSchemaForSwagger.headers.validate(request.headers);
    if (headersObject.value && headersObject.value.authorization) {
      request.headers.authorization = headersObject.value.authorization || "";
    }
    return headersObject;
  }

  return {};  // No validation needed
};

/**
 * Validator middleware wrapper
 */
let getValidatorMiddleware = (route) => {
  return (request, response, next) => {
    joiValidatorMethod(request, route)
      .then((result) => {
        if (result.error) {
          let error = utils.convertErrorIntoReadableForm(result.error.details[0]);
          console.log(error);
          let responseObject = HELPERS.responseHelper.createErrorResponse(
            error.message.toString(),
            ERROR_TYPES.BAD_REQUEST
          );
          return response.status(responseObject.statusCode).json(responseObject);
        }
        return next();
      })
      .catch((err) => {
        let error = utils.convertErrorIntoReadableForm(err);
        let responseObject = HELPERS.responseHelper.createErrorResponse(
          error.message.toString(),
          ERROR_TYPES.BAD_REQUEST
        );
        return response.status(responseObject.statusCode).json(responseObject);
      });
  };
};

/**
 * Handler wrapper
 */
let getHandlerMethod = (route) => {
  let handler = route.handler;
  return (req, res, next) => {
    handler(req, res, next);
  };
};

module.exports = routeUtils;
