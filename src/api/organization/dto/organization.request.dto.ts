
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class OrganizationRequestDto {

    @IsString()
    @ApiProperty({ name: 'orgId', description: 'Organization Id' })
    orgId!: string;
    @IsString()
    @ApiProperty({ name: 'orgName', description: 'Organization Name' })
    orgName!: string;
    @IsString()
    @ApiProperty({ name: 'orgLocation', description: 'Organization Location' })
    orgLocation!: string;
    @IsString()
    @ApiProperty({ name: 'orgCEO', description: 'Organization CEo' })
    orgCEO!: string;
    @ApiProperty({ type: 'file', name: 'file', format: 'binary', required: false, description: 'Organization Image' })
    file?: any;
}