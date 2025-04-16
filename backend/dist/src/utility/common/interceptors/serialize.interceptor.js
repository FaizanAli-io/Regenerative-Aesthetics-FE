"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = void 0;
exports.SerializeIncludes = SerializeIncludes;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const operators_1 = require("rxjs/operators");
function SerializeIncludes(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptor(dto));
}
class SerializeInterceptor {
    dto;
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, next) {
        console.log('Before...');
        const now = Date.now();
        return next.handle().pipe((0, operators_1.map)((data) => {
            return (0, class_transformer_1.plainToClass)(this.dto, data, {
                exposeUnsetFields: true,
            });
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
//# sourceMappingURL=serialize.interceptor.js.map