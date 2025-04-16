import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from './../../../users/entities/user.entity';
import { UsersService } from './../../../users/users.service';
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity | null;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
