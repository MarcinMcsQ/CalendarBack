import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Response} from "express";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {UserEntity} from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CONFIG_PRIV } from "../../config/config";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => JwtService)) private jwtService: JwtService
    ) {
    }


    async login(userPas: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await UserEntity.findOne({
                where: {
                    email: userPas.email,
                }
            })
            const passwordCorrect = bcrypt.compare(userPas.password, user.pwdHash)

            if (!user || !passwordCorrect
            ) {
                return res.json({error: 'Invalid login data'});
            }

            const payload = {username: user.email, sub: user.id};


            let token;
            let userWithThisToken = null;
            do {
                token = this.jwtService.sign(payload),
                    userWithThisToken = await UserEntity.findOne({where: {currentTokenId: token}});
            } while (!!userWithThisToken);
            user.currentTokenId = token;
            await user.save()

            return res
                .cookie('jwt', token , {
                    secure: false,
                    domain: CONFIG_PRIV.cookie.DOMAIN,
                    httpOnly: true,
                }).json({ok: true})
        } catch (err) {
            return res.json({error: err.message})
        }
    }

    async logout(user,res: Response) {
        try {
            const userFind = await UserEntity.findOne({where:{id:user.id}})

            userFind.currentTokenId = null
            await userFind.save()

            return res
                .cookie('jwt', '', {
                    secure: false,
                    domain: CONFIG_PRIV.cookie.DOMAIN,
                    httpOnly: true,
                }).json({ok: true})

        }catch (err){
            console.log(err)
        }


    }
}
