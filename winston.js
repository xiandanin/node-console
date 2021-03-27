const winston = require('winston')
const moment = require('moment')
const path = require('path')

module.exports = function (logDir) {
    const logDirPath = logDir || path.join(__dirname, 'logs')
    const filepath = path.join(logDirPath, `combined_${moment().format('YYYY-MM-DD')}.log`)
    const errorPath = path.join(logDirPath, `error_${moment().format('YYYY-MM-DD')}.log`)

    const text = winston.format.printf(({level, message}) => message)
    return winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: filepath,
                level: 'debug',
                format: text
            }),
            new winston.transports.File({
                filename: errorPath,
                level: 'error',
                format: text
            }),
        ]
    })
}
