
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class OrganizationRequestDto {
    @IsString()
    @ApiProperty({ name: 'orgName' })
    orgName!: string;
    @IsString()
    @ApiProperty({ name: 'orgLocation' })
    orgLocation!: string;
    @IsString()
    @ApiProperty({ name: 'orgCEO'})
    orgCEO!: string;

    orgId!: string;
}