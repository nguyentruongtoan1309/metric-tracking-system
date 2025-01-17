const { DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../constants/metrics');
const APIError = require('./errors');

function roundNumber(value) {
  return Number(Math.round(value + 'e5') + 'e-5');
}

function convertDistance(value, fromUnit, toUnit) {
  // Convert to meters
  const toMeter = {
    [DISTANCE_UNITS.METER]: (v) => v,
    [DISTANCE_UNITS.CENTIMETER]: (v) => v / 100,
    [DISTANCE_UNITS.INCH]: (v) => v * 0.0254,
    [DISTANCE_UNITS.FEET]: (v) => v * 0.3048,
    [DISTANCE_UNITS.YARD]: (v) => v * 0.9144,
  };

  // Convert from meters to target unit
  const fromMeter = {
    [DISTANCE_UNITS.METER]: (v) => v,
    [DISTANCE_UNITS.CENTIMETER]: (v) => v * 100,
    [DISTANCE_UNITS.INCH]: (v) => v / 0.0254,
    [DISTANCE_UNITS.FEET]: (v) => v / 0.3048,
    [DISTANCE_UNITS.YARD]: (v) => v / 0.9144,
  };

  const meters = toMeter[fromUnit](value);
  return roundNumber(fromMeter[toUnit](meters));
}

function convertTemperature(value, fromUnit, toUnit) {
  // Convert to C
  const toCelsius = {
    [TEMPERATURE_UNITS.C]: (v) => v,
    [TEMPERATURE_UNITS.F]: (v) => (v - 32) * (5 / 9),
    [TEMPERATURE_UNITS.K]: (v) => v - 273.15,
  };

  // Convert from C to target unit
  const fromCelsius = {
    [TEMPERATURE_UNITS.C]: (v) => v,
    [TEMPERATURE_UNITS.F]: (v) => (v * 9) / 5 + 32,
    [TEMPERATURE_UNITS.K]: (v) => v + 273.15,
  };

  const celsius = toCelsius[fromUnit](value);
  return roundNumber(fromCelsius[toUnit](celsius));
}

function convertValue(value, type, fromUnit, toUnit) {
  if (fromUnit === toUnit) return roundNumber(value);

  const isDistance = Object.values(DISTANCE_UNITS).includes(fromUnit) && Object.values(DISTANCE_UNITS).includes(toUnit);
  const isTemperature =
    Object.values(TEMPERATURE_UNITS).includes(fromUnit) && Object.values(TEMPERATURE_UNITS).includes(toUnit);

  if (!isDistance && !isTemperature) {
    throw new APIError('Invalid unit conversion requested');
  }

  if (isDistance) {
    return convertDistance(value, fromUnit, toUnit);
  } else {
    return convertTemperature(value, fromUnit, toUnit);
  }
}

module.exports = {
  convertValue,
  convertDistance,
  convertTemperature,
};
