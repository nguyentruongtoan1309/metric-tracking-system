const METRIC_TYPE = Object.freeze({
  DISTANCE: 'DISTANCE',
  TEMPERATURE: 'TEMPERATURE',
});

const DISTANCE_UNITS = Object.freeze({
  CENTIMETER: 'cm',
  METER: 'm',
  INCH: 'in',
  FEET: 'ft',
  YARD: 'yd',
});

const TEMPERATURE_UNITS = Object.freeze({
  C: 'C',
  F: 'F',
  K: 'K',
});

const CHART_PERIODS = Object.freeze({
  ONE_MONTH: 'ONE_MONTH',
  TWO_MONTH: 'TWO_MONTH',
});

const PERIOD_IN_TIME = Object.freeze({
  ONE_MONTH: {
    amount: 1,
    unit: 'months',
  },
  TWO_MONTH: {
    amount: 2,
    unit: 'months',
  },
});

module.exports = { METRIC_TYPE, DISTANCE_UNITS, TEMPERATURE_UNITS, CHART_PERIODS, PERIOD_IN_TIME };
