import { Controller, Post, Body, Get, Param, Headers, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiHeader, ApiParam, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';


import { RegistrationRequestDto } from "./dto/registration.request.dto";
import { UserService } from "./user.service";
import { LoginRequestDto } from "./dto/login.request.dto";
import path = require('path');
import { UtilService } from "../utils/util.service";

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private user: UserService, private utilService: UtilService) { }

    @ApiOperation({ summary: 'User Registration' })
    @ApiBody({ type: RegistrationRequestDto })
    @ApiResponse({ status: 200, type: RegistrationRequestDto })
    @ApiConsumes('multipart/form-data')
    @Post('registration')
    @UseInterceptors(FileInterceptor('file'))
    async registration(@Body() request: RegistrationRequestDto, @UploadedFile() file: { buffer: Buffer, mimetype: 'image/*', originalname: string }) {
        try {
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
            return this.user.registration(request, fileBuffer);
        } catch (error) {
            return error
        }

    }

    @ApiOperation({ summary: 'User Login' })
    @ApiBody({ type: LoginRequestDto })
    @Post('login')
    async login(@Body() request: LoginRequestDto) {
        return await this.user.login(request);
    }

    @ApiOperation({ summary: 'User Profile' })
    @ApiHeader({ name: 'token', required: true, description: 'authorization' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiResponse({ status: 201, description: 'Profile fetched' })
    @Get('/profile/:userId')

    async profile(@Param('userId') userId: string, @Headers('token') authorization) {
        // validate jwt
        try {
            await this.utilService.validateJSONToken(authorization);
            const userProfile = this.user.profile(userId)
            return userProfile;
        } catch (error) {
            return error;
        }

    }
}