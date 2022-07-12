import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt,Strategy} from 'passport-jwt';
import {UserEntity} from "../user/entities/user.entity";
import { CONFIG_PRIV } from "../../config/config";


export interface JwtPayload {
    id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: CONFIG_PRIV.jwt.JWT_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload, done: (error, user) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false);
        }
        const user = await UserEntity.findOne({where: {currentTokenId: payload.id}});
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
