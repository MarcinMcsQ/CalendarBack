export enum registerResponseMessageOptions {
  user_exist="existEmail",
  incorrect_email='incorrectEmail',
  incorrect_pass='incorrectPass'
}

type registerResponseMessageOptionsType = string | "exist" | "incorrectPass" |'incorrectEmail' ;


export interface RegisterResponse{
  success:boolean;
  message?:registerResponseMessageOptionsType;
}
