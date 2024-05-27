import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ]
});

export default logger;
