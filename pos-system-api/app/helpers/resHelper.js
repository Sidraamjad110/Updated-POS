let RESPONSE = {
  ERROR: {
    DATA_NOT_FOUND: (message) => {
      if (!message) message = "";
      return { statusCode: 404, message, success: false, error: "DATA_NOT_FOUND", type: 0 };
    },
    BAD_REQUEST: (message) => {
      if (!message) message = "";
      return { statusCode: 400, message, success: false, error: "BAD_REQUEST", type: 0 };
    },
    MONGO_EXCEPTION: (message) => {
      if (!message) message = "";
      return { statusCode: 100, message, success: false, error: "MONGO_EXCEPTION", type: 0 };
    },
    ALREADY_EXISTS: (message) => {
      if (!message) message = "";
      return { statusCode: 400, message, success: false, error: "ALREADY_EXISTS", type: 0 };
    },
    CONFLICT: (message) => {
      if (!message) message = "";
      return { statusCode: 409, message, success: false, error: "CONFLICT", type: 0 };
    },
    FORBIDDEN: (message) => {
      if (!message) message = "";
      return { statusCode: 403, message, success: false, error: "Forbidden", type: 0 };
    },
    INTERNAL_SERVER_ERROR: (message) => {
      if (!message) message = "";
      return { statusCode: 500, message, success: false, error: "INTERNAL_SERVER_ERROR", type: 0 };
    },
    UNAUTHORIZED: (message) => {
      if (!message) message = "";
      return { statusCode: 401, message, success: false, error: "UNAUTHORIZED", type: 0 };
    },
    DB_CHECK_FAIL: (message, type = 0) => {
      if (!message) message = "";
      return { statusCode: 200, message, success: false, error: "DB_CHECK_FAIL", type };
    },
  },
  SUCCESS: {
    MISSCELANEOUSAPI: (message, data) => {
      if (!message) message = "";
      const response = { statusCode: 200, message, success: true, type: 1 };
      if (data) response.data = data;
      return response;
    },
    SUCCESS_FAILURE: (message, type = 0) => {
      if (!message) message = "";
      return { statusCode: 200, message, success: false, type };
    },
  },
};

// Define functions
function createSuccessResponse(message, data) {
  return RESPONSE.SUCCESS.MISSCELANEOUSAPI(message, data);
}

function createSuccessFalseResponse(message) {
  return RESPONSE.SUCCESS.SUCCESS_FAILURE(message);
}

function createErrorResponse(message, errorType, type = 0) {
  return RESPONSE.ERROR[errorType] ? RESPONSE.ERROR[errorType](message, type) : RESPONSE.ERROR.INTERNAL_SERVER_ERROR(message);
}

function mapHttpErrorToResponseType(status) {
  const statusMap = {
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "DATA_NOT_FOUND",
    409: "CONFLICT",
    500: "INTERNAL_SERVER_ERROR",
  };
  return statusMap[status] || "INTERNAL_SERVER_ERROR";
}

function handleResponse(res, promise, successMessage) {
  promise
    .then((data) => res.json(createSuccessResponse(successMessage, data ? { data } : null)))
    .catch((error) => {
      if (error.status) {
        const errorType = mapHttpErrorToResponseType(error.status);
        res.status(error.status).json(createErrorResponse(error.message, errorType, 0));
      } else {
        res.status(500).json(createErrorResponse(error.message, error.type || "INTERNAL_SERVER_ERROR"));
      }
    });
}

// Export all functions
module.exports = {
  createErrorResponse,
  createSuccessResponse,
  createSuccessFalseResponse,
  handleResponse,
};