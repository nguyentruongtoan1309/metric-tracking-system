const {
  METRIC_TYPE,
  CHART_PERIODS,
  PERIOD_IN_TIME,
  DISTANCE_UNITS,
  TEMPERATURE_UNITS,
} = require('../constants/metrics');
const Metric = require('../models/Metric');
const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const { Op, fn, col } = require('sequelize');
const moment = require('moment-timezone');
const { convertValue } = require('../utils/converter');

const getMetrics = catchAsync(async (req, res) => {
  const { id } = req.user;
  let { type = METRIC_TYPE.DISTANCE, unit } = req.query;

  if (!unit) {
    unit = type === METRIC_TYPE.DISTANCE ? DISTANCE_UNITS.METER : TEMPERATURE_UNITS.C;
  }

  let metrics = await Metric.findAll({ where: { userId: id, type }, raw: true });

  metrics = metrics.map((metric) => ({
    ...metric,
    value: convertValue(metric.value, metric.type, metric.unit, unit),
    unit,
  }));

  res.status(httpStatus.OK).send({ metrics: metrics.length ? metrics : [] });
});

const addMetric = catchAsync(async (req, res) => {
  const input = req.body;
  const metric = await Metric.upsert({ ...input, userId: req.user.id });
  res.send(metric?.[0] || {});
});

const getMetricsCharts = catchAsync(async (req, res) => {
  const { id } = req.user;
  let { type = METRIC_TYPE.DISTANCE, period = CHART_PERIODS.ONE_MONTH, unit } = req.query;

  if (!unit) {
    unit = type === METRIC_TYPE.DISTANCE ? DISTANCE_UNITS.METER : TEMPERATURE_UNITS.C;
  }

  const endDate = moment().endOf('day').toISOString();
  const startDate = moment()
    .subtract(PERIOD_IN_TIME[period].amount, PERIOD_IN_TIME[period].unit)
    .endOf('day')
    .toISOString();

  let latestMetrics = await Metric.findAll({
    attributes: ['value', 'unit', 'type', [fn('MAX', col('date')), 'date']],
    where: {
      userId: id,
      type,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: [fn('DATE', col('date')), 'value', 'unit', 'type'],
    order: [[fn('DATE', col('date')), 'ASC']],
    raw: true,
  });

  latestMetrics = latestMetrics.map((metric) => ({
    ...metric,
    value: convertValue(metric.value, metric.type, metric.unit, unit),
    unit,
  }));

  res.status(httpStatus.OK).send({ metrics: latestMetrics.length ? latestMetrics : [] });
});

module.exports = {
  getMetrics,
  addMetric,
  getMetricsCharts,
};
