import {Body, Controller, Inject, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import { RegisterResponse } from "types";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService:UserService
    ) {
    }

 @Post('/register')
    register(
     @Body() newUser:RegisterDto,
 ):Promise<RegisterResponse>{
        return this.userService.register(newUser)
 }

}
