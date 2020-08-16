import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { RegistrationRequestDto } from "./dto/registration.request.dto";

import { CommonService } from "./common.service";
import { PasswordManipulation } from "src/api/user/passowordHashing";
import { RegistrationResponseDto } from "./dto/registration.response.dto";
import { LoginRequestDto } from "./dto/login.request.dto";
import { LoginResponseDto } from "./dto/login.response.dto";


@Injectable()
export class UserService {

    constructor(private commmon: CommonService, private passwordUpdate: PasswordManipulation) { }

    /**
     * @name registration
     * @param {RegistrationRequestDto} request - RegistrationRequestDTO
     * @returns {RegistrationResponseDto} response
     */
    async registration(request: RegistrationRequestDto): Promise<RegistrationResponseDto> {
        const { email, password, firstName, lastName, userId } = request;

        // check if email already exists
        const isExists = await this.commmon.getUserByEmailId(email);
        if (isExists) {
            throw new HttpException('Email already exists', 409);
        }

        // convert password to hash
        const hasedhPassword = await this.passwordUpdate.passwordEncrypt(password);

        //save user
        return await this.commmon.saveUser({ email, password: hasedhPassword, firstName, lastName, userId });
    }


    /**
     * @name login
     * @param {LoginRequestDto} request
     * @returns {LoginResponseDto} 
     */

    async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        const { email, password } = request;
        // check email exists or not
        const user = await this.commmon.getUserByEmailId(email);
        if (!user) {
            throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        }

        // compare passowrd
        const decryptPassword = await this.passwordUpdate.decryptPassword(password, user.password);
        if (!decryptPassword) {
            throw new HttpException('Password not valid', HttpStatus.BAD_REQUEST)
        }

        // generate jwt token
        const payload = {
            email: user.email,
            userId: user.userId,
        }
        const jwt = await this.passwordUpdate.generateJSONToken(payload);
        return {
            email: user.email,
            jwt: jwt,
            userId: user._id
        }
    }

    /**
     * 
     * @param userId 
     * @returns any
     */
    async profile(userId: string): Promise<any> {
        return await this.commmon.profile(userId)
    }
}