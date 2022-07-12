import {
    OptionsAccountSelect,
    OptionsProvinceSelect,
    OptionsSexSelect
} from "types";

export interface RegisterFormUserData {
    nick: string,
    name: string,
    email: string,
    dateOfBirth: string ,
    sex: OptionsSexSelect | "",
    province: OptionsProvinceSelect | "",
    accountPublic: OptionsAccountSelect | "",
    password1: string,
    password2: string
}

export interface RegisterFormUserDataFront {
    nick: string,
    name: string,
    email: string,
    dateOfBirth: string | 'select',
    sex: OptionsSexSelect | "" | 'select',
    province: OptionsProvinceSelect | "" | 'select',
    accountPublic: OptionsAccountSelect | "" | 'select',
    password1: string,
    password2: string
}


