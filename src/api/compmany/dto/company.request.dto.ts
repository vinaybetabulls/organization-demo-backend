
import { IsString, IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class OrganizationDTO {
    @IsString()
    @ApiProperty({name: 'orgId'})
    orgId!: string;

    @IsString()
    @ApiProperty({name: 'orgName'})
    orgName!: string;

}

export class CompanyRequestDto {
    @IsString()
    @ApiProperty({ name: 'companyName' })
    companyName!: string;
    @IsString()
    @ApiProperty({ name: 'companyLocation' })
    companyLocation!: string;

    @IsNotEmptyObject()
    @ApiProperty({name: 'organization'})
    organization!: OrganizationDTO

    @IsString()
    @ApiProperty({name: 'companyId'})
    companyId!: string;
}
