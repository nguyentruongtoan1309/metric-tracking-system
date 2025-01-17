const { createLogger, format, transports, loggers: winstonLogger } = require('winston');
const { combine, printf, timestamp } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  exitOnError: false,
  levels: {
    fatal: 0,
    error: 1,
    trace: 2,
    warn: 3,
    info: 4,
    debug: 5,
  },
  format: combine(
    // format.colorize(),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    printf((info) => {
      const splat = info[Symbol.for('splat')];
      if (splat) {
        return `[${info.timestamp}] - [${info.level}] ${info.message} - meta: ${JSON.stringify(splat[0])}`;
      }
      return `[${info.timestamp}] - [${info.level}] ${info.message} `;
    }),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      handleExceptions: true,
      stderrLevels: ['error', 'warning'],
    }),
    new transports.Console({
      level: 'error',
      handleExceptions: true,
      stderrLevels: ['error', 'warning'],
    }),
    new transports.DailyRotateFile({
      level: 'trace',
      filename: 'logs/%DATE%_trace.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '50m',
      prepend: true,
    }),
    new transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/%DATE%_error.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '50m',
      prepend: true,
    }),
  ],
});

module.exports = logger;
