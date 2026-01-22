import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];
}
