import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';

const AWS_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_AECCSS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
})

@Injectable()
export class AwsService {
    public async uploadFile(fileBuffer: any, key: string): Promise<any> {
        const params = {
            Body: fileBuffer.bufferData,
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            ContentType: fileBuffer.mimeType
        };

        console.log('params');
        console.log(params);
        const data = await s3.upload(params).promise();
        console.log('data');
        console.log(data);
        return data.Location;
    }
}