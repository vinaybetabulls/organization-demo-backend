import { ApiTags, ApiOperation, ApiHeader, ApiBody, ApiParam } from "@nestjs/swagger";
import { Controller, Body, Headers, Post, Get, Param } from "@nestjs/common";
import { CompanyRequestDto } from "./dto/company.request.dto";
import { CompanyService } from "./company.service";
import { UtilService } from "../utils/util.service";

@ApiTags('Company')
@Controller('/company')

export class CompanyController {
    constructor(private companyService: CompanyService, private jwt: UtilService) { }

    @Post('/createCompany')
    @ApiOperation({ summary: 'Create Company' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiBody({ type: CompanyRequestDto })

    async createCompany(@Body() request: CompanyRequestDto, @Headers('token') authorization: string) {
        try {
            const decodeToken = await this.jwt.validateJSONToken(authorization);
            const crearedBy = decodeToken.data;
            return await this.companyService.createCompany(request, crearedBy);
        } catch (error) {
            throw error
        }
    }

    @Get('/getCompanyById/:companyId')
    @ApiOperation({ summary: 'Get CompanyId By Id' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiParam({ name: 'companyId', description: 'companyId Id' })
    async getOrganizationBydId(@Param('companyId') companyId: string, @Headers('token') authorization) {
        try {
            const decodeToken = await this.jwt.validateJSONToken(authorization);
            const crearedBy = decodeToken.data;
            return await this.companyService.getCompanyById(companyId);
        } catch (error) {
            throw error
        }
    }

    @Get('/getAllCompaniesList')
    @ApiOperation({ summary: 'Get All Companies List' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })

    async getAllCompaniesList(@Headers('token') authorization) {
        try {
            const decodeToken = await this.jwt.validateJSONToken(authorization);
            const crearedBy = decodeToken.data;
            return await this.companyService.getAllCompaniesList();
        } catch (error) {
            throw error
        }
    }
}
