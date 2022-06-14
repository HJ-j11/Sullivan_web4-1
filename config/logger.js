const winston = require('winston');
require('winston-daily-rotate-file');

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level} : ${info.message}`;
})

const logger = winston.createLogger({
    format: combine(
        tmpestamp({
            format : 'YYYY-MM-DD hh:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            level : 'info',
            datePattern: 'YYYY-MM-DD',
            dirname : './logs',
            filename : `%DATE$.log`,
            maxSize: '2m',
            maxFiles: '30',
            zippedArchive : true,
        }),
        new winston.transports.DailyRotateFile({
            level : 'error',
            datePattern: 'YYYY-MM-DD',
            dirname : './logs/error',
            filename : `%DATE$.error.log`,
            maxSize: '2m',
            maxFiles: '30',
            zippedArchive : true,
        }),
    ]
})

logger.add(
    new winston.transports.Console({
        format : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
    })
)

module.exports = {logger};