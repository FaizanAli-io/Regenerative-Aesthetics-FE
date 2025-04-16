import { ExecutionContext } from '@nestjs/common';
export declare const AuthorizeGuard: (allowedRoles: string[]) => import("@nestjs/common").Type<{
    canActivate(context: ExecutionContext): boolean;
}>;
