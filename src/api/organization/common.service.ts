import { Injectable } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrganizationInterace } from "./interfaces/organization.interface";

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommonService {

    constructor(@InjectModel('Organization') private organiaztionModel: Model<OrganizationInterace>){}

    /**
     * 
     * @param {OrganizationRequestDto} request 
     */
    async createConversation(request: OrganizationRequestDto): Promise<any> {
        request.orgId = uuidv4();
        const org = new this.organiaztionModel(request);
        return org.save()
    }

    /**
     * 
     * @param organizationId 
     */
    async getOrganizationById(organizationId: string) {
        console.log('organizationId..', organizationId);
        return await this.organiaztionModel.findOne({orgId: organizationId})
    }

    async getAllOrganizationsList() {
        return await this.organiaztionModel.find({});
    }

}