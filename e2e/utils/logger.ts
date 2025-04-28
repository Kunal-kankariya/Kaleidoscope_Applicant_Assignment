import winston from 'winston';

// Create a custom log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Configure the logger
const logger = winston.createLogger({
  level: 'info', // Set default log level (info, error, debug, etc.)
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    // Console transport for logging in the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorizes the log in the console
        winston.format.simple()
      ),
    }),

    // File transport to save logs into a file
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

export default logger;
