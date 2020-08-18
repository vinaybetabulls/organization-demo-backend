import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import *as jwt from 'jsonwebtoken';

@Injectable()
export class UtilService{

/**
     * 
     * @param mimetype 
     * @description validate file mimeType
     */
    async validateFile(mimetype) {
        const allowedExtension = ['.jpeg', '.jpg', '.png', '.gif', '.bmp'];
        let isValidFile = false;

        for (const index in allowedExtension) {

            if (mimetype === allowedExtension[index]) {
                isValidFile = true;
                break;
            }
        }

        if (!isValidFile) {
            console.log('not validat..')
            throw new HttpException('Allowed Extensions are : *.' + allowedExtension.join(', *.'), HttpStatus.BAD_REQUEST);
        }

        return isValidFile;
    }

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