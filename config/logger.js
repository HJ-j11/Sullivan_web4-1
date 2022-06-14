const winston = require('winston');
require('winston-daily-rotate-file');

const logFormat =  winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}] : ${info.message}`,
    )
)


const logger = winston.createLogger({
    logFormat,
    transports: [
        new winston.transports.DailyRotateFile({
            level : 'info',
            datePattern: 'YYYY-MM-DD',
            dirname : './logs',
            filename : `%DATE%.log`,
            maxSize: '2m',
            maxFiles: '30',
            zippedArchive : true,
        }),
        new winston.transports.DailyRotateFile({
            level : 'error',
            datePattern: 'YYYY-MM-DD',
            dirname : './logs/error',
            filename : `%DATE%.error.log`,
            maxSize: '2m',
            maxFiles: '30',
            zippedArchive : true,
        }),
    ]
})

module.exports = logger;