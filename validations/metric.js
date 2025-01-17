const yup = require('yup');
const { METRIC_TYPE, DISTANCE_UNITS, TEMPERATURE_UNITS, CHART_PERIODS } = require('../constants/metrics');

const addMetric = yup.object({
  body: yup.object({
    date: yup.string().required('date is required!').datetime(),
    value: yup.number().strict(true).required('value is required!'),
    unit: yup
      .string()
      .required('unit is required!')
      .test({
        name: 'validate-unit',
        test(value, ctx) {
          if (
            this.parent?.type === METRIC_TYPE.DISTANCE &&
            !Object.values(DISTANCE_UNITS).includes(this.originalValue)
          ) {
            return ctx.createError({
              message: `unit of DISTANCE must be one of the following values: ${Object.values(DISTANCE_UNITS).join(
                ', ',
              )}`,
            });
          }
          if (
            this.parent?.type === METRIC_TYPE.TEMPERATURE &&
            !Object.values(TEMPERATURE_UNITS).includes(this.originalValue)
          ) {
            return ctx.createError({
              message: `unit of TEMPERATURE must be one of the following values: ${Object.values(
                TEMPERATURE_UNITS,
              ).join(', ')}`,
            });
          }
          return true;
        },
      }),
    type: yup
      .string()
      .required('Please choose type for metric: DISTANCE or TEMPERATURE')
      .oneOf(Object.keys(METRIC_TYPE)),
  }),
});

const getMetrics = yup.object({
  query: yup.object({
    unit: yup.string().test({
      name: 'validate-unit',
      test(value, ctx) {
        if (!this.originalValue) return true;
        if (this.parent?.type === METRIC_TYPE.DISTANCE && !Object.values(DISTANCE_UNITS).includes(this.originalValue)) {
          return ctx.createError({
            message: `unit of DISTANCE must be one of the following values: ${Object.values(DISTANCE_UNITS).join(
              ', ',
            )}`,
          });
        }
        if (
          this.parent?.type === METRIC_TYPE.TEMPERATURE &&
          !Object.values(TEMPERATURE_UNITS).includes(this.originalValue)
        ) {
          return ctx.createError({
            message: `unit of TEMPERATURE must be one of the following values: ${Object.values(TEMPERATURE_UNITS).join(
              ', ',
            )}`,
          });
        }
        return true;
      },
    }),
    type: yup.string().required('type is required!').oneOf(Object.values(METRIC_TYPE)),
  }),
});

const getMetricsCharts = yup.object({
  query: yup.object({
    unit: yup.string().test({
      name: 'validate-unit',
      test(value, ctx) {
        if (!this.originalValue) return true;
        if (this.parent?.type === METRIC_TYPE.DISTANCE && !Object.values(DISTANCE_UNITS).includes(this.originalValue)) {
          return ctx.createError({
            message: `unit of DISTANCE must be one of the following values: ${Object.values(DISTANCE_UNITS).join(
              ', ',
            )}`,
          });
        }
        if (
          this.parent?.type === METRIC_TYPE.TEMPERATURE &&
          !Object.values(TEMPERATURE_UNITS).includes(this.originalValue)
        ) {
          return ctx.createError({
            message: `unit of TEMPERATURE must be one of the following values: ${Object.values(TEMPERATURE_UNITS).join(
              ', ',
            )}`,
          });
        }
        return true;
      },
    }),
    type: yup.string().required('type is required!').oneOf(Object.values(METRIC_TYPE)),
    period: yup.string().required('period is required!').oneOf(Object.values(CHART_PERIODS)),
  }),
});

module.exports = {
  addMetric,
  getMetrics,
  getMetricsCharts,
};
