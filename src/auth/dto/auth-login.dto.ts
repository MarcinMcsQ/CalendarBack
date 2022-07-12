import { LoginFormData } from "types";
import { IsString } from "class-validator";

export class AuthLoginDto implements LoginFormData{
    @IsString()
    email:string;
    @IsString()
    password:string;
}
