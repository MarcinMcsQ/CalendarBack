import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UserEntity} from "../user/entities/user.entity";

export  const UserObject = createParamDecorator(async (data,context:ExecutionContext)=>{
    const res = context.getArgs()
    const jwt = res[0].cookies.jwt

    const user = await UserEntity.findOne({where:{currentTokenId:jwt}})
    if(!user){
        return null
    }
    return user

})
