
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CompanyRequestDto {
    @IsString()
    @ApiProperty({ name: 'companyName' })
    companyName!: string;
    @IsString()
    @ApiProperty({ name: 'companyLocation' })
    companyLocation!: string;

    companyId!: string;
}