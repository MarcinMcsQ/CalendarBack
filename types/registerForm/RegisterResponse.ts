export enum registerResponseMessageOptions {
  user_exist="exist"
}

type registerResponseMessageOptionsType = string | "exist" ;


export interface RegisterResponse{
  success:boolean;
  message?:registerResponseMessageOptionsType;
}
