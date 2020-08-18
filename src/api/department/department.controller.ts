import { Controller, Post, Body, Headers, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiHeader, ApiBody, ApiParam } from "@nestjs/swagger";
import { DepartmentService } from "./department.service";
import { DepartmentRequestDto } from "./dto/department.request.dto";
import { UtilService } from "../utils/util.service";


@ApiTags('Department')
@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService, private jwt: UtilService) { }

    @Post('/createDepartment')
    @ApiOperation({summary: 'Create Department'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})
    @ApiBody({type: DepartmentRequestDto})

    async createDepartment(@Body() request: DepartmentRequestDto, @Headers('token') authorization: string) {
        try {
            const jwtDecode = await this.jwt.validateJSONToken(authorization);
            return await this.createDepartment(request, jwtDecode.data);
        } catch (error) {
            return error;
        }
    }

    @Get('/getDepartmentById/:departmentId')
    @ApiOperation({summary: 'Get Department By Id'})
    @ApiParam({name: 'departmentId', description: 'Department Id'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})

    async getDepartmentById(@Param('departmentId') departmentId: string, @Headers('token') authorization: string) {
        try {
            await this.jwt.validateJSONToken(authorization);
            return await this.departmentService.getDepartmentById(departmentId);
        } catch (error) {
            return error;
        }
    }

    @Get('/getAllDepartmentsList')
    @ApiOperation({summary: 'Get All Departments List'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})

    async getAllDepartmentsList(@Headers('token') authorization: string) {
        try {
            await this.jwt.validateJSONToken(authorization);
            return await this.departmentService.getAllDepartmentList();
        } catch (error) {
            throw error;
        }
    }

}
