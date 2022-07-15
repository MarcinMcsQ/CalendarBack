import {Body, Controller, Get, Post, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {AuthLoginDto} from "./dto/auth-login.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {UserObject} from "../decorators/user-object.decorator";
import { LoginResponse } from "../../types";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  async logIn(
      @Body() userPas: AuthLoginDto,
      @Res() res: Response,
  ):Promise<Response<LoginResponse>>{
    return this.authService.login(userPas,res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logOut(
      @Res() res: Response,
      @UserObject() user
  ):Promise<Response<{success:true}>>{
    return this.authService.logout(user,res)
  }

}
