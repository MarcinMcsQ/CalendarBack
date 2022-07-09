import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ImATeapotException} from "@nestjs/common";
import {Request,Response} from "express";

//globalna obsługa wszystkich błeów
//lapie wszystkie błędy
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    //dajemy exception unknow bo nie wiemy do konca jakie błędy mogą sie nam wywalić
    catch(exception:unknown,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        //sprawdzamy czy status bledu isnieje jeśli nie bląd jest poważniejszy i ustawiamy Internal server error
        const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        //logujemy dla siebie cały błąd
        console.error(exception)

        //a to zwracamy do urzytkownika
        response .json({
            status,
            message:exception
        })
    }
}
