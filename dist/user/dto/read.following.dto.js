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
exports.ReadFollowingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const read_dto_1 = require("../../common/dto/read.dto");
class ReadFollowingDto extends read_dto_1.ReadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            me: {
                id: 1,
                nickname: 'tiger',
            },
            followings: [
                {
                    id: 2,
                    nickname: 'bird',
                },
            ],
        },
    }),
    __metadata("design:type", Object)
], ReadFollowingDto.prototype, "data", void 0);
exports.ReadFollowingDto = ReadFollowingDto;
//# sourceMappingURL=read.following.dto.js.map