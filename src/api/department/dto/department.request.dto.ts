import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class DepartmentRequestDto {
    @IsString()
    @ApiProperty({name: 'departmentName'})
    departmentName!: string;

    departmentId!: string;
}
