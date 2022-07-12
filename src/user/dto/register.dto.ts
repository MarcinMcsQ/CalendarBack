import {
  OptionsAccountSelect,
  OptionsProvinceSelect,
  OptionsSexSelect,
  RegisterFormUserData
} from "types";
import { IsDate, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

// import { CustomValidation } from "../../decorators/custom-validation.decorator";



export class RegisterDto implements RegisterFormUserData{

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  nick: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  email: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  sex: OptionsSexSelect | "";

  @IsString()
  province: OptionsProvinceSelect | "";

  @IsString()
  // @CustomValidation('accountPublic')
  accountPublic: OptionsAccountSelect | "";

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password1: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password2: string;
}


