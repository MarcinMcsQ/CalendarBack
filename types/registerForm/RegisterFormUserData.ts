import {
  OptionsAccountSelect,
  OptionsProvinceSelect,
  OptionsSexSelect
} from "types";

export interface RegisterFormUserData {
  nick: string,
  name: string,
  email: string,
  dateOfBirth: Date | "",
  sex: OptionsSexSelect | "",
  province: OptionsProvinceSelect | "",
  accountPublic: OptionsAccountSelect | "",
  password1: string,
  password2: string
}


