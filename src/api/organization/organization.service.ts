import { Injectable } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { CommonService } from "./common.service";


@Injectable()
export class OrganizationService {
    constructor(private common: CommonService){}

    /**
     * 
     * @param request 
     */
    async createOrganization(request: OrganizationRequestDto, decodeJWT: any): Promise<OrganizationRequestDto> {
        try {
            return await this.common.createConversation(request, decodeJWT);
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
}