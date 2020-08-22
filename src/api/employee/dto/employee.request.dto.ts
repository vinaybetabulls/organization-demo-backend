
import { IsString, IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DesignationDto {
    @IsString()
    @ApiProperty({name: 'designationId'})
    designationId!: string;
    @IsString()
    @ApiProperty({name: 'designationName'})
    designationName!: string;
}

export class DepartmentDto {
    @IsString()
    @ApiProperty({name: 'departmentId'})
    departmentId!: string;
    @IsString()
    @ApiProperty({name: 'departmentName'})
    departmentName!: string;
}

export class CompanyDto {
    @IsString()
    @ApiProperty({name: 'companyId'})
    companyId!: string;
    @IsString()
    @ApiProperty({name: 'companyName'})
    companyName!: string;
}
export class EmployeeRequestDto {
    @IsString()
    @ApiProperty({ name: 'employeeFirstName' })
    employeeFirstName!: string;
    @IsString()
    @ApiProperty({ name: 'employeeLastName' })
    employeeLastName!: string;

    @IsString()
    @ApiProperty({name: 'employeeEmail'})
    employeeEmail!: string;

    @ApiProperty({name: 'employeeLocation'})
    employeeLocation!: string;

    @IsString()
    @ApiProperty({name: 'phoneNumber'})
    phoneNumber!: string;

    @IsNotEmptyObject()
    @ApiProperty({name: 'designation'})
    designation!: DesignationDto

    @IsNotEmptyObject()
    @ApiProperty({name: 'department'})
    department!: DepartmentDto

    @IsNotEmptyObject()
    @ApiProperty({name: 'company'})
    company!: CompanyDto
    
    employeeId!: string;
}
