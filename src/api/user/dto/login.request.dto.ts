
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginRequestDto {
    
    @IsNotEmpty()
    @ApiProperty({ name: 'email', required: true })
    email!: string;
    @IsNotEmpty()
    @ApiProperty({ name: 'password', required: true })
    password!: string;
}