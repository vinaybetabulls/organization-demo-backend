import { Injectable } from "@nestjs/common";
import { OrganizationRequestDto } from "./dto/organization.request.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrganizationInterace } from "./interfaces/organization.interface";

// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommonService {

    constructor(@InjectModel('Organization') private organiaztionModel: Model<OrganizationInterace>){}

    /**
     * 
     * @param {OrganizationRequestDto} request 
     */
    async createConversation(request: OrganizationRequestDto, decodeJWT: any): Promise<any> {
        // request.orgId = uuidv4();
        const payload = {
            ...request,
            createdBy: {...decodeJWT}
        }
        const org = new this.organiaztionModel(payload);
        return await org.save()
    }

    /**
     * 
     * @param organizationId 
     */
    async getOrganizationById(organizationId: string) {
        return await this.organiaztionModel.findOne({orgId: organizationId}).sort({_id: -1})
    }

    async getAllOrganizationsList() {
        return await this.organiaztionModel.find({}).sort({_id: -1});
    }

       
    /**
     * 
     * @param userId 
     * @param imageLocation 
     */
    async updateUserImageURL(organizationId: string, imageLocation: string) {
        return await this.organiaztionModel.updateOne({orgId: organizationId}, {$set: {imageURL: imageLocation}})
    }

}