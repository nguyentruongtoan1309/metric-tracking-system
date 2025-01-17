const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { metricControllers } = require('../controllers');
const { metricValidations, validate } = require('../validations');

router.get(
  '/metrics',
  auth,
  validate(metricValidations.getMetrics),
  metricControllers.getMetrics,
  /*          
    #swagger.responses[200] = {
        description: 'List of metrics',
        schema:{$ref: "#/components/schemas/Metrics"}
  }
  */
);
router.post(
  '/metrics',
  auth,
  validate(metricValidations.addMetric),
  metricControllers.addMetric,
  /* 
    #swagger.requestBody = {
                required: true,
                schema: { $ref: "#/components/schemas/AddMetricBody" }
  }         
    #swagger.responses[201] = {
        description: 'Add a new metric',
        schema:{$ref: "#/components/schemas/Metric"}
  }
  */
);
router.get(
  '/metrics/charts',
  auth,
  validate(metricValidations.getMetricsCharts),
  metricControllers.getMetricsCharts,
  /*         
    #swagger.responses[200] = {
        schema:{$ref: "#/components/schemas/MetricsCharts"}
  }
  */
);

module.exports = router;
