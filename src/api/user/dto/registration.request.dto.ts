
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegistrationRequestDto {
    @IsNotEmpty()
    @ApiProperty({ name: 'firstName' })
    firstName!: string;
    @IsNotEmpty()
    @ApiProperty({ name: 'lastName' })
    lastName!: string;
    @IsNotEmpty()
    @ApiProperty({ name: 'email', required: true })
    email!: string;
    @IsNotEmpty()
    @ApiProperty({ name: 'password', required: true })
    password!: string;
    
    @ApiProperty({type: 'file', name: 'file', format: 'binary', required: false})
    file?: any;

    userId!: string;
}