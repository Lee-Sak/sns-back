"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const status = exception.getStatus();
        const error = exception.getResponse();
        const _url = req.originalUrl.split('?')[0];
        const _headers = JSON.stringify(req.headers ? req.headers : {});
        const _query = JSON.stringify(req.query ? req.query : {});
        const _body = JSON.stringify(req.body ? req.body : {});
        if (typeof error === 'string') {
            res.status(status).json({
                status: 'fail',
                data: null,
                message: error,
            });
        }
        else {
            if (status === 400) {
                res.status(status).json({
                    status: 'fail',
                    data: null,
                    message: 'Parameter Error',
                });
            }
            else {
                res.status(status).json({
                    status: 'fail',
                    data: null,
                    message: error.message,
                });
            }
        }
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map