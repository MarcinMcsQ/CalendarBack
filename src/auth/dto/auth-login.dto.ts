import { LoginFormData } from "types";

export class AuthLoginDto implements LoginFormData{
    email:string;
    password:string;
}
