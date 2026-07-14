'use strict';

const swaggerUi = require('swagger-ui-express');
const JoiToSwagger = require('joi-to-swagger');

try {
  const userRoutes = require('./routes/v1/userRoutes');
  const categoryRoutes = require('./routes/v1/categoryRoutes');
  const productRoutes = require('./routes/v1/productRoutes');
  const rolePermissionRoutes = require('./routes/v1/rolePermissionRoutes');
  const orderRoutes = require('./routes/v1/orderRoutes');

  const allRoutes = [...userRoutes, ...categoryRoutes, ...productRoutes, ...rolePermissionRoutes, ...orderRoutes];

  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API Documentation',
      version: '1.0.0',
      description: 'API for managing users, categories, products, roles, and permissions in a restaurant system',
      contact: { name: 'Restaurant Team' },
      license: { name: 'MIT' },
    },
    servers: [
      { url: process.env.SERVER_URL || 'http://192.168.18.107:3000', description: 'Active server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {},
    },
  };

  const paths = {};
  const schemas = {};

  // STEP 1: Generate schemas
  allRoutes.forEach((route) => {
    const joiBody = route.joiSchemaForSwagger?.body;
    if (joiBody) {
      const { swagger } = JoiToSwagger(joiBody);
      const schemaName = joiBody._meta?.[0]?.className;

      if (schemaName) {
        schemas[schemaName] = {
          type: 'object',
          properties: swagger.properties || {},
          required: swagger.required || [],
          description: joiBody._description || 'Request body',
        };
      }
    }
  });

  swaggerDefinition.components.schemas = schemas;

  // STEP 2: Build paths
  allRoutes.forEach((route) => {
    const { method, path, joiSchemaForSwagger } = route;
    const swaggerPath = path.replace(/:([^/]+)/g, '{$1}');
    if (!paths[swaggerPath]) paths[swaggerPath] = {};

    // Header parameters
    const parameters = [];
    if (joiSchemaForSwagger?.headers) {
      const { swagger: headerSwagger } = JoiToSwagger(joiSchemaForSwagger.headers);
      if (headerSwagger?.properties) {
        Object.entries(headerSwagger.properties).forEach(([name, schema]) => {
          parameters.push({
            name,
            in: 'header',
            required: (headerSwagger.required || []).includes(name),
            schema,
          });
        });
      }
    }

    // Build requestBody
    const joiBody = joiSchemaForSwagger?.body;
    const schemaName = joiBody?._meta?.[0]?.className;
    let requestBody;

    if (joiBody) {
      const { swagger } = JoiToSwagger(joiBody);
      if (schemaName && schemas[schemaName]) {
        requestBody = {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: `#/components/schemas/${schemaName}`,
              },
            },
          },
        };
      } else {
        requestBody = {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: swagger.properties || {},
                required: swagger.required || [],
              },
            },
          },
        };
      }
    }

    paths[swaggerPath][method.toLowerCase()] = {
      tags: [joiSchemaForSwagger.group || 'General'],
      summary: joiSchemaForSwagger.description || 'No description',
      parameters,
      requestBody,
      responses: {
        200: { description: 'Success' },
        400: { description: 'Bad Request' },
        401: { description: 'Unauthorized' },
        403: { description: 'Forbidden' },
        404: { description: 'Not Found' },
        500: { description: 'Internal Server Error' },
      },
      security: route.auth === 'AUTH_TOKEN' ? [{ bearerAuth: [] }] : [],
    };
  });

  module.exports = {
    swaggerUi,
    swaggerOptions: {
      openapi: '3.0.0',
      info: swaggerDefinition.info,
      servers: swaggerDefinition.servers,
      paths,
      components: swaggerDefinition.components,
    },
  };
} catch (error) {
  console.error('Error loading routes:', error);
  throw error;
}
