import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';

const AWS_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_AECCSS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
})

@Injectable()
export class AwsService {
    /**
     * 
     * @param fileBuffer 
     * @param key 
     * @returns {string} Location
     */
    public async uploadFile(fileBuffer: any, key: string): Promise<any> {
        try {
            const params = {
                Body: fileBuffer.bufferData,
                Bucket: AWS_BUCKET_NAME,
                Key: key,
                ContentType: fileBuffer.mimeType
            };
            const data = await s3.upload(params).promise();
            return data.Location;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param key 
     */
    public async deleteFile(key: string): Promise<any> {
        try {
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: key
            }
            const response =  await s3.deleteObject(params).promise();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}