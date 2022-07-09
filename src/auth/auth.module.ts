import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtStrategy} from "./jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import {CONFIG_PRIV} from "../../config/config";


@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: CONFIG_PRIV.jwt.JWT_SECRET_KEY,
            signOptions: {expiresIn: `${CONFIG_PRIV.jwt.JWT_TIME_IN_MINUTES_SESSION_TOKEN * 1000 }s`},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {
}
