import {  Injectable } from "@nestjs/common";
import {Response} from 'express';
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "./entities/user.entity";
import { RegisterResponse, registerResponseMessageOptions } from "types";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  registerValidation = (registerData:RegisterDto , res :Response):Response<RegisterResponse>=> {
    registerData

    if (! registerData.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

      return res.json({
        success:false,
        message:registerResponseMessageOptions.incorrect_email
      })
    }else if(registerData.password1.length<8 || registerData.password1.length > 50 || registerData.password1 !== registerData.password2 ){
       return res.json({
        success:false,
        message:registerResponseMessageOptions.incorrect_pass
      })
    }
  }

  async register(newUser: RegisterDto , res:Response): Promise<RegisterResponse> {

    const userExist = await UserEntity.findOne({ where: { email: newUser.email } });
    if (userExist) {
      return {
        success: false,
        message: registerResponseMessageOptions.user_exist
      };
    }

    this.registerValidation(newUser, res)

    const user = new UserEntity();

    user.nick = newUser.nick;
    user.name = newUser.name;
    user.email = newUser.email;
    user.dateOfBirth = new Date(newUser.dateOfBirth);
    user.sex = newUser.sex;
    user.province = newUser.province;
    user.accountPublic = newUser.accountPublic;

    const salt = await bcrypt.genSalt(10);
    user.pwdHash = await bcrypt.hash(newUser.password2, salt);

    await user.save();

    return {
      success: true,
      message: user.email
    };
  }
}
