const { METRIC_TYPE, CHART_PERIODS } = require('../constants/metrics');
const Metric = require('../models/Metric');
const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const { Op, fn, col, literal } = require('sequelize');

const getMetrics = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { type = METRIC_TYPE.DISTANCE } = req.query;
  const metrics = await Metric.findAll({ where: { userId: id, type } });

  res.status(httpStatus.OK).send({ metrics: metrics.length ? metrics : [] });
});

const addMetric = catchAsync(async (req, res) => {
  const input = req.body;
  const metric = await Metric.create({ ...input, userId: req.user.id });
  res.send(metric);
});

const getMetricsCharts = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { type = METRIC_TYPE.DISTANCE, period = CHART_PERIODS.ONE_MONTH } = req.query;
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);

  const metrics = await Metric.findAll({
    attributes: [
      [fn('date_trunc', 'day', col('createdAt')), 'day'], // Group by day
      'type',
      [fn('MAX', col('createdAt')), 'latestEntry'], // Get the latest entry for each day
    ],
    where: {
      userId: id,
      type,
      createdAt: {
        [Op.gte]: startDate, // Filter by the start date
      },
    },
    group: [fn('date_trunc', 'day', col('createdAt')), 'type'], // Group by day and type
    order: [[literal('"latestEntry"'), 'DESC']], // Order by latest entry
  });

  // Find the full record details for the latest metrics
  const latestMetrics = await Metric.findAll({
    where: {
      [Op.or]: metrics.map((metric) => ({
        userId: id,
        type: metric.type,
        createdAt: metric.dataValues.latestEntry, // Match the latest entry
      })),
    },
  });

  res.status(httpStatus.OK).send({ metrics: latestMetrics.length ? latestMetrics : [] });
});

module.exports = {
  getMetrics,
  addMetric,
  getMetricsCharts,
};
