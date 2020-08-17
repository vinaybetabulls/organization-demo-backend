import { Controller, Post, Body, Get, Param, Headers } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiHeader, ApiParam } from "@nestjs/swagger";

import { RegistrationRequestDto } from "./dto/registration.request.dto";
import { UserService } from "./user.service";
import { LoginRequestDto } from "./dto/login.request.dto";
import { PasswordManipulation } from "./passowordHashing";

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private user: UserService, private jwt: PasswordManipulation) { }

    @ApiOperation({ summary: 'User Registration' })
    @ApiBody({ type: RegistrationRequestDto })
    @ApiResponse({ status: 200, type: RegistrationRequestDto })
    @Post('registration')
    async registration(@Body() request: RegistrationRequestDto) {
        request.userId = ''
        return this.user.registration(request);
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
            await this.jwt.validateJSONToken(authorization);
            const userProfile = this.user.profile(userId)
            return userProfile;
        } catch (error) {
            return error;
        }

    }
}