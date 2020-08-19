import { Controller, Post, Body, Get, Param, Headers, UseInterceptors, UploadedFile, Delete } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiHeader, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';

import { OrganizationService } from "./organization.service";
import { UtilService } from "../utils/util.service";
import path = require("path");

@ApiTags('Organization')
@Controller('/organization')

export class OrganizationContoller {
    constructor(private org: OrganizationService, private utilService: UtilService) { }

    @Post('/createOrganization')
    @ApiOperation({ summary: 'Create organization' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiBody({ type: OrganizationRequestDto })
    @ApiConsumes('multipart/form-data')
    @Post('registration')
    @UseInterceptors(FileInterceptor('file'))
    async createOrganization(@Body() request: OrganizationRequestDto, @Headers('token') authorization, @UploadedFile() file: { buffer: Buffer, mimetype: 'image/*', originalname: string }) {
        try {
            const decodeJWT = await this.utilService.validateJSONToken(authorization);
            let fileBuffer;
            if (file) {
                const bufferData = file.buffer;
                const mimeType = file.mimetype;
                let isValid;
                try {
                    // validate mimeType
                    const fileType = path.extname(file.originalname);
                    isValid = await this.utilService.validateFile(fileType);
                } catch (error) {
                    throw error;
                }
                if (isValid) {
                    fileBuffer = {
                        bufferData,
                        mimeType
                    }
                }
            }
            return await this.org.createOrganization(request, decodeJWT.data, fileBuffer);
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
            await this.utilService.validateJSONToken(authorization);
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
            await this.utilService.validateJSONToken(authorization);
            return await this.org.getAllOrganizationsList();
        } catch (error) {
            return error;
        }

    }

    @Delete('/deleteOrganizationById/:organizationId')
    @ApiOperation({summary: 'Delete organization by Id'})
    @ApiHeader({name: 'token', required: true, description: 'authorizaiton'})
    @ApiParam({name: 'organizationId', required: true, description: 'Organization Id'})
    async deleteOrganizationById(@Param('organizationId') organizationId: string, @Headers('token') authorization: string){
        try {
            await this.utilService.validateJSONToken(authorization);
            return await this.org.deleteOrganizationById(organizationId);
        } catch (error) {
            return error;
        }
    }
}