import {
  OptionsAccountSelect,
  OptionsProvinceSelect,
  OptionsSexSelect,
  RegisterFormUserData
} from "types";

export class RegisterDto implements RegisterFormUserData {
  nick: string;
  name: string;
  email: string;
  dateOfBirth: Date | "";
  sex: OptionsSexSelect | "";
  province: OptionsProvinceSelect | "";
  accountPublic: OptionsAccountSelect | "";
  password1: string;
  password2: string;
}
