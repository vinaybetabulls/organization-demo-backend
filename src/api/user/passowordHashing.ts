
import * as bcrypt from 'bcryptjs';
import *as jwt from 'jsonwebtoken';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class PasswordManipulation {

    /**
     * @name passwordEncrypt
     * @param {String} password 
     * @returns {string} hashedPassword
     */
    async passwordEncrypt(password: string) {
        const saltNumber = parseInt(process.env.SALT,10)
        const salt = bcrypt.genSaltSync(saltNumber);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }

    /**
     * 
     * @param password 
     * @param hashedPassword 
     */
    decryptPassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }

    /**
     * @name generateJSONToken
     * @param {any} user
     */
    async generateJSONToken(user: any) {
       return jwt.sign({
            data: user
          }, process.env.JWT_SECRETE_KEY, { expiresIn: '1h' });
    }

    /**
     * 
     * @param userAuthToken 
     * 
     */
    async validateJSONToken(userAuthToken): Promise<string | any> {
        try {
            return jwt.verify(userAuthToken, process.env.JWT_SECRETE_KEY)
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
        
    }
}