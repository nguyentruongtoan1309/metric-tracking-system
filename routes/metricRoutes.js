const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { metricControllers } = require('../controllers');
const { metricValidations, validate } = require('../validations');

router.get('/metrics', auth, validate(metricValidations.getMetrics), metricControllers.getMetrics);
router.post('/metrics', auth, validate(metricValidations.addMetric), metricControllers.addMetric);
router.get('/metrics/charts', auth, validate(metricValidations.getMetricsCharts), metricControllers.getMetricsCharts);

module.exports = router;
