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
exports.CreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Success',
    }),
    __metadata("design:type", String)
], CreateDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    __metadata("design:type", Object)
], CreateDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '생성 성공',
    }),
    __metadata("design:type", String)
], CreateDto.prototype, "message", void 0);
exports.CreateDto = CreateDto;
//# sourceMappingURL=create.dto.js.map