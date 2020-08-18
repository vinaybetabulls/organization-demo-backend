import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model  } from "mongoose";
import { UserInterace } from "./interfaces/user.interface";
import { RegistrationRequestDto } from "./dto/registration.request.dto";
import { RegistrationResponseDto } from "./dto/registration.response.dto";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommonService {
    constructor(@InjectModel('User') private userModel: Model<UserInterace>) { }
    /**
     * @name getUserByEmailId
     * @param {string} email
     * @return {boolean} isExists
     */

    async getUserByEmailId(email: string): Promise<any> {
        let isExists;
        email = email.toLowerCase();
        const result = await this.userModel.findOne({ email });
        if (result) {
            isExists = result;
        }
        return isExists;
    }

    /**
     * @name saveUser
     * @param {RegistrationRequestDto} user
     * @returns {RegistrationResponseDto} user
     */

    async saveUser(user: RegistrationRequestDto): Promise<RegistrationResponseDto> {
        user.userId = uuidv4();
        user.email = (user.email).toLowerCase()
        const UserModel = await new this.userModel(user);
        const userResponse = await UserModel.save();
        return {
            email: userResponse.email,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName,
            userId: userResponse.userId,
            imageURL:''
        }
    }

    async profile(userId: string): Promise<any> {
         const result = await this.userModel.findOne({userId: userId});
         if(result) {
             return {
                 firstName: result.firstName,
                 lastName: result.lastName,
                 email: result.email,
                 userId: result.userId
             }
         }
         else {
             throw new HttpException('UserId not Found', HttpStatus.NOT_FOUND)
         }
    }

        
    /**
     * 
     * @param userId 
     * @param imageLocation 
     */
    async updateUserImageURL(userId: string, imageLocation: string) {
        return await this.userModel.updateOne({userId}, {$set: {imageURL: imageLocation}})
    }

}