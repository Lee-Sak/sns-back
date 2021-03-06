"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const moment = require("moment");
const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;
class LoggerService {
    constructor(service) {
        this.logger = winston.createLogger({
            format: combine(errors({ stack: true }), json(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), ms(), prettyPrint()),
            defaultMeta: { service },
            transports: [
                new winston.transports.File({
                    level: 'error',
                    filename: `error-${moment(new Date()).format('YYYYMMDD')}.log`,
                    dirname: 'logs/error-log',
                    maxsize: 5000000,
                }),
                new winston.transports.Console({
                    level: 'debug',
                    format: combine(nest_winston_1.utilities.format.nestLike()),
                }),
                new winston.transports.File({
                    filename: `application-${moment(new Date()).format('YYYYMMDD')}.log`,
                    dirname: 'logs/req-log',
                    maxsize: 5000000,
                }),
            ],
        });
    }
    log(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
    warn(message) {
        this.logger.warning(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    verbose(message) {
        this.logger.verbose(message);
    }
}
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map