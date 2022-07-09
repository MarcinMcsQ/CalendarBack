import { Body, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "./user.entity";
import { RegisterResponse, registerResponseMessageOptions } from "../../types";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  async register(newUser: RegisterDto): Promise<RegisterResponse> {
    const userExist = UserEntity.findOne({ where: { email: newUser.email } });
    if (userExist) {
      return {
        success: false,
        message: registerResponseMessageOptions.user_exist
      };
    }

    const user = new UserEntity();

    user.nick = newUser.nick;
    user.name = newUser.name;
    user.email = newUser.email;
    user.dateOfBirth = newUser.dateOfBirth;
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
