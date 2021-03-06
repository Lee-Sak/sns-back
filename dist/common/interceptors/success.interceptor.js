"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let SuccessInterceptor = class SuccessInterceptor {
    intercept(context, next) {
        console.log('Before...');
        const statusCode = context.getArgs()[1].statusCode;
        const method = context.getArgs()[0].method;
        let message;
        if (statusCode === 200) {
            if (method === 'GET')
                message = '조회 성공';
            else if (method === 'PUT')
                message = '수정 성공';
            else
                message = '삭제 성공';
        }
        else {
            message = '생성 성공';
        }
        return next.handle().pipe((0, operators_1.map)((data) => {
            return { status: 'success', data, message };
        }));
    }
};
SuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], SuccessInterceptor);
exports.SuccessInterceptor = SuccessInterceptor;
//# sourceMappingURL=success.interceptor.js.map