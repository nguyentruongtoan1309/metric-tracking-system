const express = require('express');
const router = express.Router();
const metricRoutes = require('./metricRoutes');
const userRoutes = require('./userRoutes');

router.use(
  '/api/v1/',
  userRoutes
  // #swagger.tags = ['User']
);
router.use(
  '/api/v1/',
  metricRoutes
  // #swagger.tags = ['Metric']
);

module.exports = router;
