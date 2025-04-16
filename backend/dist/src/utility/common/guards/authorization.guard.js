"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeGuard = void 0;
const common_1 = require("@nestjs/common");
const AuthorizeGuard = (allowedRoles) => {
    class RolesGuardMixin {
        canActivate(context) {
            const request = context
                .switchToHttp()
                .getRequest();
            const userRoles = request.currentUser?.roles || [];
            const hasPermission = userRoles.some((role) => allowedRoles.includes(role));
            if (hasPermission)
                return true;
            throw new common_1.UnauthorizedException('Sorry, you are not authorized.');
        }
    }
    return (0, common_1.mixin)(RolesGuardMixin);
};
exports.AuthorizeGuard = AuthorizeGuard;
//# sourceMappingURL=authorization.guard.js.map