import { ApiTags, ApiOperation, ApiHeader, ApiBody, ApiParam, ApiHeaders } from "@nestjs/swagger";
import { Controller, Body, Headers, Post, Get, Param } from "@nestjs/common";
import { CompanyRequestDto } from "./dto/company.request.dto";
import { PasswordManipulation } from "../user/passowordHashing";
import { CompanyCommonService } from "./company.common.service";
import { CompanyService } from "./company.service";

@ApiTags('Company')
@Controller('/company')

export class CompanyController {
    constructor(private companyService: CompanyService, private jwt: PasswordManipulation) { }

    @Post('/createCompany')
    @ApiOperation({ summary: 'Create Company' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiBody({ type: CompanyRequestDto })

    async createCompany(@Body() request: CompanyRequestDto, @Headers('token') authorization: string) {
        try {
            const decodeToken = await this.jwt.validateJSONToken(authorization);
            console.log(decodeToken.data.userId);
            const crearedBy = decodeToken.data;
            return await this.companyService.createCompany(request, crearedBy);
        } catch (error) {
            return error
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
            return error
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
            return error
        }
    }
}
