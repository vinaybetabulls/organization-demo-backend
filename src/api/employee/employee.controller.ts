import { ApiTags, ApiOperation, ApiHeader, ApiBody, ApiParam } from "@nestjs/swagger";
import { Controller, Body, Post, Param, Headers, Get } from "@nestjs/common";
import { EmployeeRequestDto } from "./dto/employee.request.dto";
import { EmployeeService } from "./employee.service";
import { UtilService } from "../utils/util.service";


@ApiTags('Employee')
@Controller('/employee')

export class EmployeeController {
    constructor(private utilService: UtilService, private employeeService: EmployeeService){}
    
    @Post('/createEmployee')
    @ApiOperation({summary: 'Employee Creation'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})
    @ApiBody({type: EmployeeRequestDto})

    async createEmployee(@Body() request: EmployeeRequestDto, @Headers('token') authorization: string) {
        try {
            const decodeToken = await this.utilService.validateJSONToken(authorization);
            return this.employeeService.createEmployee(request, decodeToken.data);
        } catch (error) {
            return error;
        }
    }

    @Get('/getEmployeeById/:employeeId')
    @ApiOperation({summary: 'Get Employee By Id'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})
    @ApiParam({name: 'employeeId'})
    async getEmployeeById(@Param('employeeId') employeeId: string, @Headers('token') authorization: string) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return this.employeeService.getEmployeeById(employeeId);
        } catch (error) {
            return error;
        }
    }

    @Get('/getAllEmployeesList/')
    @ApiOperation({summary: 'Get All Employees List'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})
    async getAllEmployeesList(@Headers('token') authorization: string) {
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.employeeService.getAllEmployeesList();
        } catch (error) {
            return error;
        }
    }
}