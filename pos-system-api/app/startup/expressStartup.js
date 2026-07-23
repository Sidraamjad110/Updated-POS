'use strict';

const express = require('express');
const cors = require('cors');
const COMMON_FUN = require('../utils/utils');
const path = require('path');
const routeUtils = require('../utils/routeUtils');
const { swaggerUi, swaggerOptions } = require('../swagger');

try {
  const routes = require(path.join(__dirname, '../routes'));

  module.exports = async function (app) {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    let apiLogger = (req, res, next) => {
      COMMON_FUN.messageLogs(null, `api hitted ${req.url} ${req.method} ${process.env.NODE_ENV}`);
      next();
    };
    app.use(apiLogger);

    // Custom CORS middleware — allow local frontends + Cloudflare/cPanel origins
    app.use((req, res, next) => {
      const origin = req.headers.origin;
      const allowed = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3002',
        process.env.PUBLIC_URL,
        process.env.SERVER_URL,
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      const isAllowed =
        !origin ||
        allowed.includes(origin) ||
        /\.trycloudflare\.com$/.test(origin) ||
        // allow typical cPanel / hosted frontends over http(s)
        /^https?:\/\//.test(origin);

      if (isAllowed && origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      } else if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Messages'
      );
      res.setHeader('Access-Control-Max-Age', 1800);

      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    });

    app.use('/branches', express.static(path.join(__dirname, '../../public')));
    app.get('/branches', (req, res) => res.send('ok'));
    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'POS API is running',
        docs: '/api-docs',
      });
    });
    await require('./dbConfig')();
    await routeUtils.route(app, routes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
  };
} catch (error) {
  console.error('Error loading routes in expressStartup:', error);
  throw error;
}