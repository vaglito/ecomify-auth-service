import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class CustomRpcExceptionFilter implements RpcExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): Observable<any> {
        if (exception instanceof RpcException) {
            return throwError(() => exception);
        }

        if (exception instanceof HttpException) {
            const response = exception.getResponse();
            const status = exception.getStatus();

            const rpcError = typeof response === 'object'
                ? { ...response, statusCode: status }
                : { message: response, statusCode: status };

            return throwError(() => new RpcException(rpcError));
        }

        if (exception instanceof Error) {
            return throwError(() => new RpcException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception.message
            }));
        }

        return throwError(() => new RpcException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error'
        }));
    }
}
