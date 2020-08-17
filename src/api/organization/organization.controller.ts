import { Controller, Post, Body, Get, Param, Headers } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiHeader } from "@nestjs/swagger";
import { OrganizationService } from "./organization.service";
import { PasswordManipulation } from "../user/passowordHashing";

@ApiTags('Organization')
@Controller('/organization')

export class OrganizationContoller {
    constructor(private org: OrganizationService, private jwt: PasswordManipulation) { }

    @Post('/createOrganization')
    @ApiOperation({ summary: 'Create organization' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiBody({ type: OrganizationRequestDto })
    async createOrganization(@Body() request: OrganizationRequestDto, @Headers('token') authorization) {
        try {
            const decodeJWT = await this.jwt.validateJSONToken(authorization);
            return await this.org.createOrganization(request, decodeJWT.data);
        } catch (error) {
            return error;
        }

    }

    @Get('/getOrganizationById/:organizationByid')
    @ApiOperation({ summary: 'Get Organization By Id' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiParam({ name: 'organizationByid', description: 'Organization Id' })
    async getOrganizationBydId(@Param('organizationByid') organizationByid: string, @Headers('token') authorization) {
        try {
            await this.jwt.validateJSONToken(authorization);
            return await this.org.getOrganizationBydId(organizationByid);
        } catch (error) {
            return error;
        }

    }

    @Get('getAllOrganizationsList')
    @ApiOperation({ summary: 'Get all organizations list' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    async getAllOrganizationsList(@Headers('token') authorization) {
        try {
            await this.jwt.validateJSONToken(authorization);
            return await this.org.getAllOrganizationsList();
        } catch (error) {
            return error;
        }

    }
}