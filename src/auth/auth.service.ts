import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import {Response} from "express";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {UserEntity} from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CONFIG_PRIV } from "../../config/config";
import { LoginResponse } from "../../types";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => JwtService)) private jwtService: JwtService
    ) {
    }

    async login(userPas: AuthLoginDto, res: Response): Promise<Response<LoginResponse>> {
        try {
            const user = await UserEntity.findOne({ where: { email: userPas.email, }})

            if(!user){
                return res.json({
                    success:false
                });
            }

            const passwordCorrect = bcrypt.compare(userPas.password, user.pwdHash)

            if (!passwordCorrect
            ) {
                return res.json({
                    success:false
                });
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
                    path:'/',
                    secure: false,
                    domain: CONFIG_PRIV.cookie.DOMAIN,
                    httpOnly: false,
                }).json({success: true})
        } catch (err) {
            console.error(err);
            throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async logout(user,res: Response) {
        try {
            const userFind = await UserEntity.findOne({where:{id:user.id}})

            userFind.currentTokenId = null
            await userFind.save()

            return res
                .cookie('jwt', '', {
                    path:'/',
                    secure: false,
                    domain: CONFIG_PRIV.cookie.DOMAIN,
                    httpOnly: false,
                }).json({success: true})

        }catch (err){
            console.error(err)
            throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
