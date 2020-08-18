
import { IsString, IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class OrganizationDTO {
    @IsString()
    @ApiProperty({name: 'organizationId'})
    organizationId!: string;

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

    @IsNotEmptyObject()
    @ApiProperty({name: 'companyId'})
    companyId!: string;
}
