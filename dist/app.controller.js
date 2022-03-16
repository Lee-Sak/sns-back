"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const authentication_error_dto_1 = require("./common/dto/authentication.error.dto");
const authorization_error_dto_1 = require("./common/dto/authorization.error.dto");
const conflict_error_dto_1 = require("./common/dto/conflict.error.dto");
const parameter_error_dto_1 = require("./common/dto/parameter.error.dto");
const path_error_dto_1 = require("./common/dto/path.error.dto");
const repository_error_dto_1 = require("./common/dto/repository.error.dto");
const service_error_dto_1 = require("./common/dto/service.error.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Response Common Error /' }),
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
        type: repository_error_dto_1.RepositoryErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 503,
        description: 'Service Unavailable',
        type: service_error_dto_1.ServiceErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request',
        type: parameter_error_dto_1.ParameterErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: authentication_error_dto_1.AuthenticationErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
        type: authorization_error_dto_1.AuthorizationErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found',
        type: path_error_dto_1.PathErrorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict',
        type: conflict_error_dto_1.ConflictDto,
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map