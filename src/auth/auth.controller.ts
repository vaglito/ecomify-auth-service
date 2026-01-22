import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @MessagePattern({ cmd: 'login' })
    async login(@Payload() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @MessagePattern({ cmd: 'register' })
    async register(@Payload() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @MessagePattern({ cmd: 'validate_token' })
    async validateToken(@Payload() token: string) {
        return this.authService.validateToken(token);
    }
}
