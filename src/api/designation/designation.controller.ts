import { ApiTags, ApiOperation, ApiHeader, ApiBody, ApiParam } from "@nestjs/swagger";
import { Controller, Post, Headers, Body, Get, Param} from "@nestjs/common";
import { DesignationService } from "./designation.service";
import { DesignationRequestDto } from "./dto/designation.request.dto";
import { UtilService } from "../utils/util.service";



@ApiTags('Designation')
@Controller('designation')
export class DesignationController {
    constructor(private designationService: DesignationService, private jwt: UtilService) { }

    @Post('/createDesignation')
    @ApiOperation({summary: 'Create Designation'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})
    @ApiBody({type: DesignationRequestDto})

    async createDesignation(@Body() request: DesignationRequestDto, @Headers('token') authorization: string) {
        try {
            const jwtDecode = await this.jwt.validateJSONToken(authorization);
            return await this.designationService.createDesignation(request, jwtDecode.data);
        } catch (error) {
            return error;
        }
    }

    @Get('/getDesignationById/:designationId')
    @ApiOperation({summary: 'Get Department By Id'})
    @ApiParam({name: 'designationId', description: 'Designation Id'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})

    async getDesignationById(@Param('designationId') designationId: string, @Headers('token') authorization: string) {
        try {
            await this.jwt.validateJSONToken(authorization);
            return await this.designationService.getDesignationById(designationId);
        } catch (error) {
            return error;
        }
    }

    @Get('/getAllDesignationsList')
    @ApiOperation({summary: 'Get All Designation List'})
    @ApiHeader({name: 'token', required: true, description: 'authorization'})

    async getAllDesignationsList(@Headers('token') authorization: string) {
        try {
            await this.jwt.validateJSONToken(authorization);
            return await this.designationService.getAllDesignationsList();
        } catch (error) {
            throw error;
        }
    }

}
