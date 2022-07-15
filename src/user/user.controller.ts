import { Body, Controller, Inject, Post, Req, Res } from "@nestjs/common";
import {Response} from 'express'
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import { RegisterResponse } from "../../types";


@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService:UserService
    ) {
    }

  @Post('/register')
  async register(
    @Body() newUser : RegisterDto,
    @Res() res : Response
  ):Promise<Response<RegisterResponse>>{
    console.log(newUser);
    return  await this.userService.register(newUser, res);
  }
}
