import { OptionsAccountSelect, OptionsProvinceSelect, OptionsSexSelect } from "../registerForm";

export interface User{
  id:string;
  nick: string,
  name: string,
  email: string,
  dateOfBirth: string ,
  sex: OptionsSexSelect | "",
  province: OptionsProvinceSelect | "",
  accountPublic: OptionsAccountSelect | "",
  pwdHash:string;
  currentToken:string;
  rank:string;
}
