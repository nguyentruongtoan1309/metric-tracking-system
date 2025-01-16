const express = require('express');
const router = express.Router();
const metricRoutes = require('./metricRoutes');
const userRoutes = require('./userRoutes');

router.use(userRoutes);
router.use(metricRoutes);

module.exports = router;
