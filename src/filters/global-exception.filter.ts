import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import {Response} from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{

    catch(exception:unknown,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        console.error(exception)

        response.json({
            status,
        })
    }
}
