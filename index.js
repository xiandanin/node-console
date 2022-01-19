const moment = require('moment')
const util = require('util')

const styles = {
    // styles
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    // grayscale
    white: [37, 39],
    grey: [90, 39],
    black: [90, 39],
    // colors
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [91, 39],
    yellow: [33, 39]
}

const levels = {
    error: {id: 1, color: 'red'},
    warn: {id: 2, color: 'yellow'},
    info: {id: 3, color: 'green'},
    verbose: {id: 4, color: 'blue'},
    debug: {id: 5, color: 'cyan'},
    silly: {id: 6, color: 'magenta'}
}

function colorizeStart (style) {
    return style ? `\x1B[${styles[style][0]}m` : ''
}

function colorizeEnd (style) {
    return style ? `\x1B[${styles[style][1]}m` : ''
}

/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize (str, style) {
    return colorizeStart(style) + str + colorizeEnd(style)
}

let logger
let onlyPrintMessage = false
let printPMNumber = false

function log (level, message, ...optionalParams) {
    const formatMessage = util.format(message || '', ...optionalParams)
    let text
    if (onlyPrintMessage) {
        text = formatMessage
        console.log(colorize(text, levels[level].color))
    } else {
        const time = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        const levelStr =level.toUpperCase().padEnd(5)
        if (printPMNumber) {
            const pmname = `${process.env.name}-${process.env.pm_id}`
            text = util.format('[%s][%s][%s] %s', time, levelStr, pmname, formatMessage)
        } else {
            text = util.format('[%s][%s] %s', time, levelStr, formatMessage)
        }
        console.log(colorize(text, levels[level].color))
    }
    if (logger) {
        logger.log({
            level: level,
            message: text
        });
    }
}

console.error = (m, ...o) => log('error', m, ...o)
console.warn = (m, ...o) => log('warn', m, ...o)
console.info = (m, ...o) => log('info', m, ...o)
//console.verbose = (m, ...o) => log('verbose', m, ...o)
console.debug = (m, ...o) => log('debug', m, ...o)
//console.silly = (m, ...o) => log('silly', m, ...o)

module.exports = function ({
                               // 输出文件夹
                               outputDir,
                               // 是否仅打印信息
                               onlyMessage,
                               // 是否打印pm2名称
                               pmNumber
                           }) {
    onlyPrintMessage = onlyMessage
    printPMNumber = pmNumber
    if (outputDir) {
        logger = require('./winston')(outputDir)
    }
}
