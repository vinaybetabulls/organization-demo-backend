import { Injectable } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { CommonService } from "./common.service";
import { AwsService } from "../aws/awsS3";
import { throws } from "assert";


@Injectable()
export class OrganizationService {
    constructor(private common: CommonService, private awsService: AwsService){}

    /**
     * 
     * @param request 
     */
    async createOrganization(request: OrganizationRequestDto, decodeJWT: any, fileBuffer: any): Promise<any> {
        try {
            const orgnaizationName = request.orgName;
            await this.common.isOrganizationALreadyExists(orgnaizationName);
            const result =  await this.common.createConversation(request, decodeJWT);
            let imageURl;
            if (fileBuffer) {
                // upload file
                imageURl = await this.awsService.uploadFile(fileBuffer, result.orgId);
                // update userImage location
                 await this.common.updateUserImageURL(result.orgId, imageURl);
            }
            result.imageURL = imageURl ? imageURl : '';
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param organizationId 
     */
    async getOrganizationBydId(organizationId: string): Promise<any> {
        try {
            return await this.common.getOrganizationById(organizationId);
        } catch (error) {
            throw error;
        }
    }

    async getAllOrganizationsList(): Promise<any> {
        try {
            return await this.common.getAllOrganizationsList();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param orgId 
     */
    async deleteOrganizationById(orgId: string): Promise<any> {
        try {
            const deleteResponse = await this.common.deleteOrganizationById(orgId);
            // delete orgnization image from s3
            await this.awsService.deleteFile(orgId);
            return deleteResponse;
        } catch (error) {
            throw error;
        }
    }
}