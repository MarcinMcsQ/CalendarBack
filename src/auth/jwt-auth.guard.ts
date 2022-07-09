import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {UserEntity} from "../user/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext):Promise<any> {
        const res = context.getArgs()
        const jwt = res[0].cookies.jwt

        const user = await UserEntity.findOne({where:{currentTokenId:jwt}})

        if(!user || jwt === undefined){
            return super.canActivate(context);
        }
        return true
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
