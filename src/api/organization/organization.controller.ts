import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { OrganizationService } from "./organization.service";

@ApiTags('Organization')
@Controller('/organization')

export class OrganizationContoller {
    constructor(private org: OrganizationService) { }

    @Post('/createOrganization')
    @ApiOperation({ summary: 'Create organization' })
    @ApiBody({ type: OrganizationRequestDto })
    async createOrganization(@Body() request: OrganizationRequestDto) {
        return await this.org.createOrganization(request);
    }

    @Get('/getOrganizationById/:organizationByid')
    @ApiOperation({summary: 'Get Organization By Id'})
    @ApiParam({name: 'organizationByid', description: 'Organization Id'})
    async getOrganizationBydId(@Param('organizationByid') organizationByid: string) {
        console.log('organizationByid..', organizationByid)
        return await this.org.getOrganizationBydId(organizationByid);
    }

    @Get('getAllOrganizationsList')
    @ApiOperation({summary: 'Get all organizations list'})
    async getAllOrganizationsList() {
        return await this.org.getAllOrganizationsList();
    }
}