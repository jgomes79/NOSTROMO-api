
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '@/core/user/user.service';
import { UserTypes } from '@/core/user/user.types';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const wallet = request.params.wallet;
        if (!wallet) return false;

        const user = await this.userService.getByWallet(wallet);
        if (!user) return false;

        return (user.type == UserTypes.ADMIN);
    }
}
