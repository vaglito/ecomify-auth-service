import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class HttpRpcExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Observable<any> {
        const error: any = exception.getResponse();
        const status = exception.getStatus();

        return throwError(() => new RpcException({
            statusCode: status,
            message: error.message || error,
            error: error.error,
        }));
    }
}
